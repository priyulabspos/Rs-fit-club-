'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Dumbbell, Menu, X, ArrowRight, User } from 'lucide-react';
import { SessionUser } from '@/types';

interface NavbarProps {
  user?: SessionUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-lg bg-[#d7262e] text-white flex items-center justify-center font-bold shadow-md transition-transform group-hover:scale-105">
            <Dumbbell className="w-6 h-6 -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight uppercase leading-none font-sans text-stone-900">
              RS FIT <span className="text-[#d7262e]">CLUB</span>
            </span>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-600 mt-0.5">
              Premium Fitness & Conditioning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-[#d7262e] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden lg:flex items-center gap-4">
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
                Member / Staff Sign In
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

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          {user && (
            <Link
              href={user.role === 'OWNER' || user.role === 'STAFF' ? '/admin' : '/portal'}
              className="p-2 text-stone-700 hover:text-[#d7262e]"
              title="Dashboard"
            >
              <User className="w-5 h-5" />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-6 pt-4 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-stone-800 hover:text-[#d7262e] py-1 border-b border-stone-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            {user ? (
              <Link
                href={user.role === 'OWNER' || user.role === 'STAFF' ? '/admin' : '/portal'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-stone-900 text-white font-bold uppercase text-xs tracking-wider"
              >
                Open Dashboard ({user.role})
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-stone-300 text-stone-800 font-bold uppercase text-xs tracking-wider hover:bg-stone-50"
                >
                  Member / Staff Login
                </Link>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-lg bg-[#d7262e] text-white font-bold uppercase text-xs tracking-wider shadow"
                >
                  Join RS Fit Club
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
