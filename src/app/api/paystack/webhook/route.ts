// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import { getAdminDb } from "@/config/firebase-admin";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   const rawBody = await req.text();
//   const signature = req.headers.get("x-paystack-signature") || "";
//   const db = getAdminDb();

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

//     await db.collection("orders").doc(payment.reference).set({
//       userId: payment.metadata.userId,
//       email: payment.customer.email,
//       amount: payment.amount / 100,
//       cart: payment.metadata.cart,
//       status: "paid",
//       reference: payment.reference,
//       createdAt: new Date(),
//     });
//   }

//   return NextResponse.json({ received: true });
// }

// app/api/paystack/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminDb } from "@/config/firebase-admin";
import { applyCouponToOrder } from "@/utils/Validator";

function generateOrderNumber() {
  return `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") || "";
  const db = getAdminDb();

  // Verify webhook signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const payment = event.data;

    // Extract metadata safely
    const paymentAttemptId = payment.metadata?.paymentAttemptId;
    const checkoutId = payment.metadata?.checkoutId;

    if (!paymentAttemptId || !checkoutId) {
      console.error("Missing metadata in webhook:", payment.metadata);
      return new NextResponse("Missing metadata", { status: 400 });
    }

    // 1️⃣ Update payment attempt
    const attemptRef = db.collection("payment_attempts").doc(paymentAttemptId);
    await attemptRef.set(
      {
        status: "success",
        paystackReference: payment.reference,
        timestamps: {
          verifiedAt: new Date(),
        },
      },
      { merge: true },
    );

    // 2️⃣ Fetch checkout session to reconstruct order
    const checkoutRef = db.collection("checkout_sessions").doc(checkoutId);
    const checkoutSnap = await checkoutRef.get();

    if (!checkoutSnap.exists) {
      console.error("Checkout session not found:", checkoutId);
      return new NextResponse("Checkout session not found", { status: 404 });
    }

    const checkout = checkoutSnap.data()!; // safe because we checked exists

    // 3️⃣ Idempotent order creation
    const existingOrderSnap = await db
      .collection("orders")
      .where("paymentAttemptId", "==", paymentAttemptId)
      .limit(1)
      .get();

    if (existingOrderSnap.empty) {
      const orderId = crypto.randomUUID();
      await db
        .collection("orders")
        .doc(orderId)
        .set({
          orderId,
          orderNumber: generateOrderNumber(),
          paymentAttemptId,
          paystackReference: payment.reference,
          userId: checkout.userId,
          email: payment.customer.email,
          amount: payment.amount / 100,
          cart: checkout.cart,
          billing: checkout.billing,
          deliveryMethod: checkout.deliveryMethod,
          deliveryPrice: checkout.deliveryPrice,
          couponUsed: checkout.coupon && checkout.coupon.isActive,
          coupon: checkout.coupon ? checkout.coupon : null,
          status: "paid",
          createdAt: new Date().toISOString(),
        });
      if (checkout.coupon) await applyCouponToOrder(checkout.coupon.id);
    }
  }

  return NextResponse.json({ received: true });
}
