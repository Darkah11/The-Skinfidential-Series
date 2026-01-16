import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmhke5mxaeXGufLD6SG6cJMlvS1IOW2_I",
  authDomain: "the-skinfidential-series.firebaseapp.com",
  projectId: "the-skinfidential-series",
  storageBucket: "the-skinfidential-series.firebasestorage.app",
  messagingSenderId: "330068577712",
  appId: "1:330068577712:web:835dddf01d7b6e3e50da75"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app)
const storage = getStorage(app);
const auth = getAuth(app)

export { db, auth, storage }

export default app

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
