// app/api/users/route.ts
import { getAdminAuth } from "@/config/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const adminAuth = getAdminAuth();
  try {
    const users: any[] = [];
    let pageToken: string | undefined;

    // List all users (handles pagination automatically)
    do {
      const listUsersResult = await adminAuth.listUsers(1000, pageToken);

      listUsersResult.users.forEach((userRecord) => {
        users.push({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          emailVerified: userRecord.emailVerified,
          disabled: userRecord.disabled,
          metadata: {
            creationTime: userRecord.metadata.creationTime,
            lastSignInTime: userRecord.metadata.lastSignInTime,
          },
          providerData: userRecord.providerData,
        });
      });

      pageToken = listUsersResult.pageToken;
    } while (pageToken);

    return NextResponse.json({
      success: true,
      users,
      count: users.length,
    });
  } catch (error: any) {
    console.error("Error listing users:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
