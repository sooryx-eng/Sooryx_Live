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

  // System sizing calculation - based on consumption only
  // To match 100% of consumption: annual_kwh = monthly_consumption * 12
  // system_size = annual_kwh / (peak_sun_hours * 365)
  // With 20% buffer for losses and degradation over time
  const recommendedSystemSizeKw = Math.round((monthlyConsumptionKwh * 12) / (PEAK_SUN_HOURS_PER_DAY * 365) * 1.2);

  // Use recommended size directly (no rooftop constraint for now)
  const systemSizeKw = recommendedSystemSizeKw;

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

  // Rooftop area requirement (for reference)
  const AREA_PER_KW_SQM = 6; // industry standard for India (5-6 sqm/kW with spacing)
  const rooftopAreaRequired = systemSizeKw * AREA_PER_KW_SQM;

  return (
    <div className="bg-white border border-slate-200 p-8 rounded-2xl mt-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-yellow-100 p-3 rounded-lg">
          <Sun className="text-yellow-600" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">Solar Calculator</h3>
          <p className="text-sm text-slate-600">Calculate your solar system size and savings</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="text-sm text-slate-700 mb-3 block font-semibold">Monthly Electricity Bill (₹)</label>

            {/* Slider Section */}
            <div className="bg-white rounded-lg p-4 mb-4 border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-600">₹1,000</span>
                <span className="text-2xl font-bold text-emerald-600">₹{monthlyBill.toLocaleString()}</span>
                <span className="text-xs text-slate-600">₹50,000</span>
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
              <p className="text-xs text-slate-500 mt-2">Drag to adjust your average monthly bill</p>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>Estimated monthly consumption: <strong>{monthlyConsumptionKwh.toLocaleString()} kWh</strong></p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
            <Calculator className="text-emerald-600" size={20} />
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
                label="Rooftop Area Needed"
                value={`${rooftopAreaRequired} sqm`}
                icon={<Sun size={16} />}
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

            <div className="border-t border-emerald-200 pt-4">
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

          <div className="mt-4 text-xs text-slate-600 space-y-1">
            <p>• Assumes 5 peak sun hours/day (conservative Indian average)</p>
            <p>• Includes 0.5% annual panel degradation and maintenance costs</p>
            <p>• Rooftop area: {rooftopAreaRequired} sqm based on 6 sqm/kW (industry standard)</p>
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-sky-600 transition-all">
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
    <div className={`p-3 bg-white rounded-lg border border-slate-200 ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-emerald-600">{icon}</span>}
        <p className="text-xs text-slate-600">{label}</p>
      </div>
      <p className="text-lg font-semibold mt-1 text-slate-900">{value}</p>
    </div>
  );
}