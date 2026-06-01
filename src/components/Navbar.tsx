import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContactModal } from "@/hooks/use-contact-modal";
import { useTheme } from "@/hooks/use-theme";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useContactModal();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "<why us>", href: "#why-us" },
    { label: "<services>", href: "#services" },
    { label: "<cases>", href: "#cases" },
    { label: "<careers>", href: "#careers" },
  ];

  return (
    <nav
      className={`fixed left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 shadow-lg shadow-black/5 border-b border-border backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{ top: "36px" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-foreground">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
            <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="2.5"/>
          </svg>
          TimeGlobalTech
        </a>

        {/* Desktop — industry pills */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium tracking-wide border border-primary/20">
            Web & Mobile
          </div>
          <div className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium tracking-wide border border-primary/20">
            AI & Cloud
          </div>
        </div>

        {/* Desktop — nav links */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop — theme toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={openModal}
            data-testid="button-lets-talk-nav"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-[#00A375] text-white font-semibold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            let's talk
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Web & Mobile
                </div>
                <div className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  AI & Cloud
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <button
                onClick={() => { setIsOpen(false); openModal(); }}
                className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-[#00A375] text-white font-bold text-base w-full"
              >
                let's talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
