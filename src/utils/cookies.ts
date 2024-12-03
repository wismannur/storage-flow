import { env } from "@/constants/env";
import { cookies } from "next/headers";

export const getCookie = async () => {
  const cookieStore = await cookies();
  return {
    refreshToken: cookieStore.get("refreshToken")?.value || null,
    idToken: cookieStore.get("idToken")?.value || null,
  };
};

export const setAuthCookies = async (refreshToken: string, idToken: string) => {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: env.isProduction,
    path: "/",
  };

  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  cookieStore.set({
    name: "idToken",
    value: idToken,
    ...cookieOptions,
    maxAge: 60 * 60 * 1, // 1 hour
  });
};
