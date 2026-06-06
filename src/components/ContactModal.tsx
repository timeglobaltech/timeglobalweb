import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useContactModal } from "@/hooks/use-contact-modal";
import { X, Loader2 } from "lucide-react";

const RATE_LIMIT_KEY = "tg_last_submit";
const RATE_LIMIT_MS = 60_000; // 60 seconds between submissions
const MIN_FILL_MS = 3_000;    // must take at least 3 seconds to fill the form

// Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgkqb";

type RadioGroupProps = {
  name: string;
  options: string[];
};

function RadioGroup({ name, options }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className="cursor-pointer">
          <input type="radio" name={name} value={opt} className="peer sr-only" required />
          <div className="px-4 py-2 rounded-lg border border-border peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm font-medium hover:border-primary/50">
            {opt}
          </div>
        </label>
      ))}
    </div>
  );
}

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [spamBlocked, setSpamBlocked] = useState(false);
  const openedAt = useRef<number>(0);

  // Record when the modal opens so we can check fill-time
  useEffect(() => {
    if (isOpen) openedAt.current = Date.now();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setSpamBlocked(false);

    // Layer 1: honeypot — if _gotcha field has any value, silently discard
    const data = new FormData(e.currentTarget);
    if (data.get("_gotcha")) return;

    // Layer 2: time check — block if submitted in under 3 seconds
    if (Date.now() - openedAt.current < MIN_FILL_MS) {
      setSpamBlocked(true);
      return;
    }

    // Layer 3: rate limit — block if resubmitting within 60 seconds
    const lastSubmit = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
    if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
      setSpamBlocked(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          closeModal();
        }, 3500);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full md:w-[580px] bg-background shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8 md:p-12 relative min-h-full flex flex-col">
              <button
                onClick={closeModal}
                data-testid="button-close-modal"
                className="absolute top-6 right-6 w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <X size={18} />
              </button>

              {isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-3xl font-mono border border-primary/30">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-2xl font-mono font-bold text-primary mb-3">
                      {"<Thank you!/>"}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-1">
                      Your submission has been received.
                    </p>
                    <p className="text-foreground font-semibold">see you soon!</p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-mono font-bold text-primary mb-8 mt-8 leading-tight">
                    {"<Tell us about your project/>"}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8 flex-1">
                    {/* Honeypot — invisible to humans, filled by bots → auto-rejected by Formspree */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    {/* Name + Company */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Your info
                      </label>
                      <div className="flex flex-wrap items-center gap-2 text-base">
                        <span className="text-muted-foreground">My name is</span>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Full Name"
                          className="border-b-2 border-border focus:border-primary bg-transparent outline-none px-2 py-1 flex-1 min-w-[130px] transition-colors"
                        />
                        <span className="text-muted-foreground">from</span>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="Company"
                          className="border-b-2 border-border focus:border-primary bg-transparent outline-none px-2 py-1 flex-1 min-w-[130px] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Position */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        My position
                      </label>
                      <RadioGroup
                        name="position"
                        options={["CEO", "CTO", "Product Manager", "Developer", "Other"]}
                      />
                    </div>

                    {/* Discuss */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        I'd like to discuss
                      </label>
                      <RadioGroup
                        name="discuss"
                        options={["Web Development", "Mobile App", "AI & Cloud", "Consulting", "Other"]}
                      />
                    </div>

                    {/* Interest */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        I'm interested in
                      </label>
                      <RadioGroup
                        name="interest"
                        options={["Enterprise Software", "Startup MVP", "SaaS Product", "Other"]}
                      />
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@company.com"
                          className="w-full border-b-2 border-border focus:border-primary bg-transparent outline-none py-2 transition-colors placeholder:text-muted-foreground/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          className="w-full border-b-2 border-border focus:border-primary bg-transparent outline-none py-2 transition-colors placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </div>

                    {/* Privacy */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="mt-1 w-4 h-4 accent-primary shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        I have read and accept the terms of the{" "}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    {isError && (
                      <p className="text-sm text-red-500 text-center -mt-2">
                        Something went wrong. Please try again or email us at{" "}
                        <a href="mailto:info@timeglobaltech.com" className="underline">info@timeglobaltech.com</a>.
                      </p>
                    )}

                    {spamBlocked && (
                      <p className="text-sm text-amber-500 text-center -mt-2">
                        Please wait a moment before submitting again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      data-testid="button-submit-contact"
                      className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-emerald-600 text-white font-bold text-base hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          sending…
                        </>
                      ) : (
                        "send message"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
