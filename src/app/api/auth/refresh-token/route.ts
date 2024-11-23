import { NextResponse } from "next/server";
import cookie from "cookie";
import { env } from "@/constants/env";

export async function POST(request: Request) {
  try {
    const cookies = cookie.parse(request.headers.get("cookie") || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token missing" },
        { status: 401 }
      );
    }

    const apiKey = env.firebase.apiKey;
    const response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    const newAccessToken = data.access_token;
    const newRefreshToken = data.refresh_token;
    const expiresIn = data.expires_in;

    // Update HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: env.isProduction,
      maxAge: parseInt(expiresIn, 10), // seconds
      path: "/",
    };

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      cookie.serialize("refreshToken", newRefreshToken, cookieOptions)
    );

    return NextResponse.json({ idToken: newAccessToken }, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
