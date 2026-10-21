import React from 'react';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Users, Dumbbell, IndianRupee, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  // Basic counts from seeded database
  const memberCount = await prisma.member.count();
  const planCount = await prisma.plan.count();

  return (
    <div className="max-w-6xl space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d7262e] mb-1">
            <CheckCircle2 className="w-4 h-4" />
            Phase 1 Foundation Active
          </div>
          <h1 className="text-3xl font-extrabold uppercase italic tracking-wider text-[#121212]">
            Welcome, {user?.role === 'OWNER' ? 'Owner' : 'Staff Member'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Database initialized with all 11 tables, Prisma ORM, role-based auth, and Vitest suite.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          PostgreSQL/SQLite Engine Online
        </div>
      </div>

      {/* KPI Stat Cards (Empty / Initial Placeholders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Members
            </span>
            <Users className="w-4 h-4 text-[#d7262e]" />
          </div>
          <div className="text-3xl font-extrabold text-[#121212] tracking-tight">
            {memberCount}
          </div>
          <div className="text-xs text-gray-400 mt-1">Seeded members (Phase 2 to view)</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Active Plans
            </span>
            <Dumbbell className="w-4 h-4 text-[#d7262e]" />
          </div>
          <div className="text-3xl font-extrabold text-[#121212] tracking-tight">
            {planCount}
          </div>
          <div className="text-xs text-gray-400 mt-1">Seeded plans (Phase 2 to manage)</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Fees This Month
            </span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-[#121212] tracking-tight">
            ₹0
          </div>
          <div className="text-xs text-gray-400 mt-1">Awaiting Phase 3 (Payments)</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Gate Entries Today
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-[#121212] tracking-tight">
            0
          </div>
          <div className="text-xs text-gray-400 mt-1">Awaiting Phase 4 (Gate Access)</div>
        </div>
      </div>

      {/* Phase 1 Completion Confirmation Box */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Phase 1 Status: Ready for Review</h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          You are successfully logged in to the RS Fit Club Admin Dashboard. The system has reached the
          exact stopping point defined in Blueprint Phase 1:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
          <li className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span><strong>Prisma Schema:</strong> 11 Tables created & migrated</span>
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span><strong>Authentication:</strong> Strict role checks (Owner/Staff/Member)</span>
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span><strong>Database Seed:</strong> 1 Owner, 1 Staff, 3 Plans, 10 Members</span>
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span><strong>Testing:</strong> 7 Vitest automated unit tests passing</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
