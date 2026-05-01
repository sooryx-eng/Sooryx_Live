"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, CreditCard, Factory, Home, Smartphone, Sparkles, SunMedium, Zap, TrendingUp, Lightbulb, Users } from "lucide-react";
import Link from "next/link";
import GlowingHeader from "../components/GlowingHeader";
import SolarLineArt from "../components/SolarLineArt";
import SolarLineArt2 from "../components/SolarLineArt2";
import SolarEnergyFlow from "../components/SolarEnergyFlow";

export default function Platform() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollOpacity = Math.min(scrollY / 200, 1);

  const audience = [
    {
      icon: Home,
      label: "For Homes",
      title: "Reduce your home electricity bills with rooftop solar.",
      description: "Buy outright, finance, or pay nothing upfront.",
    },
    {
      icon: Building2,
      label: "For Societies",
      title: "Zero-cost solar for your common areas.",
      description:
        "Reduce society maintenance charges. Plus, residents can get personal discounts too.",
    },
    {
      icon: Factory,
      label: "For Businesses",
      title: "Lower your operational costs with predictable energy expenses.",
      description: "Show sustainability leadership. Solar for offices, retail, and hotels.",
    },
  ];

  const movingStats = [
    "Homes • Rooftop + Finance",
    "Societies • Zero-cost common area solar",
    "Businesses • Predictable power spend",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Scroll Tint Overlay - Natural Sunrise Light Reflection */}
      <div 
        className="fixed inset-0 z-30 pointer-events-none"
        style={{ 
          opacity: scrollOpacity,
          background: `radial-gradient(ellipse 200% 100% at 50% -30%, 
            rgba(251, 191, 36, 0.25) 0%, 
            rgba(245, 158, 11, 0.20) 15%,
            rgba(217, 119, 6, 0.15) 30%,
            rgba(139, 92, 246, 0.12) 50%,
            rgba(59, 130, 246, 0.10) 70%,
            transparent 100%
          )`
        }}
      />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.35),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.28),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.22),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,191,36,0.08)_0%,rgba(16,185,129,0.05)_25%,rgba(56,189,248,0.06)_50%,rgba(139,92,246,0.05)_75%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),rgba(255,255,255,0.88))]" />
      </div>

      {/* Decorative elements for hero section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute top-40 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-300/12 to-yellow-200/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-gradient-to-tl from-purple-300/10 to-pink-200/8 rounded-full blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pt-28">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(251,191,36,0.18),rgba(16,185,129,0.15),rgba(56,189,248,0.12),rgba(251,191,36,0.18))] blur-3xl" />
        <div className="pointer-events-none absolute top-32 right-10 h-96 w-96 rounded-full bg-gradient-to-bl from-emerald-400/12 to-emerald-200/6 blur-3xl hidden lg:block" />
        <div className="pointer-events-none absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-400/10 to-yellow-200/6 blur-3xl hidden lg:block" />
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left side - Main content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
              className="max-w-4xl relative z-10"
            >
              <motion.div
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-100/90 to-yellow-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-700 font-medium backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                <Sparkles size={14} className="text-amber-500" /> sooryx platform
              </motion.div>

              <GlowingHeader as="h1" className="text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">
                Solar Power - <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">Your Way</span>
              </GlowingHeader>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
                Solar installations for homes, societies, businesses, and factories. Own the power you generate and reduce your electricity costs.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-10 inline-block"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 rounded-full font-bold text-lg text-white overflow-hidden shadow-2xl transition-all duration-300"
                  >
                    {/* Vibrant gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    
                    {/* Animated glow on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 -z-10 scale-150" />
                    <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-75 transition-opacity duration-300 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 blur-xl animate-pulse -z-10" />
                    
                    {/* Content wrapper */}
                    <div className="relative flex items-center justify-center gap-3">
                      <span className="text-2xl group-hover:animate-bounce">☀️</span>
                      <span>Let's Go Solar</span>
                      <motion.span 
                        className="text-xl"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Trust stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 space-y-4"
          >
            <div className="rounded-2xl border-2 border-amber-500 bg-gradient-to-br from-amber-500/90 via-yellow-500/80 to-orange-500/70 p-6 backdrop-blur-sm shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-white/90 font-bold">✓ Eco-Friendly</p>
              <p className="text-2xl font-bold text-white mt-3">Zero Emissions</p>
              <p className="text-sm text-white/85 mt-2 font-medium">100% clean renewable energy</p>
            </div>
            
            <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-500/90 via-green-500/80 to-teal-500/70 p-6 backdrop-blur-sm shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-white/90 font-bold">⚡ Expert Support</p>
              <p className="text-2xl font-bold text-white mt-3">24/7 Available</p>
              <p className="text-sm text-white/85 mt-2 font-medium">Certified technician assistance</p>
            </div>
            
            <div className="rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-500/90 via-cyan-500/80 to-sky-500/70 p-6 backdrop-blur-sm shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-white/90 font-bold">✓ Durability</p>
              <p className="text-2xl font-bold text-white mt-3">25+ Years</p>
              <p className="text-sm text-white/85 mt-2 font-medium">Industry-leading warranty</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25 }}
          className="mt-14 grid gap-4 md:grid-cols-3 relative z-10"
        >
          <InfoChip index={0} title="Homes & Apartments" value="Flexible ownership options" />
          <InfoChip index={1} title="Societies & Communities" value="Common area savings" />
          <InfoChip index={2} title="Businesses & Factories" value="Predictable energy spend" />
        </motion.div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-r from-white/85 via-amber-50/50 to-white/85 py-3 backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-emerald-400/5 to-blue-400/5 rounded-2xl" />
          <motion.div
            className="flex w-max gap-3 px-4 relative z-10"
            animate={{ x: [0, -520] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {[...movingStats, ...movingStats].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-full border border-gradient-to-r from-amber-300/40 to-emerald-300/40 bg-gradient-to-r from-white/95 to-amber-100/50 px-5 py-2 text-xs uppercase tracking-[0.13em] text-slate-700 font-medium whitespace-nowrap shadow-sm hover:shadow-md transition"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-8 md:px-10">
        <SolarEnergyFlow className="-top-8 left-10 hidden lg:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <GlowingHeader as="h2" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Built for every kind of customer</GlowingHeader>
          <p className="mt-3 text-slate-600">Choose the model that works for your property and your cash flow.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {audience.map((item, index) => (
            <AudienceCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-10 max-w-7xl border-y border-slate-200/70 px-6 py-16 md:px-10 md:py-24">
        <SolarLineArt2 className="top-8 right-10 hidden lg:block" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.15),transparent_60%)] blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">
            <SunMedium size={13} /> Solar Benefits
          </div>
          <GlowingHeader as="h2" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Own your solar, maximize your savings
          </GlowingHeader>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-600">
            Get a rooftop solar system designed for your home or business. Generate clean energy, reduce your electricity bills, and increase your property value. Start saving immediately after installation.
          </p>
        </motion.div>

        <div className="space-y-6">
          <SolarFlow />
          
          <div className="grid gap-5 md:grid-cols-3">
            <BenefitCard
              icon={<Zap size={24} />}
              title="Maximum Savings"
              description="Generate your own energy and slash electricity bills by up to 70%. Full control over your power generation."
              color="amber"
            />
            <BenefitCard
              icon={<TrendingUp size={24} />}
              title="Long-Term ROI"
              description="Solar systems pay for themselves in 5-7 years. Then enjoy 25+ years of free electricity and increasing returns."
              color="emerald"
            />
            <BenefitCard
              icon={<Users size={24} />}
              title="24/7 Support"
              description="Professional installation, monitoring, and maintenance. Peace of mind with warranty and expert support."
              color="blue"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/70 bg-white/85 p-8 backdrop-blur md:p-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Why this matters</p>
          <h3 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Energy independence is the future. Start today.
          </h3>
          <p className="mt-4 max-w-3xl text-slate-600">
            Own your renewable energy source and take control of your electricity costs. Solar isn't just an investment in your home—it's an investment in a sustainable future.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-slate-200/70 px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-center text-3xl font-bold md:text-4xl mb-6">
            Choose Your Solar Solution
          </h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto">
            Sooryx offers both on-grid and off-grid solar systems tailored to your needs
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200/70 bg-white/80 p-8 backdrop-blur"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">On-Grid Solar</h3>
            <p className="text-slate-600 mb-4">
              Connected to your local electricity grid. Solar panels generate power that you use immediately, and excess goes back to the grid.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Lower upfront investment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Minimal maintenance required</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Instantly reduces your monthly bills</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Ideal for most residential and commercial properties</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-200/70 bg-white/80 p-8 backdrop-blur"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Off-Grid Solar</h3>
            <p className="text-slate-600 mb-4">
              Complete energy independence with battery storage. Generate, store, and use your own power 24/7.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Complete energy independence</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Works 24/7 with battery backup</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Perfect for remote locations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Maximum control over power generation and usage</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/70 p-8"
        >
          <p className="text-slate-700">
            <span className="font-bold text-amber-600">Not sure which is right for you?</span> Our solar experts will assess your property, electricity usage, and goals to recommend the best solution. Both on-grid and off-grid systems deliver long-term energy and cost savings.
          </p>
        </motion.div>
      </section>

      {/* Financing Options Section */}
      <section className="relative mx-auto max-w-7xl border-t border-slate-200/70 px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-purple-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-purple-700">
            <CreditCard size={13} /> Financing
          </div>
          <GlowingHeader as="h2" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Solar Financing Options
          </GlowingHeader>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Choose the payment model that works best for your budget and goals.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FinancingCard
            title="Self-Financing"
            icon={<Smartphone size={24} />}
            description="Buy the system outright and own 100% of the energy it produces."
            benefits={["100% energy ownership", "Maximum long-term savings", "Requires upfront capital"]}
            color="amber"
          />

          <FinancingCard
            title="Bank Loans"
            icon={<CreditCard size={24} />}
            description="Financing through our partner banks and NBFCs with competitive rates."
            benefits={["Minimal downpayment", "Flexible EMI options"]}
            color="emerald"
          />

          <FinancingCard
            title="PPA Model"
            icon={<TrendingUp size={24} />}
            description="Pay-per-use model. We install, maintain, and you pay for energy usage."
            benefits={["Zero installation cost", "Guaranteed bill reduction", "15-year guarantee"]}
            color="blue"
          />

          <FinancingCard
            title="Leasing"
            icon={<Users size={24} />}
            description="Monthly lease payments with all maintenance included."
            benefits={["Predictable costs", "No maintenance worries", "Flexible terms available"]}
            color="purple"
          />
        </div>
      </section>
    </div>
  );
}

function InfoChip({ index, title, value }: { index: number; title: string; value: string }) {
  const variants = [
    {
      bg: "bg-gradient-to-br from-amber-100/80 via-yellow-100/60 to-amber-50/70",
      border: "border-amber-300/50",
      label: "text-amber-700",
      text: "text-amber-900",
      accent: "bg-gradient-to-r from-amber-400/20 to-yellow-300/15"
    },
    {
      bg: "bg-gradient-to-br from-emerald-100/80 via-green-100/60 to-emerald-50/70",
      border: "border-emerald-300/50",
      label: "text-emerald-700",
      text: "text-emerald-900",
      accent: "bg-gradient-to-r from-emerald-400/20 to-green-300/15"
    },
    {
      bg: "bg-gradient-to-br from-blue-100/80 via-cyan-100/60 to-blue-50/70",
      border: "border-blue-300/50",
      label: "text-blue-700",
      text: "text-blue-900",
      accent: "bg-gradient-to-r from-blue-400/20 to-cyan-300/15"
    }
  ];

  const variant = variants[index % variants.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl border ${variant.border} ${variant.bg} p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10`}
    >
      <div className={`inline-block px-3 py-1 rounded-lg ${variant.accent} mb-3`}>
        <p className={`text-xs uppercase tracking-[0.15em] font-medium ${variant.label}`}>{title}</p>
      </div>
      <p className={`text-lg font-semibold ${variant.text}`}>{value}</p>
    </motion.div>
  );
}

function AudienceCard({
  item,
  index,
}: {
  item: { icon: React.ComponentType<any>; label: string; title: string; description: string };
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="group h-full rounded-3xl border border-slate-200/70 bg-white/90 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-200/60 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)]">
        <div className="mb-5 inline-flex items-center justify-center rounded-2xl border border-amber-300/40 bg-amber-100 p-3 text-amber-600 transition group-hover:scale-105 group-hover:text-amber-500">
          <Icon size={20} />
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-900">{item.title}</h3>
        <p className="mt-4 text-slate-600">{item.description}</p>
      </div>
    </motion.div>
  );
}

function FinancingCard({
  title,
  icon,
  description,
  benefits,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  color: "amber" | "emerald" | "blue" | "purple";
}) {
  const colorMap = {
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200/70",
      hover: "hover:border-amber-300/70 hover:shadow-[0_12px_30px_rgba(251,191,36,0.16)]",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200/70",
      hover: "hover:border-emerald-300/70 hover:shadow-[0_12px_30px_rgba(16,185,129,0.16)]",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200/70",
      hover: "hover:border-blue-300/70 hover:shadow-[0_12px_30px_rgba(59,130,246,0.16)]",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200/70",
      hover: "hover:border-purple-300/70 hover:shadow-[0_12px_30px_rgba(168,85,247,0.16)]",
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group rounded-2xl border ${colors.border} bg-white/90 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 ${colors.hover}`}
    >
      <div className={`mb-4 inline-flex rounded-xl ${colors.bg} p-3 ${colors.text}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{description}</p>

      <div className="mt-5 space-y-2 border-t border-slate-200/70 pt-5">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex gap-2 text-xs text-slate-600">
            <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.text}`} />
            {benefit}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CreditLine({ line, index }: { line: string; index: number }) {
  const icons = [
    <Zap key="zap" size={20} />,
    <Lightbulb key="bulb" size={20} />,
    <TrendingUp key="trend" size={20} />,
    <Users key="users" size={20} />,
  ];

  const glowColors = [
    "hover:shadow-[0_18px_45px_rgba(251,191,36,0.24),inset_0_1px_0_rgba(251,191,36,0.16)]",
    "hover:shadow-[0_18px_45px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(59,130,246,0.14)]",
    "hover:shadow-[0_18px_45px_rgba(16,185,129,0.24),inset_0_1px_0_rgba(16,185,129,0.16)]",
    "hover:shadow-[0_18px_45px_rgba(168,85,247,0.2),inset_0_1px_0_rgba(168,85,247,0.14)]",
  ];

  const borderColors = [
    "hover:border-amber-300/70",
    "hover:border-blue-300/70",
    "hover:border-emerald-300/70",
    "hover:border-purple-300/70",
  ];

  const iconBgColors = [
    "bg-amber-100 text-amber-600 group-hover:text-amber-500",
    "bg-blue-100 text-blue-600 group-hover:text-blue-500",
    "bg-emerald-100 text-emerald-600 group-hover:text-emerald-500",
    "bg-purple-100 text-purple-600 group-hover:text-purple-500",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      className={`group rounded-2xl border border-slate-200/70 bg-white/90 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 ${borderColors[index]} ${glowColors[index]}`}
    >
      <div className="flex gap-4">
        <div
          className={`mt-1 flex flex-shrink-0 items-center justify-center rounded-xl border border-current/20 ${iconBgColors[index]} p-2.5 transition group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]`}
        >
          {icons[index]}
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
            Point {index + 1}
          </p>
          <p className="mt-2 text-base font-medium leading-relaxed text-slate-800">{line}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SolarFlow() {
  const flowSteps = [
    { title: "Solar Panels", description: "Distributed solar installations across the city", icon: "☀️" },
    { title: "Energy Pool", description: "Combined renewable energy generation", icon: "⚡" },
    { title: "Your Bill", description: "Direct credits to your monthly electricity bill", icon: "📊" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 backdrop-blur md:p-12"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {flowSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 * index }}
            className="relative flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, delay: 0.3 * index, repeat: Infinity }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-300/40 bg-gradient-to-br from-amber-100 to-amber-50 text-4xl"
            >
              {step.icon}
            </motion.div>
            <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>

            {index < flowSteps.length - 1 && (
              <motion.svg
                className="absolute -right-4 top-8 h-6 w-6 text-emerald-400 md:-right-8"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 border-t border-slate-200/70 pt-8"
      >
        <p className="text-center text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Zero upfront costs.</span> No installation. No installation risk. No maintenance fees.
          Just lower bills from clean solar energy.
        </p>
      </motion.div>
    </motion.div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "amber" | "emerald" | "blue";
}) {
  const colorMap = {
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200/70",
      hover: "hover:border-amber-300/70 hover:shadow-[0_12px_30px_rgba(251,191,36,0.16)]",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200/70",
      hover: "hover:border-emerald-300/70 hover:shadow-[0_12px_30px_rgba(16,185,129,0.16)]",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200/70",
      hover: "hover:border-blue-300/70 hover:shadow-[0_12px_30px_rgba(59,130,246,0.16)]",
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group rounded-2xl border ${colors.border} bg-white/90 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 ${colors.hover}`}
    >
      <div className={`mb-4 inline-flex rounded-xl ${colors.bg} p-3 ${colors.text}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </motion.div>
  );
}
