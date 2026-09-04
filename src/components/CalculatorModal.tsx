import React, { useState } from 'react';
import { Cpu, Zap, Calculator, Fuel, Gauge, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface CalculatorModalProps {
  onOpenQuoteModal: (sizingDetails?: string) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ onOpenQuoteModal }) => {
  const [runningLoadKW, setRunningLoadKW] = useState<number>(200);
  const [powerFactor, setPowerFactor] = useState<number>(0.8);
  const [motorLoadHP, setMotorLoadHP] = useState<number>(50);
  const [facilityType, setFacilityType] = useState<string>('factory');
  const [fuelType, setFuelType] = useState<string>('diesel');
  const [futureExpansion, setFutureExpansion] = useState<number>(20); // 20% default

  // Calculations
  const baseKVA = runningLoadKW / powerFactor;
  const motorStartingKVA = (motorLoadHP * 0.746 / powerFactor) * 2.5; // starting multiplier
  const subtotalKVA = baseKVA + (motorStartingKVA * 0.4); // diversity factor
  const totalRecommendedKVA = Math.ceil(subtotalKVA * (1 + futureExpansion / 100));

  // Determine standard recommended generator model
  let recommendedModel = 'CPT-100S';
  let standardCapacity = 100;

  if (totalRecommendedKVA <= 50) {
    recommendedModel = 'CPT-60S (60 kVA / 48 kW)';
    standardCapacity = 60;
  } else if (totalRecommendedKVA <= 100) {
    recommendedModel = 'CPT-100S (100 kVA / 80 kW)';
    standardCapacity = 100;
  } else if (totalRecommendedKVA <= 250) {
    recommendedModel = 'CPT-250P (250 kVA / 200 kW)';
    standardCapacity = 250;
  } else if (totalRecommendedKVA <= 500) {
    recommendedModel = 'CPT-500P (500 kVA / 400 kW)';
    standardCapacity = 500;
  } else if (totalRecommendedKVA <= 800) {
    recommendedModel = 'CPT-800P (800 kVA / 640 kW)';
    standardCapacity = 800;
  } else if (totalRecommendedKVA <= 1250) {
    recommendedModel = 'CPT-1250M (1250 kVA / 1000 kW)';
    standardCapacity = 1250;
  } else if (totalRecommendedKVA <= 2000) {
    recommendedModel = 'CPT-2000M (2000 kVA / 1600 kW Multi-Unit)';
    standardCapacity = 2000;
  } else {
    recommendedModel = `CPT-3500M Multi-Generator Synchronized Array (${Math.ceil(totalRecommendedKVA / 1000) * 1000} kVA)`;
    standardCapacity = Math.ceil(totalRecommendedKVA / 1000) * 1000;
  }

  // Estimated fuel consumption at 75% load (approx 0.22 L / kWh for modern diesel)
  const estimatedHourlyLiters = Math.round((standardCapacity * powerFactor * 0.75) * 0.22);

  return (
    <section id="calculator" className="py-20 bg-[#060D1A] text-slate-100 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Engineering Sizing Tool
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white tracking-tight">
            Generator Load & kVA Capacity Calculator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Accurately size your generator for inductive motor inrush currents, power factor compensations, and future facility load expansion.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-['Outfit'] font-bold text-xl text-white pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Facility Electrical Parameters</span>
              <button
                onClick={() => {
                  setRunningLoadKW(200);
                  setMotorLoadHP(50);
                  setFutureExpansion(20);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </h3>

            {/* Facility Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Facility / Application Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'factory', label: 'Manufacturing & RMG' },
                  { id: 'hospital', label: 'Hospital & Healthcare' },
                  { id: 'highrise', label: 'Commercial High-Rise' },
                  { id: 'datacenter', label: 'Data Center / Telecom' },
                  { id: 'construction', label: 'Heavy Construction' },
                  { id: 'resort', label: 'Resort & Golf Club' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFacilityType(type.id)}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                      facilityType === type.id
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Running Load Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Running Load (kW)
                </label>
                <span className="text-base font-mono font-bold text-amber-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {runningLoadKW} kW ({Math.round(runningLoadKW / powerFactor)} kVA)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="2500"
                step="10"
                value={runningLoadKW}
                onChange={(e) => setRunningLoadKW(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10 kW (Small Branch)</span>
                <span>1000 kW (Large Factory)</span>
                <span>2500 kW (Mega Complex)</span>
              </div>
            </div>

            {/* Motor Starting Load Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Largest Single Induction Motor (HP)
                </label>
                <span className="text-base font-mono font-bold text-emerald-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {motorLoadHP} HP ({Math.round(motorLoadHP * 0.746)} kW)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="5"
                value={motorLoadHP}
                onChange={(e) => setMotorLoadHP(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Accounts for transient starting inrush current for chillers, compressors, and pumps.
              </p>
            </div>

            {/* Future Headroom expansion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Future Expansion Headroom
                </label>
                <select
                  value={futureExpansion}
                  onChange={(e) => setFutureExpansion(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value={10}>10% Headroom</option>
                  <option value={20}>20% Headroom (Recommended)</option>
                  <option value={30}>30% Headroom (Heavy Growth)</option>
                  <option value={50}>50% Headroom (Phased Expansion)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Fuel Preference
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="diesel">Industrial Diesel (Fast Backup)</option>
                  <option value="gas">Pipeline Natural Gas (Low Opex)</option>
                  <option value="biogas">Biogas / Renewable Methane</option>
                  <option value="hybrid">Hybrid Solar + Battery + Diesel</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F2A4A] to-[#0A192F] border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  CANSTAR SIZING REPORT
                </div>
                <h3 className="text-xl font-bold font-['Outfit'] text-white">
                  Recommended Equipment
                </h3>
              </div>
              <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Zap className="w-5 h-5" />
              </span>
            </div>

            {/* Big Recommended Output Display */}
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Recommended Rating</span>
              <div className="font-['Outfit'] font-black text-4xl text-amber-400 mb-1">
                {standardCapacity} kVA
              </div>
              <div className="text-xs text-slate-300 font-semibold">
                Model: <span className="text-white font-bold">{recommendedModel}</span>
              </div>
            </div>

            {/* Detailed Parameters Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Raw Running Load:</span>
                <span className="text-slate-200 font-mono">{runningLoadKW} kW ({Math.round(runningLoadKW / 0.8)} kVA)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Motor Inrush Starting Cushion:</span>
                <span className="text-slate-200 font-mono">+{Math.round(motorStartingKVA * 0.4)} kVA</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Safety & Expansion Buffer:</span>
                <span className="text-emerald-400 font-mono">+{futureExpansion}% Buffer</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Est. Fuel Burn @ 75% Load:</span>
                <span className="text-amber-400 font-bold font-mono">~{estimatedHourlyLiters} Liters/Hour</span>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() =>
                  onOpenQuoteModal(
                    `Calculated Sizing: ${standardCapacity} kVA (${recommendedModel}) for ${facilityType} application with ${runningLoadKW}kW load.`
                  )
                }
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>Request Quotation for this Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Includes free civil site survey, acoustic evaluation, and delivery estimation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
