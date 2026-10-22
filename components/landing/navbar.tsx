'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dumbbell, Menu, X, ArrowRight, User } from 'lucide-react';
import { SessionUser } from '@/types';

interface NavbarProps {
  user?: SessionUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Programs', href: '#programs' },
    { label: 'Memberships', href: '#plans' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#d7262e] text-white flex items-center justify-center font-bold shadow-md transition-transform group-hover:scale-105 shrink-0">
            <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight uppercase leading-none font-sans text-stone-900">
              RS FIT <span className="text-[#d7262e]">CLUB</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest font-semibold uppercase text-stone-500 mt-0.5 hidden xs:inline-block">
              Premium Fitness Floor
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs xl:text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-[#d7262e] transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA / Auth Status */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {user ? (
            <Link
              href={user.role === 'OWNER' || user.role === 'STAFF' ? '/admin' : '/portal'}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-sm"
            >
              <User className="w-4 h-4 text-[#d7262e]" />
              <span>{user.role === 'OWNER' ? 'Owner Dashboard' : user.role === 'STAFF' ? 'Staff Portal' : 'Member Portal'}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#d7262e] px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#d7262e] hover:bg-[#b01b22] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Join Today</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </>
          )}
        </div>

        {/* Mobile Action Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {user ? (
            <Link
              href={user.role === 'OWNER' || user.role === 'STAFF' ? '/admin' : '/portal'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-[11px] font-bold uppercase tracking-wider"
              title="Dashboard"
            >
              <User className="w-3.5 h-3.5 text-[#d7262e]" />
              <span>Portal</span>
            </Link>
          ) : (
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-lg bg-[#d7262e] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm sm:inline-block"
            >
              Join
            </a>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-1 rounded-lg text-stone-700 hover:bg-stone-100 hover:text-stone-950 focus:outline-none touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-stone-950/40 backdrop-blur-sm z-50">
          <div className="bg-white border-b border-stone-200 px-5 pt-3 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col divide-y divide-stone-100">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-stone-800 hover:text-[#d7262e] py-3.5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              {user ? (
                <Link
                  href={user.role === 'OWNER' || user.role === 'STAFF' ? '/admin' : '/portal'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-xl bg-stone-900 text-white font-bold uppercase text-xs tracking-wider shadow"
                >
                  Open {user.role === 'OWNER' ? 'Owner Dashboard' : user.role === 'STAFF' ? 'Staff Portal' : 'Member Portal'}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-xl border border-stone-300 text-stone-800 font-bold uppercase text-xs tracking-wider hover:bg-stone-50"
                  >
                    Member / Staff Login
                  </Link>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl bg-[#d7262e] text-white font-bold uppercase text-xs tracking-wider shadow-md"
                  >
                    Join RS Fit Club
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
