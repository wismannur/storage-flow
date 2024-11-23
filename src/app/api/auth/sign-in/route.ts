import { NextResponse } from "next/server";
import { firebaseModule } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import cookie from "cookie";
import { env } from "@/constants/env";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const userCredential = await signInWithEmailAndPassword(
      firebaseModule.auth,
      email,
      password
    );
    const user = userCredential.user;

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

    user.metadata;

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
