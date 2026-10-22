import React from 'react';
import Link from 'next/link';
import { Dumbbell, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d7262e] text-white flex items-center justify-center font-bold">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight uppercase leading-none text-white">
                  RS FIT <span className="text-[#d7262e]">CLUB</span>
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 mt-0.5">
                  Gym Management & Fitness Floor
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              RS Fit Club combines Olympic standard strength equipment, clean facilities, and modern biometric gate technology to give you an uncompromising training atmosphere.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d7262e]" />
                <span>RS Fit Club, Main Street, Gym Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d7262e]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d7262e]" />
                <span>contact@rsfitclub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">Facilities & Equipment</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">Training Programs</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">Membership Pricing</a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-white transition-colors">Certified Coaches</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact & Enquiries</a>
              </li>
            </ul>
          </div>

          {/* Member & Staff Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Portal Access
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/login" className="hover:text-[#d7262e] transition-colors flex items-center gap-1">
                  <span>Member Sign In</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-[#d7262e] transition-colors flex items-center gap-1">
                  <span>Digital Pass & Attendance</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#d7262e] transition-colors flex items-center gap-1">
                  <span>Staff & Front-Desk Login</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#d7262e] transition-colors flex items-center gap-1">
                  <span>Owner Management System</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Floor Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Floor Timings
            </h4>
            <div className="text-xs text-stone-400 space-y-2">
              <div>
                <span className="block text-white font-semibold">Mon – Sat:</span>
                <span>6:00 AM – 10:00 PM</span>
              </div>
              <div>
                <span className="block text-white font-semibold">Sunday:</span>
                <span>7:00 AM – 12:00 PM (Noon)</span>
              </div>
              <div className="pt-2 text-[11px] text-[#d7262e] font-semibold">
                * Biometric access active during floor hours
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} RS Fit Club. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & Biometric Access</span>
            <Link href="/login" className="hover:text-stone-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
