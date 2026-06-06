import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: "Client-Oriented Solutions",
    desc: "IT & software development with a human touch. We build feature-packed solutions that are intuitive and scalable.",
    num: "01",
  },
  {
    title: "Custom Software Development",
    desc: "We operate within a learn-build-iterate loop. Flexibility is built in so we adjust on the go for a perfect fit.",
    num: "02",
  },
  {
    title: "Dedicated Software Engineers",
    desc: "Work with developers who bring excellent skills, seniority, and real-world experience building complex applications.",
    num: "03",
  },
  {
    title: "Security-First Development",
    desc: "We adhere to the highest global security standards, recognizing the critical importance of safeguarding your data.",
    num: "04",
  },
  {
    title: "Deep Industry Knowledge",
    desc: "We are laser-focused on compliance and industry standards — from MVP to a complex, scalable production system.",
    num: "05",
  },
  {
    title: "Years of Hands-On Experience",
    desc: "We help you build web and mobile apps that enable sustainable growth at every stage of your journey.",
    num: "06",
  },
];

const STATS = [
  ">10 years of work experience",
  "200+ projects delivered",
  ">80 experts",
  "98% client satisfaction",
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<Element>(".why-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            delay: (i % 3) * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 bg-background overflow-hidden" id="work">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-6 border border-primary/20">
          {"<our work>"}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto leading-tight">
          Top Six Reasons to Work With Us
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our capabilities span from concept validation to scaling established enterprises.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {REASONS.map((reason, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="why-card bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 relative z-10">
              <span className="font-mono font-bold text-primary text-sm">{reason.num}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 relative z-10">{reason.title}</h3>
            <p className="text-muted-foreground leading-relaxed relative z-10 text-sm">
              {reason.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto border-t border-border pt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-black text-primary font-mono">{stat.split(" ")[0]}</p>
            <p className="text-sm text-muted-foreground mt-1 capitalize">{stat.split(" ").slice(1).join(" ")}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
