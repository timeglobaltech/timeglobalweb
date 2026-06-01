import { useState } from "react";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiPhp, SiLaravel,
  SiDjango, SiPython, SiTypescript, SiJavascript, SiGo,
  SiSwift, SiKotlin, SiFlutter, SiVuedotjs, SiAngular,
  SiExpress, SiNestjs, SiSpring, SiRubyonrails, SiRust,
  SiDocker, SiKubernetes, SiGooglecloud,
  SiTerraform, SiGithub, SiPostgresql, SiMongodb, SiRedis,
  SiTailwindcss, SiBootstrap, SiSvelte, SiFirebase, SiVercel,
  SiAnthropic, SiHuggingface, SiOpenai, SiGooglegemini,
  SiGithubcopilot, SiStackblitz, SiMake, SiClaude,
  SiPerplexity, SiOllama, SiReplicate, SiLangchain,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { motion } from "framer-motion";

type IconEntry = {
  kind: "icon";
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  label: string;
  color: string;
};

type TextEntry = {
  kind: "text";
  label: string;
  color: string;
  bg: string;
};

type TechEntry = IconEntry | TextEntry;

// Row 1 — Languages, frameworks, infra (no AI tools here)
const LANG_ICONS: TechEntry[] = [
  { kind: "icon", icon: SiJavascript,  label: "JavaScript",  color: "#F7DF1E" },
  { kind: "icon", icon: SiTypescript,  label: "TypeScript",  color: "#3178C6" },
  { kind: "icon", icon: SiPython,      label: "Python",      color: "#3776AB" },
  { kind: "icon", icon: SiGo,          label: "Go",          color: "#00ADD8" },
  { kind: "icon", icon: SiRust,        label: "Rust",        color: "#DEA584" },
  { kind: "icon", icon: SiSwift,       label: "Swift",       color: "#FA7343" },
  { kind: "icon", icon: SiKotlin,      label: "Kotlin",      color: "#7F52FF" },
  { kind: "icon", icon: SiPhp,         label: "PHP",         color: "#777BB4" },
  { kind: "icon", icon: SiReact,       label: "React",       color: "#61DAFB" },
  { kind: "icon", icon: SiNextdotjs,   label: "Next.js",     color: "#ffffff" },
  { kind: "icon", icon: SiNodedotjs,   label: "Node.js",     color: "#339933" },
  { kind: "icon", icon: SiExpress,     label: "Express",     color: "#ffffff" },
  { kind: "icon", icon: SiNestjs,      label: "NestJS",      color: "#E0234E" },
  { kind: "icon", icon: SiLaravel,     label: "Laravel",     color: "#FF2D20" },
  { kind: "icon", icon: SiDjango,      label: "Django",      color: "#44B78B" },
  { kind: "icon", icon: SiSpring,      label: "Spring",      color: "#6DB33F" },
  { kind: "icon", icon: SiVuedotjs,    label: "Vue.js",      color: "#4FC08D" },
  { kind: "icon", icon: SiAngular,     label: "Angular",     color: "#DD0031" },
  { kind: "icon", icon: SiSvelte,      label: "Svelte",      color: "#FF3E00" },
  { kind: "icon", icon: SiFlutter,     label: "Flutter",     color: "#02569B" },
  { kind: "icon", icon: SiRubyonrails, label: "Rails",       color: "#CC0000" },
  { kind: "icon", icon: SiTailwindcss, label: "Tailwind",    color: "#06B6D4" },
  { kind: "icon", icon: SiBootstrap,   label: "Bootstrap",   color: "#7952B3" },
  { kind: "icon", icon: SiDocker,      label: "Docker",      color: "#2496ED" },
  { kind: "icon", icon: SiKubernetes,  label: "Kubernetes",  color: "#326CE5" },
  { kind: "icon", icon: FaAws,         label: "AWS",         color: "#FF9900" },
  { kind: "icon", icon: SiGooglecloud, label: "GCP",         color: "#4285F4" },
  { kind: "icon", icon: SiTerraform,   label: "Terraform",   color: "#7B42BC" },
  { kind: "icon", icon: SiPostgresql,  label: "PostgreSQL",  color: "#336791" },
  { kind: "icon", icon: SiMongodb,     label: "MongoDB",     color: "#47A248" },
  { kind: "icon", icon: SiRedis,       label: "Redis",       color: "#DC382D" },
  { kind: "icon", icon: SiFirebase,    label: "Firebase",    color: "#FFCA28" },
  { kind: "icon", icon: SiVercel,      label: "Vercel",      color: "#ffffff" },
  { kind: "icon", icon: SiGithub,      label: "GitHub",      color: "#ffffff" },
];

// Row 2 — AI Tools (icon + text-badge mix, 20 total)
const AI_TOOLS: TechEntry[] = [
  { kind: "icon", icon: SiOpenai,       label: "OpenAI",         color: "#00A67E" },
  { kind: "icon", icon: SiClaude,       label: "Claude",         color: "#CC785C" },
  { kind: "icon", icon: SiAnthropic,    label: "Anthropic",      color: "#D4A27F" },
  { kind: "icon", icon: SiGooglegemini, label: "Gemini",         color: "#4285F4" },
  { kind: "icon", icon: SiGithubcopilot,label: "Copilot",        color: "#9B6EFF" },
  { kind: "icon", icon: SiHuggingface,  label: "Hugging Face",   color: "#FFD21E" },
  { kind: "icon", icon: SiStackblitz,   label: "Bolt",           color: "#1389FD" },
  { kind: "icon", icon: SiPerplexity,   label: "Perplexity",     color: "#20B2AA" },
  { kind: "icon", icon: SiOllama,       label: "Ollama",         color: "#ffffff" },
  { kind: "icon", icon: SiReplicate,    label: "Replicate",      color: "#ffffff" },
  { kind: "icon", icon: SiLangchain,    label: "LangChain",      color: "#1C3C3C" },
  { kind: "icon", icon: SiMake,         label: "Make",           color: "#6D00CC" },
  // Text badges for tools without react-icons entries
  { kind: "text", label: "Lovable",         color: "#FF6B9D", bg: "rgba(255,107,157,0.12)" },
  { kind: "text", label: "Mistral AI",      color: "#F96854", bg: "rgba(249,104,84,0.12)"  },
  { kind: "text", label: "Cursor",          color: "#9B8FFF", bg: "rgba(155,143,255,0.12)" },
  { kind: "text", label: "Midjourney",      color: "#FFFFFF", bg: "rgba(255,255,255,0.08)" },
  { kind: "text", label: "Pinecone",        color: "#00C4A7", bg: "rgba(0,196,167,0.12)"   },
  { kind: "text", label: "Cohere",          color: "#3B82F6", bg: "rgba(59,130,246,0.12)"  },
  { kind: "text", label: "Stable Diff.",    color: "#C084FC", bg: "rgba(192,132,252,0.12)" },
  { kind: "text", label: "Runway",          color: "#22D3EE", bg: "rgba(34,211,238,0.12)"  },
];

// Duplicate for infinite loop
const LANG_DOUBLED = [...LANG_ICONS, ...LANG_ICONS];
const AI_DOUBLED   = [...AI_TOOLS,   ...AI_TOOLS];

function TechIcon({ entry }: { entry: TechEntry }) {
  if (entry.kind === "icon") {
    const Icon = entry.icon;
    return (
      <div className="flex flex-col items-center justify-center gap-2 px-6 py-4 group cursor-default shrink-0 w-[90px]">
        <div className="w-11 h-11 flex items-center justify-center transition-transform duration-200 group-hover:scale-125">
          <Icon size={36} style={{ color: entry.color }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-mono tracking-wide truncate w-full text-center">
          {entry.label}
        </span>
      </div>
    );
  }

  // Text badge for tools without official icons
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-5 py-4 group cursor-default shrink-0">
      <div
        className="h-11 px-4 flex items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110"
        style={{ background: entry.bg, border: `1px solid ${entry.color}30` }}
      >
        <span
          className="text-xs font-bold font-mono whitespace-nowrap transition-opacity opacity-70 group-hover:opacity-100"
          style={{ color: entry.color }}
        >
          {entry.label}
        </span>
      </div>
      <span className="text-[10px] text-white/0 font-mono">·</span>
    </div>
  );
}

function Marquee({
  items,
  speed = 35,
  reverse = false,
}: {
  items: TechEntry[];
  speed?: number;
  reverse?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const duration = (items.length / 2) * (90 / speed);

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          animation: `${reverse ? "marquee-rev" : "marquee-fwd"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((entry, i) => (
          <TechIcon key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
}

const COUNTRIES = [
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇷🇺", name: "Russia" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇩🇿", name: "Algeria" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇵🇰", name: "Pakistan" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇺🇬", name: "Uganda" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇫🇷", name: "France" },
];

export default function TechStack() {
  return (
    <section className="bg-[#0D0D18] py-16 overflow-hidden" id="tech-stack">
      <style>{`
        @keyframes marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-5 border border-primary/20">
          {"<tech stack>"}
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Technologies We Master
            </h2>
            <p className="text-white/50 mt-3 text-base max-w-xl">
              From modern languages to cutting-edge AI tools — we work with the tech that powers the future.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-4xl md:text-5xl font-bold text-primary font-display">54+</span>
            <p className="text-white/40 text-sm font-medium">technologies & tools</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="h-px bg-white/10 w-full" />
      </div>

      {/* Row 1 — Languages & Frameworks */}
      <div className="mb-1">
        <div className="max-w-7xl mx-auto px-6 mb-2">
          <span className="text-[11px] font-mono text-white/25 uppercase tracking-widest">
            Languages · Frameworks · Infrastructure
          </span>
        </div>
        <Marquee items={LANG_DOUBLED} speed={30} />
      </div>

      {/* Thin separator */}
      <div className="max-w-7xl mx-auto px-6 my-4">
        <div className="h-px bg-white/6 w-full" />
      </div>

      {/* Row 2 — AI Tools */}
      <div className="mb-2">
        <div className="max-w-7xl mx-auto px-6 mb-2">
          <span className="text-[11px] font-mono text-primary/60 uppercase tracking-widest">
            AI Tools · LLMs · Automation
          </span>
        </div>
        <Marquee items={AI_DOUBLED} speed={22} reverse />
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 mt-10 mb-10">
        <div className="h-px bg-white/10 w-full" />
      </div>

      {/* Countries */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="shrink-0">
            <span className="text-4xl md:text-5xl font-bold text-white font-display">16+</span>
            <p className="text-white font-bold text-lg tracking-widest uppercase mt-1">
              Countries Served
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10 shrink-0" />
          <div className="flex flex-wrap gap-3">
            {COUNTRIES.map((country) => (
              <motion.div
                key={country.name}
                whileHover={{ scale: 1.2, y: -4 }}
                title={country.name}
                className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center text-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-200 cursor-default select-none shadow-md"
              >
                {country.flag}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
