import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IndustryShowcase from "@/components/IndustryShowcase";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CollaborateCTA from "@/components/CollaborateCTA";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans text-foreground">
      {/* Fixed bars: announcement (36px) + navbar (72px) = 108px */}
      <AnnouncementBar />
      <Navbar />
      {/* Spacer to push content below fixed bars */}
      <div className="h-[108px] shrink-0" />
      <main className="flex-1">
        <HeroSection />
        <IndustryShowcase />
        <Services />
        <WhyUs />
        <TechStack />
        <Portfolio />
        <Testimonials />
        <CollaborateCTA />
        <Awards />
      </main>
      <Footer />
    </div>
  );
}
