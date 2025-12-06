import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";

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
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  CheckCircle2, 
  Fingerprint, 
  Zap, 
  Key,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Hash characters for the scrambling effect
const hashChars = "0123456789abcdef";

// Component for hash-to-text animation
function HashToText({ text, className, delay = 0, highlightWords = [] }: { text: string; className?: string; delay?: number; highlightWords?: string[] }) {
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

  // Process displayText to highlight words
  const renderText = () => {
    if (highlightWords.length === 0) {
      return displayText;
    }
    
    let processedText = displayText;
    highlightWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      processedText = processedText.replace(regex, (match) => {
        return `<span class="text-bitcoin">${match}</span>`;
      });
    });
    
    return processedText;
  };

  return <span ref={ref} className={className} dangerouslySetInnerHTML={{ __html: renderText() }} />;
}

const securityFeatures = [
  {
    icon: Lock,
    title: "Multi-Signature Wallets",
    description: "Geographically split key shards keep wallets non-custodial and every move approval-gated.",
    bullets: [
      "Biometric + hardware approvals",
      "Policies auto-sweep to cold storage",
      "Multi-party governance",
      "Geographic key distribution"
    ],
    image: "/website-photos/defensive-system-multi-sig.webp",
  },
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "AES-256 guardrails and isolated enclaves lock down data in motion and at rest.",
    bullets: [
      "Immutable ledger signing via HSMs",
      "Tokenised PII vaults",
      "Zero-knowledge architecture",
      "Encrypted data at rest"
    ],
    image: "/website-photos/defensive-system-end-2-encrypted.webp",
  },
  {
    icon: Eye,
    title: "24/7 Monitoring",
    description: "Automated detections, alerts, and watchtowers keep eyes on your Bitcoin 24/7.",
    bullets: [
      "Anomaly-trained watchtowers",
      "Quarterly external red teams",
      "Real-time threat detection",
      "Automated incident response"
    ],
    image: "/website-photos/defensive-system-24-monitoring.webp",
  },
  {
    icon: Server,
    title: "Cold Storage",
    description: "Policy-driven orchestration keeps your treasury offline while you maintain custody of all keys.",
    bullets: [
      "Air-gapped partner vault attestations",
      "Tiered policies synced with insured custodians",
      "Offline key management",
      "Multi-jurisdiction storage"
    ],
    image: "/website-photos/defensive-system-cold-storage.webp",
  },
];

const certifications = [
  { name: "SOC 2 Type II", icon: "🛡️", description: "Audited annually" },
  { name: "ISO 27001", icon: "📋", description: "Security certified" },
  { name: "GDPR Compliant", icon: "🔒", description: "Privacy first" },
  { name: "PCI DSS", icon: "💳", description: "Payment secure" },
];

export default function Security() {
  return (
    <>
      <SEOHead 
        title="Security - Enterprise-Grade Bitcoin Security | PaidIn"
        description="Non-custodial architecture, multi-signature wallets, end-to-end encryption, and SOC 2 Type II certification. Your keys, your Bitcoin, always."
        canonical="https://www.paidin.io/security"
      />
      <div className="relative scroll-smooth" style={{ scrollSnapType: 'y mandatory' }}>
      {/* Hero Section - Dark with Hash Animation */}
      <section className="relative overflow-hidden bg-[#050a14] min-h-screen flex items-center" style={{ scrollSnapAlign: 'start' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main Grid - Blueprint Style */}
          <div
            className="absolute inset-0 opacity-[0.6]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,191,255,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,191,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              mixBlendMode: "screen",
            }}
          />
          {/* Secondary Grid - Finer Detail */}
          <div
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,191,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,191,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              mixBlendMode: "screen",
            }}
          />
          {/* Diagonal Pattern - Blueprint Detail Lines */}
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(0,191,255,0.35) 1px, transparent 1px),
                linear-gradient(45deg, rgba(0,191,255,0.25) 1px, transparent 1px)
              `,
              backgroundSize: "150px 150px",
              mixBlendMode: "screen",
            }}
          />
          {/* Blueprint Annotations - Random Technical Elements */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-screen">
            {/* Technical Measurements */}
            <div className="absolute top-[15%] left-[8%] transform -rotate-12 text-cyan-400 text-xs font-mono">
              <div>encrypted: true</div>
              <div>secure: true</div>
            </div>
            <div className="absolute top-[25%] right-[12%] transform rotate-6 text-cyan-400 text-xs font-mono">
              <div>multi-sig: enabled</div>
              <div>cold-storage: active</div>
            </div>
            <div className="absolute bottom-[20%] left-[15%] transform rotate-12 text-cyan-400 text-xs font-mono">
              <div>monitoring: 24/7</div>
              <div>audit: ready</div>
            </div>
            
            {/* Code Snippets */}
            <div className="absolute top-[40%] right-[8%] transform -rotate-6 text-cyan-400 text-xs font-mono">
              <div>const security = {`{`}</div>
              <div className="pl-4">encrypted: true,</div>
              <div className="pl-4">nonCustodial: true</div>
              <div>{`}`}</div>
            </div>
            <div className="absolute bottom-[35%] right-[20%] transform rotate-3 text-cyan-400 text-xs font-mono">
              <div>function protect() {`{`}</div>
              <div className="pl-4">return "Fortress";</div>
              <div>{`}`}</div>
            </div>
            
            {/* Technical Notes */}
            <div className="absolute top-[60%] left-[10%] transform -rotate-12 text-cyan-400 text-xs font-mono">
              <div>// TODO: secure</div>
              <div>// NOTE: encrypted</div>
            </div>
            <div className="absolute bottom-[45%] left-[25%] transform rotate-6 text-cyan-400 text-xs font-mono">
              <div>✓ verified</div>
              <div>✓ tested</div>
            </div>
            
            {/* Doodles/Sketches */}
            <div className="absolute top-[30%] left-[20%] transform rotate-45">
              <svg width="60" height="60" className="text-cyan-400/20">
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="30" y1="5" x2="30" y2="55" stroke="currentColor" strokeWidth="1"/>
                <line x1="5" y1="30" x2="55" y2="30" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
            <div className="absolute bottom-[30%] right-[15%] transform -rotate-30">
              <svg width="80" height="40" className="text-cyan-400/20">
                <rect x="10" y="10" width="60" height="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
                <line x1="10" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
            
            {/* Technical Symbols */}
            <div className="absolute top-[50%] right-[30%] text-cyan-400 text-2xl font-mono opacity-30">
              {`{ }`}
            </div>
            <div className="absolute bottom-[25%] left-[30%] text-cyan-400 text-xl font-mono opacity-30">
              &lt;/&gt;
            </div>
            <div className="absolute top-[70%] left-[40%] text-cyan-400 text-lg font-mono opacity-30">
              [ ]
            </div>
            
            {/* Random Numbers/Coordinates */}
            <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 text-cyan-400 text-xs font-mono opacity-40">
              x: 50% y: 20%
            </div>
            <div className="absolute bottom-[15%] right-[35%] text-cyan-400 text-xs font-mono opacity-40">
              z-index: 10
            </div>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-0 w-96 h-96 bg-bitcoin/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-0 w-96 h-96 bg-orange-500/25 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-3 mb-6 px-8 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white/90 text-xs uppercase tracking-[0.35em] font-semibold shadow-lg shadow-black/20"
            >
              <Shield className="h-4 w-4 text-bitcoin" />
              Security Blueprint
              <span className="text-white/40">│</span>
              Non-custodial by design
            </motion.div>

            <div className="relative inline-block mb-10">
              <span className="absolute -inset-x-12 -top-10 text-[5rem] sm:text-[5.5rem] lg:text-[7.5rem] font-black uppercase tracking-[0.4em] text-white/8 blur-[3px] pointer-events-none select-none">
                FORTRESS
              </span>
              <h1 className="relative text-[2.9rem] sm:text-[3.5rem] lg:text-[5.2rem] font-black text-white leading-[1.05] tracking-tight max-w-6xl mx-auto px-4">
                <span className="block text-[3.4rem] sm:text-[4.2rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.05] whitespace-nowrap">
                  <HashToText
                    text="We build the fortress"
                    delay={0.2}
                  />
                </span>
                <span className="block text-[3.4rem] sm:text-[4.2rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.05] whitespace-nowrap mt-2 text-bitcoin">
                  <HashToText
                    text="You hold the keys"
                    delay={0.6}
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

            <p className="text-lg sm:text-xl lg:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light">
              Every wallet stays non-custodial, and every transfer is wrapped in layered encryption and watchtower monitoring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features Section */}
      {securityFeatures.map((feature, index) => {
        const Icon = feature.icon;
        const isLeft = index % 2 === 0;
        return (
          <section key={feature.title} className="relative overflow-hidden bg-[#0a1628] text-white min-h-screen flex items-center py-0" style={{ scrollSnapAlign: 'start' }}>
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
                className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-sky-300/20 rounded-full blur-[120px]"
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
                className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-200/15 rounded-full blur-[100px]"
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bitcoin to-orange-500 text-white shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-bitcoin text-sm font-bold tracking-[0.2em] uppercase">{feature.title}</span>
                  </div>
                  
                  <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-8 tracking-tight">
                    {feature.title}
                  </h2>
                  
                  <p className="text-xl lg:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12 font-light">
                    {feature.description}
                  </p>

                  <div className="space-y-4">
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
                        alt={`${feature.title} Security Feature`}
                        className="w-full h-full object-cover"
                        style={feature.title === "Multi-Signature Wallets" ? { objectPosition: 'center 40%' } : {}}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Certifications Section */}
      <section className="relative overflow-hidden bg-[#0d1b2e] min-h-screen flex items-center py-0" style={{ scrollSnapAlign: 'start' }}>
        {/* Baby Blue Orbs - Scattered Randomly */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            className="absolute top-[10%] left-[15%] w-96 h-96 bg-sky-300/20 rounded-full blur-[120px]"
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
            className="absolute top-[30%] right-[20%] w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[140px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.12, 0.22, 0.12],
              x: [0, 60, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute bottom-[25%] left-[25%] w-[400px] h-[400px] bg-sky-300/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.1, 0.18, 0.1],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-[60%] right-[10%] w-[350px] h-[350px] bg-sky-300/20 rounded-full blur-[110px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-bitcoin/30"></div>
              <Shield className="h-5 w-5 text-bitcoin" />
              <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">Certifications</span>
              <div className="h-px w-12 bg-bitcoin/30"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight max-w-4xl mx-auto">
              <AnimatedText
                text="Audited and certified"
                delay={0.2}
                highlightWords={["certified"]}
              />
            </h2>
            <p className="text-xl lg:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light">
              Third-party audited and certified by the world's leading security organizations. No shortcuts.
            </p>
          </motion.div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Connecting lines - hidden on mobile */}
            <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}>
              <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
              <line x1="37.5%" y1="50%" x2="62.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
              <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="rgba(247,147,26,0.6)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
            </svg>
            
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[#030712] px-8 py-8 backdrop-blur-[2px] transition-all duration-500 hover:border-bitcoin/60 hover:bg-white/10 group"
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
                
                <div className="relative flex flex-col items-center gap-4 z-10">
                  {/* Enhanced icon with pulse animation - animates on card hover */}
                  <motion.div
                    className="text-5xl transition-transform duration-300"
                    variants={{
                      default: { scale: 1, rotate: 0 },
                      hover: { scale: 1.1, rotate: 5 }
                    }}
                  >
                    {cert.icon}
                  </motion.div>
                  <div className="font-black text-white text-base lg:text-lg mb-2">{cert.name}</div>
                  <div className="text-xs text-white/60 font-light">{cert.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center py-0" style={{ scrollSnapAlign: 'start' }}>
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Video */}
          <video
            src="/website-videos/security-page-cta-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/website-photos/security-page-cta-video-poster.png"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{ willChange: 'transform' }}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 w-full z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tight max-w-5xl mx-auto">
              Ready to secure your{" "}
              <span className="text-bitcoin">Bitcoin operations?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Join forward-thinking companies running their operations entirely on Bitcoin with enterprise-grade security.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white font-black px-12 py-6 text-lg lg:text-xl h-auto shadow-2xl hover:shadow-bitcoin/40 hover:scale-105 transition-all duration-300 rounded-full"
              onClick={() => window.location.href = 'https://app.paidin.io'}
            >
              Get Started
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
