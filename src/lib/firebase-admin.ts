import { env } from "@/constants/env";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebase.projectId,
      clientEmail: env.firebase.clientEmail,
      privateKey: env.firebase.privateKey,
    }),
  });
}

export const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken; // Returns decoded token with user info
  } catch (error: unknown) {
    if (String(error).includes("incorrect")) {
      throw new Error("Incorrect ID token");
    } else {
      throw new Error("Unauthorized");
    }
  }
};
