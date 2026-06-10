// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Quote } from "lucide-react";
// import gsap from "gsap";

// const TESTIMONIALS = [
//   {
//     name: "James Mitchell",
//     title: "CTO, NovaCorp Health",
//     tag: "<HealthTech/>",
//     quote: "TimeGlobalTech rebuilt our patient scheduling platform from the ground up. Appointment no-shows dropped by 40% and our staff saves 15 hours a week thanks to the intelligent automation they engineered.",
//     color: "bg-emerald-100 text-emerald-700",
//     location: "New York, USA",
//     avatar: "https://i.pravatar.cc/80?img=12"
//   },
//   {
//     name: "Sarah Chen",
//     title: "VP Engineering, TechBridge",
//     tag: "<FinTech/>",
//     quote: "Their team integrated open banking APIs into our product in half the time we expected. The code quality was exceptional and the documentation made our internal team self-sufficient from day one.",
//     color: "bg-blue-100 text-blue-700",
//     location: "London, UK",
//     avatar: "https://i.pravatar.cc/80?img=5"
//   },
//   {
//     name: "Khalid Al-Rashidi",
//     title: "CEO, AlphaStream Digital",
//     tag: "<E-commerce/>",
//     quote: "We scaled from 5,000 to 200,000 daily transactions without a single downtime incident. Their cloud architecture is bulletproof — and so is their communication throughout every phase.",
//     color: "bg-amber-100 text-amber-700",
//     location: "Dubai, UAE",
//     avatar: "https://i.pravatar.cc/80?img=3"
//   },
//   {
//     name: "Emma Thompson",
//     title: "Head of Product, DataSync",
//     tag: "<EdTech/>",
//     quote: "TimeGlobalTech turned a complex LMS vision into a polished product in just 4 months. Learner engagement went up 55% and educators love how intuitive the interface feels.",
//     color: "bg-purple-100 text-purple-700",
//     location: "Toronto, Canada",
//     avatar: "https://i.pravatar.cc/80?img=44"
//   },
//   {
//     name: "Liam O'Brien",
//     title: "COO, CloudPeak Systems",
//     tag: "<AgriTech/>",
//     quote: "They built a real-time crop monitoring dashboard that farmers can actually use. Data from 3,000+ IoT sensors is now visualized beautifully — and it works offline in remote areas.",
//     color: "bg-lime-100 text-lime-700",
//     location: "Sydney, Australia",
//     avatar: "https://i.pravatar.cc/80?img=13"
//   },
//   {
//     name: "Priya Sharma",
//     title: "Innovation Director, NextWave",
//     tag: "<GigEconomy/>",
//     quote: "Our freelancer marketplace went live on schedule with zero post-launch bugs. The escrow and dispute resolution features they built cut payment conflicts by 65% in the first quarter.",
//     color: "bg-cyan-100 text-cyan-700",
//     location: "Singapore",
//     avatar: "https://i.pravatar.cc/80?img=49"
//   },
//   {
//     name: "Marco Rossi",
//     title: "Founder, DigitalForge",
//     tag: "<EnergyTech/>",
//     quote: "They delivered a smart grid management portal integrating 7 different hardware vendors. The custom firmware layer was a breakthrough our own engineers had struggled with for months.",
//     color: "bg-orange-100 text-orange-700",
//     location: "Milan, Italy",
//     avatar: "https://i.pravatar.cc/80?img=68"
//   },
//   {
//     name: "Aisha Williams",
//     title: "Program Director, SafeRoute Inc",
//     tag: "<CivicTech/>",
//     quote: "The incident reporting app they built handles 10,000+ submissions a month for our city partnership. Response time by local services improved by 30% in the first quarter alone.",
//     color: "bg-rose-100 text-rose-700",
//     location: "Houston, USA",
//     avatar: "https://i.pravatar.cc/80?img=47"
//   },
//   {
//     name: "David Park",
//     title: "CEO, Studio Prime",
//     tag: "<CreativeTech/>",
//     quote: "Our creative teams now collaborate in real time across three time zones thanks to the platform TimeGlobalTech engineered. Asset delivery time went from 3 days to same-day.",
//     color: "bg-indigo-100 text-indigo-700",
//     location: "Los Angeles, USA",
//     avatar: "https://i.pravatar.cc/80?img=7"
//   },
//   {
//     name: "Dr. Lisa Mueller",
//     title: "Lead AI Researcher, Nexus Labs",
//     tag: "<AI/ML/>",
//     quote: "They fine-tuned a domain-specific LLM for our clinical research pipeline. Accuracy improved to 91% and inference latency dropped by 60% — production-ready in just 6 weeks.",
//     color: "bg-fuchsia-100 text-fuchsia-700",
//     location: "Berlin, Germany",
//     avatar: "https://i.pravatar.cc/80?img=16"
//   }
// ];

// function StarRating({ rating = 5 }: { rating?: number }) {
//   return (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, i) => (
//         <motion.span
//           key={i}
//           initial={{ opacity: 0, scale: 0 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: i * 0.1 }}
//           className="text-lg"
//         >
//           {i < rating ? "⭐" : "☆"}
//         </motion.span>
//       ))}
//     </div>
//   );
// }

// function TestimonialCard({ test }: { test: typeof TESTIMONIALS[0] }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-40px" }}
//       transition={{ duration: 0.5 }}
//       className="inline-block w-[450px] whitespace-normal group p-7 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/40 hover:border-primary/60 transition-all duration-500 relative shadow-lg hover:shadow-2xl hover:shadow-primary/20"
//     >
//       {/* Glow effect */}
//       <div
//         className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur"
//         style={{ background: "radial-gradient(400px circle at 50% 50%, var(--primary) / 0.15, transparent 80%)" }}
//       />

//       <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
//         <Quote size={48} />
//       </div>

//       <div className="relative z-10 space-y-5">
//         {/* Star Rating */}
//         <StarRating rating={5} />

//         {/* Quote */}
//         <p className="text-lg text-foreground leading-relaxed italic font-light">
//           "{test.quote}"
//         </p>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

//         {/* Author Info */}
//         <div className="flex items-center gap-4">
//           <motion.img
//             src={test.avatar}
//             alt={test.name}
//             width="48"
//             height="48"
//             className="w-12 h-12 rounded-xl object-cover border border-primary/30 group-hover:border-primary/60 group-hover:scale-110 transition-all duration-500"
//             loading="lazy"
//           />
//           <div className="flex-1 min-w-0">
//             <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
//               {test.name}
//             </h4>
//             <p className="text-xs text-muted-foreground font-medium truncate">
//               {test.title}
//             </p>
//             <p className="text-xs text-muted-foreground/60 mt-0.5">
//               {test.location}
//             </p>
//           </div>
//         </div>

//         {/* Category Tag */}
//         <div className="pt-2">
//           <span className="inline-block px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20">
//             {test.tag}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default function Testimonials() {
//   const marqueeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!marqueeRef.current) return;

//     const marquee = marqueeRef.current;
//     const cardWidth = 450 + 32; // w-[450px] + gap-8
//     const totalWidth = TESTIMONIALS.length * cardWidth;

//     const loop = gsap.to(marquee, {
//       x: `-=${totalWidth}`,
//       duration: 80,
//       ease: "none",
//       repeat: -1,
//       force3D: true,
//       onReverseComplete() {
//         const self = this as any;
//         self.totalTime(self.rawTime() + self.duration() * 10);
//       }
//     });

//     marquee.style.willChange = "transform";

//     const handleMouseEnter = () => gsap.to(loop, { timeScale: 0, duration: 0.5 });
//     const handleMouseLeave = () => gsap.to(loop, { timeScale: 1, duration: 0.5 });
//     const handleTouchStart = () => gsap.to(loop, { timeScale: 0, duration: 0.3 });
//     const handleTouchEnd = () => gsap.to(loop, { timeScale: 1, duration: 0.8 });

//     marquee.addEventListener("mouseenter", handleMouseEnter);
//     marquee.addEventListener("mouseleave", handleMouseLeave);
//     marquee.addEventListener("touchstart", handleTouchStart, { passive: true });
//     marquee.addEventListener("touchend", handleTouchEnd, { passive: true });
//     marquee.addEventListener("touchcancel", handleTouchEnd, { passive: true });

//     return () => {
//       loop.kill();
//       marquee.style.willChange = "auto";
//       marquee.removeEventListener("mouseenter", handleMouseEnter);
//       marquee.removeEventListener("mouseleave", handleMouseLeave);
//       marquee.removeEventListener("touchstart", handleTouchStart);
//       marquee.removeEventListener("touchend", handleTouchEnd);
//       marquee.removeEventListener("touchcancel", handleTouchEnd);
//     };
//   }, []);

//   return (
//     <section className="py-32 bg-[#0A0A0B] border-y border-border/50 overflow-hidden" id="testimonials">
//       <div className="max-w-7xl mx-auto px-6 mb-24">
//         <div className="text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.5 }}
//             className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-6 border border-primary/20"
//           >
//             {'<Global Clients. Real Results/>'}
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-4xl md:text-6xl font-bold mb-6 text-white"
//           >
//             Trusted by Teams Around the World
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-xl text-gray-400 max-w-2xl mx-auto"
//           >
//             Industry leaders across the globe rely on us to deliver research-backed software solutions that drive measurable growth.
//           </motion.p>
//         </div>
//       </div>

//       <div className="relative">
//         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
//         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />

//         <div
//           ref={marqueeRef}
//           className="flex gap-8 whitespace-nowrap"
//           style={{ width: "max-content" }}
//         >
//           {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
//             <TestimonialCard key={i} test={test} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/Skeleton";

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const SERVICE_OPTIONS = ["Brand", "Digital", "Campaign", "Other"] as const;

export default function Testimonials() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");

  // Desktop mouse scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) return;

    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const handleSeeked = () => {
      seeking = false;
      if (video.currentTime !== targetTime) {
        seeking = true;
        try {
          video.currentTime = targetTime;
        } catch {}
      }
    };

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || isNaN(video.duration)) return;
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      targetTime += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      if (!seeking) {
        seeking = true;
        try {
          video.currentTime = targetTime;
        } catch {}
      }
    };

    video.pause();
    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Mobile autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      void video.play().catch(() => {});
    }
  }, []);

  const toggleService = (s: string) => {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const [headlineLine1, headlineLine2] = displayed.split("\n");

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      {/* Background video layer / Skeleton container */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        
        {/* Skeleton handles structural loader layout safely */}
        {!isVideoLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-neutral-200/60 z-10" />
        )}

        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={cn(
            "w-full h-full object-cover object-right lg:object-right-bottom transition-opacity duration-500 pointer-events-none",
            isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
        />
      </div>

      {/* Navbar */}
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex flex-row gap-3 items-center">
            <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
              Mainframe®
            </span>
            <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
              ✱
            </span>
          </a>

          <div className="hidden md:flex items-center gap-3 text-[23px] text-black">
            {["Labs", "Studio", "Openings", "Shop"].map((l, i, arr) => (
              <span key={l} className="flex items-center gap-3">
                <a href="#" className="hover:opacity-60 transition-opacity">
                  {l}
                </a>
                {i < arr.length - 1 && <span className="opacity-40">,</span>}
              </span>
            ))}
          </div>

          <a
            href="#"
            className="hidden md:inline-block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>

          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden relative z-[10] flex flex-col gap-[5px] items-center justify-center w-8 h-8"
          >
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-3xl text-black">
          {["Labs", "Studio", "Openings", "Shop", "Get in touch"].map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      {/* Content layer */}
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-10 lg:px-14 pt-10 lg:pt-20 pb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#1C2E1E] leading-[1.02] mb-8 whitespace-pre-line">
                {headlineLine1}
                {headlineLine2 !== undefined && (
                  <>
                    {"\n"}
                    {headlineLine2}
                  </>
                )}
                {!done && (
                  <span className="inline-block w-[0.55ch] h-[0.9em] align-baseline ml-1 bg-[#1C2E1E] animate-blink" />
                )}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                Whether you have questions, feedback, drop us a message and
                we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-medium tracking-tight mb-2 text-[#1C2E1E]">
                What sort of service?
              </h2>
              <p className="opacity-85 text-[#738273] mb-8">
                Select all that apply
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {SERVICE_OPTIONS.map((opt) => {
                  const active = services.includes(opt);
                  return (
                    <motion.button
                      key={opt}
                      type="button"
                      onClick={() => toggleService(opt)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base transition-colors duration-200 ${
                        active
                          ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform"
                          : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                      }`}
                    >
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0, y: -6 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="inline-flex"
                          >
                            <Check className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span>{opt}</span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {services.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="italic text-xs text-[#1C2E1E]"
                  >
                    Please click to select services above.
                  </motion.p>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#FAFBF9] border border-[#EAECE9] rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
                      <p className="text-sm text-[#1C2E1E]">
                        Ready to inquire about:{" "}
                        <span className="font-medium">
                          {services.join(", ")}
                        </span>
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[#4D6D47] uppercase text-xs tracking-wider hover:opacity-70 transition-opacity"
                      >
                        Let's Go
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
