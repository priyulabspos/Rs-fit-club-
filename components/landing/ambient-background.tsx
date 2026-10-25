'use client';

import React from 'react';

export function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle athletic dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#141414_1px,transparent_1px)] [background-size:24px_24px]"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)',
        }}
      />

      {/* Floating ambient energy orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />
    </div>
  );
}
