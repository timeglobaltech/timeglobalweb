import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useContactModal } from "@/hooks/use-contact-modal";
import { X, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const RATE_LIMIT_KEY = "tg_last_submit";
const RATE_LIMIT_MS = 60_000;
const MIN_FILL_MS = 3_000;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgkqb";

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [spamBlocked, setSpamBlocked] = useState(false);
  const openedAt = useRef<number>(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) openedAt.current = Date.now();
  }, [isOpen]);

  // Desktop mouse scrubbing
  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) return;

    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const handleSeeked = () => {
      seeking = false;
      if (video.currentTime !== targetTime) {
        seeking = true;
        try { video.currentTime = targetTime; } catch {}
      }
    };

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || isNaN(video.duration)) return;
      if (prevX === null) { prevX = e.clientX; return; }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      targetTime += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      if (!seeking) {
        seeking = true;
        try { video.currentTime = targetTime; } catch {}
      }
    };

    video.pause();
    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [isOpen]);

  // Mobile autoplay
  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      void video.play().catch(() => {});
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setSpamBlocked(false);

    const data = new FormData(e.currentTarget);
    if (data.get("_gotcha")) return;
    if (Date.now() - openedAt.current < MIN_FILL_MS) { setSpamBlocked(true); return; }
    const lastSubmit = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
    if (Date.now() - lastSubmit < RATE_LIMIT_MS) { setSpamBlocked(true); return; }

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
          setFormData({ firstName: "", lastName: "", email: "", phone: "", topic: "", message: "" });
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

  // solid white inputs — dark text, clearly readable
  const inputCls =
    "w-full px-4 py-3.5 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-muted-foreground text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

  const labelCls = "text-xs font-bold text-primary uppercase tracking-widest";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Full-screen drawer sliding in from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.22 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <div className="relative w-full min-h-screen bg-black font-sans antialiased flex items-center justify-start p-6 md:p-16 lg:p-24">

              {/* VIDEO */}
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                onLoadedData={() => setIsVideoLoaded(true)}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500",
                  isVideoLoaded ? "opacity-85" : "opacity-0"
                )}
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
              />

              {/* Close button — sized up, green themed */}
              <button
                onClick={closeModal}
                data-testid="button-close-modal"
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-md shadow-primary/10"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Content */}
              <div className="relative z-10 w-full max-w-6xl mr-auto">

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 py-24">
                    <div className="w-20 h-20 bg-primary/20 text-primary rounded-2xl flex items-center justify-center text-4xl font-mono border border-primary/40 shadow-lg shadow-primary/10">
                      ✓
                    </div>
                    <div>
                      <h2 className="text-3xl font-mono font-bold text-primary mb-3">{"<Thank you!/>"}</h2>
                      <p className="text-white/70 text-lg mb-1">Your message has been received.</p>
                      <p className="text-white font-semibold">We'll be in touch soon!</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

                    {/* LEFT — Form */}
                    <div className="flex flex-col gap-8">
                      <div className="space-y-2">
                        <p className="text-primary text-sm font-bold uppercase tracking-widest">Let's connect</p>
                        <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                          Get in Touch
                        </h2>
                      </div>

                      {/* Form card */}
                      <div className="rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
                        {/* top accent bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-400 to-transparent" />

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                          {/* Honeypot */}
                          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                          {/* Name row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label className={labelCls}>First Name</label>
                              <input
                                type="text" name="firstName" value={formData.firstName}
                                onChange={handleChange} placeholder="John" required
                                className={inputCls}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className={labelCls}>Last Name</label>
                              <input
                                type="text" name="lastName" value={formData.lastName}
                                onChange={handleChange} placeholder="Doe" required
                                className={inputCls}
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex flex-col gap-2">
                            <label className={labelCls}>Email Address</label>
                            <input
                              type="email" name="email" value={formData.email}
                              onChange={handleChange} placeholder="hello@example.com" required
                              className={inputCls}
                            />
                          </div>

                          {/* Phone */}
                          <div className="flex flex-col gap-2">
                            <label className={labelCls}>
                              Phone Number{" "}
                              <span className="normal-case text-white/40 font-normal tracking-normal">(optional)</span>
                            </label>
                            <input
                              type="tel" name="phone" value={formData.phone}
                              onChange={handleChange} placeholder="+1 (555) 000-0000"
                              className={inputCls}
                            />
                          </div>

                          {/* Topic */}
                          <div className="flex flex-col gap-2">
                            <label className={labelCls}>Topic</label>
                            <div className="relative">
                              <select
                                name="topic" value={formData.topic}
                                onChange={handleChange} required
                                className={cn(inputCls, "appearance-none cursor-pointer pr-10")}
                              >
                                <option value="" disabled className="text-muted-foreground">Select a topic…</option>
                                <option className="text-gray-900">General enquiry</option>
                                <option className="text-gray-900">Project collaboration</option>
                                <option className="text-gray-900">Press &amp; media</option>
                                <option className="text-gray-900">Careers</option>
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-primary text-xs font-bold">▼</div>
                            </div>
                          </div>

                          {/* Message */}
                          <div className="flex flex-col gap-2">
                            <label className={labelCls}>Your Message</label>
                            <textarea
                              name="message" value={formData.message}
                              onChange={handleChange} rows={4} required
                              placeholder="Tell us how we can help…"
                              className={cn(inputCls, "resize-none")}
                            />
                          </div>

                          {isError && (
                            <p className="text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2.5 px-4">
                              Something went wrong. Email us at{" "}
                              <a href="mailto:info@timeglobaltech.com" className="underline text-red-300">
                                info@timeglobaltech.com
                              </a>.
                            </p>
                          )}
                          {spamBlocked && (
                            <p className="text-sm text-amber-400 text-center bg-amber-500/10 border border-amber-500/20 rounded-lg py-2.5 px-4">
                              Please wait a moment before submitting again.
                            </p>
                          )}

                          {/* Submit */}
                          <button
                            type="submit" disabled={isLoading}
                            data-testid="button-submit-contact"
                            className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-400 text-white rounded-xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 uppercase tracking-widest text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                          >
                            {isLoading ? (
                              <><Loader2 size={20} className="animate-spin" /> Sending…</>
                            ) : (
                              <><span>Send Message</span><Send size={18} /></>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* RIGHT — Stats + Why Choose Us */}
                    <div className="flex flex-col gap-8 lg:mt-35">
                      <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
                        {[
                          { stat: "200+", label: "Projects Delivered" },
                          { stat: "40+",  label: "Global Clients" },
                          { stat: "98%",  label: "Client Retention" },
                          { stat: "12+",  label: "Years Delivering" },
                        ].map(({ stat, label }) => (
                          <div key={label} className="p-4 rounded-xl bg-primary/10 border border-primary/25 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 backdrop-blur-sm">
                            <h3 className="text-2xl font-black text-primary mb-0.5">{stat}</h3>
                            <p className="text-xs font-bold text-white/80 leading-tight">{label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white">Why Choose Us?</h3>
                        <ul className="space-y-3">
                          {[
                            "Expert team with 12+ years of experience",
                            "24/7 dedicated support",
                            "Scalable solutions",
                            "Proven track record",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-primary/20">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span className="text-white/90 font-semibold text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}