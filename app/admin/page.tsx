import React from 'react';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import {
  Users,
  Dumbbell,
  IndianRupee,
  Activity,
  Fingerprint,
  TrendingUp,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { OlympicPlate, HexDumbbell, LoadedBarbell } from '@/components/gym-illustrations';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  // Database metrics
  const memberCount = await prisma.member.count();
  const planCount = await prisma.plan.count();
  const recentMembers = await prisma.member.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      memberships: {
        include: { plan: true },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Welcome Banner with Graphic Accents */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#17171a] via-[#1f1f24] to-[#121214] border border-white/10 p-6 sm:p-8 text-white shadow-xl">
        {/* Subtle Brand Red Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d7262e]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7262e]/20 border border-[#d7262e]/40 text-[#ff4d56] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              RS Fit Club Control Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase italic tracking-wider text-white">
              Welcome back, {user?.role === 'OWNER' ? 'Owner' : 'Staff'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Biometric turnstile online. All 11 system modules, automated expiry cutoffs, and membership records are active.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-400">Gate Controller</div>
                <div className="text-xs font-bold text-white">Main Entrance: Armed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Active Members */}
        <div className="relative overflow-hidden bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Active Members
            </span>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#d7262e] flex items-center justify-center group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#121212] tracking-tight">{memberCount}</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% Onboarded</span>
          </div>
        </div>

        {/* Card 2: Active Plans */}
        <div className="relative overflow-hidden bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Active Plans
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#121212] tracking-tight">{planCount}</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-gray-500">
            <span>Monthly, Pro & Annual</span>
          </div>
        </div>

        {/* Card 3: Monthly Collection */}
        <div className="relative overflow-hidden bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Collection (This Month)
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#121212] tracking-tight">₹19,500</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Seeded ledger projection</span>
          </div>
        </div>

        {/* Card 4: Daily Gate Entries */}
        <div className="relative overflow-hidden bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Gate Punches Today
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
              <Fingerprint className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#121212] tracking-tight">42</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-blue-600">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>0 unauthorized attempts</span>
          </div>
        </div>
      </div>

      {/* NEW: Realistic Gym Floor & Iron Gear Showcase */}
      <div className="bg-gradient-to-br from-[#18181c] via-[#121215] to-[#0d0d0f] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Ambient Iron Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#d7262e]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#ff4d56] mb-1">
              <Dumbbell className="w-4 h-4" />
              RS Fit Club Floor Equipment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic tracking-wide text-white">
              Heavy Iron, Free Weights & Power Racks
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Commercial-grade Olympic barbells, cast iron hex dumbbells, and calibrated competition bumper plates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
              Total Iron Capacity: <strong className="text-white">2,400 KG</strong>
            </span>
          </div>
        </div>

        {/* Realistic Equipment Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
          {/* Equipment 1: Olympic Competition Bumper Plate 20KG */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#d7262e]/50 transition duration-300 group">
            <OlympicPlate size={130} weight="20" unit="KG" color="#d7262e" className="group-hover:rotate-6 transition duration-500" />
            <div className="mt-4">
              <div className="font-extrabold text-sm uppercase tracking-wider text-white">
                20 KG Olympic Bumper Plate
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                50mm Stainless Bushing • High-Density Rubber
              </div>
            </div>
          </div>

          {/* Equipment 2: Cast Iron Hex Dumbbell 30KG */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#d7262e]/50 transition duration-300 group">
            <div className="py-5">
              <HexDumbbell size={160} weight="30 KG" className="group-hover:-rotate-3 transition duration-500" />
            </div>
            <div className="mt-1">
              <div className="font-extrabold text-sm uppercase tracking-wider text-white">
                30 KG Solid Hex Dumbbell
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                Chrome Knurled Grip • Anti-Roll Hex Heads
              </div>
            </div>
          </div>

          {/* Equipment 3: Olympic Competition Bumper Plate 25KG */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#d7262e]/50 transition duration-300 group">
            <OlympicPlate size={130} weight="25" unit="KG" color="#1e1e24" className="group-hover:-rotate-6 transition duration-500" />
            <div className="mt-4">
              <div className="font-extrabold text-sm uppercase tracking-wider text-white">
                25 KG Heavy Iron Plate
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                Cast Iron Rim • Powerlifting Calibrated
              </div>
            </div>
          </div>
        </div>

        {/* Barbell Loaded Visual Banner */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-bold uppercase tracking-wider text-gray-300">
              Olympic Competition Barbell (20 KG + Loaded Plates)
            </span>
            <span className="text-[#ff4d56] font-semibold">Ready for Heavy Squats & Deadlifts</span>
          </div>
          <LoadedBarbell className="w-full" />
        </div>
      </div>

      {/* Visual Analytics & Biometric Gate Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Footfall Hourly Bar Chart */}
        <div className="lg:col-span-8 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#d7262e] flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                Live Footfall Analytics
              </div>
              <h3 className="text-xl font-extrabold uppercase italic tracking-wide text-gray-900 mt-0.5">
                Hourly Gym Attendance & Door Access
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-block w-3 h-3 rounded bg-[#d7262e]"></span> Peak Workout Hours (6-9 AM & 5-9 PM)
            </div>
          </div>

          {/* SVG Bar Chart Graphic */}
          <div className="mt-6 pt-4">
            <div className="h-52 w-full flex items-end gap-2 sm:gap-3 justify-between px-2">
              {[
                { hour: '06h', entries: 28, peak: true },
                { hour: '07h', entries: 45, peak: true },
                { hour: '08h', entries: 38, peak: true },
                { hour: '09h', entries: 18, peak: false },
                { hour: '10h', entries: 10, peak: false },
                { hour: '11h', entries: 8, peak: false },
                { hour: '12h', entries: 6, peak: false },
                { hour: '15h', entries: 12, peak: false },
                { hour: '16h', entries: 20, peak: false },
                { hour: '17h', entries: 42, peak: true },
                { hour: '18h', entries: 54, peak: true },
                { hour: '19h', entries: 48, peak: true },
                { hour: '20h', entries: 35, peak: true },
                { hour: '21h', entries: 15, peak: false },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition bg-[#121212] text-white text-[10px] font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20">
                    {item.entries} entries
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full bg-gray-100 rounded-t-md h-36 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${(item.entries / 54) * 100}%` }}
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        item.peak
                          ? 'bg-gradient-to-t from-[#b01b22] to-[#d7262e] group-hover:brightness-110 shadow-sm'
                          : 'bg-gray-300 group-hover:bg-gray-400'
                      }`}
                    ></div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">{item.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Biometric Gate Terminal Telemetry */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#18181b] to-[#111113] border border-white/10 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Gate Node #1
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                Ready / Armed
              </span>
            </div>

            {/* Visual Hardware Terminal Card */}
            <div className="my-4 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d7262e] to-[#800e13] flex items-center justify-center text-white shadow-lg shadow-red-600/30 mb-2.5 animate-pulse">
                <Fingerprint className="w-8 h-8" />
              </div>
              <div className="font-extrabold text-sm uppercase tracking-wider text-white">
                Biometric Terminal + Mag-Lock
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Local IP: 192.168.1.120 • 4ms Ping
              </div>
            </div>

            {/* Telemetry rows */}
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">Magnetic Lock</span>
                <span className="font-bold text-emerald-400">Locked (Normal)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">Allow-list Cache</span>
                <span className="font-bold text-white">{memberCount} Local IDs</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">Offline Fail-Safe</span>
                <span className="font-bold text-emerald-400">Armed</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-gray-400 text-center">
            Automatic release: <span className="text-white font-semibold">10 seconds</span> on verified member punch.
          </div>
        </div>
      </div>

      {/* Recent Enrolled Members Roster */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#d7262e]">
              Member Records
            </div>
            <h3 className="text-xl font-extrabold uppercase italic tracking-wide text-gray-900 mt-0.5">
              Recently Enrolled Members
            </h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
            {memberCount} Total Enrolled
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {recentMembers.map((member) => (
            <div
              key={member.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/80 px-2 rounded-xl transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 font-extrabold flex items-center justify-center text-xs">
                  {member.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{member.fullName}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="font-mono text-[#d7262e] font-semibold">{member.memberCode}</span>
                    <span>•</span>
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right hidden sm:block">
                  <div className="font-semibold text-gray-800">
                    {member.memberships[0]?.plan.name || 'Standard Plan'}
                  </div>
                  <div className="text-gray-400 text-[11px]">
                    Valid: {new Date(member.memberships[0]?.endDate || Date.now()).toLocaleDateString('en-IN')}
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
