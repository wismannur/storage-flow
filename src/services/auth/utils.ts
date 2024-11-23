import { env } from "@/constants/env";
import cookie, { SerializeOptions } from "cookie";
import { NextApiResponse } from "next";

// Set HTTP-only cookie for storing ID token
export const setAuthCookie = (idToken: string, res: NextApiResponse) => {
  const options: SerializeOptions = {
    httpOnly: true, // Prevent access to cookie via JavaScript
    secure: env.isProduction, // Use secure cookies in production
    maxAge: 60 * 60 * 24 * 30, // 30 days expiry
    path: "/", // Path for which the cookie is valid
    sameSite: "strict", // Prevent CSRF attacks
  };

  res.setHeader("Set-Cookie", cookie.serialize("token", idToken, options));
};

// Get the value of a cookie
export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : undefined;
};
