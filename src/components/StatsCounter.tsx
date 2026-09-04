import React from 'react';
import { Zap, ShieldCheck, Globe, Clock, Award, Building2 } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      value: '99.9%',
      label: 'Operational Uptime',
      description: 'Continuous power reliability across mission-critical sites',
      icon: Zap,
      color: 'text-amber-400',
    },
    {
      value: '1000+',
      label: 'Completed Projects',
      description: 'Generators installed across commercial & industrial zones',
      icon: Building2,
      color: 'text-emerald-400',
    },
    {
      value: '500+ MW',
      label: 'Total Power Delivered',
      description: 'Clean, efficient energy generated nationwide and abroad',
      icon: Award,
      color: 'text-blue-400',
    },
    {
      value: '< 2 Hrs',
      label: 'Emergency Response',
      description: 'Rapid mobile field engineering vans on 24/7 active standby',
      icon: Clock,
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="bg-[#060D1A] py-14 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 text-center hover:border-amber-500/40 hover:bg-slate-900 transition duration-300 group"
              >
                <div className="inline-flex p-2.5 rounded-lg bg-slate-800 mb-4 group-hover:scale-110 transition">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-bold text-slate-200 text-sm mb-1.5">{stat.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
