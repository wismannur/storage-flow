import { NextResponse } from "next/server";
import { firebaseModule } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import cookie from "cookie";
import { env } from "@/constants/env";

export async function POST() {
  try {
    // Melakukan sign-out dari Firebase Auth
    await signOut(firebaseModule.auth);

    // Menghapus refresh token dari cookie HTTP-only
    const cookieOptions = {
      httpOnly: true,
      secure: env.isProduction,
      maxAge: 0, // Menghapus cookie dengan setting maxAge 0
      path: "/",
    };

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      cookie.serialize("refreshToken", "", cookieOptions)
    );

    // Mengembalikan respons logout berhasil
    return NextResponse.json(
      { message: "Signed out successfully." },
      { headers }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
