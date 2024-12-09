"use client";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 flex justify-between">
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
    </footer>
  );
}
