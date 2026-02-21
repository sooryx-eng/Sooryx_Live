"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Building2, Zap, CreditCard, TrendingUp, CheckCircle2, Users, Smartphone } from "lucide-react";
import Link from "next/link";
import GlowingHeader from "../components/GlowingHeader";
import SolarLineArt from "../components/SolarLineArt";
import SolarLineArt3 from "../components/SolarLineArt3";
import SolarEnergyFlow from "../components/SolarEnergyFlow";

export default function HowItWorks() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.28),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),rgba(255,255,255,0.92))]" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 md:px-10 md:pt-32">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(251,191,36,0.12),rgba(16,185,129,0.1),rgba(251,191,36,0.12))] blur-2xl" />
        
        <SolarLineArt className="top-24 right-8 hidden lg:block" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Zap size={14} className="text-amber-500" /> Process
          </motion.div>

          <GlowingHeader as="h1" className="text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">
            How Sooryx Works
          </GlowingHeader>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Simple, transparent, and designed for everyone. Whether you own a home, run a society, or operate a business—we've got a solar solution that fits your needs.
          </p>
        </motion.div>
      </section>

      {/* Residential Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
            <Home size={13} /> Residential
          </div>
          <GlowingHeader as="h2" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Solar for Your Home
          </GlowingHeader>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Whether you own an independent house or live in a society, we make solar simple and affordable.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <ResidentialCard
            title="Independent Houses"
            description="Own your rooftop? Go solar and own your energy too."
            icon={<Home size={24} />}
            steps={[
              "Free solar assessment of your roof",
              "Customized system design for your roof size and energy needs",
              "Choose your ownership model: Buy, Finance, or Lease",
              "Professional installation by certified technicians",
              "Monitor your savings in real-time with our app",
            ]}
            color="amber"
          />

          <ResidentialCard
            title="Societies & Apartments"
            description="Don't have a rooftop? Get solar benefits anyway."
            icon={<Building2 size={24} />}
            steps={[
              "Zero-cost solar installed on society common areas",
              "Energy pooled and credited to individual electricity bills",
              "Professional monitoring and maintenance included",
              "Instant bill credits starting month one",
              "Residents enjoy 15-25% lower electricity costs",
            ]}
            color="emerald"
          />
        </div>
      </section>

      {/* Commercial Section */}
      <section className="relative mx-auto max-w-7xl border-t border-slate-200/70 px-6 py-16 md:px-10 md:py-24">
        <SolarEnergyFlow className="top-20 left-8 hidden lg:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-700">
            <Building2 size={13} /> Commercial
          </div>
          <GlowingHeader as="h2" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Solar for Your Business
          </GlowingHeader>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Cut energy costs and boost your bottom line with enterprise-grade solar solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/70 bg-white/85 p-8 backdrop-blur md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <CommercialStep step={1} title="Energy Audit" description="We analyze your consumption patterns and roof capacity to design the optimal system." />
            <CommercialStep step={2} title="Custom Design" description="Engineering team creates a system tailored to your peak usage hours and space constraints." />
            <CommercialStep step={3} title="Installation & Monitoring" description="Professional deployment with 24/7 monitoring to maximize production and minimize downtime." />
          </div>
          <p className="mt-8 border-t border-slate-200/70 pt-8 text-center text-slate-600">
            <span className="font-semibold text-slate-900">Real results:</span> Average 30-40% reduction in electricity bills. ROI typically in 5-6 years.
          </p>
        </motion.div>
      </section>

      {/* Financing Section */}
      <section className="relative mx-auto max-w-7xl border-t border-slate-200/70 px-6 py-16 md:px-10 md:py-24">
        <SolarLineArt3 className="top-12 right-16 hidden xl:block" />
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

      {/* Solar Credits Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-emerald-50/80 p-8 backdrop-blur md:p-12"
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-amber-200/30 to-yellow-200/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200/30 to-green-200/20 blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-100 to-yellow-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-800"
            >
              <Zap size={16} className="animate-pulse" /> New: Solar Credits
            </motion.div>

            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              {/* Left: Overview */}
              <div>
                <GlowingHeader as="h2" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Can&apos;t Install Solar?
                  <br />
                  <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                    Buy Solar Credits
                  </span>
                </GlowingHeader>

                <p className="mt-6 text-lg leading-relaxed text-slate-700">
                  Solar Credits let you enjoy the benefits of clean solar energy—even if you don&apos;t own a rooftop. Perfect for renters, tenants, and anyone who wants solar savings without installation.
                </p>

                <div className="mt-8 space-y-4">
                  <FeatureBullet
                    icon={<CheckCircle2 size={20} />}
                    text="No rooftop needed—buy credits, get bill discounts"
                  />
                  <FeatureBullet
                    icon={<CheckCircle2 size={20} />}
                    text="Support community solar projects in your area"
                  />
                  <FeatureBullet
                    icon={<CheckCircle2 size={20} />}
                    text="Flexible—buy as much or as little as you need"
                  />
                  <FeatureBullet
                    icon={<CheckCircle2 size={20} />}
                    text="Track your impact with our mobile app"
                  />
                </div>
              </div>

              {/* Right: How it Works */}
              <div>
                <div className="rounded-2xl border border-white/50 bg-white/70 p-8 backdrop-blur">
                  <h3 className="mb-6 text-2xl font-bold text-slate-900">How Solar Credits Work</h3>

                  <div className="space-y-6">
                    <StepItem
                      number={1}
                      title="Sign Up"
                      description="Create your account and link your electricity bill"
                    />
                    <StepItem
                      number={2}
                      title="Buy Credits"
                      description="Purchase solar credits based on your monthly usage"
                    />
                    <StepItem
                      number={3}
                      title="Get Discounts"
                      description="Credits are applied as discounts on your electricity bill"
                    />
                    <StepItem
                      number={4}
                      title="Track & Save"
                      description="Monitor your savings and environmental impact in real-time"
                    />
                  </div>

                  <div className="mt-8 rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-green-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-emerald-500 p-1.5">
                        <TrendingUp size={16} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-900">Save 10-20% on bills</h4>
                        <p className="mt-1 text-sm text-emerald-700">
                          Average savings for credit buyers. No installation, no maintenance—just savings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/billshield">
                  <button className="group mt-6 w-full rounded-2xl border border-amber-400/60 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 px-6 py-4 text-base font-semibold text-slate-900 shadow-lg transition hover:shadow-xl">
                    Learn More About Solar Credits
                    <ArrowRight className="ml-2 inline-block size-5 transition group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white/90 to-white/75 p-8 backdrop-blur md:p-12"
        >
          <div className="max-w-2xl">
            <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Ready to go solar?
            </h3>
            <p className="mt-4 text-lg text-slate-600">
              Use our solar calculator to estimate your savings based on your location, energy usage, and roof type.
            </p>
            <Link href="/calculator">
              <button className="group mt-8 rounded-2xl border border-amber-300/50 bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-200 px-8 py-4 text-base font-semibold text-slate-900 transition hover:shadow-[0_18px_45px_rgba(234,179,8,0.28)]">
                Calculate Your Savings
                <ArrowRight className="ml-2 inline-block size-5 transition group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FAQ/Trust Section */}
      <section className="mx-auto max-w-7xl border-t border-slate-200/70 px-6 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlowingHeader as="h2" className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Why Choose Sooryx?
          </GlowingHeader>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          <TrustCard
            title="10+ Years Experience"
            description="We've installed solar systems across India for homes, societies, and businesses."
          />
          <TrustCard
            title="25-Year Equipment Warranty"
            description="Industry-leading warranties on all panels and inverters for complete peace of mind."
          />
          <TrustCard
            title="24/7 Support"
            description="Our customer service team and monitoring system work round-the-clock for you."
          />
        </div>
      </section>
    </div>
  );
}

function ResidentialCard({
  title,
  description,
  icon,
  steps,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  color: "amber" | "emerald";
}) {
  const colorMap = {
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200/70",
      hover: "hover:border-amber-300/70 hover:shadow-[0_22px_55px_rgba(251,191,36,0.15)]",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200/70",
      hover: "hover:border-emerald-300/70 hover:shadow-[0_22px_55px_rgba(16,185,129,0.15)]",
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group rounded-3xl border ${colors.border} bg-white/90 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 ${colors.hover}`}
    >
      <div className={`mb-6 inline-flex rounded-2xl ${colors.bg} p-4 ${colors.text}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600">{description}</p>

      <div className="mt-8 space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * index }}
            className="flex gap-3"
          >
            <CheckCircle2 size={20} className={`mt-0.5 flex-shrink-0 ${colors.text}`} />
            <span className="text-slate-700">{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CommercialStep({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * step }}
      className="text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, delay: 0.2 * step, repeat: Infinity }}
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-300/40 bg-gradient-to-br from-blue-100 to-blue-50 text-lg font-bold text-blue-600"
      >
        {step}
      </motion.div>
      <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 text-slate-600">{description}</p>
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

function TrustCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 backdrop-blur"
    >
      <div className="mb-4 inline-flex rounded-xl border border-amber-300/40 bg-amber-100 p-3 text-amber-600">
        <CheckCircle2 size={20} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </motion.div>
  );
}

function FeatureBullet({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-3"
    >
      <div className="mt-0.5 flex-shrink-0 text-emerald-600">{icon}</div>
      <span className="text-slate-700">{text}</span>
    </motion.div>
  );
}

function StepItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 * number }}
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 text-lg font-bold text-slate-900"
      >
        {number}
      </motion.div>
      <div>
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
