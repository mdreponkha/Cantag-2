import React from 'react';
import { Shield, Gauge, Wrench, Clock, Award, Zap, CheckCircle2, Layers } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const advantages = [
    {
      icon: Gauge,
      title: 'High Fuel Efficiency & Performance',
      description: 'Advanced electronic injection mapping and turbochargers reduce hourly diesel consumption while maintaining exceptional transient load pickup.',
    },
    {
      icon: Award,
      title: 'Genuine OEM Engines Only',
      description: 'Exclusively authentic Perkins (UK/USA), Cummins (USA/UK/China), and Hyundai (Korea) engines with official factory warranties.',
    },
    {
      icon: Clock,
      title: '24/7 Rapid Emergency Response',
      description: 'Dedicated fleet of mobile emergency response vans equipped with diagnostic scanners, genuine AVRs, filters, and factory-trained engineers.',
    },
    {
      icon: Layers,
      title: 'Acoustic Soundproof Enclosures',
      description: 'High-attenuation acoustic canopies with multi-density rockwool and intake/exhaust splitters achieving under 68 dBA quiet operations.',
    },
    {
      icon: Zap,
      title: 'Turnkey Power Engineering',
      description: 'Single-source responsibility for sizing calculations, civil foundations, acoustic louvers, fuel piping, and synchronized switchgear.',
    },
    {
      icon: Shield,
      title: '100% Full Load-Bank Tested',
      description: 'Every generator undergoes rigorous multi-hour resistive-reactive load testing with computerized thermal logging before project handover.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
            WHY PARTNER WITH US
          </span>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight">
            Why Choose Can Star Power Tech & TEKSAN Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Engineered to deliver continuous, reliable power for heavy manufacturing, critical hospitals, commercial towers, and national infrastructure.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-7 hover:border-blue-500 hover:shadow-lg transition duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 group-hover:text-blue-600 transition mb-2">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

