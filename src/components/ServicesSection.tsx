import React from 'react';
import { Phone, Settings, Wrench, ArrowRight, Shield, Zap, Clock, Activity } from 'lucide-react';
import { ServiceItem, PagesContentState } from '../types';
import { SERVICES_DATA } from '../data/themeData';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  services?: ServiceItem[];
  content?: PagesContentState['services'];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuoteModal,
  services = [],
  content,
}) => {
  const allServices = services && services.length > 0 ? services : SERVICES_DATA;

  const getIcon = (iconName: string, id: string) => {
    switch (iconName?.toLowerCase() || id) {
      case 'phone':
      case 'emergency':
        return Phone;
      case 'settings':
      case 'maintenance':
        return Settings;
      case 'wrench':
      case 'installation':
        return Wrench;
      case 'shield':
      case 'soundproof':
        return Shield;
      case 'zap':
      case 'synchronization':
        return Zap;
      default:
        return Wrench;
    }
  };

  const title = content?.title || 'Our Comprehensive Services';
  const subtitle = content?.subtitle || 'From installation to maintenance, we provide complete support services to keep your power systems running at peak performance.';

  return (
    <section id="services" className="py-16 sm:py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Services Cards Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {allServices.slice(0, 6).map((srv) => {
            const IconComponent = getIcon(srv.icon, srv.id);
            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Blue Circular Icon Container */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-sky-500 mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-9 h-9 stroke-[2.2]" />
                </div>

                <h3 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-3">
                  {srv.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                  {srv.description}
                </p>

                {/* Learn More Outline Button */}
                <button
                  onClick={() => onOpenQuoteModal(`Service: ${srv.title}`)}
                  className="px-5 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white font-medium text-xs transition cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            );
          })}
        </div>

        {/* Center CTA Button matching Screenshot 2 */}
        <div className="text-center mt-12">
          <button
            onClick={() => onOpenQuoteModal('Comprehensive Service Consultation')}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Request Service Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
};
