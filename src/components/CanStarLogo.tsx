import React from 'react';

interface CanStarLogoProps {
  className?: string;
  height?: number | string;
  showSubtitle?: boolean;
}

export const CanStarLogo: React.FC<CanStarLogoProps> = ({
  className = 'h-10 w-auto',
  showSubtitle = true,
}) => {
  return (
    <div className={`inline-flex items-center select-none gap-2 ${className}`}>
      {/* Star Icon Badge */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-amber-400 shadow-md">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <span className="font-['Outfit'] font-black text-sm sm:text-base tracking-wider text-[#0A192F] leading-none">
          CAN STAR POWER TECH
        </span>
        {showSubtitle && (
          <span className="text-[9px] font-bold tracking-widest text-blue-600 uppercase mt-0.5">
            Engineering Power Solutions
          </span>
        )}
      </div>
    </div>
  );
};
