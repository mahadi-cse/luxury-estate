import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/module/public/home/HeroSection";
import SearchBar from "@/components/module/public/home/SearchBar";
import FeaturedProperties from "@/components/module/public/home/FeaturedProperties";
import StatsSection from "@/components/module/public/home/StatsSection";
import AgentSection from "@/components/module/public/home/AgentSection";
import Footer from "@/components/common/Footer";

/**
 * Home page — server component that composes all homepage sections.
 */
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <StatsSection />
      <AgentSection />
      <Footer />
    </main>
  );
}
