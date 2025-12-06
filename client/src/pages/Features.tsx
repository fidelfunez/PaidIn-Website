import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
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
  CreditCard,
  FileText,
  Settings,
  Lock,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  Building2,
  Layers,
  Sparkles,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Component for animated text with fade-in and slide-up effect
function AnimatedText({ text, className, delay = 0, highlightWords = [] }: { text: string; className?: string; delay?: number; highlightWords?: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Split text into words for word-by-word animation
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => {
        const shouldHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        const isHighlighted = shouldHighlight;
        
        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              delay: delay + (index * 0.1),
              ease: [0.22, 1, 0.36, 1]
            }}
            className={isHighlighted ? "text-bitcoin" : ""}
          >
            {word}
            {index < words.length - 1 && " "}
          </motion.span>
        );
      })}
    </span>
  );
}

const mainFeatures = [
  {
    id: "payroll",
    number: "01",
    title: "Payroll",
    subtitle: "Pay your team in Bitcoin",
    description: "Automated, instant, secure. Set up recurring payments and never worry about delays again.",
    image: "/website-photos/features-payroll.webp",
    bullets: [
      "Instant global payments",
      "Multi-sig security",
      "Auto tax withholding",
      "Automated payments",
      "Multi-currency support",
      "Employee self-service portal"
    ],
    layout: "left" // content left, image right
  },
  {
    id: "accounting",
    number: "02",
    title: "Accounting",
    subtitle: "Complete Accounting",
    description: "Enterprise-grade accounting infrastructure built for Bitcoin. Track, reconcile, and manage your financial operations with precision.",
    image: "/website-photos/features-accounting.webp",
    bullets: [
      "Real-time tracking",
      "Automatic categorization",
      "Financial reconciliation",
      "Export to any software",
      "Double-entry bookkeeping",
      "Reporting & analytics"
    ],
    layout: "right" // image left, content right
  },
  {
    id: "compliance",
    number: "03",
    title: "Compliance",
    subtitle: "Automated Compliance",
    description: "Regulatory compliance and reporting for US and Canadian operations. Automated, accurate, always up-to-date.",
    image: "/website-photos/features-compliance.webp",
    bullets: [
      "Automated reporting",
      "Audit-ready records",
      "Regulatory compliance",
      "Multi-jurisdiction support",
      "KYC/AML integration",
      "Compliance dashboard"
    ],
    layout: "left"
  },
  {
    id: "tax",
    number: "04",
    title: "Tax & Reporting",
    subtitle: "Automated Calculation",
    description: "Precise tax calculations and comprehensive reporting. Generate compliance-ready documents with one click.",
    image: "/website-photos/features-taxes.webp",
    bullets: [
      "Precise tax calculations",
      "Compliance-ready docs",
      "Comprehensive reporting",
      "Multi-jurisdiction tax supp.",
      "Automated filing reminders",
      "Tax optimization insights"
    ],
    layout: "right"
  },
  {
    id: "invoicing",
    number: "05",
    title: "Invoicing",
    subtitle: "Professional Invoices",
    description: "Create, send, and track Bitcoin invoices. Streamlined billing in Bitcoin with automated follow-ups.",
    image: "/website-photos/features-invoicing.webp",
    bullets: [
      "Create & send invoices",
      "Track payment status",
      "Automated follow-ups",
      "Customizable templates",
      "Multi-currency invoicing",
      "Payment reminders"
    ],
    layout: "left"
  },
];

const additionalFeatures = [
  {
    icon: CreditCard,
    title: "Expense Mgmt.",
    description: "Track and manage business expenses with automatic categorization and workflows.",
    color: "from-orange-400/20 to-orange-500/20"
  },
  {
    icon: FileText,
    title: "Financial Reporting",
    description: "Comprehensive financial reports and analytics. Real-time insights into your business operations.",
    color: "from-bitcoin/20 to-orange-500/20"
  },
  {
    icon: Settings,
    title: "API & Integrations",
    description: "Connect with your existing tools. RESTful API and webhooks for seamless integrations.",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: Lock,
    title: "Multi-Sig Wallets",
    description: "Enterprise-grade security with multi-sig wallets. Your keys, your Bitcoin, always.",
    color: "from-bitcoin/20 to-orange-600/20"
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description: "Complete Bitcoin education resources. Help your team learn and understand Bitcoin easily.",
    color: "from-orange-400/20 to-orange-600/20"
  },
  {
    icon: MessageSquare,
    title: "Internal Messaging",
    description: "Built-in messaging for direct communication between admins, managers, and teams.",
    color: "from-bitcoin/20 to-orange-400/20"
  },
  {
    icon: Clock,
    title: "Real-Time Sync",
    description: "All transactions sync in real-time. Always up-to-date, always accurate.",
    color: "from-orange-400/20 to-orange-600/20"
  },
  {
    icon: DollarSign,
    title: "Multi-Currency Supp.",
    description: "Support for multiple currencies with automatic conversion and reporting.",
    color: "from-bitcoin/20 to-orange-400/20"
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant settlements. No waiting days for payments to clear.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Non-custodial architecture. Your keys, your Bitcoin, always.",
  },
  {
    icon: Globe,
    title: "Global by Default",
    description: "Borderless operations. Pay anyone, anywhere, instantly.",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale",
    description: "Enterprise-grade infrastructure that grows with your business.",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);
  const featureRefs = useRef<(HTMLElement | null)[]>([]);
  const dashboardOverviewRef = useRef<HTMLElement | null>(null);
  const andMoreSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveFeature(index);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(ref);
      return observer;
    });

    // Track visibility of progress indicator based on scroll position
    // Show indicator when we've scrolled past dashboard overview photo
    // and hide when we reach "And More" section
    const handleScroll = () => {
      if (dashboardOverviewRef.current && andMoreSectionRef.current) {
        const dashboardRect = dashboardOverviewRef.current.getBoundingClientRect();
        const andMoreRect = andMoreSectionRef.current.getBoundingClientRect();
        
        // Find the photo element within dashboard overview (the image)
        const dashboardImage = dashboardOverviewRef.current.querySelector('img');
        if (dashboardImage) {
          const imageRect = dashboardImage.getBoundingClientRect();
          
          // Show indicator if we've scrolled past the photo (photo is above viewport)
          // and before "And More" section (section hasn't reached viewport yet)
          const pastPhoto = imageRect.bottom < 0;
          const beforeAndMore = andMoreRect.top > window.innerHeight;
          
          setShowProgressIndicator(pastPhoto && beforeAndMore);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Features - Run Your Business Entirely on Bitcoin | PaidIn"
        description="Complete Bitcoin business operations platform. Payroll, accounting, invoicing, compliance, expenses, and more - all powered by Bitcoin. No technical knowledge required."
        canonical="https://www.paidin.io/features"
      />
      <div className="relative">
      {/* Hero Section - Feature-Focused */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Background Video */}
          <video
            src="/website-videos/features-page-cta-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/website-photos/features-page-cta-video-poster.png"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            style={{ willChange: 'transform' }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(247,147,26,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(247,147,26,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          
          {/* Feature Annotations - Business Operations Focused */}
          <div className="absolute inset-0 opacity-[0.2]">
            {/* Feature Labels */}
            <div className="absolute top-[18%] left-[10%] transform -rotate-6 text-bitcoin/40 text-sm font-semibold">
              Payroll
            </div>
            <div className="absolute top-[25%] right-[12%] transform rotate-3 text-bitcoin/40 text-sm font-semibold">
              Accounting
            </div>
            <div className="absolute top-[45%] left-[8%] transform rotate-6 text-bitcoin/40 text-sm font-semibold">
              Invoicing
            </div>
            <div className="absolute top-[55%] right-[15%] transform -rotate-3 text-bitcoin/40 text-sm font-semibold">
              Compliance
            </div>
            <div className="absolute bottom-[30%] left-[12%] transform rotate-12 text-bitcoin/40 text-sm font-semibold">
              Tax & Reporting
            </div>
            <div className="absolute bottom-[20%] right-[10%] transform -rotate-6 text-bitcoin/40 text-sm font-semibold">
              Dashboard
            </div>
            
            {/* Business Metrics */}
            <div className="absolute top-[35%] left-[25%] transform -rotate-12 text-orange-500/30 text-xs font-mono">
              <div>BTC: 100%</div>
              <div>Fees: 0%</div>
            </div>
            <div className="absolute top-[60%] right-[25%] transform rotate-6 text-orange-500/30 text-xs font-mono">
              <div>Payroll: ✓</div>
              <div>Invoices: ✓</div>
            </div>
            
            {/* Feature Icons/Shapes */}
            <div className="absolute top-[20%] left-[30%] transform rotate-45">
              <svg width="50" height="50" className="text-bitcoin/20">
                <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" rx="4"/>
                <line x1="15" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1"/>
                <line x1="15" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="1"/>
                <line x1="15" y1="30" x2="35" y2="30" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
            <div className="absolute bottom-[35%] right-[30%] transform -rotate-30">
              <svg width="60" height="60" className="text-bitcoin/20">
                <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M 20 30 L 27 37 L 40 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            
            {/* Currency Symbols */}
            <div className="absolute top-[50%] left-[20%] text-bitcoin/25 text-2xl font-bold">
              ₿
            </div>
            <div className="absolute bottom-[40%] right-[20%] text-bitcoin/25 text-2xl font-bold">
              ₿
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 opacity-10" style={{ pointerEvents: 'none' }}>
              <line x1="15%" y1="20%" x2="25%" y2="35%" stroke="rgba(247,147,26,0.3)" strokeWidth="1" strokeDasharray="3,3"/>
              <line x1="85%" y1="25%" x2="75%" y2="60%" stroke="rgba(247,147,26,0.3)" strokeWidth="1" strokeDasharray="3,3"/>
              <line x1="12%" y1="45%" x2="20%" y2="50%" stroke="rgba(247,147,26,0.3)" strokeWidth="1" strokeDasharray="3,3"/>
            </svg>
          </div>
          
          {/* Animated Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-bitcoin/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.12, 0.22, 0.12],
              x: [0, 30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-bitcoin/15 rounded-full blur-[110px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-40 h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-6 px-8 py-3 rounded-full border-2 border-bitcoin/30 bg-bitcoin/10 backdrop-blur-sm text-white/90 text-xs uppercase tracking-[0.35em] font-semibold shadow-lg shadow-bitcoin/20"
            >
              <Grid3x3 className="h-4 w-4 text-bitcoin" />
              Features
              <span className="text-bitcoin/40">│</span>
              Everything You Need
            </motion.div>

            <div className="relative inline-block mb-10">
              <span className="absolute -inset-x-12 -top-10 text-[5rem] sm:text-[5.5rem] lg:text-[7.5rem] font-black uppercase tracking-[0.4em] text-white/5 blur-[3px] pointer-events-none select-none">
                FEATURES
              </span>
              <h1 className="relative text-[2.9rem] sm:text-[3.5rem] lg:text-[5.2rem] font-black text-white leading-[1.05] tracking-tight max-w-6xl mx-auto px-4">
                <span className="block text-[3.4rem] sm:text-[4.2rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.05] whitespace-nowrap">
                  <AnimatedText
                    text="Run your business"
                    delay={0.2}
                  />
                </span>
                <span className="block text-[3.4rem] sm:text-[4.2rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.05] whitespace-nowrap mt-2">
                  <AnimatedText
                    text="entirely on Bitcoin"
                    delay={0.6}
                    highlightWords={["Bitcoin"]}
                  />
                </span>
              </h1>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 -bottom-4 h-px w-[70%] -translate-x-1/2 origin-left bg-gradient-to-r from-transparent via-bitcoin to-transparent"
              />
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/75 max-w-4xl mx-auto leading-relaxed font-light">
              Payroll, accounting, invoicing, compliance, and more—all powered by Bitcoin. <br /> No hurdles. No limitations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section ref={(el) => { dashboardOverviewRef.current = el as HTMLElement; }} className="relative overflow-hidden bg-black text-white min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-bitcoin/20 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Layers className="h-5 w-5 text-bitcoin" />
              <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">Platform Overview</span>
              <div className="h-px w-12 bg-bitcoin/30"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight max-w-4xl">
              <span className="block">One platform</span>
              <span className="block text-bitcoin">Infinite Possibilities</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/70 max-w-4xl leading-relaxed font-light">
              <span className="block whitespace-nowrap">A unified dashboard that brings all your business operations together.</span>
              <span className="block">See everything at a glance.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <img
                src="/website-photos/features-page-hero.webp"
                alt="PaidIn Dashboard - Complete Business Operations Platform"
                className="w-full h-full object-cover"
                style={{ 
                  transform: 'scale(1.1) translateX(1%) translateY(-2%)',
                  transformOrigin: 'center center',
                  objectPosition: '50% center',
                  imageRendering: '-webkit-optimize-contrast'
                }}
                loading="eager"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-bitcoin/20 to-orange-500/20 rounded-3xl blur-2xl -z-10 opacity-50"></div>
          </motion.div>
        </div>
      </section>

      {/* Progress Indicator - Fixed Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: showProgressIndicator ? 1 : 0,
          x: showProgressIndicator ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block pointer-events-none"
        style={{ pointerEvents: showProgressIndicator ? 'auto' : 'none' }}
      >
        <div className="flex flex-col gap-4">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                featureRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-bitcoin w-3 h-3 shadow-lg shadow-bitcoin/50'
                    : 'bg-white/30 group-hover:bg-white/50'
                }`}
                animate={{
                  scale: activeFeature === index ? 1.2 : 1,
                }}
              />
              <motion.span
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeFeature === index
                    ? 'text-bitcoin opacity-100'
                    : 'text-white/40 group-hover:text-white/60 opacity-0 group-hover:opacity-100'
                }`}
                animate={{
                  opacity: activeFeature === index ? 1 : 0,
                }}
              >
                {feature.number}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Features - Detailed */}
      {mainFeatures.map((feature, index) => {
        const isLeft = feature.layout === "left";
        return (
          <section 
            key={feature.id} 
            ref={(el) => { featureRefs.current[index] = el as HTMLElement; }}
            className="relative overflow-hidden bg-black text-white min-h-screen flex items-center"
          >
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

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full z-10">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isLeft ? '' : 'lg:grid-flow-dense'}`}>
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className={isLeft ? '' : 'lg:col-start-2'}
                >
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="text-6xl lg:text-8xl font-black text-orange-400/15 leading-none">{feature.number}</span>
                    <div className="h-px w-16 bg-orange-400/30"></div>
                    <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">{feature.title}</span>
                  </div>
                  
                  <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-8 tracking-tight">
                    {feature.subtitle.split(' ').map((word, i) => {
                      const cleanWord = word.replace(/[.,!?;:]$/, '').toLowerCase();
                      const isHighlighted = cleanWord === 'bitcoin' || cleanWord.includes('bitcoin') || 
                                           cleanWord === 'accounting' || cleanWord === 'compliance' || 
                                           cleanWord === 'calculation' || cleanWord === 'invoices';
                      return (
                      <span key={i}>
                          {isHighlighted ? (
                          <span className="text-bitcoin">{word}</span>
                        ) : i === 0 ? (
                          <span>{word}</span>
                        ) : (
                          <span className="text-white/60">{word}</span>
                        )}
                        {i < feature.subtitle.split(' ').length - 1 && ' '}
                      </span>
                      );
                    })}
                  </h2>
                  
                  <p className="text-xl lg:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12 font-light">
                    {feature.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <motion.div
                        key={bullet}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + bulletIndex * 0.05 }}
                        className="flex items-center gap-3 text-lg text-white/70"
                      >
                        <CheckCircle2 className="h-5 w-5 text-bitcoin flex-shrink-0" />
                        <span>{bullet}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 60 : -60, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className={isLeft ? '' : 'lg:col-start-1 lg:row-start-1'}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-bitcoin/10 to-orange-500/10 backdrop-blur-sm shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={feature.image}
                        alt={`${feature.title} Dashboard`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Additional Features Grid */}
      <section ref={(el) => { andMoreSectionRef.current = el as HTMLElement; }} className="relative overflow-hidden bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle grid pattern with orange accents */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(247,147,26,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(247,147,26,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Animated orange orbs for depth */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-bitcoin/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.12, 0.08],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full z-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-bitcoin/30"></div>
              <Sparkles className="h-5 w-5 text-bitcoin" />
              <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">And More</span>
              <div className="h-px w-12 bg-bitcoin/30"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight max-w-4xl mx-auto">
              Everything else you{" "}
              <span className="text-bitcoin">need</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light">
              Additional features that make PaidIn the complete platform for Bitcoin business operations.
            </p>
          </motion.div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Connecting lines - hidden on mobile */}
            <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}>
              <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
              <line x1="37.5%" y1="50%" x2="62.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
              <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
            </svg>
            
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/5 px-8 py-8 backdrop-blur-[2px] transition-all duration-500 hover:border-bitcoin/60 hover:bg-white/10 group"
                  variants={{
                    default: {},
                    hover: {}
                  }}
                  whileHover="hover"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-bitcoin/0 to-orange-500/0 rounded-[30px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
                  
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-bitcoin/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <div className="relative flex flex-col gap-5 z-10">
                    {/* Enhanced icon with pulse animation - animates on card hover */}
                    <motion.div
                      className={`flex h-12 w-12 items-center justify-center rounded-[22px] border border-white/15 bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-bitcoin/30 transition-transform duration-300`}
                      variants={{
                        default: { scale: 1, rotate: 0 },
                        hover: { scale: 1.1, rotate: 5 }
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-bitcoin leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
        {/* Background Video */}
        <video
          src="/website-videos/features-page-why-paidin-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ willChange: 'transform' }}
        />
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/80"></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-0 w-96 h-96 bg-bitcoin/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-48 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 lg:mb-32"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-xs text-gray-400 font-light tracking-[0.4em] uppercase">
                Why PaidIn
              </span>
              <div className="h-px flex-1 max-w-24 bg-gray-300"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight max-w-5xl">
              Built for{" "}
              <span className="text-bitcoin">Enterprise</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-bitcoin/20 mb-6 shadow-lg">
                    <Icon className="h-8 w-8 text-bitcoin" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: `url('/website-photos/features-page-hero-image.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Orange Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/40 to-orange-500/30"></div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-bitcoin/20 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-bitcoin" />
              <span className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase">Get Started</span>
            </div>
            
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-[0.95] tracking-tight">
              Ready to build{" "}
              <span className="text-bitcoin">on Bitcoin?</span>
            </h2>
            <p className="text-xl lg:text-2xl xl:text-3xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Join forward-thinking companies running their operations entirely on Bitcoin. No compromises. No limits.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
                className="bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white font-black px-12 py-7 text-lg lg:text-xl h-auto shadow-2xl hover:shadow-bitcoin/50 hover:scale-105 transition-all duration-300 rounded-full group"
              onClick={() => window.location.href = 'https://app.paidin.io'}
            >
              Start Building on Bitcoin
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
              <Button
                size="lg"
                className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 hover:text-white font-semibold px-10 py-7 text-lg h-auto transition-all duration-300 rounded-full backdrop-blur-sm"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Demo
            </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
