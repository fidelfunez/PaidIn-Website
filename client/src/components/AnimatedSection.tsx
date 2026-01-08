import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsSafari } from "@/lib/safari-detection";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn" | "fadeInDown" | "staggerChildren";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
}: AnimatedSectionProps) {
  const isSafari = useIsSafari();

  // Safari: Skip all animations - just render immediately for maximum performance
  if (isSafari) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // Other browsers: Keep original Framer Motion implementation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -40 },
      animate: { opacity: 1, y: 0 },
    },
    slideInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    slideInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    staggerChildren: {
      initial: {},
      animate: {},
    },
  };

  const selectedAnimation = animations[animation];

  if (animation === "staggerChildren") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: stagger,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
