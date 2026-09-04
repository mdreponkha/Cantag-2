import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem, PagesContentState } from '../types';
import { PROJECTS_DATA } from '../data/themeData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuoteModal: (projectName?: string) => void;
  projects?: ProjectItem[];
  content?: PagesContentState['projects'];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenQuoteModal,
  projects: customProjects,
  content,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Base list of projects: either from custom projects or fallback
  const sourceProjects: ProjectItem[] = (customProjects && customProjects.length > 0)
    ? customProjects
    : PROJECTS_DATA;

  // Projects mapped for display
  const allProjects = sourceProjects.map((p, idx) => {
    let logoType = 'default';
    const lower = (p.title + ' ' + p.client).toLowerCase();
    if (lower.includes('bashundhara')) logoType = 'bashundhara';
    else if (lower.includes('united')) logoType = 'united';
    else if (lower.includes('hameem') || lower.includes('ha-meem')) logoType = 'hameem';
    else if (lower.includes('rupayan')) logoType = 'rupayan';
    else if (lower.includes('square')) logoType = 'square';
    else if (lower.includes('beximco')) logoType = 'beximco';

    return {
      id: p.id || `proj-${idx}`,
      title: p.title,
      subtitle: `${p.capacity} • ${p.client}`,
      client: p.client,
      category: p.category || 'Engineering',
      imageUrl: p.imageUrl,
      logoType,
      rawProject: p,
    };
  });

  const totalPages = Math.max(1, Math.ceil(allProjects.length / itemsPerPage));

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const currentProjects = allProjects.slice(startIndex, startIndex + itemsPerPage);

  const renderProjectCardTop = (proj: typeof allProjects[0]) => {
    if (proj.imageUrl && proj.imageUrl.trim()) {
      return (
        <div className="w-full h-44 bg-slate-900 overflow-hidden relative border-b border-slate-100">
          <img
            src={proj.imageUrl}
            alt={proj.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
        </div>
      );
    }

    return renderProjectLogo(proj.logoType, proj.title);
  };

  const renderProjectLogo = (logoType: string, title: string) => {
    switch (logoType) {
      case 'bashundhara':
        return (
          <div className="w-full h-44 bg-slate-50 flex flex-col items-center justify-center p-6 border-b border-slate-100">
            {/* 3G stylized Bashundhara logo */}
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl font-black text-red-600 tracking-tighter transform -skew-x-6">3</span>
              <span className="text-4xl font-black text-slate-700 tracking-tighter">G</span>
            </div>
            <div className="mt-2 text-center">
              <span className="font-extrabold text-[12px] uppercase tracking-wider text-slate-900 block leading-tight">
                BASHUNDHARA GROUP
              </span>
              <span className="text-[9px] italic text-slate-500 font-serif block">
                For the People, for the Country
              </span>
            </div>
          </div>
        );

      case 'united':
        return (
          <div className="w-full h-44 bg-slate-50 flex flex-col items-center justify-center p-6 border-b border-slate-100">
            {/* United Group Orange U logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-10 h-10">
                  <path
                    d="M20 20 L20 60 C20 80 40 85 50 85 C60 85 80 80 80 60 L80 20"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <path
                    d="M36 25 L36 58 C36 70 45 73 50 73 C55 73 64 70 64 58 L64 25"
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-['Outfit'] font-black text-lg tracking-wider text-slate-900 leading-none">
                  UNITED
                </span>
                <span className="font-['Outfit'] font-bold text-sm tracking-widest text-slate-700 leading-tight">
                  GROUP
                </span>
              </div>
            </div>
          </div>
        );

      case 'hameem':
        return (
          <div className="w-full h-44 bg-[#1E2530] flex flex-col items-center justify-center p-6 border-b border-slate-700 relative overflow-hidden">
            {/* Ha-Meem corporate facade background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
            <div className="relative z-10 text-center">
              <span className="font-['Outfit'] font-black text-xl tracking-[0.25em] text-white block uppercase drop-shadow">
                HA-MEEM
              </span>
              <span className="font-['Outfit'] font-bold text-sm tracking-[0.4em] text-blue-200 block uppercase mt-0.5 drop-shadow">
                GROUP
              </span>
            </div>
          </div>
        );

      case 'rupayan':
        return (
          <div className="w-full h-44 bg-slate-50 flex flex-col items-center justify-center p-6 border-b border-slate-100">
            <span className="font-['Outfit'] font-black text-2xl text-blue-900 tracking-wider">
              RUPAYAN
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-600 tracking-widest mt-1">
              BUILDING TRUST
            </span>
          </div>
        );

      case 'square':
        return (
          <div className="w-full h-44 bg-slate-50 flex flex-col items-center justify-center p-6 border-b border-slate-100">
            <div className="w-10 h-10 bg-red-600 text-white font-black text-xl flex items-center justify-center mb-2 shadow">
              S
            </div>
            <span className="font-['Outfit'] font-black text-base text-slate-900 tracking-wider">
              SQUARE GROUP
            </span>
          </div>
        );

      default:
        return (
          <div className="w-full h-44 bg-slate-50 flex flex-col items-center justify-center p-6 border-b border-slate-100">
            <span className="font-['Outfit'] font-black text-xl text-slate-800">
              {title}
            </span>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50 text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 4 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight">
            {content?.title || 'Our Recent Projects'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {content?.subtitle || 'Discover some of our latest successful power generation installations across various industries and locations worldwide.'}
          </p>
        </div>

        {/* 3 Project Cards with Navigation Arrows matching Screenshot 4 */}
        <div className="relative">
          
          {/* Left Arrow */}
          <button
            onClick={prevPage}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-blue-600 hover:text-blue-800 hover:bg-slate-50 shadow-lg border border-slate-200 flex items-center justify-center transition cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextPage}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-blue-600 hover:text-blue-800 hover:bg-slate-50 shadow-lg border border-slate-200 flex items-center justify-center transition cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {currentProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Graphic Logo / Photo Banner */}
                  {renderProjectCardTop(proj)}

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Button matching Screenshot 4 */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      if (proj.rawProject) {
                        onSelectProject(proj.rawProject);
                      }
                    }}
                    className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
