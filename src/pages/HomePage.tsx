import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IndustryShowcase from "@/components/IndustryShowcase";
import WhyUs from "@/components/WhyUs";
import TechStack from "@/components/TechStack";
import Portfolio from "@/components/Portfolio";
import ServiceMarquee from "@/components/ServiceMarquee";
import Testimonials from "@/components/Testimonials";
import CollaborateCTA from "@/components/CollaborateCTA";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans text-foreground">
      {/* Fixed bars: navbar (72px) */}
      <Navbar />
      {/* Spacer to push content below fixed bars */}
      <div className="h-[72px] shrink-0" />
      <main className="flex-1">
        <HeroSection />
        <TechStack />
        <IndustryShowcase />
        <WhyUs />
        <Portfolio />
        <ServiceMarquee />
        <Testimonials />
        <CollaborateCTA />
        <Awards />
      </main>
      <Footer />
    </div>
  );
}
