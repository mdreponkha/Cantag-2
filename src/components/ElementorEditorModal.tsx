import React from 'react';
import { X, Wrench, Sparkles, Check, RotateCcw, Sliders, Palette, Type, Phone } from 'lucide-react';
import { ThemeCustomizerState } from '../types';

interface ElementorEditorModalProps {
  customizer: ThemeCustomizerState;
  setCustomizer: React.Dispatch<React.SetStateAction<ThemeCustomizerState>>;
  onClose: () => void;
}

export const ElementorEditorModal: React.FC<ElementorEditorModalProps> = ({
  customizer,
  setCustomizer,
  onClose,
}) => {
  const handleReset = () => {
    setCustomizer({
      primaryColor: '#0A192F',
      accentColor: '#E5A93C',
      heroHeadline: 'Reliable Power. Professional Solutions. Uninterrupted Performance.',
      heroSubheadline: 'Leading turnkey supplier of heavy-duty industrial diesel, natural gas & biogas generators (10 kVA – 3500 kVA), multi-megawatt synchronization switchgear, and 24/7 emergency lifecycle support.',
      heroBadge: 'ISO 8528 & CE Certified Power Systems',
      phone: '+880 2 9880000',
      emergencyPhone: '+880 1819-000000',
      email: 'info@canstarpowertech.com',
      address: 'Canstar Tower, Level 8, Gulshan Avenue, Dhaka, Bangladesh',
      activeFont: 'Outfit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                ELEMENTOR & CUSTOMIZER SIMULATOR
              </span>
              <h2 className="font-['Outfit'] font-black text-xl text-white">
                Live Theme Controls
              </h2>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-6 bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/20">
          💡 <strong>Live Elementor Integration:</strong> Changes you make here dynamically update the live site header, hero banner, badges, and company contact descriptors in real-time.
        </p>

        {/* Controls */}
        <div className="space-y-4 text-xs">
          
          {/* Logo Customizer Section */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white flex items-center gap-1.5 text-xs">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>Custom Logo (Upload / Image URL)</span>
              </label>
              {customizer.logoUrl && (
                <button
                  type="button"
                  onClick={() => setCustomizer({ ...customizer, logoUrl: undefined })}
                  className="text-[10px] text-red-400 hover:text-red-300 font-semibold cursor-pointer underline"
                >
                  Reset to Default Logo
                </button>
              )}
            </div>

            {/* Live Logo Preview */}
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-700">
              <img
                src={customizer.logoUrl || 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp'}
                alt="Logo Preview"
                className="h-9 max-w-[140px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-[11px] text-slate-500 italic">
                {customizer.logoUrl ? 'Custom logo active in header & menu bar' : 'Current active logo'}
              </span>
            </div>

            {/* Upload File Input */}
            <div>
              <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                1. Upload from Computer (PNG / JPG / WebP / SVG):
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setCustomizer({
                          ...customizer,
                          logoUrl: event.target.result as string,
                        });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer bg-slate-900 rounded-lg border border-slate-700 p-1"
              />
            </div>

            {/* Or Direct Image URL Input */}
            <div>
              <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                2. Or Paste Image URL:
              </label>
              <input
                type="url"
                placeholder="https://yourwebsite.com/logo.png"
                value={customizer.logoUrl || ''}
                onChange={(e) => setCustomizer({ ...customizer, logoUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Hero Headline */}
          <div>
            <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>Hero Main Headline</span>
            </label>
            <input
              type="text"
              value={customizer.heroHeadline}
              onChange={(e) => setCustomizer({ ...customizer, heroHeadline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Hero Subheadline */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Hero Subheadline / Value Proposition</label>
            <textarea
              rows={2}
              value={customizer.heroSubheadline}
              onChange={(e) => setCustomizer({ ...customizer, heroSubheadline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Hero Animated Badge */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Hero Pill Badge</label>
            <input
              type="text"
              value={customizer.heroBadge}
              onChange={(e) => setCustomizer({ ...customizer, heroBadge: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Hotline</span>
              </label>
              <input
                type="text"
                value={customizer.emergencyPhone}
                onChange={(e) => setCustomizer({ ...customizer, emergencyPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Official Sales Email</label>
              <input
                type="text"
                value={customizer.email}
                onChange={(e) => setCustomizer({ ...customizer, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Corporate Office Address</label>
            <input
              type="text"
              value={customizer.address}
              onChange={(e) => setCustomizer({ ...customizer, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        {/* Done Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow"
          >
            Apply & View Live Site &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
