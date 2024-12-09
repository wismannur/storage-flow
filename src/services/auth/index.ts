import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { createFetch } from "../constants";
import { TSignInPayload } from "./types";
import { firebaseClient } from "@/lib/firebase-client";

export const authSignIn = async ({ email, password }: TSignInPayload) => {
  const res = await createFetch("/auth/sign-in").post({
    body: { email, password },
  });

  return res;
};

export const authSignInWithEmail = async ({
  email,
  password,
}: TSignInPayload) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseClient.auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const authSignUpWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseClient.auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
