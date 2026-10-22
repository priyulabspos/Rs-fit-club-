import React from 'react';
import { Target, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e]">
              About RS Fit Club
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900 leading-tight">
              A Gym Built For Real Progress, <span className="text-[#d7262e]">Not Just Mirrors.</span>
            </h2>

            <p className="text-sm sm:text-lg text-stone-600 leading-relaxed font-normal">
              RS Fit Club was founded on a simple belief: fitness should be straightforward, honest, and accessible. 
              Whether you are picking up a barbell for the very first time or training for your next personal record, 
              we provide the environment, the equipment, and the support to make every workout count.
            </p>

            <div className="space-y-3.5 sm:space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d7262e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase">Olympic-Grade Equipment</h4>
                  <p className="text-xs sm:text-sm text-stone-600">Calibrated bumper plates, rigid power cages, and professional dumbells up to 50 kg.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d7262e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase">Form-First Coaching</h4>
                  <p className="text-xs sm:text-sm text-stone-600">Our certified trainers ensure you lift safely and progress steadily, avoiding burnout or injury.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d7262e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase">Clean, Hygienic & Air-Conditioned</h4>
                  <p className="text-xs sm:text-sm text-stone-600">Sanitized daily with executive locker rooms, showers, and dedicated hydration zones.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Values Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f3ee] border border-stone-200/80 space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#d7262e] flex items-center justify-center shadow-sm">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-base sm:text-lg uppercase text-stone-900">Clear Milestones</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Structured strength cycles, progressive overload, and regular body composition assessments.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f3ee] border border-stone-200/80 space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#d7262e] flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-base sm:text-lg uppercase text-stone-900">Zero Wait Access</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Integrated biometric turnstile gates ensure exclusive access for active members with zero hassle.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f3ee] border border-stone-200/80 space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#d7262e] flex items-center justify-center shadow-sm">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-base sm:text-lg uppercase text-stone-900">No Hard Selling</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Honest pricing with transparent rules. No hidden maintenance charges or surprise renewal fees.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900 text-white space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d7262e]">Join The Community</span>
                <h3 className="font-bold text-base sm:text-lg uppercase text-white mt-1">Ready to start?</h3>
                <p className="text-xs text-stone-400 mt-1">
                  Schedule a tour today to inspect our training floor and discuss your fitness goals.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-block text-center py-3 px-4 rounded-lg bg-[#d7262e] hover:bg-[#b01b22] text-white text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] flex items-center justify-center"
              >
                Schedule A Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
