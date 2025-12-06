import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Lock, Eye, Server, CheckCircle2, Fingerprint, Zap, Key, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";

// Hash characters for the scrambling effect
const hashChars = "0123456789abcdef";

// Component for hash-to-text animation with optional highlight
function HashToText({ text, className, delay = 0, highlightText, highlightClass }: { text: string; className?: string; delay?: number; highlightText?: string; highlightClass?: string }) {
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
      const iterations = 15; // Number of hash iterations before revealing
      let iteration = 0;

      const interval = setInterval(() => {
        if (iteration < iterations) {
          // Show random hash characters - maintain exact character count
          const scrambled = generateScrambled();
          // Ensure length matches exactly
          setDisplayText(scrambled.length === text.length ? scrambled : text);
          iteration++;
        } else {
          // Start revealing actual letters one by one
          if (currentIndex < text.length) {
            const revealed = text.slice(0, currentIndex + 1);
            const remainingChars = text.slice(currentIndex + 1);
            const remaining = remainingChars
              .split("")
              .map((char) => {
                // Preserve spaces in remaining text
                if (char === " ") return " ";
                return hashChars[Math.floor(Math.random() * hashChars.length)];
              })
              .join("");
            const finalText = revealed + remaining;
            // Ensure total length matches
            setDisplayText(finalText.length === text.length ? finalText : text);
            currentIndex++;
          } else {
            setDisplayText(text);
            clearInterval(interval);
          }
        }
      }, 45); // Animation speed (faster)

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [isInView, delay, text, hasStarted]);

  // Render text with optional highlight
  const renderText = () => {
    if (highlightText && highlightClass) {
      const highlightIndex = displayText.toLowerCase().indexOf(highlightText.toLowerCase());
      if (highlightIndex !== -1) {
        const before = displayText.slice(0, highlightIndex);
        const highlight = displayText.slice(highlightIndex, highlightIndex + highlightText.length);
        const after = displayText.slice(highlightIndex + highlightText.length);
        return (
          <>
            {before}
            <span className={highlightClass}>{highlight}</span>
            {after}
          </>
        );
      }
    }
    return displayText;
  };

  return <span ref={ref} className={className}>{renderText()}</span>;
}

const securityFeatures = [
  {
    icon: Lock,
    title: "Multi-Signature Wallets",
    description: "Geographically split key shards keep wallets non-custodial and every move approval-gated.",
    bullets: [
      "Biometric + hardware approvals",
      "Policies auto-sweep to cold storage",
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
    ],
    image: "/website-photos/defensive-system-cold-storage.webp",
  },
];

const fortressLayers = [
  {
    label: "Outer Perimeter",
    title: "Adaptive Threat Shield",
    description: "Firewalls, intrusion detection, and bounty hunters deflect attacks before they touch production.",
    accent: "from-orange-500/30 via-orange-400/10 to-transparent",
  },
  {
    label: "Middle Chamber",
    title: "Institutional Custody Layer",
    description: "Multi-sig governance, air-gapped keys, and SOC 2 controls harden custody workflows.",
    accent: "from-bitcoin/30 via-bitcoin/10 to-transparent",
  },
  {
    label: "Citadel Core",
    title: "Payment & Compliance Brain",
    description: "Real-time reconciliation and automated reporting lock every payment into an auditable ledger.",
    accent: "from-white/20 via-white/5 to-transparent",
  },
];

const blueprintHighlights = [
  {
    label: "Layer 1",
    title: "Perimeter defense",
    description: "Threat detection and monitoring at the outer layer. The first line of defense that identifies and blocks attacks before they reach the core.",
    chips: ["Biometric co-signers", "Policy templates", "Auto cold sweeps"],
    stat: "Alerts dispatched in under 120s",
    icon: Eye,
  },
  {
    label: "Layer 2",
    title: "Core protection",
    description: "Encryption and data isolation at the heart of the system. Even if the perimeter is breached, the core remains protected.",
    chips: ["Isolated enclaves", "Rotating keys", "Just-in-time access"],
    stat: "PII isolated across 3 vault tiers",
    icon: Server,
  },
  {
    label: "Layer 3",
    title: "Key control",
    description: "Distributed key management where you maintain custody. The final layer ensures no single point of failure can compromise your funds.",
    chips: ["Anomaly trained alerts", "Bug bounty network", "Quarterly red teams"],
    stat: "Approvals sealed in under 4s",
    icon: Key,
  },
];

const operationsSignals = [
  { label: "Release Gate", value: "Security checks before every release" },
  { label: "Drills", value: "Quarterly security incident drills" },
  { label: "Telemetry", value: "Real-time security dashboards" },
  { label: "Ledger Trails", value: "Immutable audit evidence on every action" },
];

const certifications = [
  { name: "SOC 2 Type II", icon: "🛡️", description: "Audited annually" },
  { name: "ISO 27001", icon: "📋", description: "Security certified" },
  { name: "GDPR Compliant", icon: "🔒", description: "Privacy first" },
  { name: "PCI DSS", icon: "💳", description: "Payment secure" },
];

function SecuritySection() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate carousel (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % securityFeatures.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev + 1) % securityFeatures.length);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev - 1 + securityFeatures.length) % securityFeatures.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#050a14] min-h-screen">
      {/* Top Transition Gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050a14] via-[#050a14] to-transparent pointer-events-none z-10"></div>
      
      {/* Background Elements - Realistic Blueprint Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Paper-like base with slight texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0a0f1a] to-[#050a14]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.1) 2px,
              rgba(255, 255, 255, 0.1) 4px
            )`,
          }}
        />
        
        {/* Main blueprint grid - fine lines (cyan blueprint color) */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 191, 255, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 191, 255, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        
        {/* Secondary grid - medium lines for major divisions */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 191, 255, 0.35) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(0, 191, 255, 0.35) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "200px 200px",
          }}
        />
        
        {/* Diagonal lines for depth and dimension */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(0, 191, 255, 0.2) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(0, 191, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        
        {/* Measurement dots at intersections */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 191, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "200px 200px",
            backgroundPosition: "0 0, 100px 100px",
          }}
        />
        
        {/* Subtle paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
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

      {/* Content Container */}
      <div className="relative z-40 w-full">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-40 w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-2 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs uppercase tracking-[0.35em] mt-2"
          >
            <Shield className="h-4 w-4 text-bitcoin" />
            Security Blueprint
            <span className="text-white/20">│</span>
            Non-custodial by design
          </motion.div>

          <div className="relative inline-block mb-10">
            <span className="absolute -inset-x-12 -top-10 text-[5rem] sm:text-[5.5rem] lg:text-[7.5rem] font-black uppercase tracking-[0.4em] text-white/8 blur-[3px] pointer-events-none select-none">
              FORTRESS
            </span>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="absolute inset-x-0 -bottom-6 h-24 bg-gradient-to-b from-white/8 via-white/4 to-transparent blur-2xl pointer-events-none"
            />
            <h2 className="relative text-[2.9rem] sm:text-[3.5rem] lg:text-[5.2rem] font-black text-white leading-[1.05] tracking-tight max-w-6xl mx-auto px-4">
              <span className="block text-[3.4rem] sm:text-[4.2rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.05] whitespace-nowrap">
                <HashToText
                  text="We build the fortress"
                  delay={0.2}
                />
              </span>
              <span className="block text-[3.4rem] sm:text-[4.2rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.05] whitespace-nowrap">
                <HashToText
                  text="You hold the keys"
                  delay={0.6}
                  highlightText="You hold the keys"
                  highlightClass="text-bitcoin"
                />
              </span>
          </h2>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 -bottom-4 h-px w-[70%] -translate-x-1/2 origin-left bg-gradient-to-r from-transparent via-bitcoin to-transparent"
            />
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light mb-16 lg:mb-20">
            Every wallet stays non-custodial, and every transfer is wrapped in layered encryption and watchtower monitoring.
          </p>
        </motion.div>

        {/* Blueprint Overview */}
        <div className="relative mb-28">
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto w-full max-w-[1820px] overflow-hidden rounded-[44px] border border-white/12 bg-gradient-to-br from-[#060914]/96 via-[#04060d]/90 to-[#010205]/92 px-12 py-12 sm:px-24 sm:py-14 shadow-[0_16px_100px_rgba(0,0,0,0.6)]"
          >
            {/* Hero Illustration */}
            <div className="pointer-events-none absolute inset-0" />

            {/* Foreground Content */}
            <div className="relative grid gap-14">
              <div className="grid gap-6 text-left">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-[0.55rem] uppercase tracking-[0.48em] text-white/70 backdrop-blur-sm">
                  <Lock className="h-3.5 w-3.5 text-bitcoin" />
                  Fortress Mode
                  <span className="h-px w-10 bg-gradient-to-r from-bitcoin via-orange-400/40 to-transparent" />
                  Layered Architecture
                </span>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                  <h3 className="text-[2.6rem] sm:text-[3.1rem] font-black text-white leading-[1.05] tracking-tight lg:max-w-xl">
                    <span className="block">Zero trust architecture.</span>
                </h3>
                  <p className="text-white/70 text-base leading-relaxed lg:max-w-md lg:pb-1">
                    Three concentric layers of protection: threat detection at the perimeter, encryption in the core, and key control in your hands. Each layer is independent yet interdependent.
                </p>
                </div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-140px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
                  },
                }}
                className="relative"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:[grid-template-columns:repeat(3,minmax(320px,1fr))] lg:gap-10">
                  {blueprintHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                  <motion.div
                    key={item.title}
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          show: { opacity: 1, y: 0 },
                        }}
                        className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/5 px-8 py-8 backdrop-blur-[2px] transition-all duration-500 hover:border-bitcoin/40 hover:bg-white/8"
                      >
                        <div className="relative flex flex-col gap-5">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[22px] border border-white/15 bg-gradient-to-br from-bitcoin to-orange-500 text-white shadow-lg">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="text-[0.55rem] uppercase tracking-[0.45em] text-white/50">
                                {item.label}
                              </span>
                              <h4 className="text-xl font-semibold text-bitcoin leading-tight">
                      {item.title}
                    </h4>
                            </div>
                          </div>
                          <p className="text-sm text-white leading-relaxed">
                            {item.description}
                    </p>
                          <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-white/60">
                            <span className="h-px w-10 bg-gradient-to-r from-bitcoin via-orange-500/35 to-transparent" />
                            {item.stat}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Operational Signals */}
            <div className="relative mt-10">
              <div className="grid gap-4 md:grid-cols-2">
                {[operationsSignals.slice(0, 2), operationsSignals.slice(2)].map((group, columnIndex) => (
                  <div key={columnIndex} className="grid gap-3">
                    {group.map((signal) => (
                      <div
                        key={signal.label}
                        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-sm"
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/8 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                        <div className="relative flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-[0_0_12px_rgba(247,147,26,0.35)]" />
                          <div className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-[0.38em] text-bitcoin">
                              {signal.label}
                            </span>
                            <span className="text-sm text-white/80 leading-snug">
                              {signal.value}
                        </span>
                          </div>
                        </div>
                      </div>
                      ))}
                    </div>
                ))}
              </div>
              </div>

            {/* Metrics Strip */}
            <div className="relative mt-16">
              <div className="flex flex-col gap-6 rounded-[32px] border-2 border-white/25 bg-white/5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 shadow-lg shadow-black/20">
                {[
                  { value: "99.995%", label: "Vault Uptime" },
                  { value: "<120s", label: "Threat Signal Dispatch" },
                  { value: "4.2s", label: "Average Approval Seal" },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-2 text-center sm:text-left">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-xs uppercase tracking-[0.38em] text-white/45">
                      {metric.label}
                  </span>
                  </div>
                ))}
              </div>
              </div>
            </motion.div>
        </div>

        {/* Defensive Systems - Side by Side Layout */}
        <div className="relative mb-28 lg:mb-40">
          <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-3 lg:gap-4 max-w-7xl mx-auto items-center">
            {/* Left: Defensive Systems Card */}
          <motion.div
              initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-130px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="relative overflow-hidden rounded-[44px] border border-blue-300/20 shadow-2xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(50, 60, 75, 0.98) 0%,
                    rgba(45, 55, 70, 0.95) 25%,
                    rgba(40, 50, 65, 0.98) 50%,
                    rgba(45, 55, 70, 0.95) 75%,
                    rgba(50, 60, 75, 0.98) 100%
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 1px,
                    rgba(150, 180, 220, 0.03) 1px,
                    rgba(150, 180, 220, 0.03) 2px
                  )
                `,
                boxShadow: `
                  0 25px 80px rgba(0, 0, 0, 0.6),
                  inset 0 2px 4px rgba(150, 180, 220, 0.12),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(150, 180, 220, 0.15)
                `,
              }}
          >
              {/* Metal rim/shine effect */}
              <div 
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
              />
              <div 
                className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-blue-300/25 via-transparent to-transparent"
              />
              <div 
                className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-blue-300/25 via-transparent to-transparent"
              />

              {/* Subtle metallic grain texture */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.12]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      rgba(150, 180, 220, 0.04) 0px,
                      transparent 1px,
                      transparent 2px,
                      rgba(150, 180, 220, 0.04) 3px
                    )
                  `,
                }}
              />

              {/* Content Container */}
              <div className="relative px-6 py-4 sm:px-8 sm:py-5 lg:px-8 lg:py-5 flex flex-col">
                {/* Header Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.45em] text-white/60 mb-3">
                    <Shield className="h-4 w-4 text-bitcoin" />
                    Defensive Systems
                      </span>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-1">
                    Enterprise security
                  </h3>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-bitcoin leading-tight mb-3">
                    Built for Bitcoin.
                    </h3>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                    Each system focuses on a specific attack surface—approvals, data, monitoring, custody. Together they build an always-on fortress that never hands custody to PaidIn.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Feature Images Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-130px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="relative flex flex-col items-center justify-center overflow-visible -mt-4 lg:-mt-6"
            >
              {/* Carousel Container */}
              <div className="relative overflow-visible w-full">
                <AnimatePresence mode="wait">
                  {securityFeatures.map((feature, index) => {
                    if (index !== currentFeatureIndex) return null;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ 
                          duration: 0.5, 
                          ease: "easeOut"
                        }}
                        className="flex flex-col items-center w-full"
                      >
                        {/* Photo */}
                        <div className="relative w-full max-w-xs lg:max-w-sm aspect-square overflow-visible flex items-center justify-center">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Photo Title */}
                        <div className="mt-1 text-center">
                          <p className="text-white/80 text-sm sm:text-base font-medium">
                            {feature.title}
                          </p>
                        </div>
                </motion.div>
              );
            })}
                </AnimatePresence>
              </div>
          </motion.div>
          </div>
        </div>

        {/* Certifications - Keep as is */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {/* Asymmetric Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  default: { duration: 0.4, delay: 0.4 + index * 0.05 },
                  hover: { duration: 0.15, ease: "easeOut" }
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900 rounded-2xl p-6 lg:p-8 text-center shadow-lg border border-bitcoin/20 hover:border-bitcoin/40 hover:shadow-xl transition-all duration-150"
              >
                <div className="text-5xl mb-4">{cert.icon}</div>
                <div className="font-black text-white text-base lg:text-lg mb-2">{cert.name}</div>
                <div className="text-xs text-white/60 font-light">{cert.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Additional Security Badges */}
          <div className="pt-12 border-t border-bitcoin/20">
            <p className="text-center text-white/70 text-lg font-light mb-8">
              Third-party audited and certified by the world's leading security organizations. No shortcuts.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-white/70">
              {[
                { text: "Penetration Tested", icon: Fingerprint },
                { text: "Bug Bounty Program", icon: Zap },
                { text: "Annual Security Audits", icon: Key },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-5 w-5 text-bitcoin" />
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
      
      {/* Bottom Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050a14] via-[#050a14] to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}

export default memo(SecuritySection);

