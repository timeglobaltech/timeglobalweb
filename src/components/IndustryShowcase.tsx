import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shape3D } from "./Shape3D";
import { TECH_ICONS, COUNTRIES } from "./TechStack";
import { Cpu, Globe, Layout, Mail, MessageSquare, Play, Database } from "lucide-react";
import { SiAnthropic, SiGoogle } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AI_NEWS = [
  {
    text: "Anthropic: in US valuation nears $1tn",
    url: "https://www.investopedia.com/anthropic-s-valuation-jumped-to-nearly-usd1-trillion-here-s-what-that-means-for-the-ipo-market-11986653",
    icon: SiAnthropic,
    color: "text-[#D97757]"
  },
  {
    text: "Microsoft: unveiled seven in-house AI models claims to beat Claude & Google's Nano Banana",
    url: "https://www.cnbc.com/2026/06/02/microsoft-unveils-new-ai-models-lessen-reliance-on-openai-lower-costs.html",
    icon: FaMicrosoft,
    color: "text-[#00A4EF]"
  },
  {
    text: "Anthropic: Announcements Expanding Project Glasswing",
    url: "https://www.anthropic.com/news/expanding-project-glasswing",
    icon: SiAnthropic,
    color: "text-[#D97757]"
  },
  {
    text: "Google: Introducing Gemma 4 12B a unified, encoder-free multimodal model",
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemma-4-12b/",
    icon: SiGoogle,
    color: "text-[#4285F4]"
  }
];

// ── Shared CSS for all marquees — GPU-only, zero JS per frame ──────────────
const MARQUEE_STYLES = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marquee-reverse {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  .marquee-track {
    display: flex;
    white-space: nowrap;
    will-change: transform;
    animation: marquee var(--mspd) linear infinite;
  }
  .marquee-track-reverse {
    display: flex;
    white-space: nowrap;
    will-change: transform;
    animation: marquee-reverse var(--mspd) linear infinite;
  }
  .marquee-track:hover, .marquee-track-reverse:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    .marquee-track, .marquee-track-reverse {
      animation-duration: calc(var(--mspd) * 0.6);
    }
  }
`;

// ── AI News announcement bar ───────────────────────────────────────────────
function AINewsTicker() {
  return (
    <div className="relative flex overflow-hidden py-3 sm:py-5 border-y border-white/5 bg-secondary/30 dark:bg-white/[0.02] w-full">
      <div
        className="marquee-track gap-8 sm:gap-16"
        style={{ "--mspd": "80s" } as React.CSSProperties}
      >
        {[...AI_NEWS, ...AI_NEWS].map((news, idx) => (
          <div key={idx} className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4">
            <span className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="relative flex h-1.5 w-1.5 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 bg-primary"></span>
              </span>
              <span className="text-primary text-[8px] sm:text-[10px] uppercase font-bold tracking-widest">Live</span>
            </span>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-base hover:text-primary flex items-center gap-2 sm:gap-3 transition-all duration-300 group font-mono font-bold text-muted-foreground uppercase tracking-[0.08em] sm:tracking-[0.1em]"
            >
              <news.icon className={`${news.color} text-base sm:text-xl group-hover:scale-110 transition-transform`} />
              <span className="underline decoration-primary/20 underline-offset-2 sm:underline-offset-4 group-hover:decoration-primary/50 line-clamp-1">
                {news.text}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Flag component with error handling and fallback ─────────────────────────
function FlagImage({ flagCode, name, className = "", size = "md" }: { flagCode: string; name: string; className?: string; size?: "sm" | "md" | "lg" }) {
  const [imgError, setImgError] = useState(false);
  
  const sizeMap = {
    sm: { width: 22, height: 16, textSize: "text-base" },
    md: { width: 32, height: 24, textSize: "text-2xl" },
    lg: { width: 40, height: 30, textSize: "text-3xl" }
  };
  
  const { width, height, textSize } = sizeMap[size];
  
  // Robust fallback mapping
  const fallbackFlags: Record<string, string> = {
    us: "🇺🇸", gb: "🇬🇧", jp: "🇯🇵", de: "🇩🇪", ca: "🇨🇦", au: "🇦🇺",
    ae: "🇦🇪", sa: "🇸🇦", sg: "🇸🇬", fr: "🇫🇷", nl: "🇳🇱", hk: "🇭🇰",
    kr: "🇰🇷", br: "🇧🇷", my: "🇲🇾", qa: "🇶🇦", in: "🇮🇳", pk: "🇵🇰",
    it: "🇮🇹", es: "🇪🇸", cn: "🇨🇳", ru: "🇷🇺", tr: "🇹🇷"
  };

  if (imgError) {
    return (
      <span className={`${textSize} leading-none select-none ${className}`} title={name}>
        {fallbackFlags[flagCode.toLowerCase()] || "🏳️"}
      </span>
    );
  }
  
  return (
    <img
      src={`https://flagcdn.com/w${width*2}/${flagCode.toLowerCase()}.png`}
      alt={name}
      width={width}
      height={height}
      className={`rounded-sm object-cover shrink-0 ${className}`}
      loading="lazy"
      onError={() => setImgError(true)}
    />
  );
}

// ── Generic tech / country ticker ─────────────────────────────────────────
function Ticker({ items, speed = 45, reverse = false }: { items: any[]; speed?: number; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden py-3 sm:py-5 border-y border-white/5 bg-secondary/30 dark:bg-white/[0.02] w-full">
      <div
        className={reverse ? "marquee-track-reverse gap-8 sm:gap-14" : "marquee-track gap-8 sm:gap-14"}
        style={{ "--mspd": `${speed}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4">
            {item.icon ? (
              <item.icon size={18} sm:size={22} style={{ color: item.color }} className="opacity-80 shrink-0" />
            ) : (
              <FlagImage flagCode={item.flag} name={item.name} size="sm" />
            )}
            <span className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-[0.12em] sm:tracking-[0.18em] font-bold truncate max-w-[120px] sm:max-w-none">
              {item.label || item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowMockup() {
  return (
    <div className="bg-[#0f0f17] rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 overflow-hidden relative z-10 w-full aspect-video flex flex-col font-mono text-[8px] sm:text-[10px]">
      <div className="flex items-center justify-between mb-4 sm:mb-8 border-b border-white/5 pb-3 sm:pb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Play size={14} fill="currentColor" />
          </div>
          <div className="text-white/80 font-bold text-xs sm:text-sm">AI Customer Onboarding</div>
        </div>
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/50"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400/50"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400/50"></div>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none hidden sm:block">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M50 100 L150 50 M50 100 L150 150 M150 50 L250 100 M150 150 L250 100 M250 100 L350 100" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-x-8 sm:gap-x-20 gap-y-6 sm:gap-y-12 relative z-10">
          <div className="col-start-1 row-start-1 flex flex-col items-center gap-1 sm:gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail size={16} />
            </div>
            <div className="text-blue-300 text-[8px] sm:text-xs">Email</div>
          </div>
          <div className="col-start-2 row-start-1 flex flex-col items-center gap-1 sm:gap-2 translate-y-[-10px] sm:translate-y-[-20px]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu size={16} />
            </div>
            <div className="text-purple-300 text-[8px] sm:text-xs">Extract</div>
          </div>
          <div className="col-start-2 row-start-2 flex flex-col items-center gap-1 sm:gap-2 translate-y-[10px] sm:translate-y-[20px]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare size={16} />
            </div>
            <div className="text-emerald-300 text-[8px] sm:text-xs">Analyze</div>
          </div>
          <div className="col-start-3 row-start-1 flex flex-col items-center gap-1 sm:gap-2 translate-y-[15px] sm:translate-y-[30px]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Database size={16} />
            </div>
            <div className="text-orange-300 text-[8px] sm:text-xs">Sync</div>
          </div>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5 flex justify-between text-white/30 italic text-[7px] sm:text-[10px]">
        <span>Workflow active</span>
        <span>Executions: 14,209</span>
      </div>
    </div>
  );
}

export default function IndustryShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.showcase-row').forEach((row: any) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aiTools  = TECH_ICONS.slice(34, 46);
  const webTools = TECH_ICONS.slice(0, 34);
  const SECTION_GAP = 64;

  return (
    <section ref={sectionRef} className="pb-16 sm:pb-32 bg-card overflow-hidden" id="industries">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_STYLES }} />

      <div className="flex flex-col" style={{ gap: SECTION_GAP }}>

        {/* ── 1. AI & Automation ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-0">
          <AINewsTicker />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-12 sm:pt-24 pb-0">
            <div className="showcase-row grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 sm:mb-6">
                  <Cpu size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">AI & Automation</h2>
                <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Automate complex business processes with custom AI workflows. We integrate state-of-the-art LLMs and agentic frameworks to build self-correcting automation engines that save thousands of man-hours.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {["n8n Experts", "LLM Fine-tuning", "Autonomous Agents", "Workflow Orchestration"].map(tag => (
                    <span key={tag} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors text-base sm:text-lg group">
                  automate your business
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              <div className="relative">
                <div className="absolute -right-6 sm:-right-12 -top-6 sm:-top-12 opacity-50 hidden sm:block">
                  <Shape3D type="half-round" className="w-32 h-16 sm:w-48 sm:h-24" />
                </div>
                <WorkflowMockup />
                <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm font-mono text-muted-foreground">
                  Autonomous Workflow Engine — powered by n8n & OpenAI
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-24">
            <Ticker items={aiTools} speed={60} reverse={true} />
          </div>
        </div>

        {/* ── 2. Web & Software Engineering ──────────────────────────────── */}
        <div className="flex flex-col gap-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-12 sm:pt-24 pb-0">
            <div className="showcase-row grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -left-6 sm:-left-12 -top-6 sm:-top-12 opacity-50 hidden sm:block">
                  <Shape3D type="cube" className="w-24 h-24 sm:w-32 sm:h-32" />
                </div>

                <div className="bg-[#0f0f17] rounded-2xl border border-white/10 shadow-2xl p-3 sm:p-4 overflow-hidden relative z-10 w-full max-w-xs sm:max-w-md mx-auto aspect-[9/16] flex flex-col">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-3 mb-3 sm:mb-4">
                    <div className="font-bold text-white/80 text-xs sm:text-sm">Dashboard</div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400/50"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400/50"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400/50"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                    <div className="h-16 sm:h-24 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/10 border border-white/5"></div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="h-14 sm:h-20 rounded-xl bg-white/[0.03] border border-white/5"></div>
                      <div className="h-14 sm:h-20 rounded-xl bg-white/[0.03] border border-white/5"></div>
                    </div>
                    <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 p-2 sm:p-3">
                      <div className="h-2 sm:h-3 w-1/2 bg-white/10 rounded mb-2 sm:mb-3"></div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded"></div>
                        <div className="h-1.5 sm:h-2 w-4/5 bg-white/5 rounded"></div>
                        <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm font-mono text-muted-foreground">
                  Enterprise SaaS — React & Node.js
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 sm:mb-6">
                  <Layout size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Web & Software Engineering</h2>
                <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Scalable, high-performance software built for the future. We deliver full-stack solutions with technical precision, from pixel-perfect interfaces to robust backend architectures.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {["SaaS Platforms", "Mobile Apps", "Cloud-Native", "Microservices"].map(tag => (
                    <span key={tag} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="/work" className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors text-base sm:text-lg group">
                  explore our work
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-24">
            <Ticker items={webTools} speed={60} reverse={false} />
          </div>
        </div>

        {/* ── 3. Global Delivery Network ─────────────────────────────────── */}
        <div className="flex flex-col gap-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-12 sm:pt-24 pb-0">
            <div className="showcase-row grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 sm:mb-6">
                  <Globe size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Global Delivery Network</h2>
                <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Serving clients across 15+ countries with a distributed team of 80+ experts. We understand global markets and deliver solutions that resonate with users worldwide, from Silicon Valley to Saudi Arabia.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">98%</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase">Client Retention</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">24/7</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase">Global Support</div>
                  </div>
                </div>
                <a href="/work" className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors text-base sm:text-lg group">
                  our global reach
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              <div className="relative">
                <div className="absolute -right-6 sm:-right-12 -bottom-6 sm:-bottom-12 opacity-50 hidden sm:block">
                  <Shape3D type="torus" className="w-24 h-24 sm:w-32 sm:h-32" />
                </div>

                <div className="bg-[#0f0f17] rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-8 overflow-hidden relative z-10 w-full aspect-video flex flex-col items-center justify-center">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8 w-full opacity-60">
                    {COUNTRIES.slice(0, 12).map((c, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 sm:gap-2">
                        <FlagImage flagCode={c.flag} name={c.name} size="md" className="grayscale hover:grayscale-0 transition-all cursor-default" />
                        <span className="text-[6px] sm:text-[8px] font-mono text-white/40 truncate max-w-[30px] sm:max-w-none">
                          {c.name.slice(0, 4)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f17] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 sm:bottom-8 text-white/80 font-bold text-base sm:text-xl tracking-tight">
                    Trusted Globally
                  </div>
                </div>
                <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm font-mono text-muted-foreground">
                  Regional Distribution — high client satisfaction worldwide
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-24">
            <Ticker items={COUNTRIES} speed={60} reverse={true} />
          </div>
        </div>

      </div>
    </section>
  );
}