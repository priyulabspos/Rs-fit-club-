'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ShieldCheck,
  FileText,
  Settings,
  LogOut,
  Dumbbell,
  Sparkles,
} from 'lucide-react';
import { SessionUser } from '@/types';
import { Logo } from '@/components/logo';

interface AdminNavProps {
  user: SessionUser;
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Members', href: '/admin/members', icon: Users, badge: 'Phase 2' },
    { label: 'Plans', href: '/admin/plans', icon: Dumbbell, badge: 'Phase 2' },
    { label: 'Payments & Fees', href: '/admin/payments', icon: CreditCard, badge: 'Phase 3' },
    { label: 'Gate Access', href: '/admin/access', icon: ShieldCheck, badge: 'Phase 4' },
    { label: 'Reports', href: '/admin/reports', icon: FileText, badge: 'Phase 8' },
    { label: 'Settings', href: '/admin/settings', icon: Settings, badge: 'Later' },
  ];

  return (
    <aside className="w-64 bg-[#141417] text-gray-300 border-r border-white/10 flex flex-col justify-between min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10">
          <Logo size="md" variant="light" />
        </div>

        {/* Live Gate Status Pill */}
        <div className="mx-4 mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-gray-300">Biometric Gate</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
            Active
          </span>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d7262e] to-[#b01b22] text-white shadow-lg shadow-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500 border border-white/5'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Card */}
      <div className="p-4 border-t border-white/10 bg-[#0f0f12]">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Logged in as</span>
            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#d7262e] text-white">
              {user.role}
            </span>
          </div>
          <div className="text-xs font-bold text-white truncate">
            {user.email || user.phone}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-red-950/40 hover:border-red-500/30 rounded-xl transition border border-white/10 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
