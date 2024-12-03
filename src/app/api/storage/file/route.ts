import { NextResponse } from "next/server";
import { firebaseClient } from "@/lib/firebase-client";
import { getMetadata, getDownloadURL, ref } from "firebase/storage";
import { getCookie } from "@/utils/cookies";
import { verifyIdToken } from "@/lib/firebase-server";

export async function GET(request: Request) {
  try {
    const idToken = getCookie(request.headers).idToken;
    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await verifyIdToken(idToken);

    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { success: false, message: "Path parameter is required." },
        { status: 400 }
      );
    }

    const fileRef = ref(firebaseClient.storage, path);

    // Fetch metadata
    const metadata = await getMetadata(fileRef);

    // Fetch download URL
    const downloadURL = await getDownloadURL(fileRef);

    return NextResponse.json({
      success: true,
      message: "File retrieved successfully.",
      file: {
        name: metadata.name,
        bucket: metadata.bucket,
        path: metadata.fullPath,
        size: metadata.size,
        contentType: metadata.contentType,
        updated: metadata.updated,
        downloadURL, // Include the download URL
      },
    });
  } catch (error) {
    console.error("Error retrieving file:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve file.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
