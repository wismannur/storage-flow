"use client";

import Link from "next/link";
import StorageFlowLogo from "@/components/storage-flow-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-2 justify-center items-center">
          <StorageFlowLogo className="w-7 h-7" />
          <h1 className="text-2xl font-bold">StorageFlow</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/sign-in"
            className="hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
