import { env } from "@/constants/env";
import cookie, { parse } from "cookie";

export function getCookie(headers: Headers) {
  const cookies = parse(headers.get("cookie") || "");
  return {
    refreshToken: cookies.idToken || null,
    idToken: cookies.idToken || null,
  };
}

export const setAuthCookies = (refreshToken: string, idToken: string) => {
  const headers = new Headers();

  const cookieOptions = {
    httpOnly: true,
    secure: env.isProduction,
    path: "/",
  };

  headers.append(
    "Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  );

  headers.append(
    "Set-Cookie",
    cookie.serialize("idToken", idToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1, // 1 hour
    })
  );

  return headers;
};
