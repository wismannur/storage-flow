import { NextResponse } from "next/server";
import { firebaseClient } from "@/lib/firebase-client";
import { signOut } from "firebase/auth";
import { setAuthCookies } from "@/utils/cookies";

export async function POST() {
  try {
    // Melakukan sign-out dari Firebase Auth
    await signOut(firebaseClient.auth);

    // Menghapus refresh token dari cookie HTTP-only

    const headers = setAuthCookies("", "");

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
