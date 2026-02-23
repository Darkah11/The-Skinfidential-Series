// import { getAdminDb } from "@/config/firebase-admin";
// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import { applyCouponToOrder } from "@/utils/Validator";

// function generateOrderNumber() {
//   return `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const reference = searchParams.get("reference");
//   const db = getAdminDb();

//   if (!reference) {
//     return NextResponse.json({ error: "Missing reference" }, { status: 400 });
//   }

//   try {
//     const response = await fetch(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         },
//       },
//     );

//     const data = await response.json();
//     const payment = data.data;

//     if (payment.status !== "success") {
//       return NextResponse.json(
//         { error: "Payment not successful" },
//         { status: 400 },
//       );
//     }
//     const checkoutId = payment.metadata.checkoutId;

//     const checkoutRef = db.collection("checkout_sessions").doc(checkoutId);
//     const checkoutSnap = await checkoutRef.get();

//     if (!checkoutSnap.exists) {
//       return NextResponse.json(
//         { error: "Checkout session not found" },
//         { status: 404 },
//       );
//     }
//     const checkout = checkoutSnap.data();
//     if (!checkout) {
//       throw new Error("Checkout data missing despite exists=true");
//     }
//     const existingOrderSnap = await db
//       .collection("orders")
//       .where("paystackReference", "==", reference)
//       .limit(1)
//       .get();

//     if (!existingOrderSnap.empty) {
//       return NextResponse.json({ success: true });
//     }

//     const orderId = crypto.randomUUID();
//     await db
//       .collection("orders")
//       .doc(orderId)
//       .set(
//         {
//           orderId,
//           orderNumber: generateOrderNumber(),
//           paystackReference: reference,
//           userId: payment.metadata.userId,
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
//         },
//         { merge: true },
//       );
//     if (checkout.coupon) await applyCouponToOrder(checkout.coupon.id);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Verification failed" }, { status: 500 });
//   }
// }

import { getAdminDb } from "@/config/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { applyCouponToOrder } from "@/utils/Validator";
import { ProductVariant } from "@/types/products";

function generateOrderNumber() {
  return `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const db = getAdminDb();

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = await response.json();
    const payment = data.data;

    if (payment.status !== "success") {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 },
      );
    }
    const checkoutId = payment.metadata.checkoutId;

    const checkoutRef = db.collection("checkout_sessions").doc(checkoutId);
    const checkoutSnap = await checkoutRef.get();

    if (!checkoutSnap.exists) {
      return NextResponse.json(
        { error: "Checkout session not found" },
        { status: 404 },
      );
    }
    const checkout = checkoutSnap.data();
    if (!checkout) {
      throw new Error("Checkout data missing despite exists=true");
    }
    const existingOrderSnap = await db
      .collection("orders")
      .where("paystackReference", "==", reference)
      .limit(1)
      .get();

    if (!existingOrderSnap.empty) {
      return NextResponse.json({ success: true });
    }

    const orderId = crypto.randomUUID();

    const orderRef = db.collection("orders").doc(orderId);

    await db.runTransaction(async (transaction) => {
      // 1️⃣ READ PHASE (ALL READS FIRST)

      const existingOrder = await transaction.get(orderRef);
      if (existingOrder.exists) return;

      const productSnapshots: Record<
        string,
        FirebaseFirestore.DocumentSnapshot
      > = {};

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

          const variantIndex = variants.findIndex(
            (v) => v.id === item.variantId,
          );

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
        paystackReference: reference,
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
    if (checkout.coupon) await applyCouponToOrder(checkout.coupon.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
