import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { PageView, ThemeCustomizerState, PagesContentState } from '../types';

interface HeroProps {
  customizer: ThemeCustomizerState;
  homeContent?: PagesContentState['home'];
  setActivePage: (page: PageView) => void;
  onOpenQuoteModal: (pref?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  customizer,
  homeContent,
  setActivePage,
  onOpenQuoteModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const defaultSlides = [
    {
      id: 1,
      image: 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp',
      title: 'Reliable Power for\nSecure Data',
      subtitle:
        'With Teksan generator sets that comply with Uptime Institute Tier III and Tier IV requirements, all data is secure.',
      tag: 'Uptime Institute Tier III & IV Compliant',
      ctaText: 'Get Consultation',
    },
    {
      id: 2,
      image: 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp',
      title: 'Authorized Dealer of\nTEKSAN GENERATOR',
      subtitle:
        'Originated in Turkey, powered by Perkins (UK/USA), Cummins (USA/UK/China), and Hyundai (Korea). Over 1,200 generator units delivered in Bangladesh.',
      tag: '10 kVA to 3500 kVA Power Solutions',
      ctaText: 'Explore Generators',
    },
    {
      id: 3,
      image: 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp',
      title: '24/7 Rapid Emergency Support &\nTurnkey Installation',
      subtitle:
        'Multi-generator synchronization with DeepSea controllers, acoustic soundproofing, preventive maintenance contracts (AMC), and genuine spare parts.',
      tag: 'ISO 8528 & CE Certified Lifecycle Support',
      ctaText: 'View Services',
    },
  ];

  const slides = homeContent?.heroSlides && homeContent.heroSlides.length > 0
    ? homeContent.heroSlides
    : defaultSlides;

  // Banner text
  const purpleBannerTitle = homeContent?.purpleBannerTitle || 'Powering Industries, Residence, Commercial buildings & Service Sectors.';
  const purpleBannerSubtitle = homeContent?.purpleBannerSubtitle || 'With cutting-edge technology and unmatched reliability, we deliver power solutions that keep your business running 24/7. Join hundreds of satisfied customers who trust Can Star Power Tech for critical power generation.';
  const uptimeGuarantee = homeContent?.uptimeGuarantee || customizer.uptimeGuarantee || '99.9%';
  const projectsCompleted = homeContent?.projectsCompleted || customizer.completedProjects || '1000+';

  // Automatic slide interval (every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full relative">
      {/* Main Full-Width Hero Slider */}
      <section
        className="relative w-full overflow-hidden bg-[#08192E] text-white min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center justify-center select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides rendering with transition */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
                />
                {/* Visual Depth Overlay (Subtle gradient overlay to ensure perfect readability) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#08192E]/85 via-[#08192E]/60 to-[#08192E]/85"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Slide Text Content matching screenshot */}
              <div className="relative h-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center justify-center text-center z-10 pt-4 pb-12">
                
                {/* Central Main Headline with Outfit bold typography */}
                <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] drop-shadow-lg whitespace-pre-line max-w-4xl">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-100/90 font-normal leading-relaxed max-w-3xl drop-shadow-md">
                  {slide.subtitle}
                </p>

                {/* Action CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => onOpenQuoteModal('Hero Inquiry: ' + slide.title)}
                    className="px-7 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-blue-500/40 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Request Free Quotation &rarr;
                  </button>
                  <button
                    onClick={() => setActivePage('products')}
                    className="px-6 py-3 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base backdrop-blur-sm border border-white/30 transition cursor-pointer"
                  >
                    View All Generators
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Left Chevron Button Matching the Screenshot (Bold Royal Blue Arrow) */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center text-blue-500 hover:text-blue-400 hover:scale-110 active:scale-95 transition cursor-pointer group focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.5] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
        </button>

        {/* Right Chevron Button Matching the Screenshot (Bold Royal Blue Arrow) */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center text-blue-500 hover:text-blue-400 hover:scale-110 active:scale-95 transition cursor-pointer group focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.5] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
        </button>

        {/* Bottom Center Indicator Dot Matching the Screenshot */}
        <div className="absolute bottom-5 left-1/2 -translate-y-0 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? 'w-3 h-3 bg-blue-500 shadow-md ring-2 ring-blue-400/50'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Feature Purple Banner */}
      <section className="bg-gradient-to-r from-[#5945CB] to-[#7952B3] text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-lg border-b border-purple-900/30">
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
          <Zap className="w-64 h-64 text-white" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="lg:max-w-2xl space-y-2 text-center lg:text-left">
            <h2 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              {purpleBannerTitle}
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm leading-relaxed opacity-95">
              {purpleBannerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 flex-shrink-0">
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {uptimeGuarantee}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-purple-100 uppercase tracking-wider mt-1">
                Uptime Guarantee
              </div>
            </div>

            <div className="h-10 w-px bg-purple-300/40"></div>

            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {projectsCompleted}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-purple-100 uppercase tracking-wider mt-1">
                Projects Completed
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

