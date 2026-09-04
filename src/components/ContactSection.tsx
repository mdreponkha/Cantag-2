import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ThemeCustomizerState, QuoteFormData } from '../types';

interface ContactSectionProps {
  customizer: ThemeCustomizerState;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ customizer }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    capacity: '500 kVA',
    fuel: 'Diesel',
    serviceType: 'Turnkey Supply & Installation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-slate-100 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20 mb-3">
            <Mail className="w-3.5 h-3.5" />
            Engineering & Sales Desk
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white tracking-tight">
            Contact Canstar Power Tech
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Speak directly with our power engineering specialists to request technical quotations, site feasibility audits, or emergency service dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Office Locations & Emergency Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 24/7 Hotline Card */}
            <div className="bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider">24/7 EMERGENCY RESPONSE DESK</span>
              </div>
              <div className="text-2xl font-black font-['Outfit'] text-white">
                {customizer.emergencyPhone}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Rapid breakdown dispatch vans on standby with genuine spare parts.
              </p>
            </div>

            {/* Corporate Offices */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h3 className="font-['Outfit'] font-bold text-lg text-white border-b border-slate-800 pb-3">
                Regional Offices & Facilities
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Corporate Head Office (Dhaka)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{customizer.address}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Phone: {customizer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Chittagong Port & Service Depot</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Agrabad Commercial Area, Chittagong, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Official Correspondence</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Sales: {customizer.email}</p>
                  <p className="text-xs text-slate-400">Engineering: desk@canstarpowertech.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Standard Office Hours</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Saturday - Thursday: 9:00 AM – 7:00 PM</p>
                  <p className="text-xs text-emerald-400 font-semibold">24/7 Field Service Support Available</p>
                </div>
              </div>
            </div>

          </div>

          {/* Quotation Request Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-1">
              Request Technical Proposal & Pricing
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in your project requirements below to receive a formal quotation and equipment sizing breakdown within 4 business hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-xl text-white">Proposal Request Dispatched!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our power systems engineering desk has received your request for <strong>{formData.capacity}</strong>. A technical representative will reach out at <strong>{formData.phone || formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-emerald-400"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Rafiqul Islam"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Textiles Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700-000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Capacity</label>
                    <select
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="10-100 kVA">10 – 100 kVA (Compact)</option>
                      <option value="250-500 kVA">250 – 500 kVA (Medium)</option>
                      <option value="800-1250 kVA">800 – 1250 kVA (Heavy)</option>
                      <option value="1500-3500 kVA">1500 – 3500 kVA (Mega)</option>
                      <option value="Multi-Gen Paralleling">Multi-Gen Paralleling (5MW+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Fuel Preference</label>
                    <select
                      value={formData.fuel}
                      onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Diesel">Heavy-Duty Diesel</option>
                      <option value="Natural Gas">Natural Gas (Pipeline)</option>
                      <option value="Biogas">Biogas / Renewable</option>
                      <option value="Hybrid BESS">Hybrid Battery + Diesel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Scope Required</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Turnkey Supply & Installation">Turnkey Installation</option>
                      <option value="Equipment Supply Only">Equipment Supply Only</option>
                      <option value="Preventative AMC Maintenance">Annual Maintenance (AMC)</option>
                      <option value="Synchronization & Switchgear">Synchronization & ATS</option>
                      <option value="Acoustic Soundproofing">Acoustic Soundproofing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Details / Specific Technical Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details such as facility type, site location, required sound rating, or motor starting requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitting Request...' : 'Submit Quotation Request'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
