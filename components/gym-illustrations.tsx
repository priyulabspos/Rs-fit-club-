import React from 'react';

// Realistic Olympic 20KG Bumper Plate SVG
export function OlympicPlate({
  size = 120,
  weight = '20',
  unit = 'KG',
  color = '#d7262e',
  className = '',
}: {
  size?: number;
  weight?: string;
  unit?: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`drop-shadow-2xl select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer Rubber Rim Gradient */}
        <radialGradient id="plateRim" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#1e1e24" />
          <stop offset="90%" stopColor="#121215" />
          <stop offset="100%" stopColor="#08080a" />
        </radialGradient>

        {/* Inner Color Hub Gradient */}
        <radialGradient id="plateHub" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} />
          <stop offset="70%" stopColor="#8c1218" />
          <stop offset="100%" stopColor="#59080c" />
        </radialGradient>

        {/* Steel Center Bushing */}
        <linearGradient id="steelBushing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="25%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="75%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Outer Plate Body */}
      <circle cx="100" cy="100" r="96" fill="url(#plateRim)" stroke="#383842" strokeWidth="3" />

      {/* Textured Outer Ridge */}
      <circle cx="100" cy="100" r="88" fill="none" stroke="#2a2a33" strokeWidth="2" strokeDasharray="6 3" />

      {/* Inner Raised Ring */}
      <circle cx="100" cy="100" r="76" fill="url(#plateHub)" stroke="#3f080b" strokeWidth="2" />

      {/* Subtle Depth Groove */}
      <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Center Steel Hub */}
      <circle cx="100" cy="100" r="32" fill="url(#steelBushing)" filter="url(#shadow)" />
      {/* Center Barbell Bore Hole (50mm standard Olympic) */}
      <circle cx="100" cy="100" r="16" fill="#08080a" stroke="#475569" strokeWidth="2" />

      {/* Plate Embossed Typography */}
      <text
        x="100"
        y="45"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="12"
        letterSpacing="3"
        opacity="0.9"
      >
        RS FIT CLUB
      </text>

      {/* Weight Value */}
      <text
        x="100"
        y="148"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="18"
        letterSpacing="1"
      >
        {weight} {unit}
      </text>

      {/* Olympic spec mark */}
      <text
        x="100"
        y="162"
        textAnchor="middle"
        fill="rgba(255,255,255,0.6)"
        fontFamily="sans-serif"
        fontWeight="700"
        fontSize="8"
        letterSpacing="2"
      >
        OLYMPIC COMP
      </text>
    </svg>
  );
}

// Realistic Hex Dumbbell SVG
export function HexDumbbell({
  size = 140,
  weight = '25 KG',
  className = '',
}: {
  size?: number;
  weight?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 220 120"
      className={`drop-shadow-2xl select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cast Iron Texture Gradient */}
        <linearGradient id="ironGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#32323a" />
          <stop offset="40%" stopColor="#222227" />
          <stop offset="80%" stopColor="#16161a" />
          <stop offset="100%" stopColor="#0c0c0e" />
        </linearGradient>

        {/* Chrome Knurled Handle Gradient */}
        <linearGradient id="chromeKnurl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="25%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="75%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Chrome Steel Handle */}
      <rect x="55" y="48" width="110" height="24" rx="4" fill="url(#chromeKnurl)" stroke="#475569" strokeWidth="1" />

      {/* Handle Knurling Grip Texture Pattern */}
      <line x1="75" y1="48" x2="75" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="85" y1="48" x2="85" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="95" y1="48" x2="95" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="105" y1="48" x2="105" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="115" y1="48" x2="115" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="125" y1="48" x2="125" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="135" y1="48" x2="135" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="145" y1="48" x2="145" y2="72" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

      {/* Left Hex Head Body */}
      <polygon
        points="10,32 46,12 56,60 46,108 10,88 2,60"
        fill="url(#ironGrad)"
        stroke="#4a4a56"
        strokeWidth="2"
      />
      {/* Left Head Facet Highlight */}
      <polygon points="10,32 46,12 36,60 2,60" fill="rgba(255,255,255,0.08)" />

      {/* Left Head Weight Stamp */}
      <text
        x="24"
        y="65"
        textAnchor="middle"
        fill="#e2e8f0"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="11"
        transform="rotate(-90 24 65)"
      >
        {weight}
      </text>

      {/* Right Hex Head Body */}
      <polygon
        points="174,12 210,32 218,60 210,88 174,108 164,60"
        fill="url(#ironGrad)"
        stroke="#4a4a56"
        strokeWidth="2"
      />
      {/* Right Head Facet Highlight */}
      <polygon points="174,12 210,32 198,60 164,60" fill="rgba(255,255,255,0.08)" />

      {/* Right Head RS Stamp */}
      <text
        x="194"
        y="65"
        textAnchor="middle"
        fill="#ff4d56"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="11"
        transform="rotate(90 194 65)"
      >
        RS
      </text>
    </svg>
  );
}

// Loaded Olympic Barbell Rack Illustration
export function LoadedBarbell({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-4 ${className}`}>
      {/* Barbell Steel Shaft */}
      <div className="w-full h-3 bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 rounded-full shadow-lg relative flex items-center justify-between px-6">
        {/* Left Loaded Plates Cluster */}
        <div className="flex items-center -space-x-3 -ml-4">
          <div className="w-4 h-24 bg-[#d7262e] border border-red-950 rounded-sm shadow-xl z-30"></div>
          <div className="w-4 h-24 bg-[#1e1e24] border border-gray-900 rounded-sm shadow-xl z-20"></div>
          <div className="w-3.5 h-20 bg-blue-600 border border-blue-950 rounded-sm shadow-xl z-10"></div>
          <div className="w-3 h-16 bg-yellow-500 border border-yellow-950 rounded-sm shadow-xl"></div>
          {/* Collar Clip */}
          <div className="w-2.5 h-7 bg-gray-400 border border-gray-600 rounded"></div>
        </div>

        {/* Center Knurling Grips */}
        <div className="flex gap-16 opacity-60">
          <div className="w-16 h-2.5 bg-gray-600 border-x border-gray-400"></div>
          <div className="w-16 h-2.5 bg-gray-600 border-x border-gray-400"></div>
        </div>

        {/* Right Loaded Plates Cluster */}
        <div className="flex items-center -space-x-3 -mr-4 flex-row-reverse">
          <div className="w-4 h-24 bg-[#d7262e] border border-red-950 rounded-sm shadow-xl z-30"></div>
          <div className="w-4 h-24 bg-[#1e1e24] border border-gray-900 rounded-sm shadow-xl z-20"></div>
          <div className="w-3.5 h-20 bg-blue-600 border border-blue-950 rounded-sm shadow-xl z-10"></div>
          <div className="w-3 h-16 bg-yellow-500 border border-yellow-950 rounded-sm shadow-xl"></div>
          {/* Collar Clip */}
          <div className="w-2.5 h-7 bg-gray-400 border border-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}
