import Header from "@/features/layouts/main/header";
import Footer from "@/features/layouts/main/footer";
import HeroSection from "@/features/home/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Storage Flow`,
  description: `Effortlessly organize, track, and optimize your storage space with StorageFlow.`,
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-32x32.png",
    },
  ],
  manifest: "/favicon/site.webmanifest",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
