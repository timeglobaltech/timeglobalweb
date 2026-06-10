import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import IndustryShowcase from "@/components/IndustryShowcase";
import TeamSnapshot from "@/components/TeamSnapshot";
import Testimonials from "@/components/Testimonials";
import Awards from "@/components/Awards";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import CollaborateCTA from "@/components/CollaborateCTA";
import { HeroAnimatedIcons } from "@/components/HeroAnimatedIcons";
import ModernHero from "@/components/ModernHero";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "200+", label: "Projects Shipped" },
  { value: "40+", label: "Global Clients" },
  { value: "98%", label: "Client Retention" },
  { value: "12+", label: "Years Delivering" },
];

// ─── Updated CASE_STUDIES with gradient backgrounds & tags ───────────────────
const CASE_STUDIES = [
  {
    tags: ["FinTech", "Cloud"],
    client: "FinTech EU",
    title: "99.98% Uptime, Zero Surprise Bills",
    outcome: "Reduced AWS costs by 42% while cutting deploy time from 3 hours to 8 minutes.",
    metrics: ["42% cost cut", "8 min deploys", "99.98% uptime"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
    bgGradient: "linear-gradient(145deg, #0f0c29, #302b63, #24243e)",
    span: "normal", // "normal" | "tall"
  },
  {
    tags: ["Web Apps", "Migration"],
    client: "Retail Canada",
    title: "From Legacy Monolith to Micro-Frontend",
    outcome: "Rewrote a 7-year-old PHP platform into a React + Node microservice architecture.",
    metrics: ["0 downtime", "3× faster load", "62% less bugs"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900",
    bgGradient: "linear-gradient(145deg, #0a2e1a, #0d4a28, #0a3d20)",
    span: "tall",
  },
  {
    tags: ["Mobile", "Healthcare"],
    client: "Healthcare KSA",
    title: "Patient App Serving 500k+ Users",
    outcome: "End-to-end React Native app with HL7 FHIR integration, shipped in 14 weeks.",
    metrics: ["500k+ users", "4.8★ App Store", "14 wks shipped"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900",
    bgGradient: "linear-gradient(145deg, #1a0533, #3b0764, #2d0550)",
    span: "normal",
  },
  {
    tags: ["Data & AI", "Logistics"],
    client: "Logistics EU",
    title: "Predictive Routing Saves $2M/Year",
    outcome: "Built an ML pipeline on top of the client's existing ERP — 28% reduction in fuel spend.",
    metrics: ["$2M saved", "28% less fuel", "Real-time ETAs"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900",
    bgGradient: "linear-gradient(145deg, #001a2e, #003052, #00213d)",
    span: "tall",
  },
  {
    tags: ["E-Commerce", "Mobile"],
    client: "Fashion UAE",
    title: "D2C Store Hitting $1M GMV in Month 1",
    outcome: "Shopify Plus custom storefront with Arabic RTL support, launched 3 weeks before Ramadan.",
    metrics: ["$1M GMV/mo", "RTL + LTR", "3 wk delivery"],
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=900",
    bgGradient: "linear-gradient(145deg, #2d0a1a, #5c1030, #450d24)",
    span: "normal",
  },
  {
    tags: ["Web Apps", "EdTech"],
    client: "EdTech Australia",
    title: "LMS Scaling to 80k Concurrent Learners",
    outcome: "Video-first learning platform with adaptive quiz engine on serverless infrastructure.",
    metrics: ["80k concurrent", "2.1s p95", "Auto-scales"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=900",
    bgGradient: "linear-gradient(145deg, #0a1a2e, #102a47, #0c2038)",
    span: "normal",
  },
];

type CaseStudy = typeof CASE_STUDIES[0];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = numericPart;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setDisplay((current % 1 === 0 ? Math.floor(current) : current.toFixed(0)) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numericPart, suffix]);

  return <span ref={ref}>{display}</span>;
}

// ─── New PortfolioCard matching the reference image style ────────────────────
function PortfolioCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  // Alternate tall cards to create staggered masonry rhythm
  const isTall = cs.span === "tall";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: cs.bgGradient,
        // Tall cards span 2 grid rows for masonry effect
        gridRow: isTall ? "span 2" : "span 1",
        minHeight: isTall ? "480px" : "320px",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
        transform: hovered ? "scale(1.018)" : "scale(1)",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.5)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Subtle image overlay — faded into the gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={cs.img}
          alt={cs.title}
          className="w-full h-full object-cover"
          style={{
            opacity: hovered ? 0.18 : 0.1,
            transition: "opacity 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-5" style={{ minHeight: "inherit" }}>
        {/* ── Top row: tags + expand button ── */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.85)",
                  border: "0.5px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Circular expand button */}
          <motion.div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              border: "0.5px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
            }}
            animate={hovered ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* ── Middle: decorative screen mockup for tall cards ── */}
        {isTall && (
          <div className="flex-1 flex items-center justify-center py-6">
            <div
              className="w-full max-w-[240px] rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                aspectRatio: "16/10",
                backdropFilter: "blur(4px)",
              }}
            >
              <img
                src={cs.img}
                alt=""
                className="w-full h-full object-cover"
                style={{ opacity: 0.7, borderRadius: "inherit" }}
              />
            </div>
          </div>
        )}

        {/* ── Bottom: client + title + description ── */}
        <div className="mt-auto">
          {/* Divider line */}
          <div
            className="mb-4"
            style={{
              height: "0.5px",
              background: "rgba(255,255,255,0.12)",
            }}
          />

          <p
            className="text-[10px] uppercase tracking-[0.18em] mb-1.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {cs.client}
          </p>

          <h3 className="text-[17px] font-bold leading-snug mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>
            {cs.title}
          </h3>

          <p className="text-[12px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            {cs.outcome}
          </p>

          {/* Metrics — animate in on hover */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.25, delay: hovered ? 0.05 : 0 }}
          >
            {cs.metrics.map((m) => (
              <span
                key={m}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  border: "0.5px solid rgba(255,255,255,0.18)",
                }}
              >
                {m}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-sub", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.9,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans text-foreground overflow-x-hidden">
        <div className="h-[72px] shrink-0" />

        <main className="flex-1" ref={containerRef}>
          {/* 1. HERO */}
          <section ref={heroRef} className="relative pt-32 pb-64 px-6 overflow-hidden min-h-[85vh] flex items-center">
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/12 rounded-full blur-[160px]"
                animate={{ y: [0, 30, 0], opacity: [0.12, 0.15, 0.12] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px]"
                animate={{ x: [0, 20, 0], opacity: [0.08, 0.12, 0.08] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[150px]"
                animate={{ x: [0, -20, 0], opacity: [0.06, 0.1, 0.06] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </div>

            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.25) 100%)" }}
            />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  animate={{ y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                />
              ))}
            </div>

            <HeroAnimatedIcons />

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto relative z-10 w-full">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-sm text-primary mb-8 tracking-[0.2em] uppercase"
              >
                Time Global · Our Work
              </motion.p>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight mb-8 overflow-hidden">
                {["We", "Build", "Software"].map((w) => (
                  <span key={w} className="inline-block mr-[0.25em] hero-word">{w}</span>
                ))}
                <br />
                {["That", "Ships."].map((w) => (
                  <span key={w} className="inline-block mr-[0.25em] hero-word text-primary italic">{w}</span>
                ))}
              </h1>

              <p className="hero-sub text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Real results from real engagements — 200+ projects delivered across finance, healthcare, retail, and logistics since 2013.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="mt-16 flex items-center gap-4"
              >
                <div className="flex items-center gap-3 rounded-full border border-neutral-500/10 bg-neutral-950/20 px-5 py-2.5 backdrop-blur-sm shadow-lg transition-colors hover:border-neutral-500/20">
                  <div className="flex h-5 w-3.5 justify-center rounded-full border border-muted-foreground/40 p-0.5">
                    <motion.div
                      animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="h-1.5 w-1 rounded-full bg-muted-foreground"
                    />
                  </div>
                  <span className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground select-none">
                    Scroll to explore
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* 2. STATS COUNTER */}
          <section className="border-y border-border/60 bg-gradient-to-r from-secondary/30 via-secondary/20 to-secondary/30 py-16 px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-0 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px]" />
              <div className="absolute top-1/2 right-0 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative mb-4">
                    <div className="absolute -inset-4 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                    <div className="relative text-4xl md:text-5xl font-black text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      <AnimatedCounter value={s.value} />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium tracking-widest uppercase group-hover:text-primary/80 transition-colors duration-300">
                    {s.label}
                  </div>
                  <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. SERVICES GRID */}
          <ServicesGrid />

          {/* 6. PORTFOLIO GRID */}
          <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-background via-background to-background/50">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]"
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.1, 0.08] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-4">Our Portfolio</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Proof, not promises.</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Real results from real engagements. See how we've transformed businesses across industries with measurable impact.
                </p>
              </motion.div>

              {/*
                ── Masonry Grid ──────────────────────────────────────────────
                Uses CSS grid-auto-rows with fixed row height so cards with
                span="tall" naturally sit taller via gridRow:"span 2".
                The grid auto-places cards and fills gaps organically.
              */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gridAutoRows: "240px",
                  gap: "20px",
                }}
                className="md:[grid-template-columns:repeat(2,1fr)] lg:[grid-template-columns:repeat(3,1fr)]"
              >
                {CASE_STUDIES.map((cs, i) => (
                  <PortfolioCard key={cs.title} cs={cs} index={i} />
                ))}
              </motion.div>
            </div>
          </section>
<ModernHero/>
        
          {/* 8. TEAM SNAPSHOT */}
          <TeamSnapshot />

          {/* 10. TESTIMONIALS */}
          <Testimonials />

          {/* 11. AWARDS & RECOGNITION */}
          <Awards />

          {/* 12. BLOG PREVIEW */}
          <BlogPreview />

          {/* 13. FAQ */}
          <FAQ />

          {/* 14. CTA / CONTACT */}
          <CollaborateCTA />
        </main>

        {/* 15. FOOTER */}
        <Footer />
      </div>
    </>
  );
}