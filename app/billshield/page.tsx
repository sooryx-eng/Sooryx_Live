"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, CheckCircle2, Gift, Star, ArrowRight, Layers } from "lucide-react";
import GlowingHeader from "../components/GlowingHeader";
import SolarLineArt3 from "../components/SolarLineArt3";

// State electricity tariffs (₹/kWh)
const STATE_TARIFFS: { [key: string]: number } = {
  Maharashtra: 8.95, Delhi: 7.90, Karnataka: 7.85, "Tamil Nadu": 6.50,
  Gujarat: 7.60, Telangana: 6.95, "Uttar Pradesh": 6.50, Rajasthan: 7.40,
  Punjab: 7.30, Haryana: 7.10, Kerala: 9.20, "West Bengal": 7.90,
  "Madhya Pradesh": 6.90, Odisha: 6.10, Bihar: 5.20, Jharkhand: 6.30,
};

const TIER_STRUCTURE = [
  { minAmount: 5000, discountPercent: 5, level: "Starter" },
  { minAmount: 15000, discountPercent: 8, level: "Prime" },
  { minAmount: 30000, discountPercent: 10, level: "Elite" },
];

export default function BillShield() {
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [creditAmount, setCreditAmount] = useState(10000);

  const electricityTariff = STATE_TARIFFS[selectedState] || 7.50;

  // Find applicable tier based on credit amount
  const applicableTier = TIER_STRUCTURE.reduce((best, tier) => {
    return creditAmount >= tier.minAmount ? tier : best;
  }, TIER_STRUCTURE[0]);

  const discountPercent = applicableTier.discountPercent;
  const discountedCost = creditAmount * (1 - discountPercent / 100);
  const userSavings = creditAmount - discountedCost;

  // Business metrics
  const creditsCoverageKwh = Math.round(creditAmount / electricityTariff);
  const monthlyBillReduction = discountedCost / 12;
  const yearlyBillReduction = discountedCost;

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
        className="sticky top-0 z-40 w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 px-4 py-5 text-center shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
          ☀️ Coming Soon
        </h2>
        <p className="text-white/90 text-sm md:text-base font-semibold mt-1">
          We're pooling solar capacity. Limited allocation. Early access opens soon.
        </p>
      </motion.div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pt-40">
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

      {/* Pricing Calculator */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Digital Solar Pricing
        </h2>
        <p className="mb-12 text-center text-slate-600">
          See your per-kWh savings with bulk solar purchases
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Inputs */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
                <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Your State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                >
                  {Object.keys(STATE_TARIFFS).sort().map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  Current tariff: ₹{electricityTariff.toFixed(2)}/kWh
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
                <label className="mb-4 block text-sm font-semibold uppercase tracking-wider text-amber-600">
                  kWh Units to Buy
                </label>
                <div className="relative mb-4">
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {[5000, 15000, 30000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setCreditAmount(amount)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        creditAmount === amount
                          ? "bg-amber-400 text-white"
                          : "border border-slate-200 text-slate-600 hover:border-amber-300"
                      }`}
                    >
                      ₹{(amount / 1000).toFixed(0)}K
                    </button>
                  ))}
                </div>
                <div className="rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
                  <p className="text-sm text-slate-600 mb-1">Total Cost (₹)</p>
                  <p className="text-3xl font-bold text-slate-900">
                    ₹{creditAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    = {creditsCoverageKwh.toLocaleString()} kWh @ ₹{(creditAmount / creditsCoverageKwh).toFixed(2)}/kWh
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
                <label className="mb-4 block text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Your Discount Tier
                </label>
                <div className="space-y-2">
                  {TIER_STRUCTURE.map((tier) => {
                    const isQualified = creditAmount >= tier.minAmount;
                    return (
                      <div
                        key={tier.level}
                        className={`rounded-lg border-2 p-3 transition ${
                          isQualified
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-200 bg-slate-50 opacity-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{tier.level}</p>
                            <p className="text-xs text-slate-600">
                              Spend ₹{(tier.minAmount / 1000).toFixed(0)}K+
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-600">
                              {tier.discountPercent}% Off
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Deal Summary */}
            <div className="space-y-6">
              <motion.div
                key={`${creditAmount}-${selectedState}-${discountPercent}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-emerald-400 p-1 shadow-2xl"
              >
                <div className="rounded-[22px] bg-white p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 p-3">
                      <Zap className="size-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Your Deal</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-600">kWh You're Buying</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {creditsCoverageKwh.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        At ₹{(creditAmount / creditsCoverageKwh).toFixed(2)}/kWh (bulk rate)
                      </p>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                      <p className="text-sm text-slate-600">You Pay with BillShield</p>
                      <p className="text-3xl font-bold text-amber-600">
                        ₹{Math.round(discountedCost).toLocaleString()}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                          {discountPercent}% off retail
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-slate-300 bg-slate-100 p-4">
                      <p className="text-sm text-slate-600">DISCOM Regular Rate</p>
                      <p className="text-3xl font-bold text-slate-700">
                        ₹{Math.round(creditAmount).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        @ ₹{electricityTariff.toFixed(2)}/kWh for {creditsCoverageKwh.toLocaleString()} kWh
                      </p>
                    </div>

                    <div className="rounded-xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 p-4">
                      <p className="text-sm text-slate-600 font-semibold">💰 Total Savings</p>
                      <p className="text-3xl font-bold text-emerald-600">
                        ₹{Math.round(userSavings).toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-700 mt-2 font-semibold">
                        You save {discountPercent}% on energy costs
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-200 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Monthly bill reduction</span>
                        <span className="font-semibold text-slate-900">
                          ≈ ₹{Math.round(monthlyBillReduction).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Annual savings</span>
                        <span className="font-semibold text-slate-900">
                          ≈ ₹{Math.round(yearlyBillReduction).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-center text-sm font-semibold text-amber-700">
                BillShield wallet, credits, and checkout are coming soon.
              </div>
            </div>
          </div>
        </motion.div>
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
