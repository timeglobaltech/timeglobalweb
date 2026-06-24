import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AWARD_BADGES = [
  {
    name: "Clutch 1000",
    year: "2025",
    imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v11/icons/clutch.svg",
  },
  {
    name: "TechBehemoths",
    year: "2025",
    imageUrl: "https://techbehemoths.com/images/tb-award.png",
  },
  {
    name: "TopDevelopers.co",
    year: "2024",
    imageUrl: "https://www.topdevelopers.co/assets/images/badges/top-app-development-companies.png",
  },
  {
    name: "DesignRush",
    year: "2024",
    imageUrl: "https://www.designrush.com/assets/img/badges/top-design-company.png",
  },
  {
    name: "GoodFirms",
    year: "2024",
    imageUrl: "https://goodfirms.co/images/badges/top-software-development-companies.svg",
  },
  {
    name: "Techreviewer",
    year: "2025",
    imageUrl: "https://techreviewer.co/images/badges/top-it-companies.png",
  },
];

export default function Awards() {
  return (
    <section className="bg-background py-24 sm:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]"
          animate={{ y: [0, 50, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px]"
          animate={{ y: [0, -40, 0], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-lg bg-primary/15 text-primary font-mono text-sm font-bold mb-6 border border-primary/40 backdrop-blur-sm">
              {'<Recognition/>'}
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Awards and Recognition
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Making tangible impact
          </motion.p>
        </div>

        {/* Preview grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-14">
          {AWARD_BADGES.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-white border border-gray-200 shadow-lg shadow-black/10 flex flex-col items-center justify-center p-4 relative overflow-hidden group-hover:shadow-xl transition-shadow">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5 rounded-2xl" />
                <img
                  src={badge.imageUrl}
                  alt={badge.name}
                  className="w-full h-3/4 object-contain relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                  }}
                />
                <div
                  className="hidden w-full h-3/4 items-center justify-center bg-navy rounded-xl"
                  style={{ backgroundColor: "#1A3E73" }}
                >
                  <span className="text-white font-bold text-center text-sm">{badge.name}</span>
                </div>
                <p className="text-gray-500 font-mono text-xs mt-2 text-center">
                  {badge.name} <span>{badge.year}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Awards button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/awards"
            data-testid="link-view-all-awards"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all"
          >
            View All Awards
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
