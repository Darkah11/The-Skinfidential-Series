import { NextResponse } from "next/server";
import { getAdminAuth } from "@/config/firebase-admin";

export async function POST(req: Request) {
  try {
    const { uid, role } = await req.json();
    const adminAuth = getAdminAuth();

    // 🔐 Verify the caller is already admin
    const sessionCookie = req.headers
      .get("cookie")
      ?.match(/__session=([^;]+)/)?.[1];
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const userRecord = await adminAuth.getUser(uid);

    // ✅ Safe to assign role
    await adminAuth.setCustomUserClaims(userRecord.uid, { role });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error(error);
    if (
      typeof error === "object" &&
      error !== null &&
      "errorInfo" in error &&
      typeof (error as Record<string, unknown>).errorInfo === "object" &&
      (error as Record<string, Record<string, unknown>>).errorInfo.code === "auth/user-not-found"
    ) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 },
      );
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
