import { NextResponse } from "next/server";
import { firebaseClient } from "@/lib/firebase-client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { setAuthCookies } from "@/utils/cookies";

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();
    const userCredential = await createUserWithEmailAndPassword(
      firebaseClient.auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profil pengguna
    await updateProfile(user, { displayName: fullName });

    // Simpan informasi pengguna ke Firestore
    const userDoc = doc(firebaseClient.db, "users", user.uid);
    await setDoc(userDoc, {
      fullName,
      email,
      createdAt: new Date().toISOString(),
    });

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
