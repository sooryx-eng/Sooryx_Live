"use client";

import React, { useState } from "react";
import { Sun, MapPin } from "lucide-react";

// Slab-based tariff structure for Indian states (₹/kWh)
// Format: { state: [{ upTo: kWh, residential: rate, commercial: rate }, ...] }
const STATE_SLAB_TARIFFS: { 
  [key: string]: Array<{ upTo: number; residential: number; commercial: number }> 
} = {
  "Andhra Pradesh": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 9.0 },
    { upTo: Infinity, residential: 8.5, commercial: 10.5 },
  ],
  "Assam": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 5.0, commercial: 7.0 },
    { upTo: 300, residential: 6.5, commercial: 8.5 },
    { upTo: Infinity, residential: 7.8, commercial: 10.0 },
  ],
  "Bihar": [
    { upTo: 100, residential: 2.5, commercial: 4.0 },
    { upTo: 200, residential: 4.0, commercial: 5.5 },
    { upTo: 300, residential: 5.0, commercial: 7.0 },
    { upTo: Infinity, residential: 6.5, commercial: 8.5 },
  ],
  "Chhattisgarh": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 5.0, commercial: 6.5 },
    { upTo: 300, residential: 6.5, commercial: 8.0 },
    { upTo: Infinity, residential: 7.8, commercial: 9.5 },
  ],
  "Delhi": [
    { upTo: 100, residential: 4.5, commercial: 6.5 },
    { upTo: 200, residential: 6.5, commercial: 8.5 },
    { upTo: 300, residential: 8.0, commercial: 10.0 },
    { upTo: Infinity, residential: 10.0, commercial: 12.0 },
  ],
  "Goa": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 6.0, commercial: 8.0 },
    { upTo: 300, residential: 7.5, commercial: 9.5 },
    { upTo: Infinity, residential: 9.0, commercial: 11.0 },
  ],
  "Gujarat": [
    { upTo: 100, residential: 3.5, commercial: 5.5 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 9.0 },
    { upTo: Infinity, residential: 8.5, commercial: 10.5 },
  ],
  "Haryana": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 8.5 },
    { upTo: Infinity, residential: 8.2, commercial: 10.0 },
  ],
  "Himachal Pradesh": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 5.0, commercial: 6.5 },
    { upTo: 300, residential: 6.5, commercial: 8.0 },
    { upTo: Infinity, residential: 7.5, commercial: 9.5 },
  ],
  "Jharkhand": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 5.0, commercial: 6.5 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 7.5, commercial: 9.0 },
  ],
  "Karnataka": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 6.0, commercial: 8.0 },
    { upTo: 300, residential: 7.5, commercial: 9.5 },
    { upTo: Infinity, residential: 9.0, commercial: 11.0 },
  ],
  "Kerala": [
    { upTo: 100, residential: 4.5, commercial: 6.5 },
    { upTo: 200, residential: 7.0, commercial: 9.0 },
    { upTo: 300, residential: 8.5, commercial: 10.5 },
    { upTo: Infinity, residential: 10.0, commercial: 12.0 },
  ],
  "Madhya Pradesh": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 5.0, commercial: 6.5 },
    { upTo: 300, residential: 6.5, commercial: 8.0 },
    { upTo: Infinity, residential: 8.0, commercial: 9.5 },
  ],
  "Maharashtra": [
    { upTo: 100, residential: 4.0, commercial: 5.5 },
    { upTo: 200, residential: 6.0, commercial: 8.0 },
    { upTo: 300, residential: 7.5, commercial: 9.5 },
    { upTo: Infinity, residential: 9.0, commercial: 11.0 },
  ],
  "Manipur": [
    { upTo: 100, residential: 2.5, commercial: 4.0 },
    { upTo: 200, residential: 4.5, commercial: 6.0 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 7.0, commercial: 8.5 },
  ],
  "Meghalaya": [
    { upTo: 100, residential: 2.5, commercial: 4.0 },
    { upTo: 200, residential: 4.5, commercial: 6.0 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 6.8, commercial: 8.5 },
  ],
  "Mizoram": [
    { upTo: 100, residential: 2.0, commercial: 3.5 },
    { upTo: 200, residential: 3.5, commercial: 5.0 },
    { upTo: 300, residential: 5.0, commercial: 6.5 },
    { upTo: Infinity, residential: 6.0, commercial: 7.5 },
  ],
  "Nagaland": [
    { upTo: 100, residential: 2.5, commercial: 4.0 },
    { upTo: 200, residential: 4.0, commercial: 5.5 },
    { upTo: 300, residential: 5.5, commercial: 7.0 },
    { upTo: Infinity, residential: 6.5, commercial: 8.0 },
  ],
  "Odisha": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 4.5, commercial: 6.0 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 7.0, commercial: 8.5 },
  ],
  "Punjab": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 9.0 },
    { upTo: Infinity, residential: 8.5, commercial: 10.5 },
  ],
  "Rajasthan": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 8.5 },
    { upTo: Infinity, residential: 8.5, commercial: 10.0 },
  ],
  "Sikkim": [
    { upTo: 100, residential: 2.5, commercial: 4.0 },
    { upTo: 200, residential: 4.5, commercial: 6.0 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 7.0, commercial: 8.5 },
  ],
  "Tamil Nadu": [
    { upTo: 100, residential: 3.5, commercial: 5.5 },
    { upTo: 200, residential: 6.0, commercial: 8.0 },
    { upTo: 300, residential: 7.5, commercial: 9.5 },
    { upTo: Infinity, residential: 9.0, commercial: 11.0 },
  ],
  "Telangana": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 8.5 },
    { upTo: Infinity, residential: 8.8, commercial: 10.5 },
  ],
  "Tripura": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 4.5, commercial: 6.0 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 7.0, commercial: 8.5 },
  ],
  "Uttar Pradesh": [
    { upTo: 100, residential: 3.0, commercial: 4.5 },
    { upTo: 200, residential: 4.5, commercial: 6.0 },
    { upTo: 300, residential: 6.0, commercial: 7.5 },
    { upTo: Infinity, residential: 7.5, commercial: 9.0 },
  ],
  "Uttarakhand": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 9.0 },
    { upTo: Infinity, residential: 8.5, commercial: 10.5 },
  ],
  "West Bengal": [
    { upTo: 100, residential: 3.5, commercial: 5.0 },
    { upTo: 200, residential: 5.5, commercial: 7.5 },
    { upTo: 300, residential: 7.0, commercial: 8.5 },
    { upTo: Infinity, residential: 9.0, commercial: 10.5 },
  ],
};

// Calculate weighted average tariff based on monthly consumption and slabs
const calculateWeightedTariff = (monthlyKWh: number, state: string, isCommercial: boolean): number => {
  const slabs = STATE_SLAB_TARIFFS[state] || STATE_SLAB_TARIFFS["Maharashtra"];
  let remainingKWh = monthlyKWh;
  let totalCost = 0;

  for (const slab of slabs) {
    if (remainingKWh <= 0) break;
    const previousUpTo = slabs.indexOf(slab) > 0 ? slabs[slabs.indexOf(slab) - 1].upTo : 0;
    const kWhInSlab = Math.min(remainingKWh, slab.upTo - previousUpTo);
    const rate = isCommercial ? slab.commercial : slab.residential;
    totalCost += kWhInSlab * rate;
    remainingKWh -= kWhInSlab;
  }

  return monthlyKWh > 0 ? +(totalCost / monthlyKWh).toFixed(2) : 8.5;
};

export default function SolarCalculator() {
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [state, setState] = useState<string>("Maharashtra");
  const [detecting, setDetecting] = useState(false);
  const [bill, setBill] = useState<number>(5000);
  const [rooftopArea, setRooftopArea] = useState<number>(30); // sqm
  const [areaUnit, setAreaUnit] = useState<'sqm' | 'sqft'>('sqm');
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Constants
  const sunlightHours = 4.5; // average peak sun-hours/day
  const systemCostPerKW = 55000; // ₹ per kW
  const installationBase = 100000; // base installation cost
  const lifetimeYears = 20;

  // Determine tariff based on consumption and slabs
  const monthlyConsumption = Math.round(bill / 8.5); // Estimate consumption from bill
  const tariff = calculateWeightedTariff(monthlyConsumption, state, propertyType === "commercial");

  // Allow user to auto-detect state via Geolocation + reverse geocoding
  const handleDetect = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const addr = data.address || {};
        const found = Object.keys(STATE_SLAB_TARIFFS).find(s => {
          if (!addr.state) return false;
          return s.toLowerCase() === addr.state.toLowerCase() || addr.state.toLowerCase().includes(s.toLowerCase().split(" ")[0]);
        });
        if (found) setState(found);
      } catch (e) {
        console.error(e);
      } finally {
        setDetecting(false);
      }
    }, () => setDetecting(false));
  };

  // Bill upload (attempt to parse number from text files)
  const handleUpload = async (file: File | null) => {
    if (!file) return;
    setUploadedName(file.name);
    const extractAmount = (raw: string): { amount: number | null; debug?: any } => {
      if (!raw) return { amount: null };
      const text = raw.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ');
      const cleaned = text.replace(/,/g, '');

      const keywords = ['total', 'amount', 'balance due', 'net payable', 'grand total', 'payable'];

      type Candidate = { num: number; index: number; raw: string };
      const candidates: Candidate[] = [];

      // Rupee-prefixed values
      const rgxRupee = /₹\s*([0-9]+(?:\.[0-9]{1,2})?)/g;
      let m: RegExpExecArray | null;
      while ((m = rgxRupee.exec(cleaned)) !== null) {
        candidates.push({ num: Math.round(Number(m[1])), index: m.index, raw: m[0] });
      }

      // Plain numeric candidates (3+ digits)
      const rgxNum = /([0-9]{3,}(?:\.[0-9]+)?)/g;
      while ((m = rgxNum.exec(cleaned)) !== null) {
        candidates.push({ num: Math.round(Number(m[1])), index: m.index, raw: m[0] });
      }

      // Deduplicate by index+num
      const uniq: Candidate[] = [];
      for (const c of candidates) {
        if (!uniq.find(u => u.index === c.index && u.num === c.num)) uniq.push(c);
      }

      if (uniq.length === 0) return { amount: null, debug: { reason: 'no-candidates' } };

      // Find keyword positions
      const lower = cleaned.toLowerCase();
      const keyPositions: number[] = [];
      for (const k of keywords) {
        let pos = lower.indexOf(k);
        while (pos >= 0) {
          keyPositions.push(pos);
          pos = lower.indexOf(k, pos + 1);
        }
      }

      // Choose candidate:
      // 1) closest to keyword
      // 2) else prefer rupee-prefixed
      // 3) else largest reasonable number
      let chosen: Candidate | null = null;
      if (keyPositions.length) {
        let bestDist = Infinity;
        for (const c of uniq) {
          for (const kp of keyPositions) {
            const d = Math.abs(c.index - kp);
            if (d < bestDist) {
              bestDist = d;
              chosen = c;
            }
          }
        }
      }

      if (!chosen) {
        const rupeePref = uniq.filter(u => u.raw.includes('₹') || /\b(rs|inr)\b/i.test(u.raw));
        if (rupeePref.length) chosen = rupeePref.reduce((a, b) => (a.num > b.num ? a : b));
      }

      if (!chosen) {
        const reasonable = uniq.filter(u => u.num > 50 && u.num < 1e8);
        if (reasonable.length) chosen = reasonable.reduce((a, b) => (a.num > b.num ? a : b));
      }

      if (!chosen) return { amount: null, debug: { reason: 'no-reasonable-candidate', candidates: uniq } };

      return { amount: chosen.num, debug: { chosen, candidates: uniq.slice(0, 12), keys: keyPositions.slice(0, 12) } };
    };

    try {
      let content = '';

      // Prefer text read for plain text files
      if (file.type.startsWith('text') || file.name.toLowerCase().endsWith('.txt')) {
        content = await file.text();
      } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        // PDFs aren't plain text. Try reading ArrayBuffer and decoding to extract embedded text heuristically.
        const buffer = await file.arrayBuffer();
        // Try UTF-8 then Latin1 as a fallback
        content = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
        if (!content || content.length < 20) {
          try {
            content = new TextDecoder('iso-8859-1', { fatal: false }).decode(buffer);
          } catch (e) {
            // ignore
          }
        }
      } else {
        // Last resort: try text()
        try {
          content = await file.text();
        } catch (e) {
          content = '';
        }
      }

      const result = extractAmount(content || '');
      const amount = result.amount;
      console.debug('bill-parse-result', result.debug);
      if (amount && amount > 0) {
        setBill(amount);
        setUploadedName(`${file.name} (detected ₹${amount.toLocaleString()})`);
      } else {
        setUploadedName(file.name + ' (amount not detected)');
        console.warn('Could not detect amount from uploaded bill', result.debug || 'no-debug');
      }
    } catch (err) {
      console.error('Failed to parse uploaded bill:', err);
      setUploadedName(file.name + ' (parse error)');
    }
  };

  // Calculations
  // Approx: 1 kW requires ~6.5 sqm of rooftop
  const areaPerKW = 6.5;
  const areaPerKWSqft = +(areaPerKW / 0.092903).toFixed(1);
  const systemKW = +(rooftopArea / areaPerKW).toFixed(2);
  const monthlyGeneration = +(systemKW * sunlightHours * 30).toFixed(0); // kWh/month
  const systemCost = Math.round(systemKW * systemCostPerKW + installationBase);

  // Lifetime generation and savings
  const lifetimeGeneration = monthlyGeneration * 12 * lifetimeYears; // kWh
  const lifetimeAvoidedCost = Math.round(lifetimeGeneration * tariff);
  const lifetimeSavings = Math.round(lifetimeAvoidedCost - systemCost);

  const sendQuoteEmail = () => {
    const subject = `Sooryx Solar Quote Request - ${propertyType[0].toUpperCase()}${propertyType.slice(1)}`;
    const sqmToSqft = (sqm: number) => +(sqm / 0.092903).toFixed(0);
    const body = `Property Type: ${propertyType}%0D%0AState: ${state}%0D%0ARooftop area (sqm): ${rooftopArea} (${sqmToSqft(rooftopArea)} ft²)%0D%0AMonthly bill: ₹${bill.toLocaleString()}%0D%0ASystem size: ${systemKW} kW%0D%0ASystem cost: ₹${systemCost.toLocaleString()}%0D%0ALifetime savings (20 yrs): ₹${lifetimeSavings.toLocaleString()}%0D%0A`;
    window.location.href = `mailto:sales@sooryx.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (<>
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-8 rounded-2xl mt-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-yellow-400/10 p-3 rounded-lg">
          <Sun className="text-yellow-400" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Solar Savings & Sizing</h3>
          <p className="text-sm text-white/60">Estimate system size, cost and 20-year savings</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 bg-slate-800/40 rounded-xl">
          <div>
            <label className="text-sm text-white/70">Property Type</label>
            <div className="mt-2 flex gap-3">
              <button className={`px-4 py-2 rounded-lg ${propertyType === 'residential' ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'bg-slate-700 text-white/70'}`} onClick={() => setPropertyType('residential')}>Residential</button>
              <button className={`px-4 py-2 rounded-lg ${propertyType === 'commercial' ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'bg-slate-700 text-white/70'}`} onClick={() => setPropertyType('commercial')}>Commercial</button>
            </div>
          </div>

          <div>
            <label className="text-sm text-white/70">State (for tariff)</label>
            <div className="mt-2 flex gap-2">
              <select value={state} onChange={(e) => setState(e.target.value)} className="bg-slate-700/60 px-3 py-2 rounded-lg">
                {Object.keys(STATE_SLAB_TARIFFS).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={handleDetect} disabled={detecting} className="px-3 py-2 bg-slate-700/60 rounded-lg flex items-center gap-2">
                <MapPin />
                {detecting ? 'Detecting...' : 'Auto-detect'}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-white/70">Available Rooftop Area</label>
            <div className="mt-2 flex gap-2 items-center">
              <div className="flex items-center gap-2 bg-slate-700/40 rounded-lg px-2 py-1">
                <button
                  onClick={() => setAreaUnit('sqm')}
                  className={`px-3 py-1 rounded-md ${areaUnit === 'sqm' ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'text-white/70'}`}>
                  m²
                </button>
                <button
                  onClick={() => setAreaUnit('sqft')}
                  className={`px-3 py-1 rounded-md ${areaUnit === 'sqft' ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'text-white/70'}`}>
                  ft²
                </button>
              </div>

              <input
                type="number"
                min={1}
                value={areaUnit === 'sqm' ? rooftopArea : +( (rooftopArea / 0.092903).toFixed(0) )}
                onChange={(e) => {
                  const v = Number(e.target.value || 0);
                  if (areaUnit === 'sqm') setRooftopArea(v);
                  else setRooftopArea(+(v * 0.092903).toFixed(2));
                }}
                className="mt-0 flex-1 px-3 py-2 rounded-lg bg-slate-700/50"
              />
            </div>

            <p className="text-xs text-white/60 mt-2">Estimated system size based on {areaPerKW} m² per kW ({areaPerKWSqft} ft² per kW)</p>
          </div>

          <div>
            <label className="text-sm text-white/70 mb-3 block">Monthly Electricity Bill</label>
            
            {/* Slider Section */}
            <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-white/60">₹500</span>
                <span className="text-2xl font-bold text-emerald-400">₹{bill.toLocaleString()}</span>
                <span className="text-xs text-white/60">₹100,000</span>
              </div>
              <input 
                type="range" 
                min={500} 
                max={100000} 
                step={100} 
                value={bill} 
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #10b981 ${((bill - 500) / (100000 - 500)) * 100}%, #1e293b ${((bill - 500) / (100000 - 500)) * 100}%, #1e293b 100%)`
                }}
              />
              <p className="text-xs text-white/50 mt-2">Drag to adjust your estimated monthly bill</p>
            </div>

            {/* File Upload Section */}
            <label htmlFor="bill-upload" className="block">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-2 text-center cursor-pointer hover:border-emerald-400/50 hover:bg-emerald-400/5 transition-all duration-200">
                <input 
                  id="bill-upload"
                  type="file" 
                  accept=".txt,.pdf,text/*" 
                  onChange={(e) => handleUpload(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <p className="text-xs text-white">{uploadedName ? <span className="text-emerald-400">{uploadedName}</span> : "Upload bill"}</p>
              </div>
            </label>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-800/30 to-slate-800/20 rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Results</h4>
          <div className="grid grid-cols-2 gap-4">
            <Metric label="Solar Plant Size" value={`${systemKW.toLocaleString()} kW`} />
            <Metric label="Monthly Generation" value={`${monthlyGeneration.toLocaleString()} kWh`} />
            <Metric label="Estimated System Cost" value={`₹${systemCost.toLocaleString()}`} />
            <Metric label={`Lifetime Savings (${lifetimeYears} yrs)`} value={`₹${lifetimeSavings.toLocaleString()}`} />
          </div>

          <div className="mt-4 text-sm text-white/60">
            <p>Lifetime avoided cost (energy you offset) : ₹{lifetimeAvoidedCost.toLocaleString()}</p>
            <p className="mt-2">Notes: Assumes {sunlightHours} peak sun-hours/day and {lifetimeYears}-year system life. Prices are estimates.</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-sky-500 text-slate-900 font-semibold rounded-lg">Request Quote</button>
            <button onClick={sendQuoteEmail} className="px-4 py-2 bg-slate-700/60 text-white rounded-lg">Email Quote</button>
          </div>
        </div>
      </div>
    </div>
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
        <div className="relative bg-slate-900 rounded-xl p-6 w-full max-w-lg z-10">
          <h3 className="text-lg font-semibold">Request a Quote</h3>
          <p className="text-sm text-white/70 mt-2">We'll prepare a tailored quote based on your inputs. This will open your email client with a pre-filled request to our sales team.</p>

          <div className="mt-4 text-sm text-white/80 space-y-1">
            <div>Property: <strong className="text-white">{propertyType}</strong></div>
            <div>State: <strong className="text-white">{state}</strong></div>
            <div>Rooftop area: <strong className="text-white">{rooftopArea} m² ({Math.round(rooftopArea / 0.092903).toLocaleString()} ft²)</strong></div>
            <div>Monthly bill: <strong className="text-white">₹{bill.toLocaleString()}</strong></div>
            <div>Estimated system: <strong className="text-white">{systemKW} kW</strong></div>
            <div>Estimated cost: <strong className="text-white">₹{systemCost.toLocaleString()}</strong></div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => { sendQuoteEmail(); setShowModal(false); }} className="px-4 py-2 bg-emerald-400 text-slate-900 rounded-lg font-semibold">Email Sooryx</button>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-700/60 text-white rounded-lg">Close</button>
          </div>
        </div>
      </div>
    )}
  </>);
}

function Metric({ label, value }: any) {
  return (
    <div className="p-3 bg-slate-900/40 rounded-lg">
      <p className="text-xs text-white/60">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
