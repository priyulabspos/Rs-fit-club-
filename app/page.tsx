import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { LandingView } from '@/components/landing/landing-view';

export const metadata: Metadata = {
  title: 'RS Fit Club – Build Strength. Build Confidence.',
  description: 'Premium gym facilities, Olympic strength equipment, certified coaching, and integrated biometric gate access.',
  openGraph: {
    title: 'RS Fit Club – Premium Fitness & Strength',
    description: 'Transform your fitness with certified coaches, Olympic equipment, and transparent membership plans.',
    type: 'website',
  },
};

export default async function HomePage() {
  const user = await getCurrentUser();

  // Fetch active plans from database
  let plans = await db.plan.findMany({
    where: { isActive: true },
    orderBy: { durationDays: 'asc' },
  });

  // Fallback plans if database is not yet seeded
  if (!plans || plans.length === 0) {
    plans = [
      {
        id: 'plan-1',
        name: 'Monthly Standard',
        durationDays: 30,
        priceInPaise: 150000,
        joiningFeeInPaise: 50000,
        description: 'Full training floor access, cardio equipment, and biometric gate pass.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'plan-2',
        name: 'Quarterly Pro (3 Months)',
        durationDays: 90,
        priceInPaise: 400000,
        joiningFeeInPaise: 0,
        description: 'Includes body scan, fitness roadmap, and zero joining fee.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'plan-3',
        name: 'Annual Elite (1 Year)',
        durationDays: 365,
        priceInPaise: 1400000,
        joiningFeeInPaise: 0,
        description: 'Best overall value. Personal trainer sessions and guest passes included.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  return <LandingView user={user} plans={plans} />;
}
