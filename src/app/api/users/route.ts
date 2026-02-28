// app/api/users/route.ts
import { getAdminAuth } from "@/config/firebase-admin";
import { User } from "@/types/user";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// export async function GET(request: NextRequest) {
export async function GET() {
  const adminAuth = getAdminAuth();
  try {
    const users: User[] = [];
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
  } catch (error: unknown) {
    console.error("Error listing users:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
