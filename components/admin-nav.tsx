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
  Receipt,
} from 'lucide-react';
import { SessionUser } from '@/types';

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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between min-h-screen">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#d7262e] text-white flex items-center justify-center font-bold">
            <Dumbbell className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <div className="font-extrabold text-xl italic tracking-wider text-[#121212] leading-none">
              RS FIT CLUB
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#d7262e] mt-1">
              Admin Console
            </div>
          </div>
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#d7262e]/10 text-[#d7262e] font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-100 bg-[#fcfbf9]">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-bold text-gray-900 truncate">
              {user.email || user.phone}
            </div>
            <div className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#d7262e] text-white">
              {user.role}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-gray-200 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
