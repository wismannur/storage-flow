"use client";

import StorageFlowLogo from "@/components/storage-flow-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLoadingScreen } from "@/features/loading-screen/hooks";
import { withAuth } from "@/hoc/withAuth";
import { useToast } from "@/hooks/use-toast";
import { authSignInWithEmail } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { startLoading, stopLoading } = useLoadingScreen();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    try {
      await authSignInWithEmail({ email, password });

      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      console.error("err login ", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full flex flex-col justify-between p-8">
        <div className="flex justify-between">
          <Link href="/" className="flex gap-2 justify-center items-center">
            <StorageFlowLogo className="w-7 h-7" />
            <h1 className="text-2xl font-bold">StorageFlow</h1>
          </Link>

          <ThemeToggle />
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StorageFlow. Licensed under MIT
            License.
          </p>
          <p className="text-sm text-muted-foreground">
            View the source code on{" "}
            <a
              href="https://github.com/wismannur/storage-flow"
              className="text-sky-500"
            >
              GitHub.
            </a>
          </p>
        </div>
      </div>
      {/* <div className="w-1/2 p-8 bg-primary hidden lg:flex items-center justify-center">
        <div className="text-primary-foreground max-w-md">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="mb-4">
            We&apos;re excited to see you again. Sign in to access your
            personalized dashboard, track your progress, and continue your
            journey with us.
          </p>
          <ul className="list-disc list-inside">
            <li>Access exclusive content</li>
            <li>Track your progress</li>
            <li>Connect with other users</li>
            <li>Get personalized recommendations</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default function ProtectedSignInPage() {
  return withAuth({
    children: <SignInPage />,
    requireAuth: false,
    redirectTo: "/dashboard",
  });
}
