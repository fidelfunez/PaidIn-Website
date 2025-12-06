import { motion } from "framer-motion";
import { memo } from "react";
import { 
  Bitcoin, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3,
  ArrowRight,
  Calculator,
  Receipt,
  Grid3x3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  {
    text: "If you don't believe me or don't get it, I don't have time to try to convince you, sorry.",
    author: "Satoshi Nakamoto"
  },
  {
    text: "Running Bitcoin is the most fun you can have with your computer.",
    author: "Hal Finney"
  },
  {
    text: "Bitcoin is the first monetary network that is completely digital, completely global, and completely decentralized.",
    author: "Michael Saylor"
  },
  {
    text: "Bitcoin is not just a currency, it's a new form of money that is native to the internet.",
    author: "Andreas Antonopoulos"
  }
];

function Features() {
  return (
    <section className="relative overflow-hidden bg-black text-white min-h-screen flex items-center">
      {/* Bitcoin Quotes Ticker - Separator between Hero and Features */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 bg-bitcoin overflow-hidden z-20"
      >
        <div className="relative z-20 h-12 sm:h-10 flex items-center overflow-hidden">
          <div className="flex items-center space-x-6 sm:space-x-10 animate-scroll">
            {/* Render quotes twice for seamless loop */}
            {[...quotes, ...quotes].map((quote, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-2.5 whitespace-nowrap">
                <img 
                  src="/app - graphic designs/Bitcoin - logo - yellow.webp" 
                  alt="Bitcoin" 
                  className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0"
                />
                <span 
                  className="text-white/90 text-xs sm:text-sm font-semibold"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  "{quote.text}" — {quote.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Animated Gradient Mesh Background - More Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-bitcoin/20 rounded-full blur-[120px]"
        />
        {/* Orange spot - Top, above first feature */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-1/3 w-[700px] h-[700px] bg-orange-500/15 rounded-full blur-[100px]"
        />
        {/* Orange spot - Between Accounting screenshot and content (Feature 2) */}
        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[30%] left-1/3 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[105px]"
        />
        {/* Orange spot - Between second and third features */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 70, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/4 w-[650px] h-[650px] bg-orange-500/15 rounded-full blur-[110px]"
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
            ease: "linear"
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[100px]"
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(247, 147, 26, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(247, 147, 26, 0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full pt-56">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-bitcoin/30"></div>
            <Grid3x3 className="h-5 w-5 text-bitcoin" />
            <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">Everything You Need</span>
            <div className="h-px w-12 bg-bitcoin/30"></div>
          </div>
          
          <h2 className="text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tight max-w-6xl mx-auto">
            <span className="block text-white/70">The Business Ops</span>
            <span className="block text-5xl lg:text-6xl xl:text-7xl text-bitcoin font-light mt-2">
              platform for Bitcoin
            </span>
          </h2>
        </motion.div>

        {/* Dashboard Screenshot - Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-32 lg:mb-40"
        >
          <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <img
                src="/website-photos/features-banner-image.webp"
                alt="PaidIn Dashboard - Complete Business Operations Platform"
                className="w-full h-full object-cover"
                style={{ 
                  transform: 'scale(1.25) translateX(1%) translateY(-2%)',
                  transformOrigin: 'center center',
                  objectPosition: '50% center'
                }}
                loading="lazy"
              />
            </div>
            
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-bitcoin/20 to-orange-500/20 rounded-3xl blur-2xl -z-10 opacity-50"></div>
          </div>
        </motion.div>

        {/* Feature 1: Payroll - Content Left, Image Right */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr,1.3fr] gap-12 lg:gap-20 items-center mb-32"
        >
          {/* Left: Content */}
          <div className="relative pl-0 lg:pl-0">
            <div className="relative z-10 pl-0">
              {/* Elegant Badge with Connector */}
              <div className="inline-flex items-center gap-3 mb-6 relative z-10">
                <span className="text-6xl lg:text-8xl font-black text-orange-400/15 leading-none">01</span>
                <div className="h-px w-16 bg-orange-400/30"></div>
                <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">Payroll</span>
          </div>
          
              <h2 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight relative z-10">
                Pay your team
                <br />
                <span className="text-bitcoin">in Bitcoin</span>
            <br />
                <span className="text-5xl lg:text-6xl text-white/60">instantly, globally</span>
          </h2>
          
              <p className="text-xl lg:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
                Automated, instant, secure. Set up recurring payments and never worry about delays again.
              </p>

              {/* Features List - Bullet Points */}
              <div className="space-y-3 relative z-10">
                {[
                  "Instant global payments",
                  "Multi-sig security",
                  "Auto tax withholding",
                  "Automated recurring payments"
                ].map((feature, index) => (
          <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 text-lg text-white/70"
                  >
                    <div className="w-1.5 h-1.5 bg-bitcoin rounded-full"></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
                        </div>
                    </div>
                  </div>
                  
          {/* Right: Screenshot Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-bitcoin/10 to-orange-500/10 backdrop-blur-sm shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/website-photos/features-payroll.webp"
                  alt="Payroll Dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
          </motion.div>

        {/* Feature 2: Accounting - Image Left, Content Right */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1.3fr,1fr] gap-12 lg:gap-20 items-center mb-32"
        >
          {/* Left: Screenshot Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange-400/10 to-orange-500/10 backdrop-blur-sm shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/website-photos/features-accounting.webp"
                  alt="Accounting Dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="relative pr-0 lg:pr-0 text-right">
            <div className="relative z-10 pr-0">
              {/* Elegant Badge with Connector - Right aligned */}
              <div className="inline-flex items-center gap-3 mb-6 relative z-10 lg:justify-start justify-end">
                <span className="text-orange-400 text-sm font-bold tracking-[0.2em] uppercase">Accounting</span>
                <div className="h-px w-16 bg-orange-400/30"></div>
                <span className="text-6xl lg:text-8xl font-black text-orange-400/15 leading-none">02</span>
              </div>
              
              <h2 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight relative z-10">
                Complete
                <br />
                <span className="text-orange-400">financial</span>
                <br />
                <span className="text-5xl lg:text-6xl text-white/60">accounting</span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-white/70 max-w-2xl ml-auto leading-relaxed mb-12 font-light relative z-10">
                Enterprise-grade accounting infrastructure built for Bitcoin. Track, reconcile, and manage your financial operations with precision.
              </p>

              {/* Features List - Bullet Points */}
              <div className="space-y-3 relative z-10 text-right">
                {[
                  "Real-time transaction tracking",
                  "Automatic categorization",
                  "Complete financial reconciliation",
                  "Export to accounting software"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 text-lg text-white/70 justify-end"
                  >
                    <span>{feature}</span>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature 3: Compliance - Content Left, Image Right */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-[1fr,1.4fr] gap-12 lg:gap-20 items-center mb-32"
        >
          {/* Left: Content */}
          <div className="relative pl-0 lg:pl-0">
            <div className="relative z-10 pl-0">
              {/* Elegant Badge with Connector */}
              <div className="inline-flex items-center gap-3 mb-6 relative z-10">
                <span className="text-6xl lg:text-8xl font-black text-orange-400/15 leading-none">03</span>
                <div className="h-px w-16 bg-orange-400/30"></div>
                <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">Compliance</span>
              </div>
              
              <h2 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight relative z-10">
                Automated
                <br />
                <span className="text-bitcoin">compliance</span>
                <br />
                <span className="text-5xl lg:text-6xl text-white/60">US & Canada</span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12 font-light relative z-10">
                Regulatory compliance and reporting for US and Canadian operations. Automated, accurate, always up-to-date.
              </p>

              {/* Features List - Bullet Points */}
              <div className="space-y-3 relative z-10">
                {[
                  "Automated tax reporting",
                  "Audit-ready records",
                  "Regulatory compliance",
                  "Multi-jurisdiction support"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 text-lg text-white/70"
                  >
                    <div className="w-1.5 h-1.5 bg-bitcoin rounded-full"></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Screenshot Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-bitcoin/10 to-orange-600/10 backdrop-blur-sm shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/website-photos/features-compliance.webp"
                  alt="Compliance Dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
          </motion.div>

        {/* Feature 4 & 5: Side by Side with Images */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-32">
          {/* Feature 4: Tax Calculation & Reporting */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative"
          >
            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mb-8 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange-300/10 to-orange-400/10 backdrop-blur-sm shadow-xl"
            >
              <div className="aspect-[13/10] overflow-hidden">
                <img
                  src="/website-photos/features-taxes.webp"
                  alt="Tax Dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <div className="pt-4">
              {/* Elegant Badge with Connector */}
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="text-4xl lg:text-5xl font-black text-orange-300/15 leading-none">04</span>
                <div className="h-px w-12 bg-orange-300/30"></div>
                <span className="text-orange-300 text-xs font-bold tracking-[0.2em] uppercase">Tax & Reporting</span>
                </div>
                
              <h3 className="text-4xl lg:text-5xl font-black leading-[0.95] mb-6 tracking-tight">
                Automated tax
                <br />
                <span className="text-orange-300">calculation</span>
                </h3>
              
              <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
                Precise tax calculations and comprehensive reporting. Generate compliance-ready documents with one click.
              </p>

              {/* Features List - Bullet Points */}
              <div className="space-y-2">
                {[
                  "Precise tax calculations",
                  "Compliance-ready documents",
                  "Comprehensive reporting"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-base text-white/70"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature 5: Invoicing */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="relative"
          >
            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mb-8 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm shadow-xl"
            >
              <div className="aspect-[13/10] overflow-hidden">
                <img
                  src="/website-photos/features-invoicing.webp"
                  alt="Invoicing Dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <div className="pt-4">
              {/* Elegant Badge with Connector */}
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="text-4xl lg:text-5xl font-black text-orange-500/15 leading-none">05</span>
                <div className="h-px w-12 bg-orange-500/30"></div>
                <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">Invoicing</span>
                  </div>
                  
              <h3 className="text-4xl lg:text-5xl font-black leading-[0.95] mb-6 tracking-tight">
                Professional
                <br />
                <span className="text-orange-500">invoices</span>
                    </h3>
              
              <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
                Create, send, and track Bitcoin invoices. Streamlined billing in Bitcoin with automated follow-ups.
              </p>

              {/* Features List - Bullet Points */}
              <div className="space-y-2">
                {[
                  "Create & send invoices",
                  "Track payment status",
                  "Automated follow-ups"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-base text-white/70"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA - High-End */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 lg:mt-40 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-black px-12 py-5 text-lg lg:text-xl h-auto shadow-[0_20px_60px_rgba(247,147,26,0.4)] hover:shadow-[0_25px_80px_rgba(247,147,26,0.5)] transition-all duration-500 rounded-full group overflow-hidden border border-white/20"
              style={{
                backgroundSize: '200% 100%',
                backgroundColor: '#c2410c', // Darker orange for better shine visibility
              }}
              onClick={() => window.location.href = 'https://app.paidin.io'}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
              Start Building on Bitcoin
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-bitcoin to-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
            </Button>
          </motion.div>
        </motion.div>

      </div>
      
    </section>
  );
}

export default memo(Features);
