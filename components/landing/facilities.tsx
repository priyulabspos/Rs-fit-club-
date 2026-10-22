import React from 'react';
import { Dumbbell, Activity, Compass, Users2, KeyRound, Lock } from 'lucide-react';

export function Facilities() {
  const facilities = [
    {
      title: 'Strength & Powerlifting Floor',
      description: 'Olympic lifting platforms, competition bench presses, heavy duty power cages, and rubber-coated dumbbells ranging from 2.5 kg to 50 kg.',
      icon: Dumbbell,
      tag: 'Heavy Zone',
    },
    {
      title: 'Cardio Endurance Arena',
      description: 'High-performance commercial treadmills, curved self-powered runners, air assault bikes, Concept2 rowers, and elliptical trainers with heart-rate tracking.',
      icon: Activity,
      tag: 'Stamina',
    },
    {
      title: 'Functional Turf Track',
      description: '25-meter sled turf track, heavy prowlers, battle ropes, plyometric soft boxes, Bulgarian bags, and kettlebells for dynamic conditioning.',
      icon: Compass,
      tag: 'Agility',
    },
    {
      title: 'Personal Training Studio',
      description: 'Dedicated 1-on-1 coaching bays equipped with posture assessment tools, resistance bands, and specialized biomechanical machines.',
      icon: Users2,
      tag: 'Coaching',
    },
    {
      title: 'Biometric Turnstile Access',
      description: 'Zero-wait automated door gate security linked directly with your active membership. Instant verification through fingerprint scanner.',
      icon: KeyRound,
      tag: 'Smart Gate',
    },
    {
      title: 'Executive Lockers & Showers',
      description: 'Clean, sanitized changing rooms with individual lockers, hot and cold showers, vanity mirrors, and dedicated daily maintenance.',
      icon: Lock,
      tag: 'Hygiene',
    },
  ];

  return (
    <section id="facilities" className="py-20 bg-[#f7f3ee] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e]">
            World-Class Infrastructure
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900">
            Training Facilities & Equipment
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Designed to ensure no waiting for weights and providing a spacious, focused atmosphere for every session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-8 border border-stone-200/80 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#d7262e] group-hover:bg-[#d7262e] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-stone-100 text-stone-700">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase text-stone-900 mb-3 group-hover:text-[#d7262e] transition-colors">
                  {f.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
