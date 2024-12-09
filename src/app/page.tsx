"use client";

import Header from "@/features/layouts/main/header";
import Footer from "@/features/layouts/main/footer";
import HeroSection from "@/features/home/hero-section";
import { withAuth } from "@/hoc/withAuth";

const HomePage = () => {
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
};

export default function ProtectedHomePage() {
  return withAuth({
    children: <HomePage />,
    requireAuth: false,
    redirectTo: "/dashboard",
  });
}
