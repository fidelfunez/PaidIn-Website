import { Link, useLocation } from "wouter";
import { Bitcoin, Mail } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { memo } from "react";

function Footer() {
  const [location] = useLocation();
  const isFeaturesPage = location === "/features";
  
  // Use black/orange styling for Features page, blue tones for others
  const bgColor = isFeaturesPage ? "bg-black" : "bg-[#0f161f]";
  const footerBg = isFeaturesPage ? "bg-black" : "bg-gray-900";
  const borderColor = isFeaturesPage ? "border-gray-800" : "border-gray-800";
  const accentBg = isFeaturesPage ? "bg-black" : "bg-[#0f161f]";
  const shadowStyle = isFeaturesPage 
    ? '0 10px 30px rgba(247, 147, 26, 0.4), 0 5px 15px rgba(247, 147, 26, 0.3)'
    : '0 10px 30px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3)';
  
  return (
    <div className={`relative ${bgColor}`}>
      {/* Background layer for rounded corners */}
      <div className={`absolute inset-0 ${bgColor} pointer-events-none`} style={{ zIndex: 0 }} />
      
      {/* Main Footer Section - In Front */}
      <footer 
        className={`relative ${footerBg} text-white border-t ${borderColor} rounded-b-3xl lg:rounded-b-[2rem]`}
        style={{
          position: 'relative',
          zIndex: 20,
          boxShadow: shadowStyle,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column - Spans 2 on large screens */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/paidin-logo.svg" 
                alt="PaidIn Logo" 
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="text-white">Paid</span><span className="text-bitcoin">In</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              The future of Bitcoin Operations for modern teams. Enterprise-grade payroll, accounting, compliance, invoicing, reporting, and operations infrastructure.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="https://x.com/PaidInHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bitcoin transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/paidin.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bitcoin transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="http://linkedin.com/company/paidin-software"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bitcoin transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-bitcoin transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>

            {/* Subtle Newsletter CTA */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              <Link href="/contact" className="hover:text-bitcoin transition-colors duration-200">
                Get product updates
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Security
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <a href="https://medium.com/@paidin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} PaidIn, Inc.</p>
                <span className="hidden md:inline">•</span>
                <p>Built for the Bitcoin economy.</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Bitcoin className="h-3 w-3" />
                <span>- Powered by Bitcoin</span>
              </div>
            </div>
            
            {/* Additional Footer Lines */}
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>Howdy! PaidIn was proudly built in the Lone Star State 🇺🇸</p>
              <p>Dedicated to those who choose freedom, fairness, and truth over trust.</p>
            </div>
          </div>
        </div>
        </div>
      </footer>

      {/* Artistic Brand Accent Section */}
      <section 
        className={`relative w-full overflow-hidden ${accentBg}`}
        aria-hidden="true"
        style={{ paddingBottom: 0, marginBottom: 0 }}
      >
        {/* Subtle Animated Background Orbs */}
        <div className="relative" style={{ paddingBottom: 0, marginBottom: 0, minHeight: 'auto', height: 'auto' }}>
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
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-bitcoin/10 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/8 rounded-full blur-3xl"
          />

          {/* Large Brand Text - Elegant Watermark */}
          <div className="relative flex items-end justify-center pt-8 lg:pt-12 pointer-events-none select-none" style={{ paddingBottom: 0, marginBottom: 0, height: 'auto' }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[80px] sm:text-[120px] lg:text-[280px] xl:text-[380px] 2xl:text-[480px] font-black uppercase tracking-tighter select-none"
              style={isFeaturesPage ? {
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '3px #f7931a',
                paddingBottom: 0,
                marginBottom: '-0.1em',
                paddingTop: 0,
                marginTop: 0,
                display: 'block',
                verticalAlign: 'bottom',
              } : {
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: 0,
                marginBottom: '-0.1em',
                paddingTop: 0,
                marginTop: 0,
                display: 'block',
                verticalAlign: 'bottom',
              }}
            >
              PAIDIN
            </motion.span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(Footer);
