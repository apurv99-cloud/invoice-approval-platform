import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
