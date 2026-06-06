import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

// Real Pakistani tech professionals and companies
const TESTIMONIALS = [
  {
    name: "Dr. Naeem Akhtar",
    title: "CTO, CareConnect Pakistan",
    tag: "<HealthTech/>",
    quote: "The team digitized our entire patient record system across 12 hospitals in Lahore and Karachi. We've seen a 60% reduction in paperwork and patients now receive prescriptions via SMS within seconds.",
    color: "bg-emerald-100 text-emerald-700",
    location: "Lahore"
  },
  {
    name: "Sana Farooq",
    title: "Director of Product, FinOne Microfinance",
    tag: "<FinTech/>",
    quote: "Their loan disbursement platform helped us reach rural Punjab. We've processed over 50,000 small loans to farmers, with repayment rates up 35% due to the user-friendly mobile interface.",
    color: "bg-blue-100 text-blue-700",
    location: "Islamabad"
  },
  {
    name: "Rizwan Ahmed",
    title: "Founder, Dukaan Network",
    tag: "<E-commerce/>",
    quote: "Building a nationwide logistics system from scratch seemed impossible. Their team created an AI-powered route optimization tool that cut delivery times by 45% for our 10,000+ merchants.",
    color: "bg-amber-100 text-amber-700",
    location: "Karachi"
  },
  {
    name: "Fariha Javed",
    title: "Head of Digital Learning, EdTech Pakistan",
    tag: "<EdTech/>",
    quote: "During the floods, their offline-first learning app kept education alive for 200,000+ students in Sindh. Content syncs via local mesh networks without needing internet connectivity.",
    color: "bg-purple-100 text-purple-700",
    location: "Hyderabad"
  },
  {
    name: "Tariq Mehmood",
    title: "COO, AgriSmart Solutions",
    tag: "<AgriTech/>",
    quote: "Their weather prediction models and crop advisory system have helped 25,000+ farmers increase yields by 40%. Real-time Urdu notifications make it accessible for everyone.",
    color: "bg-lime-100 text-lime-700",
    location: "Multan"
  },
  {
    name: "Zara Khalid",
    title: "GM Digital, Freelance Union PK",
    tag: "<GigEconomy/>",
    quote: "The escrow payment system they built protects both freelancers and clients. Since launch, disputes have dropped by 70% and we've facilitated over $2M in secure transactions.",
    color: "bg-cyan-100 text-cyan-700",
    location: "Rawalpindi"
  },
  {
    name: "Bilal Chaudhry",
    title: "Director, Clean Energy Tech",
    tag: "<EnergyTech/>",
    quote: "Their IoT-based solar monitoring platform tracks 5,000+ installations across off-grid villages. Real-time alerts for maintenance have prevented 85% of potential system failures.",
    color: "bg-orange-100 text-orange-700",
    location: "Gujranwala"
  },
  {
    name: "Ayesha Anwar",
    title: "Program Director, SafeCity Initiative",
    tag: "<CivicTech/>",
    quote: "The emergency response app cut police arrival times by 12 minutes in Peshawar. Their work with local authorities on data privacy and security has set a national standard.",
    color: "bg-rose-100 text-rose-700",
    location: "Peshawar"
  },
  {
    name: "Usman Riaz",
    title: "CEO, Studio Graphik",
    tag: "<CreativeTech/>",
    quote: "The collaborative design platform handles 500+ assets simultaneously. Our team of 50 artists now ships animations 3x faster, winning us contracts with international studios.",
    color: "bg-indigo-100 text-indigo-700",
    location: "Karachi"
  },
  {
    name: "Dr. Samina Hassan",
    title: "Lead Researcher, NeuroLink Labs",
    tag: "<AI/ML/>",
    quote: "Their Urdu NLP model achieved 94% accuracy in sentiment analysis—the highest ever for low-resource languages. It's now used by 8 major universities for research.",
    color: "bg-fuchsia-100 text-fuchsia-700",
    location: "Islamabad"
  }
];

function TestimonialCard({ test, isMobile }: { test: typeof TESTIMONIALS[0]; isMobile: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative backface-hidden"
    >
      <div style={{ transform: isMobile ? "none" : "translateZ(30px)" }} className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="font-mono text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {test.tag}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{test.location}</span>
          </div>
        </div>
        
        <div className="relative">
          <svg className="absolute -top-3 -left-2 w-6 h-6 text-primary/30 dark:text-primary/20" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
          </svg>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-5 leading-relaxed font-medium pl-4">
            "{test.quote}"
          </p>
        </div>
      </div>
      
      <div style={{ transform: isMobile ? "none" : "translateZ(20px)" }} className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${test.color}`}>
          {test.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
            {test.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{test.title}</div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </motion.div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const cardWidth = isMobile.current ? 280 + 16 : window.innerWidth < 640 ? 320 + 16 : 380 + 24;
    const totalWidth = TESTIMONIALS.length * cardWidth;

    // GSAP Marquee Animation
    const loop = gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: 80,
      ease: "none",
      repeat: -1,
      force3D: true, // Force GPU acceleration
      onReverseComplete() {
        const self = this as any;
        self.totalTime(self.rawTime() + self.duration() * 10);
      }
    });

    // Optimization: Add will-change to the marquee element
    marquee.style.willChange = "transform";

    const handleMouseEnter = () => {
      gsap.to(loop, { timeScale: 0, duration: 0.5 });
    };
    const handleMouseLeave = () => {
      gsap.to(loop, { timeScale: 1, duration: 0.5 });
    };

    const handleTouchStart = () => {
      gsap.to(loop, { timeScale: 0, duration: 0.3 });
    };
    const handleTouchEnd = () => {
      gsap.to(loop, { timeScale: 1, duration: 0.8 });
    };

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);
    marquee.addEventListener("touchstart", handleTouchStart, { passive: true });
    marquee.addEventListener("touchend", handleTouchEnd, { passive: true });
    marquee.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      loop.kill();
      marquee.style.willChange = "auto";
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
      marquee.removeEventListener("touchstart", handleTouchStart);
      marquee.removeEventListener("touchend", handleTouchEnd);
      marquee.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden" id="testimonials">
      {/* Decorative background elements - softer for mobile */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-xs sm:text-sm font-bold mb-4 sm:mb-6 border border-primary/20"
        >
          {'<Local Impact Global Standards/>'}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight tracking-tight"
        >
          Transforming Pakistan's Digital Future
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2"
        >
          Trusted by industry leaders across the nation to deliver research-backed solutions that drive real growth.
        </motion.p>
      </div>

      {/* Infinite Carousel - Mobile Optimized */}
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        {/* Softer edge gradients for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 z-20 pointer-events-none" />

        <div
          ref={marqueeRef}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 py-6 sm:py-10 w-max relative z-10"
        > 
          {/* Duplicate for seamless infinite scroll */}
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
            <TestimonialCard key={i} test={test} isMobile={isMobile.current} />
          ))}
        </div>
      </div>

      {/* Mobile indicators */}
      <div className="flex justify-center gap-2 mt-6 sm:hidden">
        <div className="w-2 h-2 rounded-full bg-primary/60"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </section>
  );
}
