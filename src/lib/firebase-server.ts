// this app for server side

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

export const firebaseServer = {
  auth: admin.auth(),
  db: admin.firestore(),
  storage: {
    app: admin.storage().app,
    bucket: admin.storage().bucket(env.firebase.storageBucket),
  },
};

export const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await firebaseServer.auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error: unknown) {
    if (String(error).includes("incorrect")) {
      throw new Error("Incorrect ID token");
    } else {
      throw new Error("Unauthorized");
    }
  }
};
