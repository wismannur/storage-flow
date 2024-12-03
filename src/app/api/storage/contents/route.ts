import { NextResponse } from "next/server";
import { firebaseClient } from "@/lib/firebase-client";
import { list, ref } from "firebase/storage";
import { getCookie } from "@/utils/cookies";
import { verifyIdToken } from "@/lib/firebase-server";

export async function GET(request: Request) {
  try {
    const idToken = (await getCookie()).idToken;
    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await verifyIdToken(idToken);

    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";
    const maxResults = Number(searchParams.get("maxResults")) || 50;
    const pageToken = searchParams.get("pageToken") || undefined;

    if (!path.startsWith("/") && !path.endsWith("/")) {
      throw new Error("Invalid path format. Path must start and end with '/'.");
    }

    const folderRef = ref(firebaseClient.storage, path);

    const listResult = await list(folderRef, { maxResults, pageToken });

    const folders = listResult.prefixes.map((prefix) => ({
      name: prefix.name,
      fullPath: prefix.fullPath,
    }));

    const files = listResult.items.map((item) => ({
      name: item.name,
      fullPath: item.fullPath,
    }));

    return NextResponse.json({
      success: true,
      path,
      folders,
      files,
      nextPageToken: listResult.nextPageToken || null,
    });
  } catch (error) {
    console.error("Error accessing storage contents:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve storage contents.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
