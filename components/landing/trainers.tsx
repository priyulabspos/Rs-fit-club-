import React from 'react';
import { Award, UserCheck } from 'lucide-react';

export function Trainers() {
  const trainers = [
    {
      name: 'Vikram Singh',
      role: 'Head Strength & Conditioning Coach',
      experience: '9+ Years Experience',
      certification: 'CSCS · Olympic Weightlifting L2',
      specialty: 'Barbell mechanics, powerlifting prep, progressive overload cycles.',
    },
    {
      name: 'Rohan Sharma',
      role: 'Senior Functional & HIIT Trainer',
      experience: '6+ Years Experience',
      certification: 'ACE Certified · Kettlebell Athletics',
      specialty: 'Metabolic conditioning, athletic speed, agility & cardiovascular health.',
    },
    {
      name: 'Ananya Roy',
      role: 'Transformation & Nutrition Coach',
      experience: '7+ Years Experience',
      certification: 'ISSA Master Trainer · Sports Nutritionist',
      specialty: 'Body recomposition, sustainable macro tracking, female fitness.',
    },
  ];

  return (
    <section id="trainers" className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e]">
            Expert Guidance
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900">
            Meet Our Certified Coaches
          </h2>
          <p className="text-stone-600 text-sm sm:text-lg">
            Dedicated professionals committed to your form, safety, and sustainable progress on the floor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {trainers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-[#fcfbf9] border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-5 sm:p-8 space-y-3 sm:space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-100/70 border border-red-200 text-[#d7262e] flex items-center justify-center font-bold">
                  <UserCheck className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-900">
                    {t.name}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#d7262e] mt-0.5">
                    {t.role}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 bg-white px-2.5 py-1 rounded border border-stone-200">
                    <Award className="w-3 h-3 text-[#d7262e]" />
                    {t.certification}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-600 bg-white px-2.5 py-1 rounded border border-stone-200">
                    {t.experience}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  {t.specialty}
                </p>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-200/80">
                <a
                  href="#contact"
                  className="block text-center text-xs font-extrabold uppercase tracking-wider text-stone-800 hover:text-[#d7262e] py-2 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Book Consultation with {t.name.split(' ')[0]} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
