import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, Zap, ChevronRight } from 'lucide-react';
import { PageView, ThemeCustomizerState } from '../types';

interface FooterProps {
  setActivePage: (page: PageView) => void;
  customizer: ThemeCustomizerState;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, customizer, onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08192E] text-slate-300 text-xs border-t border-slate-800">
      {/* Pre-Footer Industrial CTA Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-10 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-widest block mb-1">
              RELIABLE POWER SOLUTIONS
            </span>
            <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
              Need Reliable Power Generation Solutions?
            </h3>
            <p className="text-blue-100 text-sm mt-1 max-w-2xl">
              Consult with our factory-trained power specialists for load sizing, TEKSAN generator specs, and competitive pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-md bg-white hover:bg-slate-100 text-blue-800 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg whitespace-nowrap"
            >
              Get Free Consultation
            </button>
            <a
              href={`tel:${(customizer.phone || '01300746860').replace(/[^0-9+]/g, '')}`}
              className="px-5 py-3 rounded-md bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs transition whitespace-nowrap border border-blue-400/40"
            >
              Hotline: {customizer.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {customizer.logoUrl ? (
                <div className="bg-white p-1 rounded">
                  <img
                    src={customizer.logoUrl}
                    alt="Logo"
                    className="h-8 max-w-[140px] object-contain"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black shadow-md">
                  <Zap className="w-5 h-5 fill-white" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-['Outfit'] font-black text-xl tracking-wider text-white leading-none">
                  CAN STAR POWER TECH
                </span>
                <span className="text-[9px] font-bold tracking-wider text-blue-400 leading-tight mt-0.5">
                  AUTHORIZED TEKSAN DEALER
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Authorized Dealer of world-renowned <strong>TEKSAN GENERATOR (Turkey)</strong>. Providing diesel, gas, and mobile power generators powered by genuine Perkins, Cummins, and Hyundai engines across Bangladesh.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{customizer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{customizer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{customizer.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-['Outfit'] font-bold text-white text-sm uppercase tracking-wider border-b border-slate-700/80 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>About Us</span>
                </button>
              </li>
              <li className="pl-3">
                <button
                  onClick={() => setActivePage('md-message')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400 text-[11px]"
                >
                  <span>• MD Message</span>
                </button>
              </li>
              <li className="pl-3">
                <button
                  onClick={() => setActivePage('ceo-message')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400 text-[11px]"
                >
                  <span>• CEO Message</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Products / Generators</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('projects')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('clients')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Clients</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-blue-400 transition text-left cursor-pointer flex items-center gap-1 text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Power Generation Equipment */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Outfit'] font-bold text-white text-sm uppercase tracking-wider border-b border-slate-700/80 pb-2">
              Generator Solutions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer">TEKSAN Diesel GenSets (10 - 3500 kVA)</li>
              <li className="hover:text-white cursor-pointer">Natural Gas Continuous Generators</li>
              <li className="hover:text-white cursor-pointer">Biogas Renewable Energy Generators</li>
              <li className="hover:text-white cursor-pointer">Mobile Trailer Soundproof Generators</li>
              <li className="hover:text-white cursor-pointer">Hydraulic Mast LED Lighting Towers</li>
              <li className="hover:text-white cursor-pointer">Synchronizing & Auto-Transfer Panels</li>
            </ul>
          </div>

          {/* Engineering Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Outfit'] font-bold text-white text-sm uppercase tracking-wider border-b border-slate-700/80 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>24/7 Emergency Breakdown Dispatch</li>
              <li>Annual Maintenance Contracts (AMC)</li>
              <li>Turnkey Installation & Commissioning</li>
              <li>Acoustic Soundproofing & Canopies</li>
              <li>Full Load Bank Testing & Diagnostic</li>
              <li>Genuine OEM Spare Parts Supply</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-white">Can Star Power Tech</strong>. All rights reserved. Authorized TEKSAN Generator Dealer.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-blue-400 transition cursor-pointer flex items-center gap-1 border border-slate-700"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

