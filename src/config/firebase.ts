import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const analytics = isSupported().then((supported) => {
  return supported ? getAnalytics(app) : null;
});

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// const messaging = getMessaging(app);

let messaging: ReturnType<typeof getMessaging> | null = null;
if (typeof window !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.warn("Firebase Messaging not supported in this environment:", err);
  }
}

export { db, auth, storage, messaging };

export default app;

// import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
// import { Firestore, getFirestore } from "firebase/firestore";
// import { FirebaseStorage, getStorage } from "firebase/storage";
// import { Auth, getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
// };

// // Explicit types
// let app: FirebaseApp | undefined;
// let db: Firestore | undefined;
// let storage: FirebaseStorage | undefined;
// let auth: Auth | undefined;

// export function getFirebaseApp(): {
//   app: FirebaseApp;
//   db: Firestore;
//   storage: FirebaseStorage;
//   auth: Auth;
// } {
//   if (!app || !db || !storage || !auth) {
//     app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//     db = getFirestore(app);
//     storage = getStorage(app);
//     auth = getAuth(app);
//   }

//   return { app, db, storage, auth } as {
//     app: FirebaseApp;
//     db: Firestore;
//     storage: FirebaseStorage;
//     auth: Auth;
//   };
// }
