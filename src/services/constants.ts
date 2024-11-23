import { TAny } from "@/types/global";
import { env } from "@/constants/env";

type MutableRequest = Omit<RequestInit, "body"> & { body?: TAny };

export const createFetch = (path: string) => {
  const newFetch = async (method: string, init: RequestInit) => {
    const headersBody = {
      "Content-Type": "application/json",
    };

    const url = env.baseUrl.concat("/api", path);
    const response = await fetch(url, {
      method,
      ...init,
      headers: {
        ...(init.body ? headersBody : {}),
        ...init.headers,
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
    });

    // Memeriksa status response secara lebih spesifik
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid or expired token.");
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: await response.json(),
    };
  };

  return {
    get: (init: RequestInit) => newFetch("GET", init),
    post: (init: MutableRequest) => newFetch("POST", init),
    put: (init: MutableRequest) => newFetch("PUT", init),
    patch: (init: MutableRequest) => newFetch("PATCH", init),
    delete: (init: RequestInit) => newFetch("DELETE", init),
  };
};
