import React from 'react';
import { Search, Bell, Coins, Sparkles } from 'lucide-react';

export function Header({ credits, onUpgradeClick, onNewCreate }) {
  return (
    <header className="h-16 px-6 border-b border-slate-800/80 bg-[#0d111d]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-96 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search images, projects, styles..." 
          className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
          ⌘K
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Credits Counter Pill */}
        <button 
          onClick={onUpgradeClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 hover:border-purple-500/60 transition-all text-xs font-medium text-slate-300 group"
        >
          <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
          <span><strong className="text-white">{credits.toLocaleString()}</strong> credits</span>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1 rounded font-semibold">+ Add</span>
        </button>

        {/* Quick Create Button */}
        <button 
          onClick={onNewCreate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Image</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[#0d111d]" />
        </button>

        {/* Avatar */}
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" 
          alt="Sarah" 
          className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/40"
        />
      </div>
    </header>
  );
}
