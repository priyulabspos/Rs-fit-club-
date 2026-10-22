import React from 'react';
import { ShieldCheck, Smartphone, Sparkles, Clock, Check } from 'lucide-react';

export function WhyUs() {
  const points = [
    {
      title: 'Biometric Turnstile Security',
      desc: 'Seamless fingerprint verification directly linked to your membership validity. Zero delays, maximum safety.',
      icon: ShieldCheck,
    },
    {
      title: 'Digital Member Portal',
      desc: 'Track your validity dates, download official GST fee receipts, view entry history, and manage renewals from your phone.',
      icon: Smartphone,
    },
    {
      title: 'No Crowding Cap',
      desc: 'We monitor active floor capacity so you always have access to dumbbells, racks, and benches without excessive queueing.',
      icon: Clock,
    },
    {
      title: 'Hospital-Grade Hygiene',
      desc: 'Equipment wiped down throughout the day, air conditioning with continuous fresh air circulation, and pristine locker suites.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 bg-[#f7f3ee] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e]">
              The RS Fit Club Difference
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900 leading-tight">
              Technology & Training In <span className="text-[#d7262e]">Harmonious Sync.</span>
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              We replaced outdated manual registers and chaotic desk queues with an integrated, intelligent gym management system. 
              Everything from your payment receipt to your door access is automated and transparent.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Instant payment receipts issued directly to your portal',
                'Emergency exit and fire safety certified lock release',
                'Transparent validity extension: you never lose days for early renewal',
                'Friendly desk support available during all training hours',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs font-semibold text-stone-700">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-[#d7262e] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl bg-white p-6 border border-stone-200 shadow-sm space-y-3 hover:border-stone-400 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-900 text-[#d7262e] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base uppercase text-stone-900">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
