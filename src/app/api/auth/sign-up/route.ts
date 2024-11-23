import { NextResponse } from "next/server";
import { firebaseModule } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import cookie from "cookie";
import { env } from "@/constants/env";

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();
    const userCredential = await createUserWithEmailAndPassword(
      firebaseModule.auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profil pengguna
    await updateProfile(user, { displayName: fullName });

    // Simpan informasi pengguna ke Firestore
    const userDoc = doc(firebaseModule.db, "users", user.uid);
    await setDoc(userDoc, {
      fullName,
      email,
      createdAt: new Date().toISOString(),
    });

    // Mendapatkan ID token dan metadata token
    const idToken = await user.getIdToken();

    // Simpan refresh token di HTTP-only cookie
    const refreshToken = user.refreshToken;
    const cookieOptions = {
      httpOnly: true,
      secure: env.isProduction,
      maxAge: 30 * 24 * 60 * 60, // 30 hari
      path: "/",
    };

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      cookie.serialize("refreshToken", refreshToken, cookieOptions)
    );

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

    return NextResponse.json(response, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
