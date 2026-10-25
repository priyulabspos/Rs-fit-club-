'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  AlertCircle,
  ShieldCheck,
  Zap,
  Fingerprint,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('owner@rsfitclub.com');
  const [password, setPassword] = useState('Password@123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      if (data.user?.role === 'OWNER' || data.user?.role === 'STAFF') {
        router.push('/admin');
      } else {
        router.push('/portal');
      }
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0e0e10] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Graphic Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#d7262e]/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#d7262e]/15 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Subtle Mesh Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-[#17171a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Left Side: Brand & Visual Graphics Hero */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1c1c21] via-[#151518] to-[#0e0e11] p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
          {/* Subtle Red Flare in corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7262e]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <Logo size="lg" variant="light" className="mb-8" />

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#d7262e]/15 text-[#ff4d56] border border-[#d7262e]/30">
                <Zap className="w-3.5 h-3.5" />
                Management & Biometrics
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase italic tracking-wide text-white leading-tight">
                BUILD STRENGTH. <br />
                <span className="text-[#d7262e]">CONTROL ACCESS.</span>
              </h2>

              <p className="text-xs text-gray-400 leading-relaxed">
                Centralized gym operations: real-time biometric turnstile syncing, automated fee tracking, and digital passes.
              </p>
            </div>
          </div>

          {/* Feature Badges Graphic */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d56] flex-shrink-0">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Biometric Gate Sync</div>
                <div className="text-[11px] text-gray-500">Offline-first door security</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Automated Validity</div>
                <div className="text-[11px] text-gray-500">Instant expiry cutoff</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 bg-[#17171a] p-8 lg:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold uppercase italic tracking-wide text-white">
              System Sign In
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Enter your credentials to access the console
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Email or Mobile Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="owner@rsfitclub.com"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-[#d7262e] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-[#d7262e] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-[#d7262e] to-[#b01b22] hover:from-[#e32d36] hover:to-[#be1f27] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick-fill Demo Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                1-Click Test Credentials
              </span>
              <span className="text-[10px] text-gray-500">Click to auto-fill</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIdentifier('owner@rsfitclub.com');
                  setPassword('Password@123');
                }}
                className="p-3 bg-white/5 border border-white/10 hover:border-[#d7262e] rounded-xl text-left transition group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-[#ff4d56]">
                  <span>Owner Account</span>
                  <UserCheck className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-[11px] text-gray-400 truncate mt-0.5">owner@rsfitclub.com</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifier('staff@rsfitclub.com');
                  setPassword('Password@123');
                }}
                className="p-3 bg-white/5 border border-white/10 hover:border-[#d7262e] rounded-xl text-left transition group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-[#ff4d56]">
                  <span>Front-Desk Staff</span>
                  <UserCheck className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-[11px] text-gray-400 truncate mt-0.5">staff@rsfitclub.com</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
