import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactModal } from "@/hooks/use-contact-modal";
import { Shape3D } from "./Shape3D";

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
    <section className="pb-24 min-h-[calc(100vh-108px)] flex flex-col relative overflow-hidden px-6 bg-background">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 mb-20 pt-16">
        <div>
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
          >
            <div className="overflow-hidden mb-2">{wrapWords("Powered by Quality")}</div>
            <div className="overflow-hidden mb-2">{wrapWords("Committed to")}</div>
            <div className="overflow-hidden text-primary">{wrapWords("Efficiency", "text-primary")}</div>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl font-light leading-relaxed">
            Turning research-backed knowledge into professionally delivered value for your business.
          </p>
          <div className="flex gap-4 mb-16 flex-wrap">
            <button
              onClick={openModal}
              data-testid="button-hero-cta"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-primary to-[#00A375] text-white font-bold text-lg hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              let's talk
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1 duration-200">
              <div className="font-mono text-xs font-semibold text-primary mb-3">
                {"<industry/>"}
              </div>
              <h3 className="text-xl font-bold mb-1">Web & Mobile</h3>
              <p className="text-muted-foreground text-sm">
                Scalable applications for growing businesses.
              </p>
              <div className="absolute -right-4 -bottom-4 opacity-30 group-hover:opacity-80 transition-all group-hover:scale-110">
                <Shape3D type="cube" className="w-20 h-20" />
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1 duration-200">
              <div className="font-mono text-xs font-semibold text-primary mb-3">
                {"<industry/>"}
              </div>
              <h3 className="text-xl font-bold mb-1">AI & Cloud</h3>
              <p className="text-muted-foreground text-sm">
                Smart automation and reliable infrastructure.
              </p>
              <div className="absolute -right-4 -bottom-4 opacity-30 group-hover:opacity-80 transition-all group-hover:scale-110">
                <Shape3D type="half-round" className="w-20 h-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative h-[520px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[80px] animate-pulse" />
          <div className="relative w-full h-full">
            <div
              className="absolute top-[15%] left-[15%] w-56 h-56 bg-gradient-to-tr from-primary/90 to-emerald-300/90 rounded-[36px] rotate-12 animate-float shadow-2xl backdrop-blur-xl border border-white/20"
            />
            <div
              className="absolute top-[40%] right-[15%] w-44 h-44 bg-gradient-to-tr from-[#6B46C1]/90 to-indigo-400/90 rounded-full -rotate-12 animate-float shadow-2xl backdrop-blur-xl border border-white/20"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="absolute bottom-[18%] left-[38%] w-28 h-28 bg-gradient-to-tr from-orange-400/90 to-amber-300/90 rounded-2xl rotate-45 animate-float shadow-2xl backdrop-blur-xl border border-white/20"
              style={{ animationDelay: "3s" }}
            />
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
