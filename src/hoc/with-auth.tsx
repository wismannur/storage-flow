"use client";

import { useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseClient } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";

type TWithAuthProps = {
  children: ReactNode;
  requireAuth: boolean;
  redirectTo: string;
};

const WithAuth = ({ children, requireAuth, redirectTo }: TWithAuthProps) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; // Skip on server-side

    const unsubscribe = onAuthStateChanged(firebaseClient.auth, (user) => {
      if (requireAuth && !user) {
        router.push(redirectTo || "/signIn");
      } else if (!requireAuth && user) {
        router.push(redirectTo || "/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router, requireAuth, redirectTo]);

  return <>{children}</>;
};

export default WithAuth;
