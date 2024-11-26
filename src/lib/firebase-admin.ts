import { env } from "@/constants/env";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebase.projectId,
      clientEmail: env.firebase.clientEmail,
      privateKey: env.firebase.privateKey.replace(/\\n/g, "\n"), // Perbaiki newline di private key
    }),
  });
}

export const firebaseAdmin = {
  auth: admin.auth(),
  db: admin.firestore(),
  storage: admin.storage(),
};

export const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await firebaseAdmin.auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error: unknown) {
    if (String(error).includes("incorrect")) {
      throw new Error("Incorrect ID token");
    } else {
      throw new Error("Unauthorized");
    }
  }
};
