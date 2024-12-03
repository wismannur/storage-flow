import { NextResponse } from "next/server";
import { firebaseClient } from "@/lib/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setAuthCookies } from "@/utils/cookies";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const userCredential = await signInWithEmailAndPassword(
      firebaseClient.auth,
      email,
      password
    );
    const user = userCredential.user;

    // Mendapatkan ID token dan metadata token
    const idToken = await user.getIdToken();

    // Simpan refresh token di HTTP-only cookie
    const refreshToken = user.refreshToken;

    await setAuthCookies(refreshToken, idToken);

    // Membuat respons
    const response = {
      uid: user.uid,
      email: user.email,
      providerData: user.providerData,
      idToken,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      createdAt: user.metadata.creationTime,
      lastLoginAt: user.metadata.lastSignInTime,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
