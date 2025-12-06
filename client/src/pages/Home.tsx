import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AccessibilitySection from "@/components/AccessibilitySection";
import SocialProof from "@/components/SocialProof";
import SecuritySection from "@/components/SecuritySection";
import FinalCTA from "@/components/FinalCTA";
import SEOHead from "@/components/SEOHead";

function UnderConstruction() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-orange-50/10 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-white/80 to-orange-50/40 backdrop-blur-sm rounded-3xl border border-orange-100/50 shadow-xl p-12">
          {/* PaidIn Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200/50 flex items-center justify-center shadow-lg">
              <img 
                src="/paidin-logo.svg" 
                alt="PaidIn Logo" 
                className="h-12 w-12"
              />
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200/50 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-semibold text-gray-800">Currently in Development</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Building the Future of Bitcoin Business Operations
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            We're putting the finishing touches on our platform and perfecting this website. 
            Our software is nearly ready to revolutionize how companies operate in Bitcoin.
          </p>

          {/* Contact Information */}
          <div className="bg-white/60 rounded-2xl p-8 border border-orange-100/50">
            <p className="text-sm font-semibold text-gray-700 mb-4">Need to reach us?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:connect@paidin.io" 
                className="flex items-center gap-2 text-bitcoin hover:text-orange-600 font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                connect@paidin.io
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="tel:+12815417279" 
                className="flex items-center gap-2 text-bitcoin hover:text-orange-600 font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (281) 541-7279
              </a>
            </div>
          </div>

          {/* Coming Soon */}
          <p className="text-sm text-gray-500 mt-6">
            Launch coming soon. Stay tuned for the ₿itcoin business revolution.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEOHead 
        title="PaidIn - Complete Bitcoin Business Operations Platform"
        description="PaidIn is the first Bitcoin-native business operations platform for companies who run entirely in Bitcoin. From payroll to expenses, compliance to analytics - everything in Bitcoin with enterprise security."
        canonical="https://www.paidin.io/"
      />
      <Hero />
      <Features />
      <AccessibilitySection />
      <SecuritySection />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
