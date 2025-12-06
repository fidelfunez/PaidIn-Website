import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { 
  Bitcoin, 
  Target, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Hash characters for the scrambling effect
const hashChars = "0123456789abcdef";

// Component for hash-to-text animation
function HashToText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const generateScrambled = () =>
    text
      .split("")
      .map((char) => {
        if (!/[A-Za-z0-9]/.test(char)) return char;
        return hashChars[Math.floor(Math.random() * hashChars.length)];
      })
      .join("");

  const [displayText, setDisplayText] = useState(() => generateScrambled());
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;
      const iterations = 15;
      let iteration = 0;

      const interval = setInterval(() => {
        if (iteration < iterations) {
          const scrambled = generateScrambled();
          setDisplayText(scrambled.length === text.length ? scrambled : text);
          iteration++;
        } else {
          if (currentIndex < text.length) {
            const revealed = text.slice(0, currentIndex + 1);
            const remainingChars = text.slice(currentIndex + 1);
            const remaining = remainingChars
              .split("")
              .map((char) => {
                if (char === " ") return " ";
                return hashChars[Math.floor(Math.random() * hashChars.length)];
              })
              .join("");
            const finalText = revealed + remaining;
            setDisplayText(finalText.length === text.length ? finalText : text);
            currentIndex++;
          } else {
            setDisplayText(text);
            clearInterval(interval);
          }
        }
      }, 45);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [isInView, delay, text, hasStarted]);

  return <span ref={ref} className={className}>{displayText}</span>;
}

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

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Non-custodial by design. Your keys, your Bitcoin, always.",
    color: "from-bitcoin/30 to-orange-500/30",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for instant settlements, real-time operations.",
    color: "from-orange-500/30 to-amber-500/30",
  },
  {
    icon: Globe,
    title: "Global by Default",
    description: "Borderless operations. One platform, worldwide reach.",
    color: "from-blue-500/30 to-purple-500/30",
  },
  {
    icon: Target,
    title: "Enterprise Grade",
    description: "Built for scale. Trusted by forward-thinking companies.",
    color: "from-purple-500/30 to-pink-500/30",
  },
];

const milestones = [
  {
    year: "2024",
    title: "The Vision",
    description: "Born from frustration with technical barriers. We saw the future: Simple, clean, and easy Bitcoin-native business operations for everyone.",
    icon: Sparkles,
  },
  {
    year: "2025",
    title: "The Platform",
    description: "Launched the first comprehensive Bitcoin business platform. Payroll, accounting, taxes, invoicing, & compliance—all in one. No technical knowledge required.",
    icon: Building2,
  },
  {
    year: "Today",
    title: "The Movement",
    description: "Empowering all businesses worldwide to operate entirely on Bitcoin. We're building the infrastructure for the next economy—The Bitcoin Standard.",
    icon: TrendingUp,
  },
];

const stats = [
  { value: "100%", label: "Non-Custodial", icon: Lock },
  { value: "<4s", label: "Average Approval", icon: Zap },
  { value: "99.995%", label: "Uptime", icon: Shield },
  { value: "Global", label: "Coverage", icon: Globe },
];

const teamMembers = [
  {
    name: "Fidel Fúnez C.",
    role: "Founder & CEO",
    bio: "Bitcoin Maxi coding the future of BTC-powered Business Ops",
    image: "/website-photos/team-fidel.webp",
  },
  {
    name: "Daniela Cerna",
    role: "Co-founder & COO",
    bio: "Multitasking wizard driving PaidIn's vision to life",
    image: "/website-photos/team-daniela.webp",
  },
  {
    name: "Sean Fitzgerald",
    role: "Co-founder & CTO",
    bio: "Infrastructure guru fortifying PaidIn's BTC backbone",
    image: "/website-photos/team-sean.webp",
  },
  {
    name: "Cristy Bu-Leal",
    role: "Co-founder & CFO",
    bio: "Financial mastermind keeping PaidIn's numbers bulletproof",
    image: "/website-photos/team-cristy.webp",
  },
];

export default function About() {
  return (
    <div className="relative">
      <SEOHead 
        title="About PaidIn - Building the Future of Business on Bitcoin"
        description="Learn about PaidIn's mission to make Bitcoin-native business operations accessible to everyone. Meet our team of builders, thinkers, and Bitcoin believers."
        canonical="https://www.paidin.io/about"
      />
      {/* Hero Section - Editorial/Magazine Style */}
      <section className="relative overflow-hidden bg-black h-screen flex items-center">
        {/* Background Video with Orange Filter */}
        <div className="absolute inset-0 z-0">
          <video
            src="/website-videos/about-page-hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              willChange: 'transform',
              filter: 'hue-rotate(-100deg) saturate(1.4) brightness(0.9)'
            }}
          />
        </div>
        
        {/* Strong Orange-Red Tint Overlay - Aggressive color shift */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 100, 0, 0.5) 0%, rgba(255, 69, 0, 0.45) 50%, rgba(255, 100, 0, 0.5) 100%)',
            mixBlendMode: 'color'
          }}
        ></div>
        
        {/* Strong Orange Enhancement - Bitcoin orange (#F7931A) */}
        <div 
          className="absolute inset-0 z-[2]" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(247, 147, 26, 0.35) 0%, rgba(255, 140, 0, 0.3) 50%, rgba(247, 147, 26, 0.35) 100%)',
            mixBlendMode: 'multiply'
          }}
        ></div>
        
        {/* Additional Red-Orange Boost */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/25 via-orange-500/20 to-orange-600/25 z-[2.5]" style={{ mixBlendMode: 'overlay' }}></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-[3]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full z-10">
          {/* Centered Title Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-8"
            >
              {/* Editorial Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center gap-4 mb-6"
              >
              <div className="h-px w-12 bg-white/30"></div>
              <span className="text-xs text-white font-light tracking-[0.4em] uppercase">
                  About PaidIn
                </span>
              <div className="h-px w-12 bg-white/30"></div>
              </motion.div>

              {/* Large Editorial Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight max-w-6xl mx-auto mb-6">
              <AnimatedText
                text="Building the Future of Business on Bitcoin"
                delay={0.2}
                highlightWords={["Future", "Bitcoin"]}
              />
              </h1>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl lg:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-8"
            >
              We're building the infrastructure that makes Bitcoin-native business operations accessible to everyone.
            </motion.p>

              {/* Elegant Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-32 bg-gradient-to-r from-transparent via-bitcoin to-transparent origin-center mx-auto"
              />
            </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Editorial Style */}
      <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
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
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-48 w-full z-10">
          {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto mb-32"
            >
            <div className="relative border-l-4 border-bitcoin pl-8 lg:pl-12 py-8">
              <div className="space-y-6 lg:space-y-8">
                <div className="text-[6rem] sm:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-serif text-bitcoin/15 leading-none -mb-6" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  "
                </div>
                <div className="space-y-4">
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 leading-[1.2] tracking-[-0.01em] relative overflow-hidden" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300 }}>
                    <motion.span
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      Anyone should be able to run their business entirely on Bitcoin, no excuses. — We're building the platform that makes this possible.
                    </motion.span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision with Photos */}
          <div className="space-y-16 lg:space-y-24">
            {/* Top Row: Mission Text | Mission Photo */}
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Left: Mission Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <Target className="h-5 w-5 text-bitcoin" />
                  <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">Our Mission</span>
                  <div className="h-px w-12 bg-bitcoin/30"></div>
                </div>
                <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight mb-6">
                  To enable every business{" "} <br />
                  <span className="text-bitcoin">to operate entirely on Bitcoin</span>
                </h3>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
                  No compromises on security. No technical knowledge required. No custodial risks.
                </p>
            </motion.div>

              {/* Right: Mission Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
            >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 aspect-[4/5] bg-gray-100">
                  <img
                    src="/website-photos/about-page-our-mission.webp"
                    alt="Our Mission"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
              </div>
            </motion.div>
          </div>

            {/* Bottom Row: Vision Photo | Vision Text */}
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Left: Vision Photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 aspect-[4/5] bg-gray-100">
                  <img
                    src="/website-photos/about-page-our-vision.webp"
                    alt="Our Vision"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '100% center' }}
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Right: Vision Text */}
          <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Target className="h-5 w-5 text-bitcoin" />
              <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">Our Vision</span>
              <div className="h-px w-12 bg-bitcoin/30"></div>
            </div>
            <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight mb-6">
              A world where Bitcoin is{" "} <br />
              <span className="text-bitcoin">The default</span>
            </h3>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
              We envision a future where businesses choose Bitcoin not because it's novel, but because it's superior. Faster, cheaper, more secure, and truly global. That's the future we're building.
            </p>
          </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Blueprint Style */}
      <section className="relative overflow-hidden bg-[#050a14] min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-bitcoin/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[100px]"
          />
          
          {/* Subtle dotted pattern */}
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(247,147,26,0.8) 1.5px, transparent 1.5px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 w-full z-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-6 px-6 py-2 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs uppercase tracking-[0.35em]"
            >
              <Heart className="h-4 w-4 text-bitcoin" />
              Our Values
              <span className="text-white/20">│</span>
              What Drives Us
            </motion.div>

            <h2 className="text-[2.9rem] sm:text-[3.5rem] lg:text-[5.2rem] font-black text-white leading-[1.05] tracking-tight max-w-6xl mx-auto mb-4">
              Principles that{" "}
              <span className="text-bitcoin">guide us</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light">
              Every decision we make is rooted in these core values.
            </p>
          </motion.div>

          {/* Values Grid with connecting lines */}
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Connecting lines - hidden on mobile */}
            <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}>
              <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
              <line x1="37.5%" y1="50%" x2="62.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
              <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
            </svg>
            
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/5 px-8 py-6 backdrop-blur-[2px] transition-all duration-500 hover:border-bitcoin/60 hover:bg-white/10 group"
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
                      className="flex h-12 w-12 items-center justify-center rounded-[22px] border border-white/15 bg-gradient-to-br from-bitcoin to-orange-500 text-white shadow-lg shadow-bitcoin/30 transition-transform duration-300"
                      variants={{
                        default: { scale: 1, rotate: 0 },
                        hover: { scale: 1.1, rotate: 5 }
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-bitcoin leading-tight">
                      {value.title}
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section - Timeline Style */}
      <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
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
                Our Story
              </span>
              <div className="h-px flex-1 max-w-24 bg-gray-300"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight max-w-5xl">
              How we got{" "}
              <span className="text-bitcoin">here</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative mb-16 last:mb-0"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-bitcoin flex items-center justify-center shadow-lg">
                        <Icon className="h-8 w-8 text-bitcoin" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-1 h-24 bg-bitcoin mx-auto mt-4"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="inline-flex items-center gap-3 mb-3">
                        <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">{milestone.year}</span>
                        <div className="h-px w-12 bg-bitcoin/30"></div>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the Team Section - Editorial Style */}
      <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
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
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-48 w-full z-10">
          {/* Editorial Title */}
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
                The Team
              </span>
              <div className="h-px flex-1 max-w-24 bg-gray-300"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight max-w-5xl">
              Meet the{" "}
              <span className="text-bitcoin">people</span> behind PaidIn
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mt-8 leading-relaxed font-light">
              A diverse team of builders, thinkers, and Bitcoin believers. We're here to make Bitcoin business operations accessible to everyone.
            </p>
          </motion.div>

          {/* Team Grid - Editorial Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 hover:border-bitcoin/30 transition-all duration-500 hover:shadow-2xl">
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-bitcoin">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain object-center scale-110 transition-transform duration-700 group-hover:scale-125"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f7931a&color=fff&size=400&bold=true`;
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 lg:p-5">
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl lg:text-xl font-black text-gray-900 leading-tight mb-1">
                        {member.name}
                      </h3>
                      <div className="mb-3">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-[0.15em] uppercase">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm lg:text-xs text-gray-600 leading-relaxed font-light">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Us CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20 lg:mt-32"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Users className="h-5 w-5 text-bitcoin" />
              <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">We're Hiring</span>
              <div className="h-px w-12 bg-bitcoin/30"></div>
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Want to join us?
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-light max-w-2xl mx-auto">
              We're always looking for talented people who share our vision. Check out our open positions.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-black px-8 py-5 text-base h-auto transition-all duration-300 rounded-full group"
              onClick={() => window.location.href = '/careers'}
            >
              View Open Positions
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Dark with Glow */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Video */}
          <video
            src="/website-videos/about-page-cta-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/website-photos/about-page-cta-video-poster.png"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{ willChange: 'transform' }}
          />
          {/* Orange Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/30 to-orange-500/20"></div>
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 sm:mb-8 leading-[0.9] tracking-tight max-w-6xl mx-auto">
              <span className="block text-white">Built for</span>
              <span className="block text-bitcoin">Enterprise</span>
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-bitcoin to-orange-500 mb-4 sm:mb-6 shadow-lg">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/60 font-light">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12 sm:mt-16 lg:mt-20"
          >
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
              Ready to build on Bitcoin?
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join forward-thinking companies running their operations entirely on Bitcoin.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white font-black px-12 py-6 text-lg h-auto shadow-2xl hover:shadow-bitcoin/50 hover:scale-105 transition-all duration-300 rounded-full"
              onClick={() => window.location.href = 'https://app.paidin.io'}
            >
              Start Building on Bitcoin
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
