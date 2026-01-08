import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { 
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Users,
  Building2,
  HelpCircle,
  ChevronDown,
  X,
  Sparkles,
  TrendingUp,
  Lock,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVideoPoster } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Starter",
    tagline: "For small teams",
    monthlyPrice: 149.99,
    annualPrice: 1499.99,
    popular: false,
    icon: Zap,
    gradient: "from-orange-300 to-orange-400",
    employeeLimit: "Up to 10 employees",
    features: [
      "Up to 10 employees",
      "Bitcoin payroll",
      "Basic accounting",
      "Tax reporting (US & Canada)",
      "Invoicing",
      "Email support",
      "Multi-signature wallets",
      "Real-time sync"
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    tagline: "For growing businesses",
    monthlyPrice: 499.99,
    annualPrice: 4999.99,
    popular: true,
    icon: TrendingUp,
    gradient: "from-bitcoin to-orange-500",
    employeeLimit: "Up to 50 employees",
    features: [
      "Up to 50 employees",
      "Everything in Starter",
      "Advanced reporting",
      "API access",
      "Custom integrations",
      "Priority support",
      "Expense management",
      "Learning Center access",
      "Internal messaging",
      "Multi-currency support"
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Scale",
    tagline: "For scaling companies",
    monthlyPrice: 999.99,
    annualPrice: 9999.99,
    popular: false,
    icon: Building2,
    gradient: "from-orange-600 to-orange-700",
    employeeLimit: "Up to 100 employees",
    features: [
      "Up to 100 employees",
      "Everything in Growth",
      "Advanced compliance tools",
      "Custom reporting",
      "Dedicated support channel",
      "SLA guarantees",
      "Advanced security features",
      "Custom integrations",
      "Training & onboarding",
      "Multi-jurisdiction tax support"
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    tagline: "For large organizations",
    monthlyPrice: null,
    annualPrice: null,
    popular: false,
    icon: Shield,
    gradient: "from-gray-700 to-gray-900",
    employeeLimit: "100+ employees",
    features: [
      "Unlimited employees",
      "Everything in Scale",
      "Dedicated account manager",
      "Custom security configs.",
      "SLA guarantees",
      "24/7 phone support",
      "Advanced compliance tools",
      "Custom reporting",
      "Training & onboarding",
      "On-premise deployment options"
    ],
    cta: "Contact Sales",
  },
];

const featureComparison = [
  {
    feature: "Number of Employees",
    starter: "Up to 10",
    growth: "Up to 50",
    scale: "Up to 100",
    enterprise: "100+"
  },
  {
    feature: "Bitcoin Payroll",
    starter: true,
    growth: true,
    scale: true,
    enterprise: true
  },
  {
    feature: "Accounting & Reporting",
    starter: "Basic",
    growth: "Advanced",
    scale: "Advanced",
    enterprise: "Custom"
  },
  {
    feature: "Tax Reporting",
    starter: "US & Canada",
    growth: "US & Canada",
    scale: "Multi-jurisdiction",
    enterprise: "Multi-jurisdiction"
  },
  {
    feature: "API Access",
    starter: false,
    growth: true,
    scale: true,
    enterprise: true
  },
  {
    feature: "Custom Integrations",
    starter: false,
    growth: true,
    scale: true,
    enterprise: true
  },
  {
    feature: "Support",
    starter: "Email",
    growth: "Priority",
    scale: "Dedicated Channel",
    enterprise: "Dedicated Manager"
  },
  {
    feature: "Multi-Signature Wallets",
    starter: true,
    growth: true,
    scale: true,
    enterprise: true
  },
  {
    feature: "Learning Center",
    starter: false,
    growth: true,
    scale: true,
    enterprise: true
  },
  {
    feature: "Internal Messaging",
    starter: false,
    growth: true,
    scale: true,
    enterprise: true
  },
  {
    feature: "SLA Guarantees",
    starter: false,
    growth: false,
    scale: true,
    enterprise: true
  },
  {
    feature: "On-Premise Deployment",
    starter: false,
    growth: false,
    scale: false,
    enterprise: true
  },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Bitcoin payments, as well as traditional payment methods including credit cards and bank transfers for annual plans."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, Growth and Scale plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "Do you offer discounts for annual plans?",
    answer: "Yes, annual plans save you 2 months compared to monthly billing. Enterprise customers can also negotiate custom pricing."
  },
  {
    question: "What happens if I exceed my employee limit?",
    answer: "We'll notify you when you're approaching your limit. You can upgrade your plan at any time to accommodate more employees."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use non-custodial architecture, meaning you always control your keys. All data is encrypted and we're SOC 2 Type II certified."
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEOHead 
        title="Pricing - Simple, Transparent Bitcoin Business Operations | PaidIn"
        description="Choose the plan that fits your business. All PaidIn plans include core features with enterprise-grade security. Start your 14-day free trial today."
        canonical="https://www.paidin.io/pricing"
      />
      <div className="relative">
      {/* Hero Section - Minimalist & Elegant */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-20 left-10 w-[450px] h-[450px] bg-orange-500/25 rounded-full blur-[80px]"
            style={{ willChange: 'transform' }}
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-orange-500/25 rounded-full blur-[80px]"
            style={{ willChange: 'transform' }}
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-20 right-10 w-[450px] h-[450px] bg-purple-500/15 rounded-full blur-[80px]"
            style={{ willChange: 'transform' }}
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-purple-500/15 rounded-full blur-[80px]"
            style={{ willChange: 'transform' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-bitcoin/10 border border-bitcoin/20"
            >
              <Sparkles className="h-4 w-4 text-bitcoin" />
              <span className="text-bitcoin text-xs font-semibold tracking-wider uppercase">Pricing</span>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black text-gray-900 mb-6 leading-[0.9] tracking-tight">
              Simple,{" "}
              <span className="text-bitcoin">transparent</span> pricing
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include our core features with enterprise-grade security.
            </p>

            {/* Billing Toggle - Minimalist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-3"
            >
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-bitcoin' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    isAnnual ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
                <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>
                  Annual
                </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards - Unique Layout */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div
                    className={`relative h-full rounded-3xl border-2 ${
                      plan.popular
                        ? 'border-bitcoin bg-white shadow-2xl group-hover:shadow-bitcoin/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 group-hover:shadow-xl'
                    } p-6 lg:p-8 flex flex-col transition-all duration-300 group-hover:scale-[1.02]`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-0 right-0 mx-auto w-fit"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="bg-bitcoin text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                          Most Popular
                        </div>
                      </motion.div>
                    )}

                    {/* Icon & Header */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${
                        plan.popular ? 'bg-bitcoin' : `bg-gradient-to-br ${plan.gradient}`
                      } mb-4 shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-light">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      {plan.monthlyPrice ? (
                        <>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl lg:text-5xl font-black text-gray-900">
                              ${isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                            </span>
                            <span className="text-gray-500 font-light text-base">
                              /{isAnnual ? "mo" : "mo"}
                            </span>
                          </div>
                          {isAnnual && plan.monthlyPrice !== plan.annualPrice && (
                            <p className="text-xs text-gray-500 mt-1">
                              Billed annually (${plan.annualPrice}/yr)
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl lg:text-5xl font-black text-gray-900">
                            Custom
                          </span>
                        </div>
                      )}
                      {plan.name === "Enterprise" && isAnnual && (
                        <p className="text-xs text-gray-400 mt-2 font-light">
                          Tailored to your needs
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2 font-light">
                        {plan.employeeLimit}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      size="lg"
                      className={`w-full mb-6 font-black rounded-xl transition-all duration-300 ${
                        plan.popular
                          ? 'bg-bitcoin hover:bg-orange-500 text-white shadow-lg'
                          : plan.name === "Enterprise"
                          ? 'bg-gray-900 hover:bg-orange-500 text-white'
                          : 'bg-gray-900 hover:bg-orange-500 text-white'
                      }`}
                      onClick={() => {
                        if (plan.name === "Enterprise") {
                          window.location.href = '/contact';
                        } else {
                          const planParam = plan.name.toLowerCase();
                          window.location.href = `https://app.paidin.io/signup?plan=${planParam}`;
                        }
                      }}
                    >
                      {plan.cta}
                      <ArrowRight className={`ml-2 h-5 w-5 ${
                        plan.popular ? 'text-white' : 'text-white'
                      }`} />
                    </Button>

                    {/* Features List */}
                    <div className="space-y-3 flex-1 text-sm">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + featureIndex * 0.03 }}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'text-bitcoin' : 'text-gray-400'
                          }`} />
                          <span className="text-gray-700 font-light leading-relaxed text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison - Clean Table */}
      <section className="relative py-20 lg:py-32 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Compare plans
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              See exactly what's included in each plan
            </p>
          </motion.div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-6 px-4 sm:px-6 text-gray-900 font-semibold text-base sm:text-lg">Feature</th>
                    <th className="text-center py-6 px-4 sm:px-6 text-gray-900 font-semibold text-base sm:text-lg">Starter</th>
                    <th className="text-center py-6 px-4 sm:px-6 text-bitcoin font-semibold text-base sm:text-lg bg-bitcoin/5">Growth</th>
                    <th className="text-center py-6 px-4 sm:px-6 text-gray-900 font-semibold text-base sm:text-lg">Scale</th>
                    <th className="text-center py-6 px-4 sm:px-6 text-gray-900 font-semibold text-base sm:text-lg">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className={`border-b border-gray-100 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } hover:bg-gray-100/70`}
                    >
                      <td className="py-5 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">{row.feature}</td>
                      <td className="py-5 px-4 sm:px-6 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <CheckCircle2 className="h-5 w-5 text-bitcoin mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600 text-sm sm:text-base">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-5 px-4 sm:px-6 text-center bg-bitcoin/5">
                        {typeof row.growth === 'boolean' ? (
                          row.growth ? (
                            <CheckCircle2 className="h-5 w-5 text-bitcoin mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600 font-medium text-sm sm:text-base">{row.growth}</span>
                        )}
                      </td>
                      <td className="py-5 px-4 sm:px-6 text-center">
                        {typeof row.scale === 'boolean' ? (
                          row.scale ? (
                            <CheckCircle2 className="h-5 w-5 text-bitcoin mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600 text-sm sm:text-base">{row.scale}</span>
                        )}
                      </td>
                      <td className="py-5 px-4 sm:px-6 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <CheckCircle2 className="h-5 w-5 text-bitcoin mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600 text-sm sm:text-base">{row.enterprise}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimalist */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-gray-100">
              <HelpCircle className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600 text-xs font-semibold tracking-wider uppercase">FAQ</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-gray-300 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                      initial={{ maxHeight: 0, opacity: 0 }}
                      animate={{ 
                        maxHeight: 1000, 
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                      exit={{ 
                        maxHeight: 0, 
                        opacity: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                      </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Clean */}
      <section className="relative py-20 lg:py-32 bg-black overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Video */}
          <video
            src="/website-videos/pricing-page-cta-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={getVideoPoster("pricing-page-cta-video-poster")}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{ willChange: 'transform' }}
          />
          {/* Orange Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/40 to-orange-500/30"></div>
          {/* Animated Orbs */}
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Ready to get started?
            </h2>
            <p className="text-xl text-white/70 mb-10 font-light max-w-2xl mx-auto">
              Start your 14-day free trial. No credit card required. Cancel anytime.
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-orange-500 hover:text-white font-black px-12 py-6 text-lg h-auto rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = 'https://app.paidin.io/signup'}
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
