// File: app/api/files/[...path]/route.ts

import { NextResponse } from "next/server";
import { firebaseServer } from "@/lib/firebase-server";
import { env } from "@/constants/env";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const filePath = (await params).path.join("/");
    const bucket = firebaseServer.storage.bucket;

    // Cek apakah file ada di bucket
    const file = bucket.file(filePath);
    const [exists] = await file.exists();

    if (!exists) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Ambil metadata file (opsional, jika ingin validasi jenis file, dll.)
    const [metadata] = await file.getMetadata();

    // Stream file ke klien
    const stream = file.createReadStream();
    const responseHeaders = new Headers({
      "Content-Type": metadata.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${metadata.name}"`,
    });

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
