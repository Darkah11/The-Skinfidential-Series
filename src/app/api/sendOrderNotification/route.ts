// app/api/sendOrderNotification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendOrderNotification } from "@/utils/Notification"; 

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();
  await sendOrderNotification(orderId);
  return NextResponse.json({ success: true });
}