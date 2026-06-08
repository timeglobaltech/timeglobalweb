
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

// Data strictly updated to match the visual architecture of your uploaded reference screens
const studies: CaseStudy[] = [
  {
    slug: "parallel-universe",
    tags: ["Experimental UI", "Cinematic Web"],
    title: "Parallel Universe",
    description: "A dark, atmospheric digital storytelling experience exploring parallel realities through bold extended typography, celestial portals, and deep horizon-based dark styling.",
    accentColor: "from-slate-950/95 via-zinc-900/40 to-transparent",
    technologies: ["React", "GSAP ScrollTrigger", "Three.js", "Tailwind CSS"],
    numbers: [
      { value: "60 FPS", label: "Render Engine" },
      { value: "Cinematic", label: "Atmosphere" },
      { value: "Portal", label: "Transitions" },
    ],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80", 
  },
  {
    slug: "my-art-gallery",
    tags: ["3D ArchViz", "WebGL Space"],
    title: "My Art Gallery",
    description: "An architectural, browser-based 3D floating villa rendering photorealistic structural views and open-deck walkways over clear ocean environments.",
    accentColor: "from-neutral-900/95 via-stone-900/30 to-transparent",
    technologies: ["React Three Fiber", "Three.js", "Blender Baking", "WebXR"],
    numbers: [
      { value: "Baked", label: "Global Illumination" },
      { value: "100%", label: "Interactive Canvas" },
      { value: "Spatial", label: "Navigation" },
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", 
  },
  {
    slug: "madebycat-studios",
    tags: ["Digital Studio", "Motion Production"],
    title: "MadeByCat Studios",
    description: "A high-contrast, edge-lit experience pairing high-energy neon orange soundwave art with stylized typographic layouts that cut through deep tones.",
    accentColor: "from-orange-950/95 via-neutral-950/40 to-transparent",
    technologies: ["Next.js", "Framer Motion", "HTML5 Canvas", "PostCSS"],
    numbers: [
      { value: "19", label: "Global Design Awards" },
      { value: "600+", label: "Completed Projects" },
      { value: "120+", label: "Studio Laurels" },
    ],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", 
  },
  {
    slug: "the-aurora-way",
    tags: ["Platform Infrastructure", "EdTech UI"],
    title: "The Aurora Way",
    description: "A specialized platform interface mixing dark backgrounds, fluid custom aurora gradients, and approachable typography tailored for supportive youth environments.",
    accentColor: "from-emerald-950/95 via-neutral-900/40 to-transparent",
    technologies: ["React", "Tailwind CSS", "Lottie Framework", "Node.js"],
    numbers: [
      { value: "AA", label: "WCAG Compliant" },
      { value: "Micro-UX", label: "Interaction Rate" },
      { value: "Fluid", label: "Grid Layouts" },
    ],
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", 
  },
  {
    slug: "la-crapule-studio",
    tags: ["Luxury Commerce", "High-Fidelity 3D"],
    title: "La Crapule Studio",
    description: "An ultra-premium mechanical presentation for Audemars Piguet, framing extreme macro views of watch geometry with raw metal finishes and minimal layout cards.",
    accentColor: "from-neutral-950/95 via-zinc-900/30 to-transparent",
    technologies: ["Vue.js", "WebGL Shaders", "GSAP CustomEase", "Vanilla CSS"],
    numbers: [
      { value: "Lossless", label: "Texture Maps" },
      { value: "Mechanical", label: "Scroll Links" },
      { value: "Premium", label: "Minimal Layout" },
    ],
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80", 
  },
  {
    slug: "haptikos",
    tags: ["Hardware Tracking", "Cybernetic Web"],
    title: "Haptikos Controller",
    description: "A stark, low-latency monochrome showcase highlighting robotic physical interfaces using sharp bright-green telemetry text indicators.",
    accentColor: "from-zinc-950/95 via-neutral-900/40 to-transparent",
    technologies: ["Next.js", "WebHID API", "GSAP ScrollTrigger", "Tailwind CSS"],
    numbers: [
      { value: "Low Latency", label: "Data Hydration" },
      { value: "Stark", label: "Monochrome Vibe" },
      { value: "Hardware", label: "API Integrations" },
    ],
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80", 
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
            <span key={tech} className="text-[10px] font-mono font-medium text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
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
    <article className="group relative shrink-0 w-[85vw] sm:w-[65vw] lg:w-[600px] h-[580px] sm:h-[660px] lg:h-[740px] bg-[#0a0a0c] border border-white/5 isolate flex flex-col justify-between rounded-sm">
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
    <section ref={sectionRef} className="relative bg-[#050507] text-white w-full py-12 md:py-20 lg:py-0">
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

            <p className="text-xl text-neutral-400 max-w-md leading-relaxed font-light pb-1">
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