import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import BtcPriceTicker from "./BtcPriceTicker";
import LanguageSwitcher from "./LanguageSwitcher";
import AnimatedButton from "./AnimatedButton";
import { motion } from "framer-motion";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const isFeaturesPage = location === "/features";
  const isSecurityPage = location === "/security";
  const isAboutPage = location === "/about";
  const isContactPage = location === "/contact";
  const isDarkBackgroundPage = isFeaturesPage || isSecurityPage || isAboutPage || isContactPage; // Contact page has dark background
  const shouldShowScrolledStyle = isScrolled || isHovered;
  // Pages that need synchronized hide animation
  const needsSynchronizedHide = isFeaturesPage || isSecurityPage || isAboutPage || isContactPage;

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 ${
        needsSynchronizedHide 
          ? 'transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-in-out' 
          : 'transition-all duration-500'
      } ${
        shouldShowScrolledStyle
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/60' 
          : 'bg-transparent backdrop-blur-none border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <img 
                  src="/paidin-logo.svg" 
                  alt="PaidIn Logo" 
                  className="h-8 w-8 lg:h-9 lg:w-9"
                  style={{ 
                    imageRendering: '-webkit-optimize-contrast',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden'
                  }}
                />
              </motion.div>
              <motion.span 
                className="text-xl lg:text-2xl font-bold tracking-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className={isDarkBackgroundPage && !shouldShowScrolledStyle ? "text-white" : "text-gray-900"}>Paid</span><span className="text-bitcoin">In</span>
              </motion.span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                  >
                    <motion.span
                      className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                        active
                          ? "text-bitcoin"
                          : isDarkBackgroundPage && !shouldShowScrolledStyle
                          ? "text-white/80 hover:text-bitcoin"
                          : "text-gray-700 hover:text-bitcoin"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-bitcoin to-orange-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover indicator */}
                    {!active && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-bitcoin/30 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
              {/* Elegant Separator */}
              <div className="relative flex items-center pl-8 ml-2">
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-px bg-gradient-to-b from-transparent to-transparent ${
                  isDarkBackgroundPage && !shouldShowScrolledStyle ? "via-white/30" : "via-gray-300"
                }`}></div>
                <BtcPriceTicker isDarkBackground={isDarkBackgroundPage && !shouldShowScrolledStyle} />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <LanguageSwitcher isDarkBackground={isDarkBackgroundPage && !shouldShowScrolledStyle} />
              <AnimatedButton 
                variant="ghost" 
                className={`font-medium text-sm px-4 h-9 rounded-full transition-all duration-300 hover:bg-orange-50/50 ${
                  isDarkBackgroundPage && !shouldShowScrolledStyle
                    ? "text-white/80 hover:text-bitcoin"
                    : "text-gray-700 hover:text-bitcoin"
                }`}
                onClick={() => window.location.href = 'https://app.paidin.io'}
              >
                Login
              </AnimatedButton>
              <AnimatedButton 
                className="bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white font-semibold text-sm px-6 h-9 rounded-full shadow-lg hover:shadow-bitcoin/30 hover:scale-105 transition-all duration-300" 
                glowEffect={true}
                onClick={() => window.location.href = 'https://app.paidin.io'}
              >
                Get Started
              </AnimatedButton>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-orange-50/50 min-w-[44px] min-h-[44px]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] bg-white/95 backdrop-blur-xl">
              <div className="flex flex-col space-y-4 sm:space-y-6 mt-6">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`relative text-lg font-light tracking-wide transition-colors duration-200 py-3 min-h-[44px] flex items-center ${
                        active
                          ? "text-bitcoin"
                          : "text-gray-700 hover:text-bitcoin"
                      }`}
                    >
                      {item.label}
                      {active && (
                        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-bitcoin to-orange-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
                <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200/50">
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-bitcoin justify-start font-medium rounded-full min-h-[44px] py-6"
                    onClick={() => {
                      window.location.href = 'https://app.paidin.io';
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white justify-start font-semibold rounded-full shadow-lg min-h-[44px] py-6"
                    onClick={() => {
                      window.location.href = 'https://app.paidin.io';
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
