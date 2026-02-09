// import { getAdminDb } from "@/config/firebase-admin";
// import { NextRequest, NextResponse } from "next/server";

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

//     await db
//       .collection("orders")
//       .doc(reference)
//       .set({
//         userId: payment.metadata.userId,
//         email: payment.customer.email,
//         amount: payment.amount / 100,
//         cart: payment.metadata.cart,
//         status: "paid",
//         reference,
//         createdAt: new Date(),
//       });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Verification failed" }, { status: 500 });
//   }
// }

// app/api/paystack/verify/route.ts
import { getAdminDb } from "@/config/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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
    const paymentAttemptId = payment.metadata.paymentAttemptId;
    const attemptRef = db.collection("payment_attempts").doc(paymentAttemptId);

    // 1. Update attempt
    await attemptRef.set(
      {
        status: "success",
        paystackReference: reference,
        timestamps: {
          verifiedAt: new Date(),
        },
      },
      { merge: true },
    );

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
      .where("paymentAttemptId", "==", paymentAttemptId)
      .limit(1)
      .get();

    if (!existingOrderSnap.empty) {
      return NextResponse.json({ success: true });
    }
    const orderId = crypto.randomUUID();
    await db
      .collection("orders")
      .doc(orderId)
      .set(
        {
          orderId,
          orderNumber: generateOrderNumber(),
          paymentAttemptId,
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
        },
        { merge: true },
      );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
