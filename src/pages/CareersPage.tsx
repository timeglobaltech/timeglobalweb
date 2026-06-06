import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollaborateCTA from "@/components/CollaborateCTA";
import { 
  Briefcase, 
  Heart, 
  Rocket, 
  Coffee, 
  Laptop, 
  Star, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Users,
  Code2,
  Cpu,
  Target,
  Plus,
  Minus,
  Quote
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Engineering Excellence",
    desc: "We don't just write code; we architect solutions that scale and endure.",
    icon: <Code2 size={32} className="text-primary" />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Radical Transparency",
    desc: "We share our successes and our failures. Growth comes from honesty.",
    icon: <ShieldCheck size={32} className="text-primary" />,
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "User-First Mindset",
    desc: "Every feature we build starts with the person who will use it.",
    icon: <Users size={32} className="text-primary" />,
    color: "from-purple-500/20 to-pink-500/20"
  }
];

const BENEFITS = [
  {
    icon: <Laptop size={24} />,
    title: "Remote-First",
    desc: "Work from anywhere in the world with flexible hours that suit your life."
  },
  {
    icon: <Rocket size={24} />,
    title: "Career Growth",
    desc: "Dedicated learning budget and mentorship to accelerate your path."
  },
  {
    icon: <Heart size={24} />,
    title: "Health & Wellness",
    desc: "Comprehensive health coverage and mental health support for you."
  },
  {
    icon: <Coffee size={24} />,
    title: "Culture of Joy",
    desc: "A collaborative environment where every voice matters and success is shared."
  }
];

const HIRING_PROCESS = [
  { step: "01", title: "Apply", desc: "Submit your application and showcase your best work." },
  { step: "02", title: "Review", desc: "Our team evaluates your potential, passion, and technical curiosity." },
  { step: "03", title: "Interview", desc: "A deep dive into your engineering mindset and past work." },
  { step: "04", title: "Task", desc: "A real-world challenge to demonstrate your problem-solving skills." },
  { step: "05", title: "Offer", desc: "Joining the mission to build global-scale technology." }
];

const OPENINGS = [
  {
    role: "Senior Full-Stack Engineer",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    salary: "$120k - $180k"
  },
  {
    role: "AI / ML Specialist",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    salary: "$130k - $190k"
  },
  {
    role: "Lead UI/UX Designer",
    type: "Full-time",
    location: "Remote",
    dept: "Design",
    salary: "$110k - $160k"
  },
  {
    role: "Cloud Architect (AWS/GCP)",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    salary: "$140k - $200k"
  },
  {
    role: "Product Manager",
    type: "Full-time",
    location: "Remote",
    dept: "PM",
    salary: "$100k - $150k"
  },
  {
    role: "Technical Sales Lead",
    type: "Full-time",
    location: "Remote",
    dept: "Sales",
    salary: "$90k - $140k"
  }
];

const EMPLOYEE_STORIES = [
  {
    quote: "The culture of deep work and technical excellence here is unmatched. We tackle distributed system challenges that actually matter, all while maintaining a healthy remote balance.",
    author: "Zain Ahmed",
    role: "Senior Backend Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Time Global is where design meets high-scale engineering. I love that our design decisions are backed by data and that we have the technical freedom to build truly pixel-perfect interfaces.",
    author: "Emily Watson",
    role: "Lead Product Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Scaling global infrastructure requires a unique mindset. Here, I'm empowered to automate everything and build resilient systems that serve clients across four continents.",
    author: "Lucas Silva",
    role: "DevOps Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "The focus on continuous learning isn't just a perk—it's part of our DNA. The mentorship I've received here has been instrumental in my growth from a mid-level dev to a technical lead.",
    author: "Priya Sharma",
    role: "Frontend Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Leading the engineering team at Time Global is about fostering innovation and maintaining a high bar for code quality. We're building technology that sets industry standards.",
    author: "Marcus Thorne",
    role: "VP of Engineering",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

const CAREER_FAQS = [
  {
    q: "What is your remote work policy?",
    a: "We are a remote-first company. You can work from anywhere in the world as long as you have a stable internet connection and can overlap with your team's core hours."
  },
  {
    q: "Do you offer internships?",
    a: "Yes! We have a robust internship program for aspiring engineers and designers. Check our open positions for 'Intern' roles or send us your CV."
  },
  {
    q: "How long does the application process take?",
    a: "Typically, the process from application to offer takes 2-4 weeks, depending on the role and scheduling availability."
  }
];

const DEPARTMENTS = ["All", "Engineering", "Design", "PM", "Sales"];

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeDept, setActiveDept] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredOpenings = activeDept === "All" 
    ? OPENINGS 
    : OPENINGS.filter(job => job.dept === activeDept);

  useEffect(() => {
    window.scrollTo(0, 0);
    
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

      // Value Cards Animation
      gsap.fromTo(".value-card", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 80%",
          }
        }
      );

      // Opening Cards Animation
      gsap.fromTo(".opening-card", 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".openings-list",
            start: "top 85%",
          }
        }
      );

      // Process Steps Animation
      gsap.fromTo(".process-step", 
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 80%",
          }
        }
      );

      // Marquee Animation for Employee Stories
      if (marqueeRef.current) {
        const marquee = marqueeRef.current;
        const totalWidth = marquee.scrollWidth / 2;
        
        const marqueeTween = gsap.to(marquee, {
          x: `-=${totalWidth}`,
          duration: 80,
          ease: "none",
          repeat: -1,
        });

        marquee.addEventListener("mouseenter", () => gsap.to(marqueeTween, { timeScale: 0.2, duration: 0.5 }));
        marquee.addEventListener("mouseleave", () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 }));
      }
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
        <section className="pt-24 pb-24 px-6 relative overflow-hidden text-center">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="hero-text inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-8 border border-primary/20 uppercase tracking-widest">
              {"<Join the mission/>"}
            </div>
            
            <h1 className="hero-text text-5xl md:text-8xl font-bold mb-8 leading-[1.05] tracking-tight">
              Build the future <br />
              of <span className="text-primary italic">Global Technology.</span>
            </h1>
            
            <p className="hero-text text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              We're looking for world-class engineers, designers, and thinkers to solve complex problems at scale.
            </p>

            <div className="hero-text mt-12 flex flex-wrap justify-center gap-6">
              <a href="#openings" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                View Openings
              </a>
              <a href="#culture" className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-xl border border-border hover:bg-secondary/80 transition-all">
                Our Culture
              </a>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="culture" className="py-32 px-6 values-section border-y border-border/50 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Our Core Values</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">The principles that guide every line of code we write and every decision we make.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((val, i) => (
                <div key={i} className="value-card group p-10 rounded-3xl bg-[#16161A] border border-border/30 hover:border-primary/50 transition-all duration-500 text-left space-y-8 shadow-2xl relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {val.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{val.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Process Section */}
        <section className="py-32 px-6 process-section bg-background">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-24 leading-tight tracking-tight">How We Hire</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {HIRING_PROCESS.map((step, i) => (
                <div key={i} className="process-step group relative">
                  <div className="mb-8 relative inline-block">
                    <div className="text-8xl font-black text-primary/30 dark:text-primary/10 group-hover:text-primary/40 dark:group-hover:text-primary/20 transition-colors font-mono">
                      {step.step}
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.desc}</p>
                  
                  {i < HIRING_PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-full w-full h-px border-t-2 border-dashed border-border/50 -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-32 px-6 bg-secondary/10 border-y border-border/50" id="openings">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Open Positions</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">Join a team that values your growth as much as your output.</p>
              </div>
              
              <div className="flex flex-col gap-6 items-start lg:items-end">
                <div className="flex flex-wrap gap-2 p-1.5 bg-background rounded-xl border border-border">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveDept(dept)}
                      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeDept === dept 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "text-muted-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
                <div className="px-6 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest border border-primary/20">
                  {filteredOpenings.length} Positions Available
                </div>
              </div>
            </div>

            <div className="openings-list grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredOpenings.length > 0 ? (
                  filteredOpenings.map((job, i) => (
                    <motion.div 
                      key={job.role}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="opening-card group flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 bg-[#16161A] border border-border/30 hover:border-primary/50 transition-all duration-500 rounded-3xl shadow-xl"
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{job.dept}</span>
                          <span className="text-gray-500 flex items-center gap-1 text-xs font-mono">
                            <MapPin size={14} /> {job.location}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{job.role}</h3>
                        <div className="flex items-center gap-6 text-gray-400 font-medium">
                          <span className="flex items-center gap-2"><Clock size={18} /> {job.type}</span>
                          <span className="flex items-center gap-2 text-primary/80 font-mono">{job.salary}</span>
                        </div>
                      </div>
                      
                      <div className="mt-8 md:mt-0">
                        <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          Apply Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-[#16161A] rounded-3xl border border-dashed border-border">
                    <p className="text-xl text-muted-foreground mb-6">No positions found in this department.</p>
                    <button 
                      onClick={() => setActiveDept("All")}
                      className="text-primary font-bold hover:underline"
                    >
                      View all positions
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-7xl font-bold mb-10 leading-tight">Perks of being a <span className="text-primary italic">Globalist.</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-12">We believe in taking care of our people so they can focus on what they do best: building the impossible.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {BENEFITS.map((perk, i) => (
                    <div key={i} className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {perk.icon}
                      </div>
                      <h4 className="text-xl font-bold uppercase tracking-tighter">{perk.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{perk.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="relative h-[600px] overflow-hidden shadow-2xl border border-border/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Team collaboration"
                    width="1200"
                    height="600"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute bottom-10 left-10 right-10 z-20 p-8 rounded-3xl bg-background/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <p className="text-2xl font-bold italic leading-tight mb-4">"The best part about Time Global is the collective curiosity. We never stop asking 'what if?'"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50" />
                      <div>
                        <p className="font-bold">Alex Rivera</p>
                        <p className="text-sm text-muted-foreground">Senior Engineering Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Employee Stories Section */}
        <section className="py-32 bg-secondary border-y border-border/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-24">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Life at Time Global</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Hear directly from the people building the future of global technology.</p>
            </div>
          </div>

          <div className="relative">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />

            <div 
              ref={marqueeRef}
              className="flex gap-8 whitespace-nowrap"
              style={{ width: "max-content" }}
            >
              {[...EMPLOYEE_STORIES, ...EMPLOYEE_STORIES].map((story, i) => (
                <div 
                  key={i} 
                  className="inline-block w-[450px] whitespace-normal group p-10 rounded-3xl bg-[#16161A] border border-border/30 hover:border-primary/50 transition-all duration-500 relative shadow-2xl"
                >
                  <div className="absolute top-10 right-10 text-primary/20 group-hover:text-primary/40 transition-colors">
                    <Quote size={80} />
                  </div>
                  
                  <div className="relative z-10 space-y-8">
                    <p className="text-2xl text-gray-300 leading-relaxed italic font-light">
                      "{story.quote}"
                    </p>
                    
                    <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                      <img 
                        src={story.image} 
                        alt={story.author}
                        width="64"
                        height="64"
                        className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{story.author}</h4>
                        <p className="text-gray-500 font-medium">{story.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Common Questions</h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about joining our global team.</p>
            </div>

            <div className="space-y-4">
              {CAREER_FAQS.map((faq, i) => (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">{faq.q}</span>
                    <span className="text-primary ml-4">
                      {openFaq === i ? <Minus size={24} /> : <Plus size={24} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-lg text-muted-foreground leading-relaxed pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">Don't see your role?</h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              We're always on the lookout for exceptional talent. Send us your CV anyway and let's see how we can build the future together.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 bg-white text-primary font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-xl">
                Send your CV
              </button>
              <button className="px-10 py-5 bg-primary-foreground/10 border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-primary-foreground/20 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </section>

        <CollaborateCTA />
      </main>

      <Footer />
    </div>
  );
}
