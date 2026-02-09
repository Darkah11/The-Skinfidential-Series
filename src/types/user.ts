import { UserInfo } from "firebase-admin/auth";

export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  disabled: boolean;
  metadata?: {
    creationTime?: string;
    lastSignInTime?: string;
    createdAt?: string;
    lastSignIn?: string;
  };
  providerData?: UserInfo[];
}
