// app/api/sendOrderNotification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendOrderNotification } from "@/utils/Notification"; 

export async function POST(req: NextRequest) {
  const { orderNumber } = await req.json();
  await sendOrderNotification(orderNumber);
  return NextResponse.json({ success: true });
}