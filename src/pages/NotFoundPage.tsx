import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="h-[72px] shrink-0" />

      <main className="flex-1 flex items-center justify-center px-6 py-32 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl relative z-10"
        >
          <div className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-8 border border-primary/20">
            {"<error 404/>"}
          </div>

          <h1 className="text-[120px] md:text-[180px] font-black text-primary/15 leading-none mb-2 font-mono select-none">
            404
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 -mt-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <a className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                ← Go Home
              </a>
            </Link>
            <Link href="/work">
              <a className="px-8 py-4 bg-secondary border border-border text-foreground font-bold rounded-xl hover:bg-secondary/80 transition-all">
                View Our Work
              </a>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
