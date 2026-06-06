import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactModal } from "@/hooks/use-contact-modal";
import { Shape3D } from "./Shape3D";
import Globe from "./Globe";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { openModal } = useContactModal();

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".hero-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  const wrapWords = (text: string, colorClass = "") => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`hero-word inline-block mr-3 ${colorClass}`}
        style={{ visibility: "hidden" }}
      >
        {word}
      </span>
    ));
  };

  return (
    <section className="pb-12 md:pb-24 min-h-[calc(100vh-108px)] flex flex-col relative overflow-hidden px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 mb-12 md:mb-20 pt-8 md:pt-16">
        <div className="text-center lg:text-left order-last lg:order-first">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8"
          >
            <div className="overflow-hidden mb-1 md:mb-2">{wrapWords("AI-Powered Solutions. ")}</div>
            <div className="overflow-hidden mb-1 md:mb-2">{wrapWords("Built for ")}</div>
            <div className="overflow-hidden text-primary">{wrapWords("Growth.", "text-primary")}</div>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            We help businesses save time, automate workflows, and launch digital solutions faster with AI-powered software and modern technology.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 mb-12 md:mb-16 flex-wrap">
            <button
              onClick={openModal}
              data-testid="button-hero-cta"
              className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold text-base md:text-lg hover:shadow-xl hover:shadow-primary/30 hover:opacity-90 transition-all duration-200"
            >
              let's talk
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
            <div className="p-5 md:p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1 duration-200 text-left">
              <div className="font-mono text-[10px] md:text-xs font-semibold text-primary mb-2 md:mb-3">
                {"<industry/>"}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1">Web & Software</h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Scalable applications for growing businesses.
              </p>
              <div className="absolute -right-4 -bottom-4 opacity-30 group-hover:opacity-80 transition-all group-hover:scale-110">
                <Shape3D type="cube" className="w-16 md:w-20 h-16 md:h-20" />
              </div>
            </div>
            <div className="p-5 md:p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1 duration-200 text-left">
              <div className="font-mono text-[10px] md:text-xs font-semibold text-primary mb-2 md:mb-3">
                {"<industry/>"}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1">AI & Automation</h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Smart automation and reliable infrastructure.
              </p>
              <div className="absolute -right-4 -bottom-4 opacity-30 group-hover:opacity-80 transition-all group-hover:scale-110">
                <Shape3D type="half-round" className="w-16 md:w-20 h-16 md:h-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center relative h-[400px] sm:h-[500px] lg:h-[600px] order-first lg:order-last w-full mx-auto lg:mx-0 overflow-hidden lg:overflow-visible mt-4 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[80px] animate-pulse" />
          <div className="relative w-full h-full z-10 flex items-center justify-center">
            {/* Mobile: Centered, 100% size, 0 margin | PC: Default size (120%), but use a smaller overlap margin than before */}
            <div className="block lg:hidden w-full h-full">
              <Globe width="100%" height="100%" marginTop="0" />
            </div>
            <div className="hidden lg:block w-full h-full">
              <Globe marginTop="-40px" />
            </div>
          </div>
        </div>
      </div>

      {/* Logo Marquee */}
      <div className="absolute bottom-0 left-0 w-full bg-primary/5 border-t border-border py-4 flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex gap-16 px-10 items-center text-xl font-display font-bold text-muted-foreground/40 uppercase tracking-widest"
            >
              <span>NovaCorp</span>
              <span>TechBridge</span>
              <span>AlphaStream</span>
              <span>DataSync</span>
              <span>CloudPeak</span>
              <span>NextWave</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
