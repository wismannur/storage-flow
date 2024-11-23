import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseModule } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

// Destructuring auth from firebaseModule
const { auth } = firebaseModule;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return NextResponse.json({
      message: "Login successful",
      user: userCredential.user,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return NextResponse.json(
        { error: "Failed to sign in: " + error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
