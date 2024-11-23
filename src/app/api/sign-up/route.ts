import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseModule } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { setDoc, doc } from "firebase/firestore";

// Destructuring auth and db from firebaseModule
const { auth, db } = firebaseModule;

export async function POST(req: Request) {
  const { fullName, email, password } = await req.json();

  try {
    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Store fullName in Firestore (under 'users' collection)
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      fullName,
      email,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Registration successful",
      user: userCredential.user,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return NextResponse.json(
        { error: "Failed to sign up: " + error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
