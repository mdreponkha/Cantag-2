import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { PageView, ThemeCustomizerState } from '../types';
import { CanStarLogo } from './CanStarLogo';

interface NavigationBarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  onOpenQuoteModal: (pref?: string) => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  customizer?: ThemeCustomizerState;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activePage,
  setActivePage,
  onOpenQuoteModal,
  mobileMenuOpen = false,
  setMobileMenuOpen,
  customizer,
}) => {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-container')) {
        setAboutDropdownOpen(false);
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const isAboutActive = activePage === 'about' || activePage === 'md-message' || activePage === 'ceo-message';

  const currentLogo = customizer?.logoUrl || '';

  return (
    <nav className="bg-[#0A192F] text-white shadow-xl sticky top-0 z-40 border-t border-b border-blue-900/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Left Side: Brand Logo */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded px-2.5 py-1.5 flex items-center justify-center transition hover:opacity-95 shadow-sm cursor-pointer"
              title="CAN STAR POWER TECH - Home"
            >
              {customizer?.logoUrl ? (
                <img
                  src={customizer.logoUrl}
                  alt="CAN STAR POWER TECH Logo"
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[150px] sm:max-w-[170px] object-contain"
                />
              ) : (
                <span className="font-black text-xs sm:text-sm text-slate-900 tracking-wider uppercase">CAN STAR POWER TECH</span>
              )}
            </button>
          </div>

          {/* Center / Right Nav Items matching screenshot */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
            
            {/* Home */}
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${
                activePage === 'home'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-200 hover:bg-[#102B4E] hover:text-white'
              }`}
            >
              Home
            </button>

            {/* About Us with Dropdown (MD Message & CEO Message) */}
            <div
              className="nav-dropdown-container relative py-1"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setActivePage('about');
                    setAboutDropdownOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 rounded-l-md text-sm font-semibold transition cursor-pointer ${
                    isAboutActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-200 hover:bg-[#102B4E] hover:text-white'
                  }`}
                >
                  About Us
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAboutDropdownOpen(!aboutDropdownOpen);
                  }}
                  className={`px-1.5 py-2 rounded-r-md text-sm font-semibold transition cursor-pointer ${
                    isAboutActive
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-300 hover:bg-[#102B4E] hover:text-white'
                  }`}
                  aria-label="Toggle About Submenu"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full mt-0.5 w-56 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => {
                      setActivePage('md-message');
                      setAboutDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between cursor-pointer border-b border-slate-100 ${
                      activePage === 'md-message' ? 'bg-blue-50 text-blue-600 font-bold' : ''
                    }`}
                  >
                    <span>Managing Director's Message</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">MD</span>
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('ceo-message');
                      setAboutDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between cursor-pointer ${
                      activePage === 'ceo-message' ? 'bg-blue-50 text-blue-600 font-bold' : ''
                    }`}
                  >
                    <span>CEO Message & Vision</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">CEO</span>
                  </button>
                </div>
              )}
            </div>

            {/* Products with Dropdown (Generators) */}
            <div
              className="nav-dropdown-container relative py-1"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setActivePage('products');
                    setProductsDropdownOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 rounded-l-md text-sm font-semibold transition cursor-pointer ${
                    activePage === 'products'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-200 hover:bg-[#102B4E] hover:text-white'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductsDropdownOpen(!productsDropdownOpen);
                  }}
                  className={`px-1.5 py-2 rounded-r-md text-sm font-semibold transition cursor-pointer ${
                    activePage === 'products'
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-300 hover:bg-[#102B4E] hover:text-white'
                  }`}
                  aria-label="Toggle Products Submenu"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {productsDropdownOpen && (
                <div className="absolute left-0 top-full mt-0.5 w-44 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => {
                      setActivePage('products');
                      setProductsDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer flex items-center justify-between"
                  >
                    <span>Generator</span>
                  </button>
                </div>
              )}
            </div>

            {/* Projects */}
            <button
              onClick={() => {
                setActivePage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${
                activePage === 'projects'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-200 hover:bg-[#102B4E] hover:text-white'
              }`}
            >
              Projects
            </button>

            {/* Contact Us */}
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${
                activePage === 'contact'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-200 hover:bg-[#102B4E] hover:text-white'
              }`}
            >
              Contact Us
            </button>

            {/* Clients */}
            <button
              onClick={() => {
                setActivePage('clients');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${
                activePage === 'clients'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-200 hover:bg-[#102B4E] hover:text-white'
              }`}
            >
              Clients
            </button>

          </div>

          {/* Right Action: Emergency Hotline & Quotation Button */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={`tel:${(customizer?.phone || '01300746860').replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-xs text-blue-200 hover:text-white font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{customizer?.phone || '01300-746860'}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                if (setMobileMenuOpen) setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-slate-200 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-t border-slate-800 px-4 py-3 space-y-1.5 shadow-2xl">
          <button
            onClick={() => {
              setActivePage('home');
              if (setMobileMenuOpen) setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activePage === 'home' ? 'bg-blue-600 text-white' : 'text-slate-200'
            }`}
          >
            Home
          </button>

          {/* About Us section in mobile */}
          <div className="border-l-2 border-blue-500 pl-3 py-1 my-1">
            <button
              onClick={() => {
                setActivePage('about');
                if (setMobileMenuOpen) setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left py-1 text-sm font-medium text-slate-200"
            >
              About Us
            </button>
            <button
              onClick={() => {
                setActivePage('md-message');
                if (setMobileMenuOpen) setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left py-1 text-xs text-blue-300"
            >
              ↳ MD Message
            </button>
            <button
              onClick={() => {
                setActivePage('ceo-message');
                if (setMobileMenuOpen) setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left py-1 text-xs text-blue-300"
            >
              ↳ CEO Message
            </button>
          </div>

          <button
            onClick={() => {
              setActivePage('products');
              if (setMobileMenuOpen) setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activePage === 'products' ? 'bg-blue-600 text-white' : 'text-slate-200'
            }`}
          >
            Products / Generators
          </button>

          <button
            onClick={() => {
              setActivePage('services');
              if (setMobileMenuOpen) setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activePage === 'services' ? 'bg-blue-600 text-white' : 'text-slate-200'
            }`}
          >
            Services & Maintenance
          </button>

          <button
            onClick={() => {
              setActivePage('projects');
              if (setMobileMenuOpen) setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activePage === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-200'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => {
              setActivePage('contact');
              if (setMobileMenuOpen) setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activePage === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-200'
            }`}
          >
            Contact Us
          </button>

          <button
            onClick={() => {
              setActivePage('clients');
              if (setMobileMenuOpen) setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activePage === 'clients' ? 'bg-blue-600 text-white' : 'text-slate-200'
            }`}
          >
            Clients
          </button>

          <div className="pt-3 border-t border-slate-700">
            <button
              onClick={() => {
                onOpenQuoteModal();
                if (setMobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-center text-sm shadow cursor-pointer"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};


