import React from 'react';
import { Award, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PageView, PagesContentState, ThemeCustomizerState } from '../types';
import generatorImage from '../assets/images/canstar_generator_install_1788331473828.jpg';

interface AboutSectionProps {
  setActivePage: (page: PageView) => void;
  onOpenQuoteModal: () => void;
  homeContent?: PagesContentState['home'];
  aboutContent?: PagesContentState['about'];
  customizer?: ThemeCustomizerState;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  setActivePage,
  onOpenQuoteModal,
  homeContent,
  aboutContent,
  customizer,
}) => {
  const displayImage = homeContent?.aboutImageUrl || aboutContent?.photoUrl || generatorImage;
  const badgeText = homeContent?.aboutBadge || 'Trusted Power Engineering Partner';
  const headline = homeContent?.aboutHeadline || 'About Can Star Power Tech';
  const p1 = homeContent?.aboutParagraph1 || 'Can Star Power Tech is a premier power engineering solutions provider and authorized distributor of world-renowned "TEKSAN GENERATOR" originated in Turkey.';
  const p2 = homeContent?.aboutParagraph2 || 'Our generators are powered by internationally acclaimed engines including Perkins (UK/USA), Cummins (USA/UK/China), and Hyundai (Korea). We have supplied and commissioned more than 1,200 units of TEKSAN heavy-duty generators for prestigious commercial, industrial, healthcare, and infrastructure projects across Bangladesh.';
  const p3 = homeContent?.aboutParagraph3 || 'Can Star Power Tech maintains a dedicated, factory-trained team of mechanical and electrical engineers available 24/7 to deliver turnkey installation, automated synchronizing panels, acoustic soundproofing, preventive maintenance (AMC), and emergency breakdown support.';
  const uptime = homeContent?.uptimeGuarantee || customizer?.uptimeGuarantee || '99.9%';
  const completed = homeContent?.projectsCompleted || customizer?.completedProjects || '1000+';

  return (
    <section id="about" className="py-16 sm:py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Generator Installation Photo */}
          <div className="lg:col-span-5">
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 shadow-2xl bg-slate-900">
              <img
                src={displayImage}
                alt="Can Star Power Tech Generator Installation"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = generatorImage;
                }}
                className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Subtle gradient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08192E]/90 via-[#08192E]/20 to-transparent pointer-events-none"></div>

              {/* Bottom Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-lg text-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-extrabold text-sm text-[#08192E] leading-tight">
                      Can Star Power Tech
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Heavy-Duty Power Engineering & Installation
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5" />
              {badgeText}
            </div>

            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight leading-tight">
              {headline}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {p1}
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              {p2}
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              {p3}
            </p>

            {/* Two Stat Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-3xl font-black font-['Outfit'] text-blue-700">
                  {uptime}
                </div>
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
                  Uptime Guarantee
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-3xl font-black font-['Outfit'] text-blue-700">
                  {completed}
                </div>
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
                  Projects Completed
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActivePage('about')}
                className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="px-5 py-3 rounded-md border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm transition cursor-pointer"
              >
                Contact Sales Team
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

