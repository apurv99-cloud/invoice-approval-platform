import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";

import { useAuth } from "../Context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) return;

    switch (user.roleName) {
      case "SUPER_ADMIN":
        navigate("/organizations");
        break;

      case "ORG_ADMIN":
        navigate("/workspace");
        break;

      case "REVIEWER":
        navigate("/workspace");
        break;

      case "FINANCE":
        navigate("/workspace");
        break;

      case "DIRECTOR":
        navigate("/workspace");
        break;

      case "CFO":
        navigate("/workspace");
        break;

      default:
        break;
    }
  }, [user, loading, navigate]);

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
