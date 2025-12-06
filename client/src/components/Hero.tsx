import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle2, Bitcoin as BitcoinIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo } from "react";

const rotatingWords = [
  "Operations",
  "Payroll",
  "Accounting",
  "Invoicing",
  "Compliance",
  "Expenses",
];

function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-16 overflow-hidden min-h-screen flex items-center bg-white py-12 lg:py-0">
      {/* Refined Background - More Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient - Enhanced with more orange left, purple right */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/90 via-orange-50/40 via-white to-purple-50/70"></div>
        
        {/* Floating gradient orbs - More Subtle Movement */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 -left-4 w-[600px] h-[600px] bg-gradient-to-br from-bitcoin/45 to-orange-400/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-purple-400/25 to-pink-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-amber-400/25 to-orange-400/20 rounded-full blur-3xl"
        />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, #f7931a 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: Content - Reduced column span for larger screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Minimal Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-4 w-4 text-bitcoin" />
              <span className="text-bitcoin text-xs font-bold tracking-[0.2em] uppercase">The Bitcoin Business Platform</span>
              <div className="h-px w-12 bg-bitcoin/30"></div>
            </div>

            {/* Massive Headline - Enhanced Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
              <span className="block mb-2 text-bitcoin">Bitcoin</span>
              <div className="relative inline-block min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gray-900 inline-block"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-400 font-light mt-2">
                for everyone
              </span>
            </h1>

            {/* Subheadline - Enhanced */}
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed font-light max-w-xl">
              <span className="block">Run your business operations entirely on Bitcoin</span>
              <span className="block text-gray-900 font-medium">No experience or technical knowledge required.</span>
            </p>

            {/* CTAs - Refined Styling */}
            <div className="flex flex-col sm:flex-row gap-4 items-start pt-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white font-black px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg h-auto min-h-[44px] shadow-2xl hover:shadow-bitcoin/40 hover:scale-105 transition-all duration-300 rounded-full w-full sm:w-auto"
                onClick={() => window.location.href = 'https://app.paidin.io'}
              >
                Get Started Free
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <button className="text-sm sm:text-base lg:text-lg text-gray-700 hover:text-bitcoin font-semibold transition-colors flex items-center gap-2 py-4 sm:py-6 group min-h-[44px] w-full sm:w-auto justify-center sm:justify-start">
                Request Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Signals - Visual Minimal */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[
                "Trusted by Bitcoin-forward companies",
                "Enterprise-grade security",
                "Lightning fast"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-1.5 text-xs sm:text-[11px] lg:text-xs text-gray-500 font-light"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 lg:h-3.5 lg:w-3.5 text-bitcoin flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Video - Horizontal 16:9 */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Image Container - Taller Aspect Ratio */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 aspect-[16/15] bg-gray-900">
              <img
                src="/website-photos/hero-image.webp"
                alt="PaidIn Dashboard - Bitcoin Business Operations"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            
            {/* Enhanced Glow Effect - Animated */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-8 bg-gradient-to-r from-bitcoin/30 to-orange-400/30 rounded-3xl blur-3xl -z-10"
            />
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
