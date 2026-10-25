import React from 'react';
import { ArrowRight, ShieldCheck, Flame, Users, Clock, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fcfbf9] via-[#f7f3ee] to-[#f4eee6] py-12 sm:py-20 lg:py-24 border-b border-stone-200">
      {/* Decorative background grid and accent */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#141414_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-16 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Giant 'RS' Athletic Watermark */}
      <div
        className="absolute -right-6 -bottom-10 select-none pointer-events-none z-0 hidden md:block font-black italic text-[28vw] leading-none text-transparent"
        style={{
          WebkitTextStroke: '2px rgba(215, 38, 46, 0.06)',
          fontFamily: '"Barlow Condensed", Impact, sans-serif',
        }}
        aria-hidden="true"
      >
        RS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-[#d7262e] text-[11px] sm:text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#d7262e] shrink-0" />
              <span>Welcoming All Fitness Levels · No Ego Zone</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-stone-900 leading-[1.02] sm:leading-[0.95]">
              Build Strength. <br />
              <span className="text-[#d7262e]">Build Confidence.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A premium, hygienic training floor, certified coaches, and transparent plans that fit your routine. 
              Start where you are today — we’ll give you the guidance and equipment to reach your peak.
            </p>

            {/* CTAs: Full width on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-[#d7262e] hover:bg-[#b01b22] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 touch-manipulation min-h-[48px]"
              >
                <span>Explore Plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all touch-manipulation min-h-[48px]"
              >
                <span>Book a Free Tour</span>
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-stone-200/80 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#d7262e] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Biometric Gate Access</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#d7262e] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Certified Trainers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#d7262e] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Open 6 AM - 10 PM</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl bg-stone-900 p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-stone-800">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Flame className="w-36 h-36 sm:w-44 sm:h-44 text-white" />
                </div>

                <div className="relative space-y-5 sm:space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3 sm:pb-4">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#d7262e]">
                      Gym Highlights
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Gym Floor: Active
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-950/80 text-[#d7262e] shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wide text-white">Full Strength & Turf Arena</h4>
                        <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Heavy barbells, power racks, kettlebells, and functional turf track.</p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-950/80 text-[#d7262e] shrink-0">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wide text-white">Fast Biometric Entry</h4>
                        <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Seamless turnstile entry for active members. No queues, instant verification.</p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-950/80 text-[#d7262e] shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wide text-white">Clean & Sanitized Floor</h4>
                        <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Air-conditioned environment, executive lockers, and spotless hygiene standards.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="block text-center w-full py-3.5 rounded-xl bg-[#d7262e] hover:bg-[#b01b22] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md min-h-[44px] flex items-center justify-center touch-manipulation"
                    >
                      Enquire For Membership
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
