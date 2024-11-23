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
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Sign up with:", email, password, confirmPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8">
        <div className="flex justify-between">
          <Link href="/" className="flex gap-2 justify-center items-center">
            <StorageFlowLogo className="w-7 h-7" />
            <h1 className="text-2xl font-bold">StorageFlow</h1>
          </Link>
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} StorageFlow. All rights reserved.
        </p>
      </div>
      <div className="w-1/2 p-8 bg-primary hidden lg:flex items-center justify-center">
        <div className="text-primary-foreground max-w-md">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-4">
            Create an account to unlock a world of possibilities. Get access to
            exclusive features, personalized content, and connect with
            like-minded individuals.
          </p>
          <ul className="list-disc list-inside">
            <li>Personalized dashboard</li>
            <li>Exclusive member-only content</li>
            <li>Community forums and networking</li>
            <li>Regular updates and newsletters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
