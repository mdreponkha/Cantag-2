import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { PageView, ThemeCustomizerState } from '../types';
import { CanStarLogo } from './CanStarLogo';

interface HeaderProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  customizer: ThemeCustomizerState;
  onOpenQuoteModal: (productOrProject?: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLogoUpload?: (logoUrl: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  customizer,
  onOpenQuoteModal,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLogoUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('products');
    }
  };

  return (
    <header className="w-full bg-white relative z-30">
      {/* Main Brand & Search Row Matching kpowerbd.com */}
      <div className="bg-white py-3 sm:py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand: Initiative Group Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActivePage('home')}
              className="cursor-pointer focus:outline-none transition hover:opacity-90 flex items-center"
              title="Initiative Group"
            >
              {(customizer.initiativeLogoUrl || customizer.groupLogoUrl) ? (
                <img
                  src={customizer.initiativeLogoUrl || customizer.groupLogoUrl}
                  alt="Initiative Group Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 sm:h-12 md:h-13 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                /* Styled Initiative Group SVG Logo */
                <div className="relative flex items-center justify-center">
                  <svg
                    className="h-10 sm:h-12 md:h-13 w-auto"
                    viewBox="0 0 170 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer and inner oval styling */}
                    <ellipse cx="85" cy="27" rx="82" ry="24" fill="#035CAE" stroke="#0077E6" strokeWidth="2.5" />
                    <ellipse cx="85" cy="27" rx="77" ry="20" fill="url(#initiativeGradient)" />
                    <defs>
                      <linearGradient id="initiativeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0B4B8C" />
                        <stop offset="50%" stopColor="#0369A1" />
                        <stop offset="100%" stopColor="#024882" />
                      </linearGradient>
                    </defs>
                    {/* Elegant cursive "Initiative" */}
                    <text
                      x="85"
                      y="30"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily="'Brush Script MT', 'Dancing Script', cursive, sans-serif"
                      fontSize="24"
                      fontStyle="italic"
                      fontWeight="bold"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
                    >
                      Initiative
                    </text>
                    {/* "GROUP" badge underline */}
                    <text
                      x="85"
                      y="43"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily="'Outfit', sans-serif"
                      fontSize="8.5"
                      fontWeight="800"
                      letterSpacing="3.5"
                    >
                      GROUP
                    </text>
                  </svg>
                </div>
              )}
            </button>
          </div>

          {/* Center Search Pill */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search generators, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-12 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-slate-300 hover:border-slate-400 rounded-full focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-inner text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center transition shadow cursor-pointer"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Brand: Can Star Power Tech Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActivePage('home')}
              className="cursor-pointer focus:outline-none flex items-center bg-white hover:bg-slate-50 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 transition shadow-sm"
              title="Canstar Power Tech - Power Engineering Solutions"
            >
              {customizer.logoUrl ? (
                <img
                  src={customizer.logoUrl}
                  alt="Canstar Power Tech Logo"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
              ) : (
                <CanStarLogo className="h-9 sm:h-10 md:h-11 w-auto" />
              )}
            </button>

            {/* Mobile menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 ml-1 text-slate-700 hover:text-blue-600 focus:outline-none rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};


