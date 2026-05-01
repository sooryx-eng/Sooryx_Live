"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Calculator } from "lucide-react";
import GlowingHeader from "../components/GlowingHeader";
import SolarEnergyFlow from "../components/SolarEnergyFlow";
import SolarCalculator from "../components/SolarCalculator";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.28),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),rgba(255,255,255,0.92))]" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-40 md:px-10 md:pt-32">
        <SolarEnergyFlow className="top-16 right-20 hidden lg:block" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlowingHeader as="h1" className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Solar Calculator
          </GlowingHeader>
          <p className="mt-4 text-lg text-slate-600">
            Calculate your solar system size and savings with industry-standard estimates
          </p>
        </motion.div>

        {/* Calculator Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <SolarCalculator />
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="text-yellow-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Industry Standards</h3>
            <p className="text-slate-600 text-sm">
              Calculations based on 5 peak sun hours/day, ₹55,000/kW system cost, and 25-year system life with degradation.
            </p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accurate Estimates</h3>
            <p className="text-slate-600 text-sm">
              Conservative calculations include panel degradation, maintenance costs, and realistic performance ratios.
            </p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50">
            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="text-sky-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Started</h3>
            <p className="text-slate-600 text-sm">
              Ready to go solar? Contact us for a detailed site assessment and personalized solar solution.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}