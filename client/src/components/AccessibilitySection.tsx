import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Zap, Sparkles, CheckCircle2, X, Check, Brain, Layout, Headphones, DollarSign, Wallet, Settings, MousePointerClick, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, memo } from "react";

const features = [
  {
    title: "Zero PhD Required",
    description: "Seriously. You don't need to know what a blockchain is. Just click buttons and pay people. We handle the wizardry behind the curtain.",
    icon: Brain,
    image: "/website-photos/carousel-feature-zero-phd-required.webp",
  },
  {
    title: "A Familiar Interface",
    description: "If you can use Slack or Excel, you can use PaidIn. No weird Bitcoin jargon, no confusing steps. Just familiar, clean design.",
    icon: Layout,
    image: "/website-photos/carousel-feature-familiar-design.webp",
  },
  {
    title: "Help Always Available",
    description: "Stuck? We've got your back. Our team actually answers your questions and won't leave you hanging with technical mumbo-jumbo.",
    icon: Headphones,
    image: "/website-photos/carousel-feature-support-team.webp",
  },
  {
    title: "Pay in USD or Bitcoin",
    description: "You think in dollars, we handle the Bitcoin conversion. Your employees get paid in Bitcoin, or vice versa. Everyone's happy. It's that simple.",
    icon: DollarSign,
    image: "/website-photos/carousel-feature-pay-usd-bitcoin.webp",
  },
  {
    title: "Easy Wallet Setup",
    description: "You hold the keys — We create wallets, manage channels, do all the scary stuff. Your team just opens their account and sees their Bitcoin payment.",
    icon: Wallet,
    image: "/website-photos/carousel-feature-easy-wallet-setup.webp",
  },
  {
    title: "Set it and forget it",
    description: "Taxes? Automated. Compliance? Automated. Reports? Automated. You focus on running your business, we handle the boring paperwork.",
    icon: Settings,
    image: "/website-photos/carousel-feature-set-forget.webp",
  },
];

function CountStepper({ start = 0, end = 1, duration = 1.2, className }: { start?: number; end?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!inView) return;
    setValue(start);
    const delta = end - start;
    if (delta === 0) return;

    let animationFrame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const next = Math.round(start + delta * progress);
      setValue(next);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

const phoneStates = [
  {
    key: "signup",
    title: "Sign up",
    subtitle: "Account creation",
    accent: "from-orange-500 to-amber-400",
    description: "Details submitted",
    icon: CheckCircle2,
  },
  {
    key: "invite",
    title: "Invite sent",
    subtitle: "Team notified",
    accent: "from-emerald-500 to-emerald-400",
    description: "Awaiting approval",
    icon: CheckCircle2,
  },
  {
    key: "success",
    title: "Paid!",
    subtitle: "BTC transfer complete",
    accent: "from-amber-500 to-yellow-400",
    description: "See ledger entry",
    icon: Sparkles,
  },
];

function AnimatedPhoneFlow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { margin: "-25% 0px", once: false });
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isInView) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setStepIndex((prev) => (prev + 1) % phoneStates.length);
        }, 2200);
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setStepIndex(0);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <div className="relative mx-auto rounded-[44px] border border-black/10 bg-gradient-to-br from-gray-100 via-white to-white shadow-[0_25px_60px_rgba(15,22,31,0.18)] overflow-hidden aspect-[9/16.5]">
        {/* Hardware details */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900/80 rounded-full"></div>
        <div className="absolute top-6 right-8 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-900/70"></div>
          <div className="w-4 h-4 rounded-full bg-gray-900/80"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/18 via-transparent to-orange-100/25 pointer-events-none"></div>

        <div className="relative h-full px-7 sm:px-8 pt-16 pb-14 flex flex-col">
          <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-[0.3em] mb-6">
            <span>Today</span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" /> PaidIn
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-between space-y-6">
            {phoneStates.map((state, idx) => {
              const isActive = idx === stepIndex;
              const Icon = state.icon;
              return (
                <motion.div
                  key={state.key}
                  animate={isActive ? "active" : "idle"}
                  variants={{
                    idle: { opacity: 0.18, scale: 0.95, y: 18 },
                    active: { opacity: 1, scale: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/85 backdrop-blur-lg shadow-[0_20px_45px_rgba(15,22,31,0.12)] px-6 py-5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/80 to-white/55 pointer-events-none"></div>
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${state.accent} text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{state.title}</p>
                        <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{state.subtitle}</p>
                        <p className="text-sm text-gray-500">{state.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-[0.3em]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="h-2 rounded-full bg-gray-200/70 overflow-hidden">
              <motion.div
                animate={{ width: `${((stepIndex + 1) / phoneStates.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[75%] h-24 bg-gradient-to-b from-orange-500/25 to-transparent blur-3xl"></div>
    </div>
  );
}

function CarouselFeatures() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[currentIndex];
  const IconComponent = currentFeature.icon;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 border border-orange-400/60 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-[1fr,1.2fr] gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 items-center"
          >
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden border border-gray-200/50 bg-gradient-to-br from-bitcoin/10 to-orange-500/10 aspect-[4/3]"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={currentFeature.image}
                    alt={currentFeature.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center order-1 lg:order-2 h-full">
              {/* Title at Top */}
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight"
              >
                {currentFeature.title}
              </motion.h4>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg lg:text-2xl text-white leading-relaxed font-light mb-6 sm:mb-8"
              >
                {currentFeature.description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Outside Card */}
      <div className="flex items-center justify-between mt-6 sm:mt-8">
        {/* Previous Button */}
        <button
          onClick={prevFeature}
          className="flex items-center gap-2 text-gray-600 hover:text-bitcoin transition-colors duration-200 group min-h-[44px] min-w-[44px] px-2"
          aria-label="Previous feature"
        >
          <ChevronLeft className="h-5 w-5 group-hover:translate-x-[-2px] transition-transform" />
          <span className="text-sm font-medium hidden sm:inline">Previous</span>
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                index === currentIndex
                  ? "w-8 h-1.5 bg-bitcoin rounded-full"
                  : "w-1.5 h-1.5 bg-gray-300 rounded-full hover:bg-bitcoin/50"
              }`}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextFeature}
          className="flex items-center gap-2 text-gray-600 hover:text-bitcoin transition-colors duration-200 group min-h-[44px] min-w-[44px] px-2"
          aria-label="Next feature"
        >
          <span className="text-sm font-medium hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-[2px] transition-transform" />
        </button>
      </div>
    </div>
  );
}

function AccessibilitySection() {
  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex items-center pb-32 lg:pb-48">
      {/* Top Transition Gradient - Extended bridge from Features (Black → Gray → Warm neutrals → White) */}
      <div className="absolute top-0 left-0 right-0 h-72 lg:h-96 pointer-events-none z-10">
        <div className="h-full bg-gradient-to-b from-black via-gray-900/45 via-gray-100/25 via-orange-50/40 to-transparent"></div>
      </div>
      
      {/* Accessibility Section Background Image */}
      <motion.img
        src="/website-photos/accessibility-section-background.webp"
        alt="Global accessibility map"
        className="absolute top-6 lg:top-12 left-0 right-0 mx-auto w-[90%] lg:w-[82%] max-w-6xl h-auto object-contain opacity-75 pointer-events-none z-0"
        initial={{ scale: 0.92 }}
        animate={{ scale: [0.92, 0.95, 0.92] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        loading="lazy"
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute top-20 left-0 w-96 h-96 bg-bitcoin/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-80 lg:pt-96 pb-40 w-full">
        
        {/* Main Headline - Refined */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center mb-8 px-4 py-2 rounded-full bg-bitcoin backdrop-blur-sm border border-white/60 gap-2">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase whitespace-nowrap">Built Intuitively</span>
          </div>

          <h2 className="mb-10 leading-[0.85] tracking-tight text-center">
            <span className="block text-[3.6rem] sm:text-[4.15rem] lg:text-[6rem] xl:text-[7rem] font-black text-gray-900">
              Built for <span className="text-bitcoin">everyone</span>
            </span>
            <span className="block mt-3 text-[2.6rem] sm:text-[3.35rem] lg:text-[4.65rem] xl:text-[5.4rem] font-light text-gray-600 italic">
              not just Bitcoin experts
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            PaidIn absorbs the Bitcoin complexity so you can onboard teams, run payroll, and close the books without a technical learning curve.
          </p>
        </motion.div>

        {/* Enhanced Myth vs Reality - More Dynamic */}
        <div className="relative mb-32">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-0 lg:gap-12">
              {/* Left: Myth - Enhanced Contrast */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                className="relative rounded-3xl lg:rounded-r-none shadow-[0_0_45px_rgba(239,68,68,0.35),0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_65px_rgba(239,68,68,0.45),0_0_25px_rgba(239,68,68,0.5)] transition-shadow duration-300"
              >
                <div className="relative bg-gradient-to-br from-gray-50 via-gray-100/80 to-gray-50/50 p-12 lg:p-16 rounded-3xl lg:rounded-r-none border-2 border-gray-300/50 shadow-lg">
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-8">
                    <motion.div
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center border-2 border-red-500/30 shadow-md"
                    >
                      <X className="h-7 w-7 text-red-600" strokeWidth={3} />
                    </motion.div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">The Myth</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-6xl font-black text-gray-900 leading-[0.95] mb-6 tracking-tight">
                    Bitcoin requires
                    <br />
                    <span className="text-gray-600">technical expertise 🫠</span>
                  </h3>
                  
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-lg">
                    You need to understand wallets, keys, blockchain, and complex technology.
                  </p>
                  
                  {/* Enhanced Decorative Element */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-8 right-8 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"
                  ></motion.div>
                </div>
                </div>
              </motion.div>

              {/* Center Divider - VS - Enhanced */}
              <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-white border-4 border-bitcoin shadow-2xl flex items-center justify-center relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-bitcoin/20 blur-xl -z-10"
                  ></motion.div>
                  <span className="text-sm font-black text-bitcoin">VS</span>
                </motion.div>
              </div>

              {/* Right: Reality - Enhanced Visual Impact */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                className="relative rounded-3xl lg:rounded-l-none shadow-[0_0_45px_rgba(16,185,129,0.32),0_0_15px_rgba(16,185,129,0.38)] hover:shadow-[0_0_65px_rgba(16,185,129,0.45),0_0_25px_rgba(16,185,129,0.5)] transition-shadow duration-300"
              >
                <div className="relative bg-gradient-to-br from-bitcoin/15 via-orange-500/15 to-orange-400/10 p-12 lg:p-16 rounded-3xl lg:rounded-l-none border-2 border-bitcoin/30 lg:border-l-0 shadow-xl">
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl"
                    >
                      <Check className="h-7 w-7 text-white" strokeWidth={3} />
                    </motion.div>
                    <span className="text-xs font-bold text-bitcoin uppercase tracking-[0.2em]">The Reality</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-6xl font-black text-gray-900 leading-[0.95] mb-6 tracking-tight">
                    It's as simple
                    <br />
                    <span className="text-bitcoin">as clicking a button ✌🏼</span>
                  </h3>
                  
                  <p className="text-lg lg:text-xl text-gray-800 leading-relaxed font-light max-w-lg">
                    PaidIn handles all the complexity. You just add employees, set amounts, and click "Pay."
                  </p>
                  
                  {/* Enhanced Decorative Element */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-8 right-8 w-40 h-40 bg-bitcoin/20 rounded-full blur-3xl"
                  ></motion.div>
                </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Narrative Journey - Vertical Timeline Flow */}
        <div className="relative mb-32">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <div className="flex items-center justify-center gap-5 sm:gap-9 lg:gap-11">
                <motion.span
                  className="block text-[10rem] sm:text-[12rem] lg:text-[14rem] xl:text-[15rem] font-black leading-none text-gray-900/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CountStepper start={1} end={3} duration={1.2} className="block" />
                </motion.span>
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-left"
                >
                  <span className="block text-gray-400/80 text-sm sm:text-base font-semibold tracking-[0.35em] uppercase mb-3 text-center sm:text-left">
                    Simple steps
                  </span>
                  <h3 className="text-4xl sm:text-[2.9rem] lg:text-[3.75rem] xl:text-[4.75rem] font-black text-gray-900 leading-tight">
                    to <span className="text-bitcoin">get started</span>
                  </h3>
                </motion.div>
              </div>
            </motion.div>

            {/* Vertical Timeline Flow */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
            <div className="relative">
              {/* Vertical Line */}
                  <div className="absolute left-8 top-[-40px] bottom-0 hidden lg:flex items-stretch pointer-events-none z-0">
                    <div className="relative w-[3px] h-full rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/70 to-black/0"></div>
                    </div>
                  </div>
              
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                    className="relative flex items-start gap-8 mb-20 lg:mb-28"
              >
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl -z-10 transform rotate-3"></div>
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    Sign up in minutes
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                        A simple wallet setup, no technical configuration. Just create your account and you're ready.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative flex items-start gap-8 mb-20 lg:mb-28"
              >
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-3"
                  >
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl -z-10 transform -rotate-3"></div>
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    Add your team
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                    Set amounts in USD or Bitcoin. Our platform handles all the complexity behind the scenes.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-start gap-8"
              >
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3"
                  >
                    <MousePointerClick className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl -z-10 transform rotate-3"></div>
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    Click "Pay"
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                    Your team gets automatically paid in USD or Bitcoin. No technical knowledge required.
                  </p>
                </div>
              </motion.div>
                </div>

                {/* Right Column Phone Graphic */}
                <div className="flex justify-center lg:justify-end">
                  <AnimatedPhoneFlow className="w-full max-w-[23.5rem] sm:max-w-[24rem] lg:max-w-[22.5rem] xl:max-w-[23rem]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Feature Showcase */}
        <div className="relative">
          <div className="max-w-7xl mx-auto">
            {/* Carousel Component */}
            <CarouselFeatures />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 lg:mt-12 text-center relative z-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-bitcoin/30"></div>
            <div className="h-px w-12 bg-bitcoin/30"></div>
          </div>
          <p className="text-xl lg:text-2xl text-gray-700 font-light mb-8 max-w-2xl mx-auto">
            Start running your business on the soundest money to ever exist.
            <br />
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-bitcoin hover:from-bitcoin hover:to-orange-500 text-white font-bold px-12 py-6 text-lg h-auto shadow-2xl hover:shadow-bitcoin/50 transition-all duration-300 rounded-full group"
              style={{ backgroundColor: '#f7931a' }}
              onClick={() => window.location.href = 'https://app.paidin.io'}
            >
              Get Started Free
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Slow Section Transition - Bottom (White → Midnight Blue) */}
      <div className="absolute bottom-0 left-0 right-0 h-80 lg:h-[500px] pointer-events-none z-10">
        <div className="h-full bg-gradient-to-b from-transparent via-[#0a1323]/35 via-[#070e1d]/55 to-[#050a14]"></div>
      </div>
    </section>
  );
}

export default memo(AccessibilitySection);
