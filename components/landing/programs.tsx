import React from 'react';
import { ArrowUpRight, Dumbbell, Zap, Heart, UserCheck } from 'lucide-react';

export function Programs() {
  const programs = [
    {
      title: 'Strength & Conditioning',
      subtitle: 'Barbell fundamentals & progressive load',
      desc: 'Master the core compound movements: squat, bench, deadlift, and overhead press. Structured cycles to build raw strength and joint resilience.',
      intensity: 'High Intensity',
      icon: Dumbbell,
      planTag: 'Strength',
    },
    {
      title: 'Muscle Building (Hypertrophy)',
      subtitle: 'Targeted volume for lean mass',
      desc: 'Smart training splits focusing on time under tension, mechanical tension, and metabolic conditioning for balanced muscular development.',
      intensity: 'Moderate-High',
      icon: Zap,
      planTag: 'Monthly Standard',
    },
    {
      title: 'General Fitness & Fat Loss',
      subtitle: 'Cardiovascular health & agility',
      desc: 'A blend of resistance training, metabolic circuits, and mobility drills to strip body fat, boost stamina, and feel energetic throughout your day.',
      intensity: 'All Levels',
      icon: Heart,
      planTag: 'Monthly Standard',
    },
    {
      title: '1-on-1 Personal Coaching',
      subtitle: 'Custom roadmap & nutrition blueprint',
      desc: 'Dedicated trainer by your side for every rep. Includes personalized weekly meal plans, regular body fat scans, and direct accountability.',
      intensity: 'Personalized',
      icon: UserCheck,
      planTag: 'Annual Elite',
    },
  ];

  return (
    <section id="programs" className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e]">
              Guided Training Paths
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900">
              Programs Built for Every Objective
            </h2>
            <p className="text-stone-600 text-sm sm:text-lg">
              No generic routines. Pick a track tailored to your current fitness level and target outcome.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#d7262e] hover:text-[#a81a21] border-b-2 border-[#d7262e] pb-1 self-start md:self-auto min-h-[44px]"
          >
            <span>Need advice? Speak to a head coach</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.title}
                className="rounded-2xl bg-[#fcfbf9] border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-400 hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-[#d7262e] flex items-center justify-center group-hover:bg-[#d7262e] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                      {prog.intensity}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xl uppercase text-stone-900 group-hover:text-[#d7262e] transition-colors">
                    {prog.title}
                  </h3>
                  <div className="text-xs font-semibold text-stone-500 mt-1 mb-4">
                    {prog.subtitle}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200/70">
                  <a
                    href={`#contact?plan=${encodeURIComponent(prog.planTag)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-[#d7262e] transition-colors"
                  >
                    <span>Enquire for this program</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
