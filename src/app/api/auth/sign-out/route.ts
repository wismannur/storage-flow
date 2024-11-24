import { NextResponse } from "next/server";
import { firebaseModule } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { setAuthCookies } from "@/utils/cookies";

export async function POST() {
  try {
    // Melakukan sign-out dari Firebase Auth
    await signOut(firebaseModule.auth);

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
