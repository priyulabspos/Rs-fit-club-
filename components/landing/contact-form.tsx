'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Dumbbell } from 'lucide-react';

interface ContactFormProps {
  selectedPlan?: string;
  availablePlans?: { id: string; name: string }[];
}

export function ContactForm({ selectedPlan = '', availablePlans = [] }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState(selectedPlan);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update plan if selectedPlan prop changes
  React.useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          interestedPlan: plan || undefined,
          message: message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Could not submit enquiry. Please verify your phone number.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#d7262e] mb-2 sm:mb-3">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900 leading-tight">
                Visit Us or Start Your <span className="text-[#d7262e]">Enquiry.</span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed font-normal">
                Drop by the training floor for a free walk-through, or send us a message below. We’ll show you around the facility and explain how our memberships work.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#d7262e] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase text-stone-900">Gym Location</h4>
                  <p className="text-sm text-stone-600 mt-0.5">
                    RS Fit Club, Main Street, Near City Center, Gym Hub
                  </p>
                  <span className="text-xs text-stone-400 block mt-0.5">Dedicated parking available</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#d7262e] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase text-stone-900">Phone & Desk Support</h4>
                  <a href="tel:+919876543210" className="text-sm font-bold text-stone-900 hover:text-[#d7262e] transition-colors mt-0.5 block">
                    +91 98765 43210
                  </a>
                  <span className="text-xs text-stone-400 block mt-0.5">Calls answered during floor hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#d7262e] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase text-stone-900">Operating Hours</h4>
                  <p className="text-sm text-stone-700 mt-0.5">
                    Monday – Saturday: <span className="font-semibold">6:00 AM – 10:00 PM</span>
                  </p>
                  <p className="text-sm text-stone-700">
                    Sunday: <span className="font-semibold">7:00 AM – 12:00 PM (Noon)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Quick Link */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                  Instant WhatsApp Chat
                </h4>
              </div>
              <p className="text-xs text-emerald-800 mb-4 leading-relaxed">
                Prefer texting? Message our front-desk directly on WhatsApp for plan details or location pin.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hello%20RS%20Fit%20Club,%20I%20am%20interested%20in%20gym%20membership."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#fcfbf9] border border-stone-200 p-5 sm:p-8 md:p-10 shadow-sm relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#d7262e] text-white flex items-center justify-center font-bold shrink-0">
                  <Dumbbell className="w-5 h-5 -rotate-45" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-stone-900">
                    Membership Enquiry
                  </h3>
                  <p className="text-xs text-stone-500">
                    Fill out this form and our coaches will get back to you within 2 business hours.
                  </p>
                </div>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold uppercase text-stone-900">
                    Enquiry Received!
                  </h4>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in RS Fit Club. We have saved your enquiry in our system. A coach or front-desk manager will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="inline-block px-6 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors min-h-[44px]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-[#d7262e] text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name <span className="text-[#d7262e]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number (10 Digits) <span className="text-[#d7262e]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-base sm:text-sm font-semibold text-stone-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="9876543210"
                        className="w-full pl-14 pr-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Interested Plan (Optional)
                    </label>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-transparent transition-all"
                    >
                      <option value="">-- Select a Plan or General Enquiry --</option>
                      {availablePlans.length > 0 ? (
                        availablePlans.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Monthly Standard">Monthly Standard (₹1,500/mo)</option>
                          <option value="Quarterly Pro (3 Months)">Quarterly Pro (3 Months - ₹4,000)</option>
                          <option value="Annual Elite (1 Year)">Annual Elite (1 Year - ₹14,000)</option>
                          <option value="Personal Coaching">1-on-1 Personal Coaching</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Fitness Goals / Questions
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. I want to build strength, lose 5kg, or check timings for early morning workouts."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d7262e] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-[#d7262e] hover:bg-[#b01b22] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-h-[48px] touch-manipulation"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-stone-500 text-center">
                    🔒 We respect your privacy. No spam. You will only receive information related to RS Fit Club.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
