"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, CheckCircle2, Gift, Star, ArrowRight, Layers } from "lucide-react";
import GlowingHeader from "../components/GlowingHeader";
import SolarLineArt3 from "../components/SolarLineArt3";

export default function BillShield() {

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Gradient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(255,255,255,0.95))]" />
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-32 md:top-0 z-60 w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 px-4 py-5 text-center shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
          ☀️ Coming Soon
        </h2>
        <p className="text-white/90 text-sm md:text-base font-semibold mt-1">
          We're pooling solar capacity. Limited allocation. Early access opens soon.
        </p>
      </motion.div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-44 md:px-10 md:pt-40">
        <SolarLineArt3 className="top-20 right-12 hidden xl:block" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 px-6 py-3 text-sm font-semibold text-slate-800 shadow-lg"
          >
            <Zap className="size-5 text-amber-600" />
            Access Solar-Generated Electricity
          </motion.div>

          <GlowingHeader as="h1" className="mx-auto mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Own Solar Power.
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 bg-clip-text text-transparent">
            Without the Installation.
            </span>
          </GlowingHeader>

          <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
            Buy solar-generated kWh units digitally and apply them to your electricity bill. 
            Pay less per unit with bulk discounts. <span className="font-bold text-amber-600">Same solar savings, zero installation</span>.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="size-5 text-emerald-500" />
              No long-term commitment
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="size-5 text-emerald-500" />
              Use anytime, anywhere
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="size-5 text-emerald-500" />
              Instant discount applied
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl border-y border-slate-200/70 px-6 py-20 md:px-10">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Better than paying retail electricity rates.
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            step="1"
            icon={<Gift className="size-8" />}
            title="Buy kWh Units"
            description="Purchase electricity units at bulk discounts. 1 unit = 1 kWh. No middleman, no markup."
            color="amber"
          />
          <StepCard
            step="2"
            icon={<Layers className="size-8" />}
            title="Your Account Balance"
            description="Your kWh balance grows. Use it against any electricity bill, with any DISCOM."
            color="yellow"
          />
          <StepCard
            step="3"
            icon={<TrendingUp className="size-8" />}
            title="Reduce Your Bills"
            description="Apply purchased kWh to settlement. Pay only the difference. Immediate savings."
            color="emerald"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="mx-auto max-w-7xl border-t border-slate-200/70 px-6 py-20 md:px-10">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Why BillShield?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Gift className="size-7" />}
            title="Zero Commitment"
            description="Buy any amount. Use at your pace. Cancel anytime. No lock-in period."
            color="amber"
          />
          <FeatureCard
            icon={<TrendingUp className="size-7" />}
            title="Bigger Savings"
            description="Buy more, save more. Tier up from 5% to 10% discount as you spend."
            color="yellow"
          />
          <FeatureCard
            icon={<Zap className="size-7" />}
            title="Instant Discount"
            description="Full credit value applied immediately. No waiting, no processing fees."
            color="emerald"
          />
          <FeatureCard
            icon={<Star className="size-7" />}
            title="Flexible Usage"
            description="Use credits on any bill payment. Transfer between family members."
            color="blue"
          />
          <FeatureCard
            icon={<CheckCircle2 className="size-7" />}
            title="100% Transparent"
            description="No hidden charges. Clear pricing. Track usage in real-time."
            color="purple"
          />
          <FeatureCard
            icon={<Layers className="size-7" />}
            title="Smart Wallet"
            description="Digital wallet stores your credits. Access from anywhere, anytime."
            color="green"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl border-t border-slate-200/70 px-6 py-20 md:px-10">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Common Questions
        </h2>

        <div className="space-y-4">
          <FAQCard
            question="How do I use my credits?"
            answer="Credits are stored in your BillShield wallet. When paying your electricity bill, you can apply available credits to reduce the amount due. It's that simple."
          />
          <FAQCard
            question="Do credits expire?"
            answer="No expiry date. Use your credits whenever you want. They remain in your wallet indefinitely until you choose to redeem them."
          />
          <FAQCard
            question="Can I buy more credits later?"
            answer="Absolutely. Buy as much or as little as you need. Your discount tier is based on your total purchase amount, so bigger purchases unlock bigger discounts."
          />
          <FAQCard
            question="What if I want a refund?"
            answer="Credits can be transferred to family or friends. For refunds, we offer a 30-day money-back guarantee on your first purchase."
          />
          <FAQCard
            question="How are these credits different from my regular bill?"
            answer="These are prepaid energy credits that reduce your electricity bill amount. They work alongside your regular consumption. More flexible, more value-added."
          />
        </div>
      </section>

    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
  color,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const colorClasses = {
    amber: "from-amber-400 to-yellow-400",
    yellow: "from-yellow-400 to-amber-400",
    emerald: "from-emerald-400 to-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-slate-200/70 bg-white/80 p-8 backdrop-blur"
    >
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`rounded-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} p-3 text-white`}
        >
          {icon}
        </div>
        <span className="text-4xl font-bold text-slate-200">{step}</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const colorMap = {
    amber: "text-amber-600 bg-amber-50",
    yellow: "text-yellow-600 bg-yellow-50",
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    green: "text-green-600 bg-green-50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur transition hover:shadow-lg"
    >
      <div className={`mb-4 inline-flex rounded-lg p-3 ${colorMap[color as keyof typeof colorMap]}`}>
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </motion.div>
  );
}

function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <h3 className="font-semibold text-slate-900">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="size-5 text-amber-600 rotate-90" />
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="border-t border-slate-200 px-6 py-4 text-slate-600">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}
