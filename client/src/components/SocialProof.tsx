import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo } from "react";

const testimonials = [
  {
    quote: "From spending weeks on Bitcoin payroll headaches to clicking 'Pay'. Game changer.",
    author: "Sheldon Kozushko",
    role: "Founder",
    company: "Spring Street Studios",
    rating: 5,
  },
  {
    quote: "The compliance features & tax automations alone saved us from hiring two accountants.",
    author: "Monica Saenz",
    role: "CFO",
    company: "Numa Health",
    rating: 5,
  },
  {
    quote: "Finally, a platform that doesn't make me feel like I need a computer science degree. It just works.",
    author: "Laura Baumann",
    role: "Head of Operations",
    company: "Camden Living",
    rating: 5,
  },
];

function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
      {/* Top Transition Gradient - Midnight Blue to White */}
      <div className="absolute top-0 left-0 right-0 h-56 lg:h-64 bg-gradient-to-b from-[#050a14] via-[#050a14]/80 via-[#050a14]/40 via-gray-900/20 via-gray-100/30 to-white pointer-events-none z-0"></div>
      
      {/* Background Elements */}
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-24 sm:pt-48 lg:pt-80 pb-24 sm:pb-48 w-full z-10">
        
        {/* Editorial Title - Magazine Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24 relative z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gray-300"></div>
            <span className="text-xs text-gray-400 font-light tracking-[0.4em] uppercase">
              Testimonials
            </span>
            <div className="h-px flex-1 max-w-24 bg-gray-300"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight max-w-4xl">
            Our{" "}
            <span className="text-bitcoin">early users</span> are saying 💬
          </h2>
        </motion.div>

        {/* Editorial Quote Section - Magazine Layout */}
        <div className="relative min-h-[500px] sm:min-h-[600px] lg:h-[750px]">
          {/* Large Testimonial Number - Background Accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute left-0 lg:left-8 top-10 sm:top-20 lg:top-24 z-0 pointer-events-none"
          >
            <span className="text-[6rem] sm:text-[8rem] lg:text-[16rem] xl:text-[18rem] font-black leading-none tracking-tight" style={{ color: 'rgba(17, 24, 39, 0.04)' }}>
              {String(currentTestimonial + 1).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Main Editorial Layout - Asymmetric Grid */}
          <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-6 sm:gap-12 lg:gap-20 xl:gap-28 items-start lg:items-center pt-8 lg:pt-16 relative z-10">
            
            {/* Left: Large Editorial Quote */}
            <div className="relative h-full flex items-center">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  index === currentTestimonial && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-6 lg:space-y-8 w-full"
                    >
                      {/* Decorative Opening Quote Mark - Editorial Style */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[4rem] sm:text-[5rem] lg:text-[9rem] xl:text-[10rem] font-serif text-gray-900/8 leading-none -mb-4 sm:-mb-6 -ml-2 lg:-ml-4"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        "
                      </motion.div>
                      
                      {/* Quote Text - Large Editorial Serif */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-2xl sm:text-3xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[1.15] tracking-[-0.02em] pl-2 sm:pl-4 lg:pl-8"
                        style={{ 
                          fontFamily: 'Georgia, "Times New Roman", serif',
                          fontWeight: 300
                        }}
                      >
                        {testimonial.quote}
                      </motion.p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Author Attribution - Minimal & Elegant */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  index === currentTestimonial && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-6"
                    >
                      {/* Elegant Divider Line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px w-20 bg-gray-900 origin-left"
                      />
                      
                      {/* Author Name - Bold, Editorial */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 tracking-tight leading-tight"
                      >
                        {testimonial.author}
                      </motion.div>
                      
                      {/* Role - Uppercase, Light, Spaced */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-[10px] sm:text-xs lg:text-sm text-gray-500 font-light tracking-[0.2em] uppercase"
                      >
                        {testimonial.role}
                      </motion.div>
                      
                      {/* Company - Light, Smaller */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-xs sm:text-sm lg:text-base text-gray-400 font-light"
                      >
                        {testimonial.company}
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Editorial Navigation - Minimal, Sophisticated */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-between mt-12 sm:mt-20 lg:mt-32 pt-6 sm:pt-8 border-t border-gray-200"
          >
            {/* Minimal Dots Navigation */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-1.5 sm:h-1 transition-all duration-500 ease-out min-w-[44px] min-h-[44px] flex items-center justify-center ${
                    index === currentTestimonial
                      ? "w-12 sm:w-16 bg-gray-900"
                      : "w-1 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Editorial Page Counter */}
            <div className="text-xs text-gray-400 font-light tracking-[0.3em] uppercase">
              {String(currentTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </div>
          </motion.div>
        </div>

        {/* Logo Cloud - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12 sm:mt-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gray-300"></div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
              Powered by industry leaders
            </p>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {[
              { name: "Breez", logo: "/website-photos/partner-breez-logo.webp", maxWidth: "240px", customHeight: "h-14 sm:h-16 lg:h-20" },
              { name: "Plaid", logo: "/website-photos/partner-plaid-logo.webp", maxWidth: "240px", customHeight: "h-14 sm:h-16 lg:h-20" },
              { name: "Stripe", logo: "/website-photos/partner-stripe-logo.webp", maxWidth: "80px" },
              { name: "Strike", logo: "/website-photos/partner-strike-logo.webp", isWhite: true },
              { name: "Netlify", logo: "/website-photos/partner-netlify-logo.webp" },
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className={`${partner.customHeight || "h-10 sm:h-12 lg:h-14"} w-auto opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer group`}
                style={{ maxWidth: partner.maxWidth || "120px" }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`h-full w-full object-contain transition-all duration-300 ${
                    partner.isWhite 
                      ? "filter brightness-0 group-hover:brightness-100 group-hover:drop-shadow-lg" 
                      : "group-hover:drop-shadow-lg group-hover:brightness-110"
                  }`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
      
      {/* Bottom Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-50/30 via-blue-50/30 via-white/90 to-transparent pointer-events-none z-10"></div>
    </section>
  );
}

export default memo(SocialProof);
