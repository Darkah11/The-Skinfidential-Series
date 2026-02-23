// // app/api/paystack/webhook/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import { getAdminDb } from "@/config/firebase-admin";
// import { applyCouponToOrder } from "@/utils/Validator";

// function generateOrderNumber() {
//   return `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
// }

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function POST(req: NextRequest) {
//   const rawBody = await req.text();
//   const signature = req.headers.get("x-paystack-signature") || "";
//   const db = getAdminDb();

//   // Verify webhook signature
//   const hash = crypto
//     .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
//     .update(rawBody)
//     .digest("hex");

//   if (hash !== signature) {
//     return new NextResponse("Invalid signature", { status: 401 });
//   }

//   const event = JSON.parse(rawBody);

//   if (event.event === "charge.success") {
//     const payment = event.data;

//     // Extract metadata safely
//     const checkoutId = payment.metadata?.checkoutId;

//     if (!checkoutId) {
//       console.error("Missing metadata in webhook:", payment.metadata);
//       return new NextResponse("Missing metadata", { status: 400 });
//     }

//     // 2️⃣ Fetch checkout session to reconstruct order
//     const checkoutRef = db.collection("checkout_sessions").doc(checkoutId);
//     const checkoutSnap = await checkoutRef.get();

//     if (!checkoutSnap.exists) {
//       console.error("Checkout session not found:", checkoutId);
//       return new NextResponse("Checkout session not found", { status: 404 });
//     }

//     const checkout = checkoutSnap.data()!; // safe because we checked exists

//     // 3️⃣ Idempotent order creation
//     const existingOrderSnap = await db
//       .collection("orders")
//       .where("paystackReference", "==", payment.reference)
//       .limit(1)
//       .get();

//     if (existingOrderSnap.empty) {
//       const orderId = crypto.randomUUID();
//       await db
//         .collection("orders")
//         .doc(orderId)
//         .set({
//           orderId,
//           orderNumber: generateOrderNumber(),
//           paystackReference: payment.reference,
//           userId: checkout.userId,
//           email: payment.customer.email,
//           amount: payment.amount / 100,
//           cart: checkout.cart,
//           billing: checkout.billing,
//           deliveryMethod: checkout.deliveryMethod,
//           deliveryPrice: checkout.deliveryPrice,
//           couponUsed: checkout.coupon && checkout.coupon.isActive,
//           coupon: checkout.coupon ? checkout.coupon : null,
//           status: "paid",
//           createdAt: new Date().toISOString(),
//         });
//       if (checkout.coupon) await applyCouponToOrder(checkout.coupon.id);
//     }
//   }

//   return NextResponse.json({ received: true });
// }

// app/api/paystack/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminDb } from "@/config/firebase-admin";
import { applyCouponToOrder } from "@/utils/Validator";
import { ProductVariant } from "@/types/products";

function generateOrderNumber() {
  return `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") || "";
  const db = getAdminDb();

  // 🔐 Verify webhook signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const payment = event.data;
  const checkoutId = payment.metadata?.checkoutId;

  if (!checkoutId) {
    console.error("Missing checkoutId in metadata");
    return new NextResponse("Missing metadata", { status: 400 });
  }

  const checkoutRef = db.collection("checkout_sessions").doc(checkoutId);
  const checkoutSnap = await checkoutRef.get();

  if (!checkoutSnap.exists) {
    console.error("Checkout session not found:", checkoutId);
    return new NextResponse("Checkout not found", { status: 404 });
  }

  const checkout = checkoutSnap.data()!;

  // 🔥 TRANSACTION START
  const orderId = crypto.randomUUID();

  const orderRef = db.collection("orders").doc(orderId);

  await db.runTransaction(async (transaction) => {
    // 1️⃣ READ PHASE (ALL READS FIRST)

    const existingOrder = await transaction.get(orderRef);
    if (existingOrder.exists) return;

    const productSnapshots: Record<string, FirebaseFirestore.DocumentSnapshot> =
      {};

    for (const item of checkout.cart) {
      const productRef = db.collection("products").doc(item.productId);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      productSnapshots[item.productId] = productSnap;
    }

    // 2️⃣ WRITE PHASE (AFTER ALL READS)

    for (const item of checkout.cart) {
      const productRef = db.collection("products").doc(item.productId);
      const productData = productSnapshots[item.productId].data();

      if (productData && productData.hasVariants) {
        const variants: ProductVariant[] = productData.variants ?? [];

        const variantIndex = variants.findIndex((v) => v.id === item.variantId);

        if (variantIndex === -1) {
          throw new Error("Variant not found");
        }

        // const variant = variants[variantIndex];

        // if (variant.stock < item.quantity) {
        //   throw new Error("Insufficient variant stock");
        // }

        variants[variantIndex].stock -= item.quantity;

        transaction.update(productRef, { variants });
      } else {
        const currentStock = productData?.stock ?? 0;

        // if (currentStock < item.quantity) {
        //   throw new Error("Insufficient stock");
        // }

        transaction.update(productRef, {
          stock: currentStock - item.quantity,
        });
      }
    }

    // 3️⃣ CREATE ORDER (FINAL WRITE)

    transaction.set(orderRef, {
      orderId,
      orderNumber: generateOrderNumber(),
      paystackReference: payment.reference,
      userId: payment.metadata.userId,
      email: payment.customer.email,
      amount: payment.amount / 100,
      cart: checkout.cart,
      billing: checkout.billing,
      deliveryMethod: checkout.deliveryMethod,
      deliveryPrice: checkout.deliveryPrice,
      status: "paid",
      createdAt: new Date().toISOString(),
    });
  });

  // 5️⃣ Apply coupon AFTER transaction
  if (checkout.coupon) {
    await applyCouponToOrder(checkout.coupon.id);
  }

  return NextResponse.json({ received: true });
}
