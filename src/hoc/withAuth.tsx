import { useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseClient } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";

type TWithAuthProps = {
  children: ReactNode;
  requireAuth?: boolean; // Set to true for pages that require login
  redirectTo?: string; // Page to redirect if condition not met
};

export const withAuth = ({
  children,
  requireAuth,
  redirectTo,
}: TWithAuthProps) => {
  const router = useRouter();

  useEffect(() => {
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
