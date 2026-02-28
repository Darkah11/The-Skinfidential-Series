// lib/sendOrderNotification.ts
import { getAdminAuth, getAdminDb } from "@/config/firebase-admin";
import { getMessaging } from "firebase-admin/messaging";


export async function sendOrderNotification(orderNumber: string) {
  const adminAuth = getAdminAuth();
  const db = getAdminDb();
  const messaging = getMessaging();

  const tokens: string[] = [];
  let pageToken: string | undefined;

  try {
    // List all users in Firebase Auth (paginated)
    do {
      const listUsersResult = await adminAuth.listUsers(1000, pageToken);

      // Filter admins (assuming you store role in custom claims)
      const adminUsers = listUsersResult.users.filter(
        (user) => user.customClaims?.role === "admin"
      );

      for (const adminUser of adminUsers) {
        // Get the push tokens from Firestore under users/{uid}/pushTokens
        const tokenSnap = await db.collection(`users/${adminUser.uid}/pushTokens`).get();

        tokenSnap.docs.forEach((doc) => {
          const token = doc.data().token;
          if (token) tokens.push(token);
        });
      }

      pageToken = listUsersResult.pageToken;
    } while (pageToken);

    if (!tokens.length) {
      console.log("No admin push tokens found");
      return;
    }

    // Send FCM notification
    await messaging.sendEachForMulticast({
      tokens,
      notification: {
        title: "New Order",
        body: `Order #${orderNumber} created`,
      },
      data: {
        link: `/admin/orders`,
      },
    });

    console.log(`Push notifications sent to ${tokens.length} admin devices`);
  } catch (err) {
    console.error("Error sending admin notifications:", err);
    throw err;
  }
}