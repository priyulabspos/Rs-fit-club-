import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding RS Fit Club database...');

  // 1. Password hashing for seeded accounts
  const defaultPassword = 'Password@123';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  // 2. Default Gym Settings
  const settings = [
    { key: 'gym_name', value: 'RS Fit Club' },
    { key: 'grace_days', value: '2' },
    { key: 'receipt_footer', value: 'Thank you for choosing RS Fit Club. Fees once paid are non-refundable.' },
    { key: 'phone', value: '+91 98765 43210' },
    { key: 'address', value: 'RS Fit Club, Main Street, Gym Hub' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 3. Create or update Owner Account
  const owner = await prisma.user.upsert({
    where: { email: 'owner@rsfitclub.com' },
    update: {
      passwordHash,
      role: 'OWNER',
    },
    create: {
      email: 'owner@rsfitclub.com',
      phone: '9876543210',
      passwordHash,
      role: 'OWNER',
      isActive: true,
    },
  });

  // 4. Create or update Staff Account
  const staff = await prisma.user.upsert({
    where: { email: 'staff@rsfitclub.com' },
    update: {
      passwordHash,
      role: 'STAFF',
    },
    create: {
      email: 'staff@rsfitclub.com',
      phone: '9876543211',
      passwordHash,
      role: 'STAFF',
      isActive: true,
    },
  });

  // 5. Create 3 Standard Plans
  const planData = [
    {
      name: 'Monthly Standard',
      durationDays: 30,
      priceInPaise: 150000, // ₹1,500
      joiningFeeInPaise: 50000, // ₹500
      description: 'Full gym access, cardio and strength equipment, locker access.',
      isActive: true,
    },
    {
      name: 'Quarterly Pro (3 Months)',
      durationDays: 90,
      priceInPaise: 400000, // ₹4,000
      joiningFeeInPaise: 0,
      description: 'Includes diet consultation, fitness assessment, and full floor access.',
      isActive: true,
    },
    {
      name: 'Annual Elite (1 Year)',
      durationDays: 365,
      priceInPaise: 1400000, // ₹14,000
      joiningFeeInPaise: 0,
      description: 'Best value. Complimentary personal trainer sessions and guest passes.',
      isActive: true,
    },
  ];

  const plans = [];
  for (const p of planData) {
    const existing = await prisma.plan.findFirst({ where: { name: p.name } });
    if (existing) {
      plans.push(existing);
    } else {
      const created = await prisma.plan.create({ data: p });
      plans.push(created);
    }
  }

  // 6. Create 10 Fake Members
  const sampleMembers = [
    { code: 'RS0001', name: 'Aman Sharma', phone: '9811100001', email: 'aman@example.com', gender: 'Male', planIdx: 0, daysAgo: 10 },
    { code: 'RS0002', name: 'Pooja Verma', phone: '9811100002', email: 'pooja@example.com', gender: 'Female', planIdx: 1, daysAgo: 30 },
    { code: 'RS0003', name: 'Rahul Senapati', phone: '9811100003', email: 'rahul@example.com', gender: 'Male', planIdx: 2, daysAgo: 60 },
    { code: 'RS0004', name: 'Neha Nayak', phone: '9811100004', email: 'neha@example.com', gender: 'Female', planIdx: 0, daysAgo: 5 },
    { code: 'RS0005', name: 'Vikram Das', phone: '9811100005', email: 'vikram@example.com', gender: 'Male', planIdx: 1, daysAgo: 45 },
    { code: 'RS0006', name: 'Sanjay Mohanty', phone: '9811100006', email: 'sanjay@example.com', gender: 'Male', planIdx: 0, daysAgo: 25 },
    { code: 'RS0007', name: 'Ritu Swain', phone: '9811100007', email: 'ritu@example.com', gender: 'Female', planIdx: 2, daysAgo: 100 },
    { code: 'RS0008', name: 'Amit Patra', phone: '9811100008', email: 'amit@example.com', gender: 'Male', planIdx: 1, daysAgo: 15 },
    { code: 'RS0009', name: 'Deepak Rout', phone: '9811100009', email: 'deepak@example.com', gender: 'Male', planIdx: 0, daysAgo: 2 },
    { code: 'RS0010', name: 'Sneha Mishra', phone: '9811100010', email: 'sneha@example.com', gender: 'Female', planIdx: 2, daysAgo: 20 },
  ];

  const now = new Date();

  for (let i = 0; i < sampleMembers.length; i++) {
    const sm = sampleMembers[i];
    const plan = plans[sm.planIdx];

    const joinedDate = new Date(now.getTime() - sm.daysAgo * 24 * 60 * 60 * 1000);
    const startDate = joinedDate;
    const endDate = new Date(startDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    const member = await prisma.member.upsert({
      where: { memberCode: sm.code },
      update: {},
      create: {
        memberCode: sm.code,
        fullName: sm.name,
        phone: sm.phone,
        email: sm.email,
        gender: sm.gender,
        deviceUserId: `DEV_${sm.code}`,
        joinedOn: joinedDate,
        isBlocked: false,
      },
    });

    // Check if membership already exists
    const existingMembership = await prisma.membership.findFirst({
      where: { memberId: member.id },
    });

    if (!existingMembership) {
      await prisma.membership.create({
        data: {
          memberId: member.id,
          planId: plan.id,
          startDate,
          endDate,
          status: 'ACTIVE',
        },
      });
    }
  }

  console.log('Seed completed successfully!');
  console.log('--------------------------------------------------');
  console.log('Owner Account : owner@rsfitclub.com / Password@123');
  console.log('Staff Account : staff@rsfitclub.com / Password@123');
  console.log('Plans Created : 3');
  console.log('Members Added : 10');
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
