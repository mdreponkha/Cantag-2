import React from 'react';
import mdDefaultPhoto from '../assets/images/md_portrait_1788333137820.jpg';
import { PagesContentState } from '../types';

interface MdMessageSectionProps {
  content?: PagesContentState['mdMessage'];
}

export const MdMessageSection: React.FC<MdMessageSectionProps> = ({ content }) => {
  const displayPhoto = content?.photoUrl && content.photoUrl.trim() !== '' ? content.photoUrl : mdDefaultPhoto;
  const displayName = content?.name || 'Hossain Mohammad Kawsar';
  const displayDesignation = content?.designation || 'Managing Director';
  const paragraphs = content?.paragraphs && content.paragraphs.length > 0 ? content.paragraphs : [
    'We are happy to declare that Our valuable clients are the main asset of our company. Our wise clients are the mirror of our company. We respectfully analysis the feedback from our client. ‘Professionalism’ is the key work for success to us. We at “CAN STAR POWER TECH” are determined to play a leading role in the development of POWER SECTOR sector . Over the past eight years we have worked towards building a strong foundation and establishing a professional corporate identity for our company. Today, in the field of alternative power development sector CAN STAR POWER TECH is respected for its achievements, professional ethics and innovative concepts.',
    'Our corporate philosophy is however based on a very simple principle “Give the customer value for money”. To this end, we are constantly working towards upgrading and improving every aspect of our activity.',
    'Today CAN STAR POWER TECH is poised for a new phase of dynamic growth. Our human resource is well trained and motivated; our financial Fundamentals are strong, and we have an excellent goodwill in the market. Our vision is to constantly set challenging goals for ourselves. We will continue to expand and diversify and be an example of a progressive company.'
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* Blue Top Title Banner matching Screenshot 1 */}
      <div className="bg-[#1266F1] py-10 sm:py-14 text-center text-white shadow-inner">
        <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl tracking-widest uppercase text-white">
          MD MESSAGE
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
                    if (target.src !== mdDefaultPhoto) {
                      target.src = mdDefaultPhoto;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Message Letter */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
            <p className="font-semibold text-slate-900 text-base">
              Dear all
            </p>

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
                    d="M10 40 Q 30 10, 50 35 T 90 25 Q 120 45, 140 20 T 180 35 L 210 38 M 30 35 Q 80 50, 160 48"
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
