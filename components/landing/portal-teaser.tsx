import React from 'react';
import Link from 'next/link';
import { Smartphone, QrCode, FileText, Calendar, ArrowRight } from 'lucide-react';

export function PortalTeaser() {
  return (
    <section className="py-14 sm:py-20 bg-stone-900 text-white border-b border-stone-800 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-[#d7262e] text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Smart Member Experience</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Manage Your Fitness From <span className="text-[#d7262e]">Any Device.</span>
            </h2>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Every member gets access to their personal RS Fit Club portal. Check your plan validity, review your attendance streaks, download payment receipts, and view your digital access pass.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/50">
                <QrCode className="w-6 h-6 text-[#d7262e] mb-2" />
                <h4 className="font-bold text-xs uppercase text-white">Digital Pass</h4>
                <p className="text-[11px] text-stone-400 mt-1">Instant check-in QR code</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/50">
                <FileText className="w-6 h-6 text-[#d7262e] mb-2" />
                <h4 className="font-bold text-xs uppercase text-white">PDF Receipts</h4>
                <p className="text-[11px] text-stone-400 mt-1">Direct download for tax/records</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/50">
                <Calendar className="w-6 h-6 text-[#d7262e] mb-2" />
                <h4 className="font-bold text-xs uppercase text-white">Attendance Log</h4>
                <p className="text-[11px] text-stone-400 mt-1">Live entry timestamp calendar</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#d7262e] hover:bg-[#b01b22] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg transition-colors min-h-[48px] touch-manipulation"
              >
                <span>Member Portal Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Portal Preview Card */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl bg-stone-800/90 border border-stone-700 p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-stone-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 text-[#d7262e] flex items-center justify-center font-bold text-sm shrink-0">
                    RS
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Member Dashboard Preview</h4>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active Subscription
                    </span>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-stone-400">ID: RS-MEMBER</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700/50">
                  <span className="text-[11px] text-stone-400 uppercase font-semibold">Active Plan</span>
                  <div className="text-lg font-extrabold text-white mt-0.5">Quarterly Pro</div>
                  <span className="text-[10px] text-[#d7262e]">Strength & Floor</span>
                </div>
                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700/50">
                  <span className="text-[11px] text-stone-400 uppercase font-semibold">Valid Till</span>
                  <div className="text-lg font-extrabold text-white mt-0.5">31 Dec 2026</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Gate Allowed (OK)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-stone-400 uppercase font-semibold">Biometric Scanner Link</span>
                  <div className="text-xs font-bold text-white mt-0.5">Fingerprint Device User ID: #104</div>
                </div>
                <span className="inline-block self-start sm:self-auto px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  SYNCED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
