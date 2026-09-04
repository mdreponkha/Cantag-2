import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  initialSubject?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ initialSubject, onClose }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    capacity: '500 kVA',
    fuel: 'Diesel',
    serviceType: 'Turnkey Supply & Installation',
    message: initialSubject ? `Inquiry regarding: ${initialSubject}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 text-xs font-bold uppercase mb-2 border border-amber-500/30">
            <Zap className="w-3 h-3" />
            Canstar Fast Quote Desk
          </div>
          <h2 className="font-['Outfit'] font-black text-2xl text-white">
            Request Formal Equipment Quotation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Receive detailed unit pricing, lead time, and technical data sheets within 4 hours.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-xl text-white">Quotation Request Received</h4>
            <p className="text-xs text-slate-300">
              Our engineering team is preparing your custom proposal. We will contact <strong>{formData.name}</strong> via <strong>{formData.phone || formData.email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-emerald-400 mt-2"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Facility *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. United Hospital"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Required Capacity</label>
                <select
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="50-150 kVA">50 – 150 kVA</option>
                  <option value="250-500 kVA">250 – 500 kVA</option>
                  <option value="800-1250 kVA">800 – 1250 kVA</option>
                  <option value="1500-3500 kVA">1500 – 3500 kVA</option>
                  <option value="Multi-Megawatt Paralleling">Multi-Megawatt (5MW+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Fuel Type</label>
                <select
                  value={formData.fuel}
                  onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Diesel">Diesel Power</option>
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Biogas">Biogas Power</option>
                  <option value="Hybrid">Hybrid Storage TESS</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Scope & Notes</label>
              <textarea
                rows={3}
                placeholder="Indicate any special requirements (e.g. sound attenuation dBA rating, auto-sync panel, delivery location)..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Quote Request...' : 'Send Quotation Request'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
