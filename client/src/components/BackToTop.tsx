import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverWhite, setIsOverWhite] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const checkBackgroundColor = () => {
      if (!buttonRef.current || window.pageYOffset < 400) return;

      // Get button position
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Temporarily hide pointer events on button to detect what's behind it
      const originalPointerEvents = buttonRef.current.style.pointerEvents;
      buttonRef.current.style.pointerEvents = 'none';

      // Check multiple points around the button to get a better reading
      const points = [
        { x: centerX, y: centerY },
        { x: centerX - 20, y: centerY },
        { x: centerX + 20, y: centerY },
        { x: centerX, y: centerY - 20 },
        { x: centerX, y: centerY + 20 },
      ];

      let bgColors: string[] = [];

      for (const point of points) {
        const elementBelow = document.elementFromPoint(point.x, point.y);
        if (!elementBelow) continue;

      // Walk up the DOM tree to find an element with a background color
      let currentElement: Element | null = elementBelow;
      while (currentElement && currentElement !== document.body) {
        const styles = window.getComputedStyle(currentElement);
        const backgroundColor = styles.backgroundColor;
        
        // Check if background is not transparent
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
            // Check if it's a valid RGB/RGBA color
            const rgbMatch = backgroundColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
              bgColors.push(backgroundColor);
          break;
        }
          }
          
        currentElement = currentElement.parentElement;
        }
      }

      // Restore pointer events
      buttonRef.current.style.pointerEvents = originalPointerEvents;

      // Calculate average luminance from all detected colors
      if (bgColors.length > 0) {
        let totalLuminance = 0;
        let validColors = 0;

        for (const bgColor of bgColors) {
        const rgbMatch = bgColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          
          // Calculate luminance (perceived brightness)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            totalLuminance += luminance;
            validColors++;
          }
        }

        if (validColors > 0) {
          const avgLuminance = totalLuminance / validColors;
          // If average luminance is high (light background), set isOverWhite to true
          setIsOverWhite(avgLuminance > 0.6);
        } else {
          setIsOverWhite(false);
      }
      } else {
        // Default to dark if no background color found
        setIsOverWhite(false);
      }
    };

    // Use IntersectionObserver to check when button position changes significantly
    const observer = new IntersectionObserver(
      () => {
        checkBackgroundColor();
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    const handleScroll = () => {
      toggleVisibility();
      
      // Check background more frequently during scroll
      if (window.pageYOffset > 400) {
      requestAnimationFrame(() => {
            checkBackgroundColor();
        });
          }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Also check on resize
    window.addEventListener("resize", checkBackgroundColor);
    
    // Initial check
    toggleVisibility();
    if (window.pageYOffset > 400) {
      setTimeout(() => {
        checkBackgroundColor();
        if (buttonRef.current) {
          observer.observe(buttonRef.current);
        }
      }, 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkBackgroundColor);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Back to top"
        >
          <div className="relative">
            {/* Glow effect - conditional based on background */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 ${
              isOverWhite 
                ? 'bg-gradient-to-r from-gray-900/30 to-gray-700/30' 
                : 'bg-gradient-to-r from-bitcoin/50 to-orange-400/50'
            }`}></div>
            
            {/* Main button - conditional styling */}
            <div className={`relative rounded-full p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm ${
              isOverWhite
                ? 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400 hover:shadow-gray-900/20'
                : 'bg-gradient-to-br from-bitcoin to-orange-500 text-white border border-white/20 hover:border-white/30 hover:shadow-bitcoin/50 shadow-bitcoin/30'
            }`}>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isOverWhite ? (
                  <ChevronUp className="h-6 w-6 text-gray-900" strokeWidth={3} stroke="#111827" fill="none" />
                ) : (
                  <ChevronUp className="h-6 w-6 text-white" strokeWidth={2.5} stroke="currentColor" fill="none" />
                )}
              </motion.div>
            </div>

            {/* Subtle pulse ring - conditional */}
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${
                isOverWhite ? 'border-gray-400/30' : 'border-bitcoin/40'
              }`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

