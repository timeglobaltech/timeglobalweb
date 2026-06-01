import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shape3D } from "./Shape3D";
import { useContactModal } from "@/hooks/use-contact-modal";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    tag: "<EduTrack/>",
    desc: "A next-gen learning management system for universities and online academies.",
    color: "from-blue-500/20 to-purple-500/20",
    border: "border-blue-500/30"
  },
  {
    tag: "<PayFlow/>",
    desc: "A FinTech payment processing platform built for high-volume B2B transactions.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30"
  },
  {
    tag: "<MediSync/>",
    desc: "Multi-tenant telemedicine SaaS connecting patients and doctors across clinics.",
    color: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-500/30"
  },
  {
    tag: "<LogiX/>",
    desc: "An end-to-end fleet and delivery management system for logistics companies.",
    color: "from-indigo-500/20 to-cyan-500/20",
    border: "border-indigo-500/30"
  }
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openModal } = useContactModal();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.case-card').forEach((card: any, i) => {
        const direction = i % 2 === 0 ? -100 : 100;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          x: direction,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-background overflow-hidden" id="cases">
      <div className="max-w-7xl mx-auto mb-24">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold mb-6">
          {'<our work>'}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
          Prominent Cases
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl">
          We are good at building web and mobile apps used by thousands and platforms that serve growing businesses.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-24 mb-32">
        {CASES.map((item, i) => (
          <div key={i} className={`case-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:rtl' : ''}`}>
            {/* Mockup side */}
            <div className={`relative aspect-video rounded-3xl bg-card border ${item.border} p-6 overflow-hidden shadow-2xl flex flex-col ${i % 2 !== 0 ? 'lg:ltr' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50 pointer-events-none`}></div>
              
              {/* Fake UI Header */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <div className="font-mono text-sm font-bold opacity-50">{item.tag}</div>
              </div>
              
              {/* Fake UI Body */}
              <div className="flex-1 flex gap-6 relative z-10">
                <div className="w-1/3 bg-background/50 rounded-xl border border-border/50 p-4 space-y-3">
                  <div className="h-3 w-3/4 bg-foreground/10 rounded"></div>
                  <div className="h-3 w-full bg-foreground/10 rounded"></div>
                  <div className="h-3 w-5/6 bg-foreground/10 rounded"></div>
                  <div className="h-3 w-1/2 bg-foreground/10 rounded"></div>
                </div>
                <div className="w-2/3 flex flex-col gap-4">
                  <div className="h-1/2 bg-background/50 rounded-xl border border-border/50 p-4">
                    <div className="h-full w-full bg-primary/20 rounded flex items-end gap-2 p-2">
                       <div className="w-full h-[40%] bg-primary/40 rounded-sm"></div>
                       <div className="w-full h-[60%] bg-primary/40 rounded-sm"></div>
                       <div className="w-full h-[80%] bg-primary/40 rounded-sm"></div>
                       <div className="w-full h-[50%] bg-primary/40 rounded-sm"></div>
                       <div className="w-full h-[100%] bg-primary/40 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="h-1/2 grid grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-xl border border-border/50"></div>
                    <div className="bg-background/50 rounded-xl border border-border/50"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className={`${i % 2 !== 0 ? 'lg:ltr' : ''} lg:px-12`}>
              <div className="text-3xl font-mono text-primary font-bold mb-6">{item.tag}</div>
              <p className="text-2xl text-foreground font-medium mb-8 leading-relaxed">
                {item.desc}
              </p>
              <a href="#" className="inline-flex items-center text-lg font-bold text-muted-foreground hover:text-primary transition-colors group">
                learn more
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-primary text-white rounded-3xl p-16 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] max-h-[600px] bg-white/10 rounded-full blur-[80px]"></div>
        
        <div className="absolute right-10 top-10 opacity-30">
          <Shape3D type="torus" className="w-32 h-32 border-white/40" />
        </div>

        <h3 className="text-5xl font-bold mb-8 relative z-10">Will your idea be next?</h3>
        <button onClick={openModal} className="px-10 py-5 rounded-full bg-white text-primary font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all relative z-10">
          let's talk
        </button>
      </div>
    </section>
  );
}
