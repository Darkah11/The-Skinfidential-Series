// import { initializeApp, getApps, cert } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';

// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
// );

// if (!getApps().length) {
//   initializeApp({
//     credential: cert(serviceAccount),
//   });
// }

// export const adminAuth = getAuth();

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminAuthInstance: ReturnType<typeof getAuth> | null = null;

export function getAdminAuth() {
  if (!adminAuthInstance) {
    if (!getApps().length) {
      if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is missing!');
      }

      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

      initializeApp({
        credential: cert(serviceAccount),
      });
    }

    adminAuthInstance = getAuth();
  }

  return adminAuthInstance;
}

