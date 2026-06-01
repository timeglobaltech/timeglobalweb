import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shape3D } from "./Shape3D";

gsap.registerPlugin(ScrollTrigger);

export default function IndustryShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.showcase-row').forEach((row: any) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
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

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-card" id="services">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        
        {/* Web & Mobile Row */}
        <div className="showcase-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -left-12 -top-12 opacity-50">
              <Shape3D type="cube" className="w-32 h-32" />
            </div>
            
            <div className="bg-background rounded-2xl border border-border shadow-2xl p-4 overflow-hidden relative z-10 w-full max-w-md mx-auto aspect-[9/16] flex flex-col">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="font-semibold text-sm">Dashboard</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="h-24 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 rounded-xl bg-muted"></div>
                  <div className="h-20 rounded-xl bg-muted"></div>
                </div>
                <div className="flex-1 rounded-xl bg-muted/50 border border-border p-3">
                  <div className="h-3 w-1/2 bg-muted-foreground/30 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded"></div>
                    <div className="h-2 w-4/5 bg-muted rounded"></div>
                    <div className="h-2 w-full bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 text-sm font-mono text-muted-foreground">
              Enterprise SaaS Dashboard — built for scale
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Web & Mobile Development</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We provide exceptional web and mobile software development services tailored to the unique needs of startups, enterprises, and everything in between.
            </p>
            <a href="#" className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors text-lg group">
              web & mobile development
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* AI & Cloud Row */}
        <div className="showcase-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">AI & Cloud Solutions</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Cutting-edge AI integrations, cloud architecture, and automation tools built to the latest industry standards, ensuring performance and security.
            </p>
            <a href="#" className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors text-lg group">
              ai & cloud development
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="relative">
            <div className="absolute -right-12 -bottom-12 opacity-50">
              <Shape3D type="half-round" className="w-48 h-24" />
            </div>
            
            <div className="bg-background rounded-2xl border border-border shadow-2xl p-4 overflow-hidden relative z-10 w-full aspect-video flex flex-col">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="h-4 w-1/3 bg-muted rounded ml-4"></div>
              </div>
              <div className="flex-1 flex gap-4">
                <div className="w-1/4 rounded-xl bg-muted/50 border border-border flex flex-col gap-2 p-2">
                  <div className="h-2 w-full bg-muted rounded"></div>
                  <div className="h-2 w-full bg-muted rounded"></div>
                  <div className="h-2 w-4/5 bg-muted rounded"></div>
                  <div className="mt-auto h-8 rounded-lg bg-primary/20"></div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-1/3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-4">
                    <div className="h-2 w-1/4 bg-primary/40 rounded mb-2"></div>
                    <div className="w-full h-full flex items-end gap-2 pt-2">
                      {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/30 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted"></div>
                    <div className="rounded-xl bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 text-sm font-mono text-muted-foreground">
              AI-powered analytics platform for enterprise clients
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
