import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    title: "CTO, NovaCorp",
    tag: "<EduTrack/>",
    quote: "TimeGlobalTech built our LMS from scratch. The team's attention to detail and deep technical knowledge made the entire process seamless and the final product exceeded expectations.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "James Okafor",
    title: "CEO, PayFlow Inc",
    tag: "<PayFlow/>",
    quote: "Within the first month of launch, our transaction volume tripled. The TimeGlobalTech team understood our compliance needs and delivered a flawless payment infrastructure.",
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    name: "Priya Sharma",
    title: "PM, MediCare Plus",
    tag: "<MediSync/>",
    quote: "We needed a HIPAA-compliant telemedicine platform fast. TimeGlobalTech delivered on time and on budget with an interface our doctors and patients love.",
    color: "bg-rose-100 text-rose-700"
  },
  {
    name: "David Chen",
    title: "Founder, LogiX",
    tag: "<LogiX/>",
    quote: "The fleet management system they built handles 500+ daily deliveries without a hiccup. Reliable, clean code, and a team that genuinely cares about results.",
    color: "bg-indigo-100 text-indigo-700"
  },
  {
    name: "Aisha Al-Farsi",
    title: "COO, AlphaStream",
    tag: "<General/>",
    quote: "TimeGlobalTech seamlessly integrated into our existing team. Their workflow, communication, and technical seniority made them feel like an in-house engineering squad.",
    color: "bg-amber-100 text-amber-700"
  },
  {
    name: "Tom Bakker",
    title: "CEO, CloudPeak",
    tag: "<Cloud/>",
    quote: "The cloud migration they handled was complex and time-sensitive. The team delivered with zero downtime and gave us architecture that scales effortlessly.",
    color: "bg-cyan-100 text-cyan-700"
  },
  {
    name: "Lena Volkova",
    title: "Head of Engineering, DataSync",
    tag: "<Mobile/>",
    quote: "Outstanding mobile app delivered in just 10 weeks. The UI/UX quality and backend performance blew our expectations out of the water.",
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "Carlos Reyes",
    title: "Founder, NextWave",
    tag: "<MVP/>",
    quote: "From concept to App Store in 14 weeks. TimeGlobalTech helped us validate our idea, build the MVP, and attract our first 1,000 users.",
    color: "bg-orange-100 text-orange-700"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold mb-6">
          {'<what clients say>'}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
          What Our Clients Say About Us
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trusted by 50+ happy startups & partners.
        </p>
      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full flex">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: [0, -2800] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
          whileHover={{ animationPlayState: 'paused' }}
        >
          {/* Duplicate array for seamless infinite scroll */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
            <div key={i} className="w-[450px] shrink-0 bg-background border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="font-mono text-primary text-sm font-bold mb-6">{test.tag}</div>
                <p className="text-lg text-foreground mb-8 leading-relaxed">"{test.quote}"</p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${test.color}`}>
                  {test.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold">{test.name}</div>
                  <div className="text-sm text-muted-foreground">{test.title}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
