// lib/users.ts

import { getAdminAuth } from "@/config/firebase-admin";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllUsers() {
  const adminAuth = getAdminAuth();
  try {
    const users: User[] = [];
    let pageToken: string | undefined;

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
            createdAt: userRecord.metadata.creationTime,
            lastSignIn: userRecord.metadata.lastSignInTime,
          },
        });
      });

      pageToken = listUsersResult.pageToken;
    } while (pageToken);

    return { success: true, users, count: users.length };
  } catch (error: unknown) {
    console.error("Error listing users:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage, users: [] };
  }
}

// getSessionUser
export async function getSessionUser() {
  const sessionCookie = cookies().get("__session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded: User = await getAdminAuth().verifySessionCookie(
      sessionCookie,
      true,
    );
    return decoded ; // has uid, email, role, etc.
  } catch {
    return null;
  }
}
