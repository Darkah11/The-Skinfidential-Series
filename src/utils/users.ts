// lib/users.ts

import { getAdminAuth } from "@/config/firebase-admin";

export async function getAllUsers() {
    const adminAuth = getAdminAuth();
  try {
    const users: any[] = [];
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
  } catch (error: any) {
    console.error('Error listing users:', error);
    return { success: false, error: error.message, users: [] };
  }
}