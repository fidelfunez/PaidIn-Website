import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Calendar, CheckCircle2, Sparkles, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-bitcoin min-h-screen flex items-center">
      {/* Top Transition Gradient */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white via-white/30 via-orange-500/20 via-orange-500/40 to-bitcoin pointer-events-none z-10"></div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/website-photos/bitcoin-graffiti.webp"
          alt="Bitcoin graffiti backdrop"
          initial={{ filter: "blur(0px)", opacity: 0.95, scale: 0.92 }}
          whileInView={{ filter: "blur(18px)", opacity: 0.35, scale: 0.98 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.8, duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-x-0 top-12 bottom-0 w-full h-full object-contain pointer-events-none"
          loading="lazy"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.65 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1.1, duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-x-0 top-12 bottom-0 bg-gradient-to-br from-bitcoin/40 via-bitcoin/30 to-bitcoin/60 pointer-events-none"
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-48 pb-16 sm:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
          className="text-center"
        >
          {/* Badge - Editorial Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-12"
          >
            <div className="h-px w-12 bg-white/30"></div>
            <Rocket className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">Get Started Today</span>
            <div className="h-px w-12 bg-white/30"></div>
          </motion.div>

          {/* Main Headline - Large Typography with Personality */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-8xl xl:text-9xl font-black text-white mb-12 sm:mb-20 leading-[0.9] tracking-tight"
          >
            Ready to run
            <br />
            your business
            <br />
            <span className="relative inline-block">
              <span className="text-white">on Bitcoin</span>
              <motion.div
                animate={{
                  scaleX: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-white/40 rounded-full"
              />
            </span>
            ?
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-10 sm:mb-14 w-full"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-white text-bitcoin hover:bg-gray-100 font-black px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg h-auto min-h-[44px] shadow-2xl hover:shadow-white/30 transition-all duration-300 group rounded-full w-full sm:w-auto"
                onClick={() => window.location.href = 'https://app.paidin.io'}
              >
                Get Started Free
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/60 text-white hover:bg-white hover:text-bitcoin font-black px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg h-auto min-h-[44px] backdrop-blur-sm transition-all duration-300 rounded-full w-full sm:w-auto"
              >
                <Calendar className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default memo(FinalCTA);
