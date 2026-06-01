import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useContactModal } from "@/hooks/use-contact-modal";
import { X } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeModal();
    }, 3500);
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
                    {"<Hi, TimeGlobalTech team!/>"}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8 flex-1">
                    {/* Name + Company */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Your info
                      </label>
                      <div className="flex flex-wrap items-center gap-2 text-base">
                        <span className="text-muted-foreground">My name is</span>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          className="border-b-2 border-border focus:border-primary bg-transparent outline-none px-2 py-1 flex-1 min-w-[130px] transition-colors"
                        />
                        <span className="text-muted-foreground">from</span>
                        <input
                          type="text"
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
                        <a href="#" className="text-primary underline hover:no-underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      data-testid="button-submit-contact"
                      className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-[#00A375] text-white font-bold text-base hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      send message
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
