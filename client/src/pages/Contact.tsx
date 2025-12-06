import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { 
  Mail, 
  Phone, 
  Linkedin,
  Send, 
  Calendar,
  MessageSquare,
  Building2,
  User,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  FileText,
  Upload,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Component for animated text with fade-in and slide-up effect
function AnimatedText({ text, className, delay = 0, highlightWords = [] }: { text: string; className?: string; delay?: number; highlightWords?: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => {
        const shouldHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        
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
            className={shouldHighlight ? "text-bitcoin" : ""}
          >
            {word}
            {index < words.length - 1 && " "}
          </motion.span>
        );
      })}
    </span>
  );
}

// Custom Dropdown Component
interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  className?: string;
}

function CustomSelect({ id, value, onChange, options, placeholder = "Select...", error, className = "" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 border-2 ${error ? "border-red-500" : "border-gray-200"} focus:border-bitcoin focus:ring-bitcoin/20 rounded-md px-4 text-left flex items-center justify-between bg-white transition-all hover:border-gray-300 ${isOpen ? "border-bitcoin" : ""}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-bitcoin/5 transition-colors ${
                  value === option.value ? "bg-bitcoin/10 text-bitcoin font-semibold" : "text-gray-900"
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="h-4 w-4 text-bitcoin" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  industry: string;
  contactReason: string;
  message: string;
  files: File[];
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    industry: "",
    contactReason: "",
    message: "",
    files: [],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof FormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Update message count
    if (field === "message") {
      setMessageCount((value as string).length);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles].slice(0, 5) // Limit to 5 files
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.contactReason) newErrors.contactReason = "Required";
    if (!formData.message.trim()) {
      newErrors.message = "Required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        companySize: "",
        industry: "",
        contactReason: "",
        message: "",
        files: [],
      });
      setMessageCount(0);
    }, 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email! We typically respond within 24 hours.",
      value: "connect@paidin.io",
      link: "mailto:connect@paidin.io",
      color: "from-orange-500/20 to-amber-500/20"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Give us a call. We're here to help with any questions or concerns!",
      value: "(281) 541-7279",
      link: "tel:+12815417279",
      color: "from-orange-500/20 to-amber-500/20"
    },
    {
      icon: Linkedin,
      title: "Let's Connect",
      description: "Reach out via LinkedIn. Follow us for updates and insights!",
      value: "LinkedIn",
      link: "https://www.linkedin.com/company/paidin-software",
      color: "from-amber-500/20 to-orange-400/20"
    },
  ];

  const responseTimes = [
    { reason: "Sales Inquiry", time: "Within 2 hours" },
    { reason: "Support", time: "Within 24 hours" },
    { reason: "Partnership", time: "Within 48 hours" },
    { reason: "Enterprise", time: "Within 1 hour" },
    { reason: "General", time: "Within 24 hours" },
  ];

  return (
    <>
      <SEOHead 
        title="Contact Us - Get in Touch with PaidIn | PaidIn"
        description="Get in touch with PaidIn. Whether you're ready to transform your business operations or just want to learn more, we're here to help."
        canonical="https://www.paidin.io/contact"
      />
      <div className="relative">
      {/* Hero Section - Dark with Orange-Tinted Video Background */}
      <section className="relative overflow-hidden bg-gray-900 min-h-screen flex items-center">
        {/* Video Background Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Video Background with Orange Filter */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/website-photos/contact-page-hero-video-poster.png"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'hue-rotate(10deg) saturate(1.1) brightness(0.95)',
                willChange: 'transform'
              }}
            >
              <source src="/website-videos/contact-page-hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Dark Overlay for Video - ensures text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-10"></div>
          
          {/* Subtle Animated Orbs - Dark Theme */}
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
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-bitcoin/15 rounded-full blur-[120px] z-20"
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
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/12 rounded-full blur-[100px] z-20"
          />
        </div>

        {/* Content Layer */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-6 px-8 py-3 rounded-full border-2 border-bitcoin/40 bg-white/10 backdrop-blur-md text-white/90 text-xs uppercase tracking-[0.35em] font-semibold shadow-lg"
            >
              <MessageSquare className="h-4 w-4 text-bitcoin" />
              Get In Touch
              <span className="text-bitcoin/50">│</span>
              Let's Connect
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] tracking-tight max-w-6xl mx-auto mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <AnimatedText
                text="Let's build together"
                delay={0.2}
                highlightWords={["build", "together"]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            >
              Whether you're ready to transform your business operations or just want to learn more, we're here to help.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-32 bg-gradient-to-r from-transparent via-bitcoin to-transparent origin-center mx-auto shadow-lg shadow-bitcoin/50"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="relative overflow-hidden bg-white pt-40 lg:pt-56 pb-8 lg:pb-12">
        {/* Gradient Transition from Black to White */}
        <div className="absolute top-0 left-0 right-0 h-40 lg:h-56 bg-gradient-to-b from-black via-zinc-900 to-white pointer-events-none z-0"></div>
        
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-16 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-xs text-gray-400 font-light tracking-[0.4em] uppercase">
                Contact Methods
              </span>
              <div className="h-px w-12 bg-gray-300"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Choose how you'd like to{" "}
              <span className="text-bitcoin">reach us</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.link}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 hover:border-bitcoin/50 transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F7931A] to-[#FF8C00] mb-6 shadow-lg shadow-bitcoin/30 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-bitcoin transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-4 font-light">
                      {method.description}
                    </p>
                    <p className="text-bitcoin font-semibold">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="relative overflow-hidden bg-white pt-8 lg:pt-12 pb-20 lg:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Send us a{" "}
              <span className="text-bitcoin">message</span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="inline-flex w-full max-w-md bg-white border-2 border-gray-200 rounded-2xl p-1.5 gap-1.5 h-auto">
                <TabsTrigger 
                  value="form" 
                  className="flex-1 rounded-xl data-[state=active]:bg-bitcoin data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 font-semibold h-12 transition-all duration-200"
                >
                  Contact Form
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule" 
                  className="flex-1 rounded-xl data-[state=active]:bg-bitcoin data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 font-semibold h-12 transition-all duration-200"
                >
                  Schedule Demo
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="form">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative overflow-hidden rounded-3xl border-2 border-bitcoin bg-white p-12 lg:p-16 text-center shadow-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-bitcoin to-orange-500 mb-6 shadow-lg"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-lg text-gray-600 font-light mb-6">
                      We've received your message and will get back to you soon.
                    </p>
                    <div className="inline-flex items-center gap-2 text-bitcoin font-semibold">
                      <Clock className="h-5 w-5" />
                      <span>Expected response: {responseTimes.find(r => r.reason === formData.contactReason)?.time || "Within 24 hours"}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 lg:p-12 shadow-xl"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-bitcoin/20 via-orange-500/20 to-bitcoin/20 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-semibold text-gray-900">
                          First Name <span className="text-bitcoin">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={`h-12 border-2 ${errors.firstName ? "border-red-500" : "border-gray-200"} focus:border-bitcoin focus:ring-bitcoin/20 transition-all`}
                          placeholder="Satoshi"
                        />
                        {errors.firstName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.firstName}
                          </motion.p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-semibold text-gray-900">
                          Last Name <span className="text-bitcoin">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={`h-12 border-2 ${errors.lastName ? "border-red-500" : "border-gray-200"} focus:border-bitcoin focus:ring-bitcoin/20 transition-all`}
                          placeholder="Nakamoto"
                        />
                        {errors.lastName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.lastName}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                          Email <span className="text-bitcoin">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`h-12 border-2 ${errors.email ? "border-red-500" : "border-gray-200"} focus:border-bitcoin focus:ring-bitcoin/20 transition-all`}
                          placeholder="satoshi@company.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-12 border-2 border-gray-200 focus:border-bitcoin focus:ring-bitcoin/20 transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Company */}
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-semibold text-gray-900">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="h-12 border-2 border-gray-200 focus:border-bitcoin focus:ring-bitcoin/20 transition-all"
                          placeholder="Company Name"
                        />
                      </div>

                      {/* Company Size */}
                      <div className="space-y-2">
                        <Label htmlFor="companySize" className="text-sm font-semibold text-gray-900">
                          Company Size
                        </Label>
                        <CustomSelect
                          id="companySize"
                          value={formData.companySize}
                          onChange={(value) => handleInputChange("companySize", value)}
                          placeholder="Select size"
                          options={[
                            { value: "1-10", label: "1-10 employees" },
                            { value: "11-50", label: "11-50 employees" },
                            { value: "51-100", label: "51-100 employees" },
                            { value: "101-500", label: "101-500 employees" },
                            { value: "500+", label: "500+ employees" },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Industry */}
                      <div className="space-y-2">
                        <Label htmlFor="industry" className="text-sm font-semibold text-gray-900">
                          Industry
                        </Label>
                        <CustomSelect
                          id="industry"
                          value={formData.industry}
                          onChange={(value) => handleInputChange("industry", value)}
                          placeholder="Select industry"
                          options={[
                            { value: "technology", label: "Technology" },
                            { value: "finance", label: "Finance" },
                            { value: "healthcare", label: "Healthcare" },
                            { value: "retail", label: "Retail" },
                            { value: "manufacturing", label: "Manufacturing" },
                            { value: "other", label: "Other" },
                          ]}
                        />
                      </div>

                      {/* Contact Reason */}
                      <div className="space-y-2">
                        <Label htmlFor="contactReason" className="text-sm font-semibold text-gray-900">
                          Contact Reason <span className="text-bitcoin">*</span>
                        </Label>
                        <CustomSelect
                          id="contactReason"
                          value={formData.contactReason}
                          onChange={(value) => handleInputChange("contactReason", value)}
                          placeholder="Select reason"
                          error={errors.contactReason}
                          options={[
                            { value: "sales", label: "Sales Inquiry" },
                            { value: "support", label: "Support" },
                            { value: "partnership", label: "Partnership" },
                            { value: "enterprise", label: "Enterprise Inquiry" },
                            { value: "general", label: "General Question" },
                          ]}
                        />
                        {errors.contactReason && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.contactReason}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message" className="text-sm font-semibold text-gray-900">
                          Message <span className="text-bitcoin">*</span>
                        </Label>
                        <span className="text-xs text-gray-500">{messageCount} / 2000</span>
                      </div>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        maxLength={2000}
                        rows={6}
                        className={`border-2 ${errors.message ? "border-red-500" : "border-gray-200"} focus:border-bitcoin focus:ring-bitcoin/20 transition-all resize-none`}
                        placeholder="Tell us about your needs..."
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2 mb-8">
                      <Label className="text-sm font-semibold text-gray-900">
                        Attachments (Optional)
                      </Label>
                      <div className="flex items-center gap-4">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-gray-200 hover:border-bitcoin hover:bg-bitcoin/5"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Files
                        </Button>
                        <span className="text-sm text-gray-500">
                          {formData.files.length} file(s) selected (max 5)
                        </span>
                      </div>
                      {formData.files.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {formData.files.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm"
                            >
                              <FileText className="h-4 w-4 text-gray-600" />
                              <span className="text-gray-700">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="ml-2 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-auto bg-gradient-to-r from-bitcoin to-orange-500 hover:from-orange-500 hover:to-bitcoin text-white font-black px-12 py-6 text-lg h-auto shadow-2xl hover:shadow-bitcoin/50 hover:scale-105 transition-all duration-300 rounded-full"
                      >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="schedule">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 lg:p-12 shadow-xl"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#F7931A] to-[#FF8C00] mb-6 shadow-lg shadow-bitcoin/30">
                    <Calendar className="h-10 w-10 text-white drop-shadow-sm" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">
                    Schedule a Demo
                  </h3>
                  <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                    Book a personalized demo with our team to see how PaidIn can transform your business operations.
                  </p>
                </div>
                
                {/* Calendly Embed */}
                <div className="relative w-full" style={{ minHeight: '700px' }}>
                  <iframe
                    src="https://calendly.com/paidin"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="rounded-2xl"
                    style={{ minHeight: '700px' }}
                    title="Schedule a demo with PaidIn"
                  ></iframe>
                </div>
                
                {/* Optional: Link to open in new tab */}
                <div className="text-center mt-6">
                  <a
                    href="https://calendly.com/paidin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-bitcoin transition-colors inline-flex items-center gap-1"
                  >
                    Open in new tab
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Response Times & Security Section */}
      <section className="relative overflow-hidden bg-[#050a14] py-20 lg:py-32">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/website-photos/contact-page-form-background.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#050a14]/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              We're here when{" "}
              <span className="text-bitcoin">you need us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Response Time Cards with Big Numbers */}
            {responseTimes.slice(0, 4).map((item, index) => {
              const timeNumber = item.time.match(/\d+/)?.[0] || "24";
              const timeUnit = item.time.includes("hour") ? "hrs" : item.time.includes("day") ? "days" : "";
              
              return (
                <motion.div
                  key={item.reason}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border-2 border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-bitcoin/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-bitcoin/20 transition-all duration-300"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/10 via-orange-500/10 to-bitcoin/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-4">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                        className="text-5xl lg:text-6xl font-black text-bitcoin"
                      >
                        {timeNumber}
                      </motion.span>
                      <span className="text-xl text-white/60 font-semibold">{timeUnit}</span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-bitcoin transition-colors">
                      {item.reason}
                    </h3>
                    <p className="text-sm text-white/70 font-light">
                      Average response time
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Security Features - Minimal Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mt-12">
            {[
              "End-to-End Encryption",
              "GDPR Compliant",
              "SOC 2 Type II Certified"
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80 font-light"
              >
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-bitcoin flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
