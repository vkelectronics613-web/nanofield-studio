import React from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';

export function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0d111d] border border-purple-500/40 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scale Your Creative Studio</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Upgrade Your Nano Field Plan</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Get instant access to Banana 2.1 Pro, unlimited character face seeds, and ultra-high-resolution 4K downloads.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pro Plan */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Creator</div>
              <div className="text-2xl font-black text-white mt-1">$19 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>2,000 monthly credits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Fast queue processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Commercial usage rights</span>
              </li>
            </ul>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
            >
              Current Active Plan
            </button>
          </div>

          {/* Studio Plan */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/50 space-y-4 relative shadow-xl shadow-purple-950/40">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-500 text-[10px] font-bold text-white uppercase tracking-wider">
              Popular
            </div>
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Studio Unlimited</div>
              <div className="text-2xl font-black text-white mt-1">$49 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Unlimited 2.1 Pro generations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero queue wait (dedicated engine)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Multi-account worker API access</span>
              </li>
            </ul>

            <button
              onClick={() => {
                alert('Redirecting to secure Stripe checkout...');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
            >
              Upgrade Now ($49)
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500">
          Powered by Stripe & Lemon Squeezy • Cancel anytime with 1-click
        </div>
      </div>
    </div>
  );
}
