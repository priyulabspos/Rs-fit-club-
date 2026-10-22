import React from 'react';
import { ArrowRight, ShieldCheck, Flame, Users, Clock, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f3ee] py-16 sm:py-24 border-b border-stone-200">
      {/* Decorative background grid and accent */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#141414_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-[#d7262e] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-[#d7262e]" />
              <span>Welcoming All Fitness Levels · No Ego Zone</span>
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-stone-900 leading-[0.95]">
              Build Strength. <br />
              <span className="text-[#d7262e]">Build Confidence.</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed font-normal">
              A premium, hygienic training floor, certified coaches, and transparent plans that fit your routine. 
              Start where you are today — we’ll give you the guidance and equipment to reach your peak.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#d7262e] hover:bg-[#b01b22] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-extrabold text-sm uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Book a Free Tour</span>
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200/80">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#d7262e] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Biometric Gate Access</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#d7262e] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Certified Trainers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#d7262e] shrink-0" />
                <span className="text-xs font-semibold text-stone-700">Open 6 AM - 10 PM</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl bg-stone-900 p-8 text-white shadow-2xl relative overflow-hidden border border-stone-800">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Flame className="w-44 h-44 text-white" />
                </div>

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#d7262e]">
                      Gym Highlights
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Gym Status: Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-950/80 text-[#d7262e]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wide text-white">Full Strength & Turf Arena</h4>
                        <p className="text-xs text-stone-400 mt-0.5">Heavy barbells, power racks, kettlebells, and functional turf track.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-950/80 text-[#d7262e]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wide text-white">Fast Biometric Entry</h4>
                        <p className="text-xs text-stone-400 mt-0.5">Seamless turnstile entry for active members. No queues, instant verification.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-950/80 text-[#d7262e]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wide text-white">Clean & Sanitized Floor</h4>
                        <p className="text-xs text-stone-400 mt-0.5">Air-conditioned environment, executive lockers, and spotless hygiene standards.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="block text-center w-full py-3.5 rounded-xl bg-[#d7262e] hover:bg-[#b01b22] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
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
