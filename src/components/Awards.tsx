import { useContactModal } from "@/hooks/use-contact-modal";
import { motion } from "framer-motion";

const AWARDS = [
  { title: "Top Software Developer", issuer: "Clutch", year: "2023", icon: "🏆" },
  { title: "Top Mobile App", issuer: "The Manifest", year: "2023", icon: "📱" },
  { title: "Best IT Company", issuer: "GoodFirms", year: "2022", icon: "⭐" },
  { title: "Top Web Developer", issuer: "Clutch", year: "2024", icon: "🚀" }
];

export default function Awards() {
  const { openModal } = useContactModal();

  return (
    <section className="bg-background py-32 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-1.5 rounded-lg bg-primary/15 text-primary font-mono text-sm font-bold mb-6 border border-primary/40 backdrop-blur-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(99,102,241,0.2)" }}
          >
            {'<Recognition/>'}
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Awards & Recognition
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16"
        >
          Recognized by industry leaders for excellence in software development and innovation
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {AWARDS.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center group"
            >
              {/* Award badge with animation */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 0 }}
                className="relative mb-6"
              >
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <motion.div
                  initial={{ rotate: 45 }}
                  whileHover={{ rotate: 0 }}
                  className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center shadow-xl border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500 relative z-10"
                >
                  <div className="text-4xl text-primary">
                    {award.icon}
                  </div>
                </motion.div>
              </motion.div>

              {/* Award info */}
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-center leading-snug">
                {award.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {award.issuer}
              </p>
              <p className="text-primary text-xs font-mono mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                {award.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 border-t border-primary/20 relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
          <span className="text-2xl font-bold text-center md:text-left flex-1">
            Ready to work with award-winning developers?
          </span>
          <motion.button
            onClick={openModal}
            data-testid="button-hire-us"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white text-primary font-bold text-lg hover:shadow-2xl transition-all whitespace-nowrap"
          >
            Get in Touch →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
