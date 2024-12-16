"use client";

import Header from "@/features/layouts/main/header";
import Footer from "@/features/layouts/main/footer";
import HeroSection from "@/features/home/hero-section";
import WithAuth from "@/hoc/with-auth";
import dynamic from "next/dynamic";

const HomePage = () => {
  return (
    <WithAuth requireAuth={false} redirectTo="/dashboard">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <HeroSection />
        </main>
        <Footer />
      </div>
    </WithAuth>
  );
};

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });
