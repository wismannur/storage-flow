import Header from "@/features/layouts/main/header";
import Footer from "@/features/layouts/main/footer";
import HeroSection from "@/features/home/hero-section";

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
