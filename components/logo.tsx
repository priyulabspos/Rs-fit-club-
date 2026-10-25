import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', size = 'md', variant = 'dark' }: LogoProps) {
  const dimensions = {
    sm: { box: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs' },
    xl: { box: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm' },
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dynamic Emblem Graphic */}
      <div
        className={`${dimensions.box} relative flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#d7262e] via-[#b01b22] to-[#800e13] shadow-md shadow-red-500/20 text-white font-extrabold overflow-hidden`}
      >
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-2">
            <polygon points="50,5 95,28 95,72 50,95 5,72 5,28" />
            <line x1="50" y1="5" x2="50" y2="95" />
          </svg>
        </div>
        {/* RS Monogram */}
        <span className="relative z-10 font-black italic tracking-tighter text-white select-none">
          RS
        </span>
      </div>

      <div>
        <div
          className={`font-black italic tracking-wider uppercase leading-none font-sans ${dimensions.text} ${
            isDark ? 'text-[#121212]' : 'text-white'
          }`}
        >
          RS FIT CLUB
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d7262e] animate-pulse"></span>
          <span
            className={`font-bold uppercase tracking-widest ${dimensions.sub} ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Strength & Fitness
          </span>
        </div>
      </div>
    </div>
  );
}
