import { env } from "@/constants/env";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
  measurementId: env.firebase.measurementId,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
const db = getFirestore(app, env.firebase.databaseName);
const auth = getAuth(app);
const storage = getStorage(app);

// Exporting services
export const firebaseModule = {
  app,
  db,
  auth,
  storage,
};
