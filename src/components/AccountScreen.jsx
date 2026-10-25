import React, { useState } from 'react';
import { User, ShieldCheck, Zap, Coins, Check, ArrowRight, ExternalLink } from 'lucide-react';

export function AccountScreen({ credits, onUpgradeClick }) {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" 
            alt="Sarah Wilson" 
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Sarah Wilson</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                Pro Plan
              </span>
            </div>
            <p className="text-xs text-slate-400">sarah.wilson@example.com</p>
            <p className="text-[11px] text-slate-500 mt-1">Member since March 2026</p>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all self-start sm:self-center">
          Manage Account
        </button>
      </div>

      {/* Usage & Credits Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Usage & Credits</span>
            </h3>
            <p className="text-xs text-slate-400">Credits renew automatically on Nov 24, 2026</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-white">{credits.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block">credits remaining</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 h-full rounded-full transition-all"
              style={{ width: `${(credits / 2000) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>{2000 - credits} / 2,000 used this cycle</span>
            <button className="text-purple-400 hover:text-purple-300 font-sans font-medium">View History</button>
          </div>
        </div>
      </div>

      {/* Subscription Plans Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Pro Plan */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/40 relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Current Plan</span>
            <span className="text-sm font-bold text-white">$19 / month</span>
          </div>
          <h4 className="text-xl font-bold text-white">Pro Creator</h4>
          <p className="text-xs text-slate-400">High speed, commercial rights, and 2,000 monthly credits.</p>

          <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-purple-400" />
              <span>Access to Banana 2.1 Pro & Ultra</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-purple-400" />
              <span>Character Face Consistency Lock</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-purple-400" />
              <span>Full Commercial License</span>
            </li>
          </ul>
        </div>

        {/* Studio / Agency Upgrade */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Agency Tier</span>
              <span className="text-sm font-bold text-white">$49 / month</span>
            </div>
            <h4 className="text-xl font-bold text-white mt-1">Studio Unlimited</h4>
            <p className="text-xs text-slate-400 mt-1">Unlimited generations, 4K upscaling, and dedicated queue.</p>

            <ul className="space-y-2 text-xs text-slate-300 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Unlimited 2.1 Pro Generations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Queue Delay (Dedicated Workers)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Private API Access Webhook</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onUpgradeClick}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/30 transition-all"
          >
            Upgrade to Studio ($49)
          </button>
        </div>
      </div>
    </div>
  );
}
