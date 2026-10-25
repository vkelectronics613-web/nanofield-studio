import React from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck, Crown } from 'lucide-react';

export function UpgradeModal({ isOpen, onClose, isUnlimitedPlan, onActivateUnlimited }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e0e16] border border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>30-Day Unlimited Image Generation Pass</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Upgrade Your Nano Field Studio</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Get 30 days of unlimited master images with Nano Banana Pro, zero queue wait, and 4K ultra downloads.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Creator Standard */}
          <div className="p-5 rounded-2xl bg-[#12121a] border border-[#20202e] space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Creator Standard</div>
              <div className="text-2xl font-black text-white mt-1">$9.9 <span className="text-xs font-normal text-slate-400">/ 30 days</span></div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Nano Banana 2 Fast engine</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>3,000 monthly credits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Standard commercial license</span>
              </li>
            </ul>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Standard Tier
            </button>
          </div>

          {/* Nano Banana Pro 30-Day Unlimited Plan (Most Expensive / Flagship) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/70 via-[#181024] to-[#0c0c14] border-2 border-amber-400/80 space-y-4 relative shadow-xl shadow-purple-950/50">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-fuchsia-500 text-[10px] font-black text-slate-950 uppercase tracking-wider shadow">
              30-Day Unlimited
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Nano Banana Pro</div>
              <div className="text-2xl font-black text-white mt-1">$29 <span className="text-xs font-normal text-slate-400">/ 30-day pass</span></div>
            </div>

            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>∞ Unlimited Generations:</strong> Pro & 2.1</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Zero Credit Cost:</strong> Infinite generations for 30 days</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>4K Resolution + LaMa Watermark Clean</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Dedicated Multi-Account Flow Worker</strong></span>
              </li>
            </ul>

            <button
              onClick={() => {
                if (onActivateUnlimited) onActivateUnlimited();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-fuchsia-600 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              {isUnlimitedPlan ? '✓ Unlimited Pass Active' : 'Activate 30-Day Unlimited Pass ($29)'}
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500">
          Powered by Nano Field Engine • 30 days access begins upon activation
        </div>
      </div>
    </div>
  );
}
