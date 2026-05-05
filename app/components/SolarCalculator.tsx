"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Calculator, TrendingUp, Zap, Home, Building2, Info } from "lucide-react";

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(5000);
  const [customerType, setCustomerType] = useState<"residential" | "commercial">("residential");
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);

  // Industry-standard constants for India
  // Electricity rates (as per 2025-26 average across major DISCOMs)
  const RESIDENTIAL_RATE_PER_KWH = 8.5; // ₹/kWh - residential average
  const COMMERCIAL_RATE_PER_KWH = 11.0; // ₹/kWh - commercial average (typically 20-30% higher)
  const AVERAGE_RATE_PER_KWH = customerType === "residential" ? RESIDENTIAL_RATE_PER_KWH : COMMERCIAL_RATE_PER_KWH;
  
  const PEAK_SUN_HOURS_PER_DAY = 5.0; // hours - conservative estimate for India (varies 4.5-6.5)
  const SYSTEM_LIFETIME_YEARS = 25; // years - standard panel warranty period
  const MAINTENANCE_COST_PERCENT = 0.5; // % of system cost per year - industry standard
  const DEGRADATION_RATE = 0.005; // 0.5% per year - certified panel degradation rate
  
  // Note: Savings calculations assume SELF-CONSUMPTION ONLY (no excess generation sales assumed)
  // Most DISCOM net metering policies limit export or restrict excess credits
  // Conservative approach: cap generation to actual consumption (Math.min cap in calculateAnnualSavings)
  // This ensures projections remain realistic for both residential and commercial customers

  const getSystemCostPerKw = (sizeKw: number) => {
    return 70000; // ₹70,000 per kW - current market rate
  };

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

  // System cost calculation with size-based pricing
  const systemCostPerKw = getSystemCostPerKw(systemSizeKw);
  const systemCost = Math.round(systemSizeKw * systemCostPerKw);

  // Annual savings calculation (accounting for degradation)
  // IMPORTANT: Savings capped at actual consumption - NO excess generation assumed to be sold
  // This follows conservative industry practice where most customers use generation for self-consumption
  const calculateAnnualSavings = (year: number) => {
    const degradationFactor = Math.pow(1 - DEGRADATION_RATE, year);
    const degradedGeneration = annualGenerationKwh * degradationFactor;
    const annualConsumption = monthlyConsumptionKwh * 12;
    
    // Cap generation to consumption - prevents overestimation from excess exports
    // Multiplied by 0.9 to account for system losses (inverter, wiring, soiling)
    const usableGeneration = Math.min(degradedGeneration, annualConsumption) * 0.9;
    const annualSavings = usableGeneration * AVERAGE_RATE_PER_KWH;
    
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

  // Total maintenance and net benefit
  const totalMaintenanceCost = annualMaintenanceCost * SYSTEM_LIFETIME_YEARS;
  const lifetimeNetBenefit = totalLifetimeSavings - totalMaintenanceCost - systemCost;

  // Payback period calculation using cumulative annual net savings.
  // This is more accurate than dividing total cost by first-year savings alone,
  // because the system generates slightly less each year due to degradation.
  const calculatePaybackYears = () => {
    let cumulativeCashflow = -systemCost;
    let lastCumulative = cumulativeCashflow;

    for (let year = 1; year <= SYSTEM_LIFETIME_YEARS + 5; year++) {
      const annualSavings = calculateAnnualSavings(year);
      const annualNet = annualSavings - annualMaintenanceCost;
      cumulativeCashflow += annualNet;

      if (cumulativeCashflow >= 0) {
        const partialYear = annualNet > 0 ? (Math.abs(lastCumulative) / annualNet) : 0;
        return Number((year - 1 + partialYear).toFixed(1));
      }

      lastCumulative = cumulativeCashflow;
    }

    return 0;
  };

  const paybackYears = calculatePaybackYears();

  // Monthly savings (first year average)
  const monthlySavings = Math.round(calculateAnnualSavings(1) / 12);

  // Carbon savings (India grid mix: 0.8 kg CO2/kWh avoided)
  // Source: Central Electricity Authority, IEA India Carbon Intensity Data
  // Conservative estimate accounting for grid transition to renewables
  const lifetimeCo2SavedTons = Math.round(totalLifetimeGeneration * 0.0008 * 10) / 10;
  const treeEquivalent = Math.round(lifetimeCo2SavedTons / 0.5); // 1 mature tree absorbs ~0.5t CO2/year

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
          <h3 className="text-2xl font-semibold text-slate-900">Your Solar Powerhouse</h3>
          <p className="text-sm text-slate-600">Customize your system in seconds</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          {/* Customer Type Toggle */}
          <div>
            <label className="text-sm text-slate-700 mb-3 block font-semibold">I am a</label>
            <div className="flex gap-3">
              {["residential", "commercial"].map((type) => (
                <button
                  key={type}
                  onClick={() => setCustomerType(type as "residential" | "commercial")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
                    customerType === type
                      ? "bg-emerald-500 text-white border-2 border-emerald-600"
                      : "bg-white border-2 border-slate-300 text-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {type === "residential" ? (
                    <><Home size={16} /> Residential</>
                  ) : (
                    <><Building2 size={16} /> Commercial</>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Bill Input */}
          <div>
            <label className="text-sm text-slate-700 mb-3 block font-semibold">Monthly Electricity Bill (₹)</label>

            {/* Slider Section */}
            <div className="bg-white rounded-lg p-3 mb-3 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-600">₹1,000</span>
                <span className="text-xl font-bold text-emerald-600">₹{monthlyBill.toLocaleString()}</span>
                <span className="text-xs text-slate-600">₹1,00,000</span>
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={500}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #10b981 ${((monthlyBill - 1000) / (100000 - 1000)) * 100}%, #1e293b ${((monthlyBill - 1000) / (100000 - 1000)) * 100}%, #1e293b 100%)`
                }}
              />
              <p className="text-xs text-slate-500 mt-2">Drag to adjust your average monthly bill</p>
            </div>
          </div>

          {/* Energy Profile */}
          <div className="bg-white rounded-lg p-3 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Monthly Consumption</span>
              <span className="font-semibold text-slate-900">{monthlyConsumptionKwh.toLocaleString()} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Annual Consumption</span>
              <span className="font-semibold text-slate-900">{(monthlyConsumptionKwh * 12).toLocaleString()} kWh</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
              <span className="text-xs text-slate-600">Current Annual Bill</span>
              <span className="font-semibold text-emerald-600">₹{(monthlyBill * 12).toLocaleString()}</span>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg p-3 border border-emerald-200 space-y-2">
            <p className="text-xs font-semibold text-emerald-900 uppercase">✓ {customerType === "residential" ? "Home" : "Business"} Solar Benefits</p>
            <ul className="text-xs text-emerald-800 space-y-1">
              <li>• {customerType === "residential" ? "Reduce electricity bills by 60-80%" : "Significant cost reduction on energy"}</li>
              <li>• {customerType === "residential" ? "25-year panel warranty" : "Tax benefits available"}</li>
              <li>• {customerType === "residential" ? "Increase property value" : "Lower maintenance costs"}</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="relative inline-block mb-4">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Calculator className="text-emerald-600" size={20} />
                Your Solar System
              </h4>
              <button
                onMouseEnter={() => setShowAssumptions(true)}
                onMouseLeave={() => setShowAssumptions(false)}
                className="text-slate-400 hover:text-slate-600 transition"
                aria-label="View calculation assumptions"
              >
                <Info size={18} />
              </button>
            </div>

            {/* Tooltip - visible on hover */}
            {showAssumptions && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-slate-300 rounded-lg p-4 shadow-lg z-50 w-96 max-h-96 overflow-y-auto">
                <p className="font-semibold text-slate-900 mb-3 text-sm">Calculation Assumptions</p>
                <div className="text-xs text-slate-700 space-y-2">
                  <p>• Peak sun hours: {PEAK_SUN_HOURS_PER_DAY} hours/day (conservative Indian average)</p>
                  <p>• System losses & soiling: 10% reduction applied to generation</p>
                  <p>• Savings cap: Limited to actual consumption (no excess export assumed)</p>
                  <p>• <span className="font-semibold">Residential rate:</span> ₹{RESIDENTIAL_RATE_PER_KWH}/kWh (2025-26 DISCOM average)</p>
                  <p>• <span className="font-semibold">Commercial rate:</span> ₹{COMMERCIAL_RATE_PER_KWH}/kWh (20-30% commercial premium)</p>
                  <p>• <span className="font-semibold">System cost:</span> ₹{getSystemCostPerKw(1)}/kW (current market rate)</p>
                  <p>• CO₂ factor: 0.8 kg/kWh (India grid mix, CEA 2025)</p>
                  <p>• Rooftop area: 6 sqm/kW (industry standard with spacing)</p>
                  <p>• Panel lifespan: {SYSTEM_LIFETIME_YEARS} years (standard warranty period)</p>
                  <p>• Annual degradation: {DEGRADATION_RATE * 100}% per year</p>
                </div>
              </div>
            )}
          </div>

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
                label="Monthly Savings"
                value={`₹${monthlySavings.toLocaleString()}`}
                icon={<Calculator size={16} />}
              />
              <Metric
                label="CO₂ Saved"
                value={`${lifetimeCo2SavedTons} t (≈ ${treeEquivalent} trees)`}
                icon={<Sun size={16} />}
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
                value={paybackYears > 0 ? `${paybackYears.toFixed(1)} years` : "Not yet positive"}
                className="text-lg"
              />
              <Metric
                label={`Lifetime Net Benefit (${SYSTEM_LIFETIME_YEARS} yrs)`}
                value={`₹${lifetimeNetBenefit.toLocaleString()}`}
                className="text-lg text-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Disclaimer Banner */}
      <div className="mt-8 mx-auto max-w-6xl">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Important Notice</h3>
            <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto">
              The savings estimate above is a <span className="font-semibold">preliminary calculation based on average market assumptions</span> and is intended for informational purposes only. This is <span className="font-semibold">not an actual quote</span> for your solar installation.
            </p>
            <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Actual costs, savings, and system specifications may vary significantly based on your specific location, roof conditions, existing electrical infrastructure, local regulations, and available incentives. For an accurate, binding quote tailored to your property, please <span className="font-semibold">reach out to our team</span>.
            </p>
            <Link href="/contact">
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Request Personalized Quote
              </button>
            </Link>
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