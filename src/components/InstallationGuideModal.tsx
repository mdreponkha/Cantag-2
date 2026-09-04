import React from 'react';
import { X, HelpCircle, Download, CheckCircle2, ArrowRight, Wrench, Layers } from 'lucide-react';

interface InstallationGuideModalProps {
  onClose: () => void;
}

export const InstallationGuideModal: React.FC<InstallationGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 text-xs font-bold uppercase mb-2 border border-amber-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            WordPress Administrator Guide
          </div>
          <h2 className="font-['Outfit'] font-black text-2xl text-white">
            How to Install & Activate Canstar Power Tech Theme
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Follow this quick 4-step checklist to deploy the theme and Elementor widgets to any live WordPress site.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Download the Theme ZIP Package</h4>
              <p className="text-slate-400 leading-relaxed">
                Click the <strong>"Download ZIP"</strong> button in the top navigation or below to save <code className="text-amber-400 font-mono">canstar-power-tech.zip</code> to your computer.
              </p>
              <div className="mt-2">
                <a
                  href="/canstar-power-tech.zip"
                  download="canstar-power-tech.zip"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download canstar-power-tech.zip (45 KB)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Upload via WordPress Admin</h4>
              <p className="text-slate-400 leading-relaxed">
                Log into your WordPress Dashboard &rarr; Navigate to <strong>Appearance &rarr; Themes &rarr; Add New Theme &rarr; Upload Theme</strong>.
                Choose <code className="text-amber-400 font-mono">canstar-power-tech.zip</code> and click <strong>Install Now</strong>, then click <strong>Activate</strong>.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Install Elementor Plugin</h4>
              <p className="text-slate-400 leading-relaxed">
                Go to <strong>Plugins &rarr; Add New</strong>, search for <strong>Elementor</strong>, install and activate. The theme will automatically register the custom <strong>"Canstar Power Tech Widgets"</strong> category with all 6 custom widgets (Hero, Stats, Products, Services, Projects, Clients).
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Populate Custom Post Types & Customizer</h4>
              <p className="text-slate-400 leading-relaxed">
                Use the dedicated admin menus in your WordPress dashboard (<strong>Power Products</strong>, <strong>Projects</strong>, <strong>Services</strong>, <strong>Clients</strong>) to input your generator items and case studies. Go to <strong>Appearance &rarr; Customize</strong> to set your company phone, email, and color preferences.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
