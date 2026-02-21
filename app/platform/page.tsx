"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Factory, Home, Sparkles, SunMedium, Zap, TrendingUp, Lightbulb, Users } from "lucide-react";
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
    "Tenants • Savings without rooftop ownership",
    "Sooryx Credits • Distributed solar access",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.28),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),rgba(255,255,255,0.92))]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 md:px-10 md:pt-28">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(251,191,36,0.12),rgba(16,185,129,0.1),rgba(251,191,36,0.12))] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          className="max-w-5xl"
        >
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Sparkles size={14} className="text-amber-500" /> sooryx platform
          </motion.div>

          <GlowingHeader as="h1" className="text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 md:text-7xl">
            Solar Power - Your Way
          </GlowingHeader>

          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-2xl">
            Solar installations for homes, societies, businesses, and factories. Electricity discounts for
            tenants, renters, and anyone who can&apos;t install solar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25 }}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          <InfoChip title="Homes & Apartments" value="Flexible ownership options" />
          <InfoChip title="Societies & Communities" value="Common area savings" />
          <InfoChip title="Businesses & Factories" value="Predictable energy spend" />
        </motion.div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 py-3">
          <motion.div
            className="flex w-max gap-3 px-4"
            animate={{ x: [0, -520] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {[...movingStats, ...movingStats].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-full border border-slate-200/70 bg-white px-4 py-2 text-xs uppercase tracking-[0.13em] text-slate-600"
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
            <SunMedium size={13} /> How It Works
          </div>
          <GlowingHeader as="h2" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Solar savings without the roof
          </GlowingHeader>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-600">
            Tenants, renters, and apartment dwellers deserve solar benefits too. Sooryx pools solar energy from distributed
            installations and credits your electricity bill. It's like owning solar without the upfront cost.
          </p>
        </motion.div>

        <div className="space-y-6">
          <SolarFlow />
          
          <div className="grid gap-5 md:grid-cols-3">
            <BenefitCard
              icon={<Zap size={24} />}
              title="Instant Savings"
              description="Credits apply directly to your monthly bill. Lower electricity costs from day one."
              color="amber"
            />
            <BenefitCard
              icon={<TrendingUp size={24} />}
              title="Scalable Returns"
              description="As solar generation grows, so do your benefits. More installations = bigger savings pool."
              color="emerald"
            />
            <BenefitCard
              icon={<Users size={24} />}
              title="Community Powered"
              description="Join thousands of renters getting solar benefits. No new technology required—just your meter."
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
            Whether you own, rent, or run a business, you deserve access to solar savings.
          </h3>
          <p className="mt-4 max-w-3xl text-slate-600">
            Sooryx enables flexible adoption models so you can move to cleaner power without waiting on property
            constraints.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

function InfoChip({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
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
