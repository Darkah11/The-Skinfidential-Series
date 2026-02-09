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

// import { initializeApp, getApps, cert } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';

// let adminAuthInstance: ReturnType<typeof getAuth> | null = null;

// export function getAdminAuth() {
//   if (!adminAuthInstance) {
//     if (!getApps().length) {
//       if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
//         throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is missing!');
//       }

//       const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

//       initializeApp({
//         credential: cert(serviceAccount),
//       });
//     }

//     adminAuthInstance = getAuth();
//   }

//   return adminAuthInstance;
// }

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminAuthInstance: ReturnType<typeof getAuth> | null = null;
let firestoreInstance: ReturnType<typeof getFirestore> | null = null;

export function getAdminApp() {
  if (!getApps().length) {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing!");
    }

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

export function getAdminAuth() {
  if (!adminAuthInstance) {
    getAdminApp();
    adminAuthInstance = getAuth();
  }

  return adminAuthInstance;
}

export function getAdminDb() {
  if (!firestoreInstance) {
    getAdminApp();
    firestoreInstance = getFirestore();
  }

  return firestoreInstance;
}


