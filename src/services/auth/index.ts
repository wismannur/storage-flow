import { createFetch } from "../constants";
import { TSignInPayload } from "./types";

export const authSignIn = async ({ email, password }: TSignInPayload) => {
  const res = await createFetch("/auth/sign-in").post({
    body: { email, password },
  });

  return res;
};
