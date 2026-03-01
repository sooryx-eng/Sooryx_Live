"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Zap, Home, Building2, BarChart3, TrendingUp, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import GlowingHeader from "../components/GlowingHeader";
import SolarEnergyFlow from "../components/SolarEnergyFlow";

// Latest DISCOM Tariffs (2025-26) - Residential Tiered Rates
const TARIFF_DATA: {
  [state: string]: {
    residential: Array<{ slab: string; rate: number; description: string }>;
    commercial: number;
  };
} = {
  Maharashtra: {
    residential: [
      { slab: "0-100 kWh", rate: 3.65, description: "LT Domestic upto 100 units" },
      { slab: "101-300 kWh", rate: 7.10, description: "LT Domestic 101-300 units" },
      { slab: "301-500 kWh", rate: 8.95, description: "LT Domestic 301-500 units" },
      { slab: "500+ kWh", rate: 10.90, description: "LT Domestic above 500 units" },
    ],
    commercial: 11.50,
  },
  Delhi: {
    residential: [
      { slab: "0-200 kWh", rate: 4.85, description: "Normal rate upto 200 units" },
      { slab: "201-400 kWh", rate: 6.90, description: "Normal rate 201-400 units" },
      { slab: "401-800 kWh", rate: 8.20, description: "Normal rate 401-800 units" },
      { slab: "800+ kWh", rate: 9.90, description: "Normal rate above 800 units" },
    ],
    commercial: 11.80,
  },
  Karnataka: {
    residential: [
      { slab: "0-100 kWh", rate: 4.15, description: "Domestic Tariff A up to 100 units" },
      { slab: "101-300 kWh", rate: 6.60, description: "Domestic Tariff A 101-300 units" },
      { slab: "301-500 kWh", rate: 7.85, description: "Domestic Tariff A 301-500 units" },
      { slab: "500+ kWh", rate: 8.90, description: "Domestic Tariff A above 500 units" },
    ],
    commercial: 10.50,
  },
  "Tamil Nadu": {
    residential: [
      { slab: "0-100 kWh", rate: 2.50, description: "Domestic 0-100 consumption" },
      { slab: "101-200 kWh", rate: 3.50, description: "Domestic 101-200 consumption" },
      { slab: "201-400 kWh", rate: 5.20, description: "Domestic 201-400 consumption" },
      { slab: "400+ kWh", rate: 8.50, description: "Domestic above 400 consumption" },
    ],
    commercial: 9.50,
  },
  "Uttar Pradesh": {
    residential: [
      { slab: "0-100 kWh", rate: 4.00, description: "Domestic 0-100 units" },
      { slab: "101-200 kWh", rate: 5.50, description: "Domestic 101-200 units" },
      { slab: "201-300 kWh", rate: 6.50, description: "Domestic 201-300 units" },
      { slab: "300+ kWh", rate: 7.50, description: "Domestic above 300 units" },
    ],
    commercial: 9.50,
  },
  Gujarat: {
    residential: [
      { slab: "0-100 kWh", rate: 3.85, description: "LT Domestic 0-100 units" },
      { slab: "101-300 kWh", rate: 5.95, description: "LT Domestic 101-300 units" },
      { slab: "301-500 kWh", rate: 7.60, description: "LT Domestic 301-500 units" },
      { slab: "500+ kWh", rate: 9.35, description: "LT Domestic above 500 units" },
    ],
    commercial: 10.20,
  },
  Telangana: {
    residential: [
      { slab: "0-100 kWh", rate: 3.45, description: "Domestic 0-100 units" },
      { slab: "101-200 kWh", rate: 5.25, description: "Domestic 101-200 units" },
      { slab: "201-400 kWh", rate: 6.95, description: "Domestic 201-400 units" },
      { slab: "400+ kWh", rate: 8.40, description: "Domestic above 400 units" },
    ],
    commercial: 9.80,
  },
};

const STATES = Object.keys(TARIFF_DATA);

export default function SolarCalculator() {
  const [activeTab, setActiveTab] = useState<"savings" | "sizing">("savings");
  const [userType, setUserType] = useState<"residential" | "commercial">("residential");
  const [state, setState] = useState("Maharashtra");
  const [monthlyBill, setMonthlyBill] = useState(5000);
  const [rooftopArea, setRooftopArea] = useState(100);
  const [systemSize, setSystemSize] = useState(5);

  const parseSlabRange = (slabLabel: string) => {
    const plusMatch = slabLabel.match(/(\d+)\+\s*kWh/i);
    if (plusMatch) {
      return { from: Number(plusMatch[1]), to: Infinity };
    }

    const rangeMatch = slabLabel.match(/(\d+)\s*-\s*(\d+)\s*kWh/i);
    if (rangeMatch) {
      return { from: Number(rangeMatch[1]), to: Number(rangeMatch[2]) };
    }

    return { from: 0, to: Infinity };
  };

  const getResidentialSlabs = (structure: Array<{ slab: string; rate: number; description: string }>) => {
    return structure
      .map((item) => ({ ...parseSlabRange(item.slab), rate: item.rate }))
      .sort((a, b) => a.from - b.from);
  };

  const calculateMonthlyBillFromConsumption = (
    consumption: number,
    tariffStructure: Array<{ slab: string; rate: number; description: string }>,
    customerType: "residential" | "commercial",
  ) => {
    if (customerType === "commercial") {
      return consumption * TARIFF_DATA[state].commercial;
    }

    const slabs = getResidentialSlabs(tariffStructure);
    let totalBill = 0;

    for (const slab of slabs) {
      const effectiveFrom = slab.from === 0 ? 0 : slab.from;
      const slabUpperBound = Number.isFinite(slab.to) ? slab.to : consumption;
      const unitsInSlab = Math.max(0, Math.min(consumption, slabUpperBound) - effectiveFrom);

      if (unitsInSlab > 0) {
        totalBill += unitsInSlab * slab.rate;
      }
    }

    return totalBill;
  };

  const estimateMonthlyConsumptionFromBill = (
    bill: number,
    tariffStructure: Array<{ slab: string; rate: number; description: string }>,
    customerType: "residential" | "commercial",
  ) => {
    if (customerType === "commercial") {
      return bill / TARIFF_DATA[state].commercial;
    }

    let low = 0;
    let high = 5000;

    while (calculateMonthlyBillFromConsumption(high, tariffStructure, customerType) < bill) {
      high *= 2;
      if (high > 100000) {
        break;
      }
    }

    for (let i = 0; i < 40; i++) {
      const mid = (low + high) / 2;
      const estimatedBill = calculateMonthlyBillFromConsumption(mid, tariffStructure, customerType);

      if (estimatedBill < bill) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return (low + high) / 2;
  };

  // Get tariff data for selected state
  const tariffStructure =
    userType === "residential"
      ? TARIFF_DATA[state].residential
      : [{ rate: TARIFF_DATA[state].commercial }];

  // Calculations for Savings Tab
  const monthlyConsumption = Math.round(
    estimateMonthlyConsumptionFromBill(
      monthlyBill,
      TARIFF_DATA[state].residential,
      userType,
    ),
  );
  const annualConsumption = monthlyConsumption * 12;

  // Solar panel typical metrics
  const panelCapacity = 400; // Watts
  const panelArea = 2.2; // Square meters
  const systemEfficiency = 0.80; // Performance ratio: accounts for inverter, wiring, soiling, temperature losses
  const peakSunHours = 5.0; // Average peak sun hours in India (varies 4.5-6 by location)

  // Calculate daily and annual generation for given system size
  const dailyGenerationKwh = systemSize * peakSunHours * systemEfficiency;
  const annualGenerationKwh = dailyGenerationKwh * 365;

  // Calculate required system size based on consumption
  const requiredDailyGenerationKwh = annualConsumption / 365;
  const autoCalculatedSystemSize = requiredDailyGenerationKwh / (peakSunHours * systemEfficiency);

  // Calculate bills and savings
  const currentAnnualBill = monthlyBill * 12;

  // Net metering utilization: 90% accounts for export credits and self-consumption patterns
  const offsetConsumptionAnnual = annualGenerationKwh * 0.90;
  const remainingAnnualConsumptionAfterSolar = Math.max(0, annualConsumption - offsetConsumptionAnnual);
  const remainingMonthlyConsumptionAfterSolar = remainingAnnualConsumptionAfterSolar / 12;

  // Calculate bill after solar (monthly slab billing, then annualized)
  const monthlyBillAfterSolar = calculateMonthlyBillFromConsumption(
    remainingMonthlyConsumptionAfterSolar,
    TARIFF_DATA[state].residential,
    userType,
  );
  const annualBillAfterSolar = monthlyBillAfterSolar * 12;
  const annualSavings = Math.max(0, currentAnnualBill - annualBillAfterSolar);
  const monthlySavings = Math.max(0, annualSavings / 12);

  // System cost and ROI (typical: ₹50,000-60,000 per kW)
  const systemCost = systemSize * 55000;
  const roi = systemCost > 0 && annualSavings > 0 ? (annualSavings / systemCost) * 100 : 0;
  const paybackPeriod = annualSavings > 0 ? systemCost / annualSavings : 0;

  // Calculations for Sizing Tab
  const panelsNeeded = Math.ceil(systemSize * 1000 / panelCapacity);
  const areaNeeded = panelsNeeded * panelArea;
  const canFitOnRooftop = areaNeeded <= rooftopArea;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.28),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),rgba(255,255,255,0.92))]" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-28 md:px-10 md:pt-32">
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
            Calculate your Solar Savings & System Size with Accurate DISCOM Tariffs
          </p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex gap-4 border-b border-slate-200/70 mb-8">
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => setActiveTab("savings")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "savings"
                ? "border-b-2 border-amber-400 text-amber-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="inline-block mr-2 size-4" />
            Savings Calculator
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => setActiveTab("sizing")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "sizing"
                ? "border-b-2 border-emerald-400 text-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sun className="inline-block mr-2 size-4" />
            Solar Sizing
          </motion.button>
        </div>
      </section>

      {/* Savings Calculator Tab */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: activeTab === "savings" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`mx-auto max-w-7xl px-6 md:px-10 pb-20 ${activeTab === "savings" ? "" : "hidden"}`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">Your Details</h2>

              {/* User Type */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 mb-3 block">
                  Customer Type
                </label>
                <div className="flex gap-3">
                  {["residential", "commercial"].map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserType(type as "residential" | "commercial")}
                      className={`flex-1 px-4 py-3 rounded-xl font-semibold transition ${
                        userType === type
                          ? type === "residential"
                            ? "bg-amber-100 border-2 border-amber-400 text-amber-700"
                            : "bg-emerald-100 border-2 border-emerald-400 text-emerald-700"
                          : "border-2 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {type === "residential" ? (
                        <>
                          <Home className="inline-block mr-2 size-4" />
                          Residential
                        </>
                      ) : (
                        <>
                          <Building2 className="inline-block mr-2 size-4" />
                          Commercial
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* State Selection */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Your State / DISCOM
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none bg-white"
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Tariff Rate: ₹{" "}
                  {userType === "residential"
                    ? `${tariffStructure[0].rate} - ${tariffStructure[tariffStructure.length - 1].rate} /kWh`
                    : `${TARIFF_DATA[state].commercial} /kWh`}
                </p>
              </div>

              {/* Monthly Bill Slider */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 mb-3 block">
                  Monthly Electricity Bill
                </label>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-amber-200 to-emerald-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center mt-3">
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-24 px-3 py-2 border border-slate-200 rounded-lg"
                  />
                  <span className="text-2xl font-bold text-amber-600">
                    ₹{monthlyBill.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* System Size Selector */}
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <label className="text-sm font-semibold text-emerald-900 mb-3 block">
                  Solar System Size (kW)
                </label>
                <div className="flex gap-2 mb-3">
                  {[3, 5, 7, 10, 15].map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSystemSize(size)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                        systemSize === size
                          ? "bg-emerald-500 text-white"
                          : "border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {size}kW
                    </motion.button>
                  ))}
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={0.5}
                  value={systemSize}
                  onChange={(e) => setSystemSize(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-300 rounded-lg cursor-pointer"
                />
                <div className="mt-2 text-center text-sm text-emerald-700 font-semibold">
                  {systemSize.toFixed(1)} kW System
                </div>
              </div>

              {/* Sizing Helper Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setActiveTab("sizing")}
                className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 cursor-pointer hover:shadow-lg transition"
              >
                <p className="text-xs uppercase font-bold text-blue-700 mb-2">💡 Not sure what size you need?</p>
                <p className="text-sm text-blue-700 mb-3">
                  Use the <span className="font-semibold">Solar Sizing Calculator</span> to find out how many panels fit on your rooftop and what system size you can actually deploy.
                </p>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline">
                  → Go to Solar Sizing
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* System Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 to-emerald-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase font-bold text-emerald-700 mb-1">🔋 System You Selected</p>
                  <p className="text-lg font-bold text-emerald-900">
                    {systemSize.toFixed(1)} kW Solar System
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    Estimated {panelsNeeded} panels • {areaNeeded.toFixed(1)} sq.m required
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab("sizing")}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap underline ml-2"
                >
                  ✓ Verify Fit
                </motion.button>
              </div>
            </motion.div>

            {/* Current Bill */}
            <ResultCard
              icon={<Zap className="size-6 text-amber-600" />}
              title="Current Annual Bill"
              value={`₹${currentAnnualBill.toLocaleString()}`}
              subtitle={`${annualConsumption.toLocaleString()} kWh/year`}
              bgColor="bg-amber-50"
              borderColor="border-amber-200"
            />

            {/* Solar Generation */}
            <ResultCard
              icon={<Sun className="size-6 text-yellow-600" />}
              title="Annual Solar Generation"
              value={`${(annualGenerationKwh / 1000).toFixed(1)} MWh`}
              subtitle={`${dailyGenerationKwh.toFixed(1)} kWh/day`}
              bgColor="bg-yellow-50"
              borderColor="border-yellow-200"
            />

            {/* Annual Savings */}
            {annualSavings > 0 ? (
              <ResultCard
                icon={<TrendingUp className="size-6 text-green-600" />}
                title="Annual Savings"
                value={`₹${annualSavings.toLocaleString()}`}
                subtitle={`₹${monthlySavings.toLocaleString()}/month • Payback: ${paybackPeriod.toFixed(1)}yr`}
                bgColor="bg-green-50"
                borderColor="border-green-200"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 p-6 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/50">
                    <TrendingUp className="size-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-orange-600 font-semibold mb-1">
                      Minimal Savings
                    </p>
                    <p className="text-xl font-bold text-orange-900">₹0 - Minimal</p>
                    <p className="text-xs text-orange-700 mt-2">
                      Your {systemSize.toFixed(1)}kW system generates less than your consumption. 
                      Try increasing system size using the Solar Sizing calculator to find your rooftop potential.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payback Period */}
            {annualSavings > 0 ? (
              <ResultCard
                icon={<Calculator className="size-6 text-emerald-600" />}
                title="Payback Period"
                value={`${paybackPeriod.toFixed(1)} Years`}
                subtitle={`ROI: ${roi.toFixed(1)}% annually`}
                bgColor="bg-emerald-50"
                borderColor="border-emerald-200"
              />
            ) : (
              <ResultCard
                icon={<Calculator className="size-6 text-slate-400" />}
                title="Payback Period"
                value="Not Calculable"
                subtitle="Increase system size for savings"
                bgColor="bg-slate-50"
                borderColor="border-slate-200"
              />
            )}

            {/* System Cost */}
            <ResultCard
              icon={<Zap className="size-6 text-slate-600" />}
              title="Estimated System Cost"
              value={`₹${systemCost.toLocaleString()}`}
              subtitle="At ₹55,000 per kW (approx)"
              bgColor="bg-slate-50"
              borderColor="border-slate-200"
            />

            {/* Assumptions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-white/70 p-2">
                  <Calculator className="size-4 text-slate-600" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Assumptions used
                </p>
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>• Peak sun hours: {peakSunHours.toFixed(1)} hours/day</li>
                <li>• System performance ratio: {(systemEfficiency * 100).toFixed(0)}%</li>
                <li>• Net-metering realization factor: 90%</li>
                <li>• CAPEX benchmark: ₹55,000 per kW</li>
                <li>• Savings estimate excludes fixed charges, taxes, and policy changes</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Solar Sizing Tab */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: activeTab === "sizing" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`mx-auto max-w-7xl px-6 md:px-10 pb-20 ${activeTab === "sizing" ? "" : "hidden"}`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">System Requirements</h2>

              {/* Recommendation Banner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-4 rounded-xl bg-purple-50 border-2 border-purple-300"
              >
                <p className="text-xs uppercase font-bold text-purple-700 mb-2">📋 Based on Your Bill</p>
                <p className="text-sm text-purple-900 mb-2">
                  To fully offset your ₹{monthlyBill.toLocaleString()}/month bill, you need approximately <span className="font-bold text-lg">{autoCalculatedSystemSize.toFixed(1)} kW</span> system.
                </p>
                <p className="text-xs text-purple-700">
                  ✓ Check if this fits on your available {rooftopArea} sq.m rooftop below
                </p>
              </motion.div>

              {/* Rooftop Area */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 mb-3 block">
                  Available Rooftop Area (sq. meters)
                </label>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={rooftopArea}
                  onChange={(e) => setRooftopArea(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-emerald-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-slate-600">50 sq.m</span>
                  <input
                    type="number"
                    value={rooftopArea}
                    onChange={(e) => setRooftopArea(Number(e.target.value))}
                    className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-center font-bold"
                  />
                  <span className="text-sm text-slate-600">500 sq.m</span>
                </div>
              </div>

              {/* Monthly Consumption */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Monthly Bill
                </label>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-amber-200 to-emerald-200 rounded-lg cursor-pointer"
                />
                <div className="mt-3 text-lg font-bold text-amber-600">
                  ₹{monthlyBill.toLocaleString()}
                </div>
              </div>

              {/* Auto-calculated system size suggestion */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 mb-6">
                <p className="text-xs text-blue-600 uppercase font-semibold mb-2">Recommended System Size</p>
                <p className="text-2xl font-bold text-blue-700">
                  {autoCalculatedSystemSize.toFixed(1)} kW
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Based on {annualConsumption.toLocaleString()} kWh annual consumption
                </p>
              </div>

              {/* Panel Density Info */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-600 font-semibold mb-2">PANEL SPECIFICATIONS</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500">Panel Capacity</p>
                    <p className="font-semibold text-slate-900">{panelCapacity}W</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Panel Area</p>
                    <p className="font-semibold text-slate-900">{panelArea} sq.m</p>
                  </div>
                  <div>
                    <p className="text-slate-500">System Efficiency</p>
                    <p className="font-semibold text-slate-900">{(systemEfficiency * 100).toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Peak Sun Hours</p>
                    <p className="font-semibold text-slate-900">{peakSunHours}h/day</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Panels Needed */}
            <ResultCard
              icon={<Sun className="size-6 text-yellow-600" />}
              title="Solar Panels Needed"
              value={`${panelsNeeded} Panels`}
              subtitle={`@ ${panelCapacity}W each`}
              bgColor="bg-yellow-50"
              borderColor="border-yellow-200"
            />

            {/* Area Needed */}
            <ResultCard
              icon={<Sun className="size-6 text-emerald-600" />}
              title="Area Required"
              value={`${areaNeeded.toFixed(1)} sq.m`}
              subtitle={`Available: ${rooftopArea} sq.m`}
              bgColor={canFitOnRooftop ? "bg-green-50" : "bg-red-50"}
              borderColor={canFitOnRooftop ? "border-green-200" : "border-red-200"}
            />

            {/* Feasibility */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl border-2 ${
                canFitOnRooftop
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <p className="text-sm font-semibold mb-2">
                {canFitOnRooftop ? "✓ Feasible" : "✗ Not Feasible"}
              </p>
              <p className={`text-sm ${canFitOnRooftop ? "text-green-700" : "text-red-700"}`}>
                {canFitOnRooftop
                  ? `Your rooftop has ${(rooftopArea - areaNeeded).toFixed(1)} sq.m extra space after installation.`
                  : `You need ${(areaNeeded - rooftopArea).toFixed(1)} sq.m more space. Consider a smaller system.`}
              </p>
            </motion.div>

            {/* System Summary */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white/50">
              <p className="text-xs text-slate-600 uppercase font-semibold mb-3">SYSTEM SUMMARY</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">System Size:</span>
                  <span className="font-semibold text-slate-900">
                    {systemSize.toFixed(1)} kW
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Daily Generation:</span>
                  <span className="font-semibold text-slate-900">
                    {dailyGenerationKwh.toFixed(1)} kWh
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-600">Annual Generation:</span>
                  <span className="font-semibold text-slate-900">
                    {(annualGenerationKwh / 1000).toFixed(2)} MWh
                  </span>
                </div>
              </div>
            </div>

            {/* CTA to Savings Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setActiveTab("savings")}
              className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 cursor-pointer hover:shadow-lg transition"
            >
              <p className="text-xs uppercase font-bold text-amber-700 mb-2">✨ Next Step</p>
              <p className="text-sm text-amber-800 mb-3">
                Great! Now check your savings with this {systemSize.toFixed(1)}kW system size.
              </p>
              <button className="text-sm font-semibold text-amber-600 hover:text-amber-800 underline">
                → Calculate Savings
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tariff Table Section */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16 border-t border-slate-200/70">
        <h3 className="text-2xl font-bold mb-6">Your Tariff Structure</h3>
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200/70 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Consumption Slab
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Rate (₹/kWh)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {tariffStructure.map((slab: any) => (
                  <tr
                    key={slab.slab || "commercial"}
                    className="border-b border-slate-200/50 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {slab.slab || "Commercial"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold">
                        ₹{slab.rate.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{slab.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-emerald-400 p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Start Your Solar Journey?
            </h2>
            <p className="text-lg text-slate-800 mb-8 max-w-2xl mx-auto">
              Get a personalized quote and expert consultation. Our team will help you maximize savings and go solar with confidence.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-2xl hover:bg-slate-800 transition-colors"
              >
                Get Your Free Solar Quote
                <ArrowRight className="size-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer Note */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-12 text-center">
        <p className="text-sm text-slate-600">
          💡 <span className="font-semibold">Note:</span> These calculations are estimates based on latest tariff rates (2025-26) and typical
          system efficiency. Actual savings may vary based on weather, consumption patterns, and
          policy changes. Consult our experts for personalized analysis.
        </p>
      </section>
    </div>
  );
}

function ResultCard({
  icon,
  title,
  value,
  subtitle,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border ${borderColor} ${bgColor} p-6 backdrop-blur`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-white/50">{icon}</div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-600 mt-1">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
