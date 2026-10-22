'use client';

import React from 'react';
import { Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface PlanData {
  id: string;
  name: string;
  durationDays: number;
  priceInPaise: number;
  joiningFeeInPaise: number;
  description: string | null;
}

interface PlansProps {
  plans: PlanData[];
  onSelectPlan?: (planName: string) => void;
}

export function Plans({ plans, onSelectPlan }: PlansProps) {
  // Default features based on plan duration
  const getFeatures = (durationDays: number) => {
    if (durationDays <= 31) {
      return [
        'Full training floor & strength zone access',
        'Cardio & endurance equipment suite',
        'Biometric turnstile gate access',
        'Individual locker & shower access',
        'Standard mobile member portal account',
      ];
    } else if (durationDays <= 100) {
      return [
        'Everything included in Monthly Standard',
        'Quarterly body composition & posture scan',
        'Customized workout split template',
        'Basic dietary guidance consultation',
        'Biometric gate pass with zero waiting',
      ];
    } else {
      return [
        'All facilities & round-the-clock priority',
        '2 Complimentary 1-on-1 personal trainer sessions',
        'Quarterly nutrition & macro plan adjustment',
        'Guest pass access (2 guest entries / quarter)',
        'Highest savings per month',
      ];
    }
  };

  const handlePlanClick = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="plans" className="py-20 bg-[#f7f3ee] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e]">
            Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900">
            Membership Plans
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Straightforward pricing with zero hidden charges. Choose the duration that best fits your commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => {
            const price = Math.round(p.priceInPaise / 100);
            const isPopular = idx === 1 || p.durationDays === 90;
            const features = getFeatures(p.durationDays);

            return (
              <div
                key={p.id}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                  isPopular
                    ? 'bg-stone-900 text-white shadow-2xl border-2 border-[#d7262e] transform md:-translate-y-2'
                    : 'bg-white text-stone-900 border border-stone-200 shadow-sm hover:shadow-md'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d7262e] text-white text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-2xl font-extrabold uppercase ${isPopular ? 'text-white' : 'text-stone-900'}`}>
                        {p.name}
                      </h3>
                      <p className={`text-xs mt-1 ${isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                        Validity: {p.durationDays} Days
                      </p>
                    </div>
                  </div>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">₹</span>
                      <span className="text-5xl font-extrabold tracking-tight">
                        {price.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-xs uppercase font-medium ml-1 ${isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                        {p.durationDays === 30 ? '/ month' : p.durationDays === 90 ? '/ 3 months' : '/ year'}
                      </span>
                    </div>

                    {p.joiningFeeInPaise > 0 ? (
                      <span className={`text-[11px] block mt-1 ${isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                        + ₹{p.joiningFeeInPaise / 100} One-time joining fee
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-500 font-semibold block mt-1">
                        Zero Joining Fee Included
                      </span>
                    )}
                  </div>

                  {p.description && (
                    <p className={`text-xs mb-6 ${isPopular ? 'text-stone-300' : 'text-stone-600'}`}>
                      {p.description}
                    </p>
                  )}

                  <div className={`h-px w-full my-6 ${isPopular ? 'bg-stone-800' : 'bg-stone-100'}`} />

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs leading-normal">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-[#d7262e]' : 'text-emerald-600'
                          }`}
                        />
                        <span className={isPopular ? 'text-stone-300' : 'text-stone-700'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => handlePlanClick(p.name)}
                    className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? 'bg-[#d7262e] hover:bg-[#b01b22] text-white shadow-lg'
                        : 'bg-stone-900 hover:bg-black text-white'
                    }`}
                  >
                    <span>Choose {p.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d7262e]" />
                    <span>Instant gate activation upon payment</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
