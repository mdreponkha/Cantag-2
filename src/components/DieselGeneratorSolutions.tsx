import React from 'react';
import { Gauge, Wrench } from 'lucide-react';
import { PagesContentState } from '../types';
import teksanGenImg from '../assets/images/canstar_generator_install_1788331473828.jpg';

interface DieselGeneratorSolutionsProps {
  onOpenQuoteModal: (subject?: string) => void;
  onExploreProducts: () => void;
  content?: PagesContentState['home'];
}

export const DieselGeneratorSolutions: React.FC<DieselGeneratorSolutionsProps> = ({
  onOpenQuoteModal,
  onExploreProducts,
  content,
}) => {
  const title = content?.generationTitle || 'Diesel Generator Solutions';
  const subtitle = content?.generationSubtitle || 'Our diesel generators offer exceptional reliability, fuel efficiency, and performance for all your power generation needs.';
  const imageUrl = content?.generationImageUrl || 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp';
  const seriesLabel = content?.generationSeriesLabel || 'TEKSAN Canopy Series (10 - 3500 kVA)';
  const card1Title = content?.generationCard1Title || 'High Performance';
  const card1Desc = content?.generationCard1Desc || 'Superior power output with excellent fuel efficiency and low emissions.';
  const card2Title = content?.generationCard2Title || 'Reliable Operation';
  const card2Desc = content?.generationCard2Desc || 'Built to withstand harsh conditions with minimal maintenance requirements.';

  return (
    <section className="py-16 sm:py-20 bg-[#F4F6F9] text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 1 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2-Column Main Layout matching Screenshot 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: White Card with TEKSAN Soundproof Canopy Generator */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="w-full h-64 sm:h-80 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50">
              <img
                src={imageUrl}
                alt="TEKSAN Soundproof Diesel Generator Canopy"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // fallback to local asset if external network blocks
                  e.currentTarget.src = teksanGenImg;
                }}
              />
            </div>

            {/* Quick action bar */}
            <div className="mt-4 w-full flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span className="font-semibold text-blue-700">{seriesLabel}</span>
              <button
                onClick={() => onOpenQuoteModal('Diesel Generator Solutions')}
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
              >
                Inquire Model &rarr;
              </button>
            </div>
          </div>

          {/* Right Side: Why Choose Our Diesel Generators? + 2 White Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#08192E] tracking-tight">
              Why Choose Our Diesel Generators?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Card 1: High Performance */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-sm">
                    <Gauge className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <h4 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-2">
                  {card1Title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card1Desc}
                </p>
              </div>

              {/* Card 2: Reliable Operation */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-sm">
                    <Wrench className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <h4 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-2">
                  {card2Title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card2Desc}
                </p>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow cursor-pointer"
              >
                Explore All Diesel Generator Specifications
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
