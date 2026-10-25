import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Coins, Sparkles, LayoutGrid, ChevronDown, Wand2, Zap, Crown } from 'lucide-react';
import { StudioToolsMenu } from './StudioToolsMenu';

export function Header({ credits, isUnlimitedPlan, onUpgradeClick, onNewCreate, onSelectTool }) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 md:px-6 border-b border-[#1c1c28] bg-[#0c0c14]/90 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-72 md:w-96 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search tools, styles, prompts..." 
          className="w-full pl-9 pr-4 py-2 bg-[#12121c] border border-[#222232] rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all"
        />
        <div className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#1c1c28] text-[10px] font-mono text-slate-400">
          ⌘K
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 md:gap-3">
        {/* Studio Tools Popup Trigger */}
        <div className="relative" ref={toolsMenuRef}>
          <button
            onClick={() => setIsToolsOpen(!isToolsOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isToolsOpen
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                : 'bg-[#12121c] border-[#222232] text-slate-300 hover:text-white hover:border-purple-500/40'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Studio Tools</span>
            <span className="sm:hidden">Tools</span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-purple-500/20 text-purple-300">13</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
          </button>

          {isToolsOpen && (
            <div className="absolute right-0 top-full mt-2 z-50">
              <StudioToolsMenu
                onSelectTool={(tool) => {
                  if (onSelectTool) onSelectTool(tool);
                  setIsToolsOpen(false);
                }}
                onClose={() => setIsToolsOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Credits / Unlimited Pass Pill */}
        <button 
          onClick={onUpgradeClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all group ${
            isUnlimitedPlan
              ? 'bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-fuchsia-500/20 border-amber-400/60 text-amber-200 shadow-md shadow-amber-500/10'
              : 'bg-[#12121c] border-purple-500/30 hover:border-purple-500/60 text-slate-300'
          }`}
        >
          {isUnlimitedPlan ? (
            <>
              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline"><strong className="text-white font-mono">∞ Unlimited</strong> (30 Days)</span>
              <span className="sm:hidden"><strong className="text-white font-mono">∞ Pass</strong></span>
              <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded font-bold uppercase tracking-wider">PRO</span>
            </>
          ) : (
            <>
              <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span className="hidden sm:inline"><strong className="text-white">{credits.toLocaleString()}</strong> credits</span>
              <span className="sm:hidden"><strong className="text-white">{credits.toLocaleString()}</strong></span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1 rounded font-semibold">+ Add</span>
            </>
          )}
        </button>

        {/* Quick Create Button */}
        <button 
          onClick={onNewCreate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Image</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#161622] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[#0c0c14]" />
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
