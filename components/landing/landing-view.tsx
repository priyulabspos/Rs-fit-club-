'use client';

import React, { useState } from 'react';
import { Navbar } from './navbar';
import { AmbientBackground } from './ambient-background';
import { Hero } from './hero';
import { About } from './about';
import { Facilities } from './facilities';
import { Programs } from './programs';
import { Plans } from './plans';
import { Trainers } from './trainers';
import { WhyUs } from './why-us';
import { PortalTeaser } from './portal-teaser';
import { ContactForm } from './contact-form';
import { Footer } from './footer';
import { SessionUser } from '@/types';

interface PlanData {
  id: string;
  name: string;
  durationDays: number;
  priceInPaise: number;
  joiningFeeInPaise: number;
  description: string | null;
}

interface LandingViewProps {
  user?: SessionUser | null;
  plans: PlanData[];
}

export function LandingView({ user, plans }: LandingViewProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-stone-900 selection:bg-[#d7262e] selection:text-white relative">
      {/* Dynamic ambient background with athletic grid & orbs */}
      <AmbientBackground />

      {/* Navbar with auth status & smooth navigation */}
      <Navbar user={user} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Facilities />
        <Programs />
        <Plans plans={plans} onSelectPlan={(p) => setSelectedPlan(p)} />
        <Trainers />
        <WhyUs />
        <PortalTeaser />
        <ContactForm selectedPlan={selectedPlan} availablePlans={plans} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
