import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const [language, setLanguage] = useState<"en" | "pl">("en");

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#EDEEF5] pt-24 md:pt-32">
      {/* Background Video Container */}
      <div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
          onError={(e) => {
            const el = e.currentTarget as HTMLVideoElement;
            el.style.display = "none";
          }}
        />

        {/* Gradient Mask - Blend video to #EDEEF5 background */}
        <div className="absolute top-0 left-0 w-full h-32 sm:h-48 bg-gradient-to-b from-[#EDEEF5] to-transparent" />
      </div>

      {/* Hero Content Alignment */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 min-h-[85vh] flex items-center">
        <div className="col-span-12 md:col-span-10 md:col-start-2 space-y-8">
          {/* Hero Header with Colored Text */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight"
          >
            <span className="text-[#1a1a1a]">
              Remix: Mentality offers
            </span>
            <br />
            <span className="text-[#8e8e8e]">
              information
            </span>
            <br />
            <span className="text-[#8e8e8e]">
              and resources to help you manage
            </span>
            <br />
            <span className="text-[#8e8e8e]">
              your{" "}
              {/* Eye Icon Element */}
              <span className="inline-flex items-center justify-center w-[16px] md:w-[42px] lg:w-[62px] h-[16px] md:h-[42px] lg:h-[62px] border-[2px] border-[#1a1a1a] rounded-full mx-2 align-middle">
                <span className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-full" />
              </span>
              mental wellbeing.
            </span>
          </motion.h1>

          {/* Search Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="pt-4"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#1a1a1a]/10 p-1.5 pl-5 flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md md:max-w-2xl">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-[#8e8e8e] mr-3 flex-shrink-0" />

              <input
                type="text"
                placeholder="Ask me anything..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent text-sm md:text-base outline-none text-[#1a1a1a] placeholder:text-[#8e8e8e]/60"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1a1a1a] text-white w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#9fff00] hover:text-[#1a1a1a] transition-colors duration-300"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-[#8e8e8e] max-w-2xl leading-relaxed"
          >
            Access comprehensive mental health resources, educational materials, and expert support to help you navigate your wellness journey with confidence.
          </motion.p>
        </div>
      </div>

      {/* Language Switcher - Middle Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute right-6 md:right-16 lg:right-20 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-full border border-[#1a1a1a]/10 p-1 flex gap-1 shadow-lg">
          {(["en", "pl"] as const).map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition-all duration-300 ${
                language === lang
                  ? "bg-[#1a1a1a] text-white"
                  : "text-[#8e8e8e] hover:text-[#1a1a1a]"
              }`}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Bottom Left - Year */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-12 left-6 md:left-16 lg:left-20 z-20"
      >
        <span className="text-xs md:text-sm text-[#8e8e8e]/70 font-mono tracking-widest">
          2024
        </span>
      </motion.div>

      {/* Bottom Right - Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-12 right-6 md:right-16 lg:right-20 z-20"
      >
        <span className="text-xs md:text-sm text-[#8e8e8e]/70 font-mono tracking-widest">
          mental health tools
        </span>
      </motion.div>
    </section>
  );
}
