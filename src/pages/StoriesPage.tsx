import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollaborateCTA from "@/components/CollaborateCTA";
import { 
  Trophy, 
  Frown, 
  Lightbulb, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Target,
  Users,
  Globe,
  Quote,
  Search,
  Code2,
  Cpu
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SUCCESS_STORIES = [
  {
    id: "success-1",
    tag: "FinTech",
    title: "Revolutionizing Digital Payments",
    desc: "How we helped a startup scale from 0 to 1M+ transactions daily with a custom-built payment gateway.",
    impact: "1M+ Daily Transactions",
    challenge: "Scaling legacy infrastructure to handle massive spikes.",
    solution: "Serverless architecture and real-time monitoring.",
    color: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
    icon: <Trophy className="text-emerald-500" size={32} />
  },
  {
    id: "success-2",
    tag: "Healthcare",
    title: "AI-Driven Patient Care",
    desc: "Implementing predictive analytics to improve patient outcome tracking for over 500 clinics.",
    impact: "40% Better Outcomes",
    challenge: "Fragmented data across multiple health providers.",
    solution: "Centralized AI data lake with HIPAA compliance.",
    color: "from-blue-500/20 to-indigo-500/20",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    icon: <Rocket className="text-blue-500" size={32} />
  }
];

const FAILURE_STORIES = [
  {
    id: "failure-1",
    tag: "E-Commerce",
    title: "The Black Friday Crash",
    desc: "A lesson in load balancing. What happened when our first major client's site went down for 2 hours during peak traffic.",
    lesson: "Redundancy is not optional.",
    challenge: "Unexpected 10x traffic spike.",
    fix: "Auto-scaling groups and multi-region failover.",
    color: "from-rose-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    icon: <Frown className="text-rose-500" size={32} />
  },
  {
    id: "failure-2",
    tag: "SaaS",
    title: "The Data Migration Delay",
    desc: "How a 24-hour migration turned into a 72-hour ordeal and how we rebuilt trust with the client.",
    lesson: "Always have a rollback plan.",
    challenge: "Corrupt legacy data structures.",
    fix: "New automated data validation pipeline.",
    color: "from-amber-500/20 to-yellow-500/20",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    icon: <AlertCircle className="text-amber-500" size={32} />
  }
];

const GLOBAL_STATS = [
  { label: "Daily Transactions", value: 1, suffix: "M+", icon: <TrendingUp size={24} /> },
  { label: "Countries Served", value: 16, suffix: "+", icon: <Globe size={24} /> },
  { label: "Retention Rate", value: 98.9, suffix: "%", icon: <Users size={24} /> },
];

const PROCESS_STEPS = [
  {
    title: "Discovery",
    desc: "We dive deep into your business logic and technical bottlenecks.",
    icon: <Search className="text-primary" size={24} />,
    color: "bg-blue-500/10"
  },
  {
    title: "Engineering",
    desc: "Precision coding with a focus on scalability and long-term stability.",
    icon: <Code2 className="text-primary" size={24} />,
    color: "bg-emerald-500/10"
  },
  {
    title: "Optimization",
    desc: "Continuous refinement to ensure peak performance under any load.",
    icon: <Cpu className="text-primary" size={24} />,
    color: "bg-purple-500/10"
  }
];

export default function StoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Refresh ScrollTrigger after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(".hero-text", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2
        }
      );

      // Story Card Animations
      const cards = gsap.utils.toArray(".story-anim-card");
      cards.forEach((card: any) => {
        const image = card.querySelector(".story-image-box");
        const imgElement = card.querySelector("img");
        const content = card.querySelector(".story-content-box");

        // Image Parallax
        if (imgElement) {
          gsap.to(imgElement, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }

        // Entrance reveals - Restoring the side slide animation you liked
        if (image) {
          gsap.fromTo(image, 
            { x: card.classList.contains("flex-row-reverse") ? 100 : -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        }

        if (content) {
          gsap.fromTo(content, 
            { x: card.classList.contains("flex-row-reverse") ? -100 : 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                end: "top 15%",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        }
      });

      // Live Counter Animation
      const statItems = gsap.utils.toArray(".stat-counter");
      statItems.forEach((stat: any) => {
        const targetValue = parseFloat(stat.getAttribute("data-value") || "0");
        const isDecimal = stat.getAttribute("data-value")?.includes(".");
        
        gsap.fromTo(stat, 
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".stats-section",
              start: "top 80%",
            },
            onUpdate: function() {
              const val = parseFloat(this.targets()[0].innerText);
              stat.innerText = isDecimal ? val.toFixed(1) : Math.floor(val);
            }
          }
        );
      });

      // Process Items Animation
      gsap.fromTo(".process-item", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 90%",
          }
        }
      );

      // DNA Items Animation
      gsap.fromTo(".dna-item", 
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".dna-section",
            start: "top 90%",
          }
        }
      );
    }, containerRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col" ref={containerRef}>
      <Navbar />
      <div className="h-[72px] shrink-0" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div 
              className="hero-text inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-8 border border-primary/20"
            >
              {"<The Journey of Excellence/>"}
            </motion.div>
            
            <h1 className="hero-text text-5xl md:text-8xl font-bold mb-8 leading-[1.05] tracking-tight">
              Stories of <span className="text-primary italic">Success</span> <br />
              & Lessons from <span className="text-muted-foreground italic">Failure.</span>
            </h1>
            
            <p className="hero-text text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Real engineering isn't just about code—it's about the resilience to overcome challenges and the precision to scale successes.
            </p>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="py-24 stats-section border-y border-border/50 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {GLOBAL_STATS.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="text-6xl md:text-7xl font-black tracking-tighter text-white flex items-center justify-center">
                      <span className="stat-counter" data-value={stat.value}>0</span>
                      <span>{stat.suffix}</span>
                    </div>
                    <div className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-32 px-6 success-section relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Success Stories</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">Pioneering solutions that define industry standards.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-48">
              {SUCCESS_STORIES.map((story, i) => (
                <div 
                  key={story.id}
                  className={`story-anim-card flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                >
                  {/* Image side - Sharp Edges & Increased Height */}
                  <div className="story-image-box flex-1 w-full relative group">
                    <div className="relative h-[500px] md:h-[650px] overflow-hidden border border-border/30 shadow-2xl bg-[#16161A]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-40 group-hover:opacity-10 transition-opacity duration-500 z-10`} />
                      <img 
                        src={story.image} 
                        alt={story.title}
                        width="1200"
                        height="650"
                        className="w-full h-full object-cover transition-all duration-1000"
                        loading="lazy"
                      />
                      <div className="absolute top-8 left-8 px-6 py-2 rounded-full bg-background/90 backdrop-blur-xl border border-white/10 text-primary font-mono text-sm font-bold z-20">
                        {story.tag}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="story-content-box flex-1 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
                        {story.icon}
                      </div>
                      <span className="text-emerald-500 flex items-center gap-2 font-mono text-lg font-bold">
                        <TrendingUp size={20} /> {story.impact}
                      </span>
                    </div>

                    <h3 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">{story.title}</h3>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">{story.desc}</p>

                    <div className="space-y-8 pt-10 border-t border-border/50">
                      <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Target className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase text-muted-foreground mb-1 tracking-[0.2em] font-mono">The Challenge</p>
                          <p className="text-xl font-medium leading-relaxed">{story.challenge}</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-emerald-500" size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase text-muted-foreground mb-1 tracking-[0.2em] font-mono">The Solution</p>
                          <p className="text-xl font-medium leading-relaxed">{story.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Process Section */}
        <section className="py-40 px-6 process-section border-y border-border/50 bg-secondary relative z-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-8 border border-primary/20">
              {"<How We Work/>"}
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-24 leading-tight tracking-tight text-white">How We Turn Failure Into <span className="text-primary italic">Fuel</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="process-item group p-12 rounded-3xl bg-[#16161A] border border-border/30 hover:border-primary/50 transition-all duration-500 text-left space-y-8 relative overflow-hidden shadow-2xl">
                  <div className={`absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all duration-500`} />
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-xl leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Failure & Lessons Section */}
        <section className="py-32 px-6 failure-section bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-32">
              <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">Wisdom from Failure</h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">True innovation requires the courage to fail and the intelligence to learn.</p>
            </div>

            <div className="grid grid-cols-1 gap-48">
              {FAILURE_STORIES.map((story, i) => (
                <div 
                  key={story.id}
                  className={`story-anim-card flex flex-col ${i % 2 !== 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                >
                  {/* Image side - Sharp Edges & Increased Height */}
                  <div className="story-image-box flex-1 w-full group">
                    <div className="relative h-[500px] md:h-[650px] overflow-hidden border border-border/30 shadow-2xl bg-[#16161A]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-60 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
                      <img 
                        src={story.image} 
                        alt={story.title}
                        width="1200"
                        height="650"
                        className="w-full h-full object-cover grayscale-[90%] group-hover:grayscale-0 transition-all duration-1000"
                        loading="lazy"
                      />
                      <div className="absolute top-8 left-8 px-6 py-2 rounded-full bg-background/90 backdrop-blur-xl border border-white/10 text-rose-500 font-mono text-sm font-bold z-20">
                        {story.tag}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="story-content-box flex-1 space-y-8">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
                      {story.icon}
                    </div>

                    <h3 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">{story.title}</h3>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">{story.desc}</p>

                    <div className="space-y-10 pt-10 border-t border-border/50">
                      <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                          <AlertCircle className="text-rose-500" size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase text-muted-foreground mb-1 tracking-[0.2em] font-mono">The Setback</p>
                          <p className="text-xl font-medium leading-relaxed">{story.challenge}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 relative">
                        <div className="absolute -left-2 -top-2 text-primary/20 dark:text-primary/10">
                          <Quote size={48} />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 relative z-10">
                          <Lightbulb className="text-amber-500" size={24} />
                        </div>
                        <div className="relative z-10">
                          <p className="text-sm font-bold uppercase text-muted-foreground mb-1 tracking-[0.2em] font-mono">The Hard Lesson</p>
                          <p className="text-2xl font-bold leading-relaxed italic text-foreground/90">"{story.lesson}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success DNA Section */}
        <section className="py-40 px-6 dna-section border-t border-border bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-32 leading-tight tracking-tighter text-foreground">The Time Global DNA</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
              <div className="hidden md:block absolute top-20 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
              
              <div className="dna-item group">
                <div className="w-40 h-40 rounded-3xl bg-[#16161A] border-2 border-primary/20 flex items-center justify-center mx-auto mb-10 group-hover:rotate-[10deg] group-hover:border-primary group-hover:shadow-[0_0_50px_-12px_rgba(0,163,117,0.3)] transition-all duration-500 shadow-2xl relative">
                  <div className="absolute inset-4 rounded-3xl bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Target size={56} className="text-primary relative z-10" />
                </div>
                <h4 className="text-3xl font-bold mb-6 uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">Precision</h4>
                <p className="text-muted-foreground text-xl leading-relaxed">Meticulous planning for every possible outcome.</p>
              </div>

              <div className="dna-item group">
                <div className="w-40 h-40 rounded-3xl bg-[#16161A] border-2 border-primary/20 flex items-center justify-center mx-auto mb-10 group-hover:-rotate-[10deg] group-hover:border-primary group-hover:shadow-[0_0_50px_-12px_rgba(0,163,117,0.3)] transition-all duration-500 shadow-2xl relative">
                  <div className="absolute inset-4 rounded-3xl bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Users size={56} className="text-primary relative z-10" />
                </div>
                <h4 className="text-3xl font-bold mb-6 uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">Empathy</h4>
                <p className="text-muted-foreground text-xl leading-relaxed">Understanding client needs beyond technical specs.</p>
              </div>

              <div className="dna-item group">
                <div className="w-40 h-40 rounded-3xl bg-[#16161A] border-2 border-primary/20 flex items-center justify-center mx-auto mb-10 group-hover:rotate-[10deg] group-hover:border-primary group-hover:shadow-[0_0_50px_-12px_rgba(0,163,117,0.3)] transition-all duration-500 shadow-2xl relative">
                  <div className="absolute inset-4 rounded-3xl bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Rocket size={56} className="text-primary relative z-10" />
                </div>
                <h4 className="text-3xl font-bold mb-6 uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">Resilience</h4>
                <p className="text-muted-foreground text-xl leading-relaxed">Turning every setback into a strategic advantage.</p>
              </div>
            </div>
          </div>
        </section>

        <CollaborateCTA />
      </main>

      <Footer />
    </div>
  );
}
