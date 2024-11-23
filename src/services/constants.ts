import { TAny } from "@/types/global";
import { getCookie } from "./auth/utils";

function createFetch(url: string, { ...init }: RequestInit) {
  const newFetch = async (method = "GET") => {
    const response = await fetch(url, {
      method,
      ...init,
    });

    // Memeriksa status response secara lebih spesifik
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid or expired token.");
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  };

  return {
    get: () => newFetch(),
    post: () => newFetch("POST"),
    put: () => newFetch("PUT"),
    patch: () => newFetch("PATCH"),
    delete: () => newFetch("DELETE"),
  };
}

// Fungsi tanpa otentikasi
export const fetchWithoutAuth = (url: string) => createFetch(url, {});

// Fungsi dengan otentikasi
export const fetchWithAuth = (url: string, body: TAny) =>
  createFetch(url, {
    body: JSON.stringify(body),
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
