// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { email, amount, metadata } = body;

//     const response = await fetch(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           amount: amount * 100, // convert to kobo
//           metadata,
//           callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
//         }),
//       },
//     );

//     const data = await response.json();

//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Payment initialization failed" },
//       { status: 500 },
//     );
//   }
// }



// app/api/paystack/initiate/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getAdminDb } from "@/config/firebase-admin";
// import crypto from "crypto";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { email, amount, metadata } = body;
//     const db = getAdminDb();

//     const paymentAttemptId = crypto.randomUUID();

//     // 1. Create payment attempt (internal ID)
//     await db
//       .collection("payment_attempts")
//       .doc(paymentAttemptId)
//       .set({
//         paymentAttemptId,
//         email,
//         amount,
//         status: "initialized",
//         provider: "paystack",
//         metadata,
//         paystackReference: null,
//         timestamps: {
//           initializedAt: new Date().toISOString(),
//           redirectedAt: null,
//           verifiedAt: null,
//         },
//       });

//     // 2. Initialize Paystack transaction
//     const response = await fetch(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           amount: amount * 100,
//           metadata: {
//             ...metadata,
//             paymentAttemptId, // 🔑 link attempt → Paystack
//           },
//           callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
//         }),
//       },
//     );

//     const data = await response.json();

//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Payment initialization failed" },
//       { status: 500 },
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/config/firebase-admin";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, metadata } = body;
    const db = getAdminDb();


    // 2. Initialize Paystack transaction
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100,
          metadata: {
            ...metadata, // 🔑 link attempt → Paystack
          },
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        }),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 },
    );
  }
}
