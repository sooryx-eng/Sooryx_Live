"use client";

import React, { useState } from "react";
import { Sun, Calculator, TrendingUp, Zap } from "lucide-react";

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(5000);

  // Industry-standard constants for India
  const AVERAGE_RATE_PER_KWH = 8.5; // ₹/kWh - industry average
  const PEAK_SUN_HOURS_PER_DAY = 5.0; // hours - conservative estimate for India
  const SYSTEM_COST_PER_KW = 55000; // ₹/kW - current market rate
  const SYSTEM_LIFETIME_YEARS = 25; // years
  const MAINTENANCE_COST_PERCENT = 0.5; // % of system cost per year
  const DEGRADATION_RATE = 0.005; // 0.5% per year panel degradation

  // Calculate monthly consumption from bill
  const monthlyConsumptionKwh = Math.round(monthlyBill / AVERAGE_RATE_PER_KWH);

  // System sizing calculation (industry standard: 1 kW per 100-120 sqm)
  // Conservative: 1 kW per 120 sqm (more realistic for Indian conditions)
  const AREA_PER_KW_SQM = 120;
  const recommendedSystemSizeKw = Math.round((monthlyConsumptionKwh * 12) / (PEAK_SUN_HOURS_PER_DAY * 365) * 1.2); // 20% buffer for losses

  // Alternative sizing based on available area (assuming 100 sqm typical roof)
  const TYPICAL_ROOF_AREA_SQM = 100;
  const maxSystemSizeKw = Math.round(TYPICAL_ROOF_AREA_SQM / AREA_PER_KW_SQM);

  // Use the smaller of the two for realistic sizing
  const systemSizeKw = Math.min(recommendedSystemSizeKw, maxSystemSizeKw);

  // Annual generation calculation
  const annualGenerationKwh = Math.round(systemSizeKw * PEAK_SUN_HOURS_PER_DAY * 365);

  // Monthly generation (accounting for seasonal variation)
  const monthlyGenerationKwh = Math.round(annualGenerationKwh / 12);

  // System cost calculation
  const systemCost = systemSizeKw * SYSTEM_COST_PER_KW;

  // Annual savings calculation (accounting for degradation)
  const calculateAnnualSavings = (year: number) => {
    const degradationFactor = Math.pow(1 - DEGRADATION_RATE, year);
    const annualGeneration = annualGenerationKwh * degradationFactor;
    const annualSavings = annualGeneration * AVERAGE_RATE_PER_KWH;
    return Math.round(annualSavings);
  };

  // Total lifetime savings
  let totalLifetimeSavings = 0;
  let totalLifetimeGeneration = 0;
  for (let year = 1; year <= SYSTEM_LIFETIME_YEARS; year++) {
    totalLifetimeSavings += calculateAnnualSavings(year);
    totalLifetimeGeneration += annualGenerationKwh * Math.pow(1 - DEGRADATION_RATE, year);
  }
  totalLifetimeGeneration = Math.round(totalLifetimeGeneration);

  // Annual maintenance cost
  const annualMaintenanceCost = Math.round(systemCost * MAINTENANCE_COST_PERCENT / 100);

  // Net lifetime savings (after maintenance)
  const totalMaintenanceCost = annualMaintenanceCost * SYSTEM_LIFETIME_YEARS;
  const netLifetimeSavings = totalLifetimeSavings - totalMaintenanceCost;

  // Payback period calculation
  const paybackYears = systemCost / (calculateAnnualSavings(1) - annualMaintenanceCost);

  // Monthly savings (first year average)
  const monthlySavings = Math.round(calculateAnnualSavings(1) / 12);

  // Coverage percentage
  const coveragePercentage = Math.round((monthlyGenerationKwh / monthlyConsumptionKwh) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-8 rounded-2xl mt-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-yellow-400/10 p-3 rounded-lg">
          <Sun className="text-yellow-400" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Solar Calculator</h3>
          <p className="text-sm text-white/60">Calculate your solar system size and savings</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6 p-4 bg-slate-800/40 rounded-xl">
          <div>
            <label className="text-sm text-white/70 mb-3 block">Monthly Electricity Bill (₹)</label>

            {/* Slider Section */}
            <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-white/60">₹1,000</span>
                <span className="text-2xl font-bold text-emerald-400">₹{monthlyBill.toLocaleString()}</span>
                <span className="text-xs text-white/60">₹50,000</span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #10b981 ${((monthlyBill - 1000) / (50000 - 1000)) * 100}%, #1e293b ${((monthlyBill - 1000) / (50000 - 1000)) * 100}%, #1e293b 100%)`
                }}
              />
              <p className="text-xs text-white/50 mt-2">Drag to adjust your average monthly bill</p>
            </div>

            <div className="text-xs text-white/60 space-y-1">
              <p>Estimated monthly consumption: {monthlyConsumptionKwh.toLocaleString()} kWh</p>
              <p>Assumed rate: ₹{AVERAGE_RATE_PER_KWH}/kWh (industry average)</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-4 bg-gradient-to-br from-slate-800/30 to-slate-800/20 rounded-xl">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calculator className="text-emerald-400" size={20} />
            Your Solar System
          </h4>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Metric
                label="Recommended System Size"
                value={`${systemSizeKw} kW`}
                icon={<Zap size={16} />}
              />
              <Metric
                label="Monthly Generation"
                value={`${monthlyGenerationKwh.toLocaleString()} kWh`}
                icon={<Sun size={16} />}
              />
              <Metric
                label="Bill Coverage"
                value={`${coveragePercentage}%`}
                icon={<TrendingUp size={16} />}
              />
              <Metric
                label="Monthly Savings"
                value={`₹${monthlySavings.toLocaleString()}`}
                icon={<Calculator size={16} />}
              />
            </div>

            <div className="border-t border-slate-700/50 pt-4">
              <Metric
                label="Estimated System Cost"
                value={`₹${systemCost.toLocaleString()}`}
                className="text-lg"
              />
              <Metric
                label="Payback Period"
                value={`${paybackYears.toFixed(1)} years`}
                className="text-lg"
              />
              <Metric
                label={`Lifetime Savings (${SYSTEM_LIFETIME_YEARS} years)`}
                value={`₹${netLifetimeSavings.toLocaleString()}`}
                className="text-lg text-emerald-400"
              />
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60 space-y-1">
            <p>• Assumes 5 peak sun hours/day (conservative Indian average)</p>
            <p>• System cost: ₹{SYSTEM_COST_PER_KW.toLocaleString()}/kW (current market rate)</p>
            <p>• Includes 0.5% annual panel degradation and maintenance costs</p>
            <p>• Based on 120 sqm roof area per kW (industry standard)</p>
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-400 to-sky-500 text-slate-900 font-semibold rounded-lg hover:from-emerald-500 hover:to-sky-600 transition-all">
              Get Detailed Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, icon, className = "" }: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-3 bg-slate-900/40 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-emerald-400">{icon}</span>}
        <p className="text-xs text-white/60">{label}</p>
      </div>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}