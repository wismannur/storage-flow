"use client";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} StorageFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
