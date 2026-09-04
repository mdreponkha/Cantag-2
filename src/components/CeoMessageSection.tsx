import React from 'react';
import ceoDefaultPhoto from '../assets/images/ceo_portrait_1788333155823.jpg';
import { PagesContentState } from '../types';

interface CeoMessageSectionProps {
  content?: PagesContentState['ceoMessage'];
}

export const CeoMessageSection: React.FC<CeoMessageSectionProps> = ({ content }) => {
  const displayPhoto = content?.photoUrl && content.photoUrl.trim() !== '' ? content.photoUrl : ceoDefaultPhoto;
  const displayName = content?.name || 'Nurun Nabi Chowdhury';
  const displayDesignation = content?.designation || 'CEO - Chief executive officer';
  const paragraphs = content?.paragraphs && content.paragraphs.length > 0 ? content.paragraphs : [
    "I feel privileged to be writing this message as the Chief Executive Officer. For the entrepreneurs out there, you know how much it takes to get here. I am grateful for all the love, support and understanding we receive constantly; it's with the motivation that our well-wishers provide us that we are at such a great place today.",
    "We made commitments towards providing exceptional delivery in an insightful manner to the industry and along the way, have strengthened our core values towards ensuring quality in everything we do, guidance by example, honesty and simplicity and a focus on an excellent culture that passes on to our clients and teams.",
    "Looking ahead, we are focused on accelerating the execution of our expansion strategy while abiding to build on the strength of our brand in helping our clients share knowledge and create innovation, and in bringing positive change to the communities in which we work and live. I am incredibly excited about this journey and truly believe the best is yet to come.",
    "Our group companies have a long and proud history of being responsible employers, operating in a principled and disciplined manner. We are dedicated to attracting, developing and retaining an engaged and diverse workforce who are united in the pursuit of our strategies and goals."
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* Blue Top Title Banner matching Screenshot 2 */}
      <div className="bg-[#1266F1] py-10 sm:py-14 text-center text-white shadow-inner">
        <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl tracking-widest uppercase text-white">
          CEO MESSAGE
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-sm w-full">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-slate-100 relative">
                <img
                  src={displayPhoto}
                  alt={`${displayName} - ${displayDesignation}`}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== ceoDefaultPhoto) {
                      target.src = ceoDefaultPhoto;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Message Letter */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="leading-loose text-justify">
                {p}
              </p>
            ))}

            {/* Signature Block */}
            <div className="pt-6 border-t border-slate-200 mt-8">
              <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 leading-tight">
                {displayName}
              </h3>
              <p className="text-sm font-medium text-slate-500 mb-3">
                {displayDesignation}
              </p>

              {/* Signature Graphic */}
              <div className="w-48 h-14 flex items-center">
                <svg viewBox="0 0 240 60" className="w-full h-full text-slate-800">
                  <path
                    d="M10 45 Q 25 15, 45 40 T 75 25 Q 95 50, 120 20 T 160 30 Q 185 15, 215 35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
