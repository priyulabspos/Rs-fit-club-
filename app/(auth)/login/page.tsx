'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Dumbbell } from 'lucide-react';

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
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#fcfbf9]">
      <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-xl shadow-lg shadow-gray-100 p-8 sm:p-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#d7262e]/10 text-[#d7262e] mb-4">
            <Dumbbell className="w-8 h-8 -rotate-45" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase italic tracking-wider text-[#121212]">
            RS FIT CLUB
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-medium">
            Management & Access System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Email or Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="owner@rsfitclub.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-[#d7262e] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-[#d7262e] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#d7262e] hover:bg-[#b01b22] text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Development Quick Fill Helpers */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-2.5 uppercase tracking-wider text-center">
            Seeded Test Credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setIdentifier('owner@rsfitclub.com');
                setPassword('Password@123');
              }}
              className="p-2 border border-gray-200 rounded-lg hover:border-[#d7262e] text-left transition hover:bg-gray-50"
            >
              <div className="font-semibold text-gray-900">Owner</div>
              <div className="text-[11px] text-gray-500 truncate">owner@rsfitclub.com</div>
            </button>
            <button
              type="button"
              onClick={() => {
                setIdentifier('staff@rsfitclub.com');
                setPassword('Password@123');
              }}
              className="p-2 border border-gray-200 rounded-lg hover:border-[#d7262e] text-left transition hover:bg-gray-50"
            >
              <div className="font-semibold text-gray-900">Staff</div>
              <div className="text-[11px] text-gray-500 truncate">staff@rsfitclub.com</div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
