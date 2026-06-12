
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type CaseStudy = {
  slug: string;
  tags: string[];
  title: string;
  description: string;
  accentColor: string;
  technologies: string[];
  numbers: { value: string; label: string }[];
  image: string;
};

// Real case study data from TimeGlobal projects
const studies: CaseStudy[] = [
  {
    slug: "fintech-eu-uptime",
    tags: ["Cloud & DevOps", "Cost Optimization"],
    title: "99.98% Uptime, Zero Surprise Bills",
    description: "Reduced AWS costs by 42% while cutting deploy time from 3 hours to 8 minutes. FinTech EU achieved unprecedented infrastructure reliability and cost efficiency.",
    accentColor: "from-indigo-950/95 via-zinc-900/40 to-transparent",
    technologies: ["AWS", "Kubernetes", "CI/CD", "Infrastructure-as-Code"],
    numbers: [
      { value: "42%", label: "Cost Reduction" },
      { value: "8 min", label: "Deploy Time" },
      { value: "99.98%", label: "Uptime" },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "retail-canada-migration",
    tags: ["Web Apps", "Architecture"],
    title: "From Legacy Monolith to Micro-Frontend",
    description: "Rewrote a 7-year-old PHP platform into React + Node microservice architecture with zero downtime migration. Performance tripled.",
    accentColor: "from-emerald-950/95 via-stone-900/30 to-transparent",
    technologies: ["React", "Node.js", "Microservices", "Docker"],
    numbers: [
      { value: "0 downtime", label: "Migration" },
      { value: "3x faster", label: "Load Time" },
      { value: "62% less", label: "Bug Tickets" },
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "healthcare-ksa-patient-app",
    tags: ["Mobile", "HealthTech"],
    title: "Patient App Serving 500k+ Users",
    description: "End-to-end React Native app with HL7 FHIR integration for healthcare management. Shipped in 14 weeks with 4.8 App Store rating.",
    accentColor: "from-orange-950/95 via-neutral-950/40 to-transparent",
    technologies: ["React Native", "FHIR", "GraphQL", "Firebase"],
    numbers: [
      { value: "500k+", label: "Active Users" },
      { value: "4.8/5", label: "App Store Rating" },
      { value: "14 wks", label: "Time to Ship" },
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "logistics-eu-predictive",
    tags: ["Data & AI", "ML Pipeline"],
    title: "Predictive Routing Saves $2M / Year",
    description: "Built ML pipeline for logistics optimization analyzing 3,000+ routes. 28% reduction in fuel spend and real-time ETAs.",
    accentColor: "from-indigo-950/95 via-neutral-900/30 to-transparent",
    technologies: ["Python", "TensorFlow", "Apache Spark", "PostgreSQL"],
    numbers: [
      { value: "$2M", label: "Annual Savings" },
      { value: "28%", label: "Fuel Reduction" },
      { value: "Real-time", label: "ETAs" },
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "fashion-uae-ecommerce",
    tags: ["E-Commerce", "RTL Support"],
    title: "D2C Store Hitting $1M GMV in Month 1",
    description: "Shopify Plus storefront with Arabic RTL support and localization. Launched 3 weeks before Ramadan, hitting $1M in first month.",
    accentColor: "from-pink-950/95 via-neutral-950/40 to-transparent",
    technologies: ["Shopify Plus", "Liquid", "Node.js", "Tailwind CSS"],
    numbers: [
      { value: "$1M", label: "GMV Month 1" },
      { value: "RTL + LTR", label: "Languages" },
      { value: "3 wks", label: "Delivery" },
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "edtech-australia-lms",
    tags: ["Web Apps", "EdTech Scale"],
    title: "LMS Scaling to 80k Concurrent Learners",
    description: "Video-first learning platform with adaptive quiz engine on serverless infrastructure. Handles 80k concurrent users with 2.1s p95 latency.",
    accentColor: "from-teal-950/95 via-neutral-900/40 to-transparent",
    technologies: ["Next.js", "AWS Lambda", "DynamoDB", "CloudFront"],
    numbers: [
      { value: "80k", label: "Concurrent Users" },
      { value: "2.1s", label: "p95 Latency" },
      { value: "Auto-scale", label: "Infrastructure" },
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];

function SplitText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
          <span className="inline-block">
            {word.split("").map((c, ci) => (
              <span key={ci} className="char inline-block will-change-transform">
                {c}
              </span>
            ))}
          </span>
        </span>
      ))}
    </>
  );
}

function StudyCard({ s }: { s: CaseStudy }) {
  return (
    <article className="group relative shrink-0 w-[85vw] sm:w-[55vw] lg:w-[460px] h-[580px] sm:h-[660px] lg:h-[740px] overflow-hidden bg-neutral-900 isolate border border-white/5 rounded-sm">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05] will-change-transform"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${s.accentColor} opacity-95`} />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[75%] bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Card Header Content */}
      <div className="relative z-10 flex items-start justify-between p-6 sm:p-7">
        <div className="flex flex-wrap gap-1.5 max-w-[80%]">
          {s.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono tracking-widest font-bold uppercase px-2.5 py-1 bg-black/60 border border-white/10 text-white/90 backdrop-blur-sm rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={`/portfolio/${s.slug}/`}
          className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black transition-all duration-300 transform group-hover:rotate-45"
          aria-label={`View ${s.title}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Card Body Content */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-6 sm:p-8 flex flex-col justify-end min-h-[50%]">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">{s.title}</h3>
        <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed font-light">{s.description}</p>

        {/* Applied Technologies Pill Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          {s.technologies.map((tech) => (
            <span key={tech} className="text-[10px] font-mono font-medium text-muted-foreground bg-white/5 border border-white/5 px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>

        {/* Analytics Metadata Row */}
        {s.numbers.length > 0 && (
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
            {s.numbers.map((n) => (
              <div key={n.label} className="overflow-hidden">
                <p className="text-sm sm:text-base font-mono font-bold text-white truncate">{n.value}</p>
                <p className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1 block leading-tight">{n.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function CtaCard() {
  return (
    <article className="group relative shrink-0 w-[85vw] sm:w-[65vw] lg:w-[600px] h-[580px] sm:h-[660px] lg:h-[740px] bg-secondary border border-white/5 isolate flex flex-col justify-between rounded-sm">
      <div className="p-6 sm:p-8">
        <span className="text-[9px] font-mono tracking-widest font-bold uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-neutral-500">
          Next Step
        </span>
      </div>

      <div className="p-8 sm:p-10 md:p-14">
        <a
          href="/portfolio/"
          className="inline-flex items-center gap-4 group/link text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight hover:text-neutral-300 transition-colors duration-300"
        >
          <span>See all projects</span>
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 group-hover/link:bg-white group-hover/link:text-black transition-all duration-300">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </div>
        </a>
        <p className="text-sm text-neutral-500 max-w-sm font-light leading-relaxed mt-4">
          Explore our full production pipeline of digital designs built for elite industries globally.
        </p>
      </div>
    </article>
  );
}

export function CaseStudySlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep animations isolated to the scoped element ref instance
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.querySelectorAll(".char"), {
          yPercent: 110,
          opacity: 0,
          duration: 0.75,
          ease: "power4.out",
          stagger: 0.018,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const track = trackRef.current;
      const section = sectionRef.current;
      
      // Strict Media Query execution check ensuring horizontal pinning only triggers on wide screens
      if (track && section && window.matchMedia("(min-width: 1024px)").matches) {
        const getDistance = () => track.scrollWidth - window.innerWidth;
        
        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background dark:bg-secondary text-white w-full py-12 md:py-20 lg:py-0">
      <div className="min-h-screen lg:h-screen lg:min-h-[900px] flex flex-col justify-center">

        {/* Header Title Grid */}
        <div className="w-full px-6 sm:px-10 lg:px-20 mb-12 lg:mb-14 shrink-0">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 items-end">
            <h2
              ref={headingRef}
              className="text-[clamp(2.4rem,5.5vw,4rem)] font-bold tracking-tight leading-[1.08]"
            >
              <span className="block">
                <SplitText text="Featured" />
              </span>
              <span className="block text-neutral-600">
                <SplitText text="Projects" />
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-md leading-relaxed font-light pb-1">
     We create premium digital experiences,
interactive websites, creative portfolios,
and business solutions that combine
modern design with cutting-edge technology.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Layout Container */}
        <div className="overflow-hidden w-full shrink-0">
          <div
            ref={trackRef}
            className="flex gap-4 pl-6 sm:pl-10 lg:pl-[18vw] will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {studies.map((s) => (
              <StudyCard key={s.slug} s={s} />
            ))}
            <CtaCard />
          </div>
        </div>

      </div>
    </section>
  );
}