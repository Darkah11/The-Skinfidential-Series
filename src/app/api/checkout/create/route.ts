import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/config/firebase-admin";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cart, billing, deliveryMethod, deliveryPrice, userId, coupon } = body;
  const db = getAdminDb();

  const checkoutId = crypto.randomUUID();

  await db.collection("checkout_sessions").doc(checkoutId).set({
    checkoutId,
    userId,
    cart,
    billing,
    deliveryMethod,
    deliveryPrice,
    coupon,
    status: "pending_payment",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ checkoutId });
}
