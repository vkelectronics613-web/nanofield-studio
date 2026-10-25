import React from 'react';
import { 
  Home, 
  Sparkles, 
  Tv, 
  Users, 
  Sliders, 
  Terminal, 
  BookOpen, 
  FolderHeart, 
  FolderKanban, 
  Zap, 
  Settings,
  ChevronRight,
  AtSign,
  Compass,
  LayoutGrid
} from 'lucide-react';
import { BananaLogo } from './BananaLogo';

export function Sidebar({ currentTab, setTab, onUpgradeClick, isUnlimitedPlan }) {
  const studioNav = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'create', label: 'Image Studio', icon: Sparkles, badge: 'Flagship' },
    { id: 'storyboard', label: 'Storyboard', icon: LayoutGrid, badge: 'Cinematic' },
    { id: 'ads', label: 'Ads Supercomputer', icon: Tv, badge: 'AI Agent' },
  ];

  const elementsNav = [
    { id: 'edit', label: 'AI Image Editor', icon: Sliders, badge: '13 Tools' },
    { id: 'characters', label: 'Character Elements', icon: Users, badge: '@ DNA' },
    { id: 'library', label: 'My Creations', icon: FolderHeart },
    { id: 'projects', label: 'Campaign Folders', icon: FolderKanban },
  ];

  const systemNav = [
    { id: 'mcp', label: 'MCP', icon: Terminal, badge: 'Public' },
    { id: 'prompts', label: 'Prompt Library', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-[#08080c] border-r border-[#1a1a24] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-[#181822]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-inner">
              <BananaLogo className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-white">Nano Field</span>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Higgsfield-Grade Studio</p>
            </div>
          </div>
        </div>

        {/* Studio Workspace Section */}
        <div className="p-3 space-y-1">
          <div className="text-[9px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
            Studio Workspaces
          </div>
          {studioNav.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#12121a]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-[#181824] text-purple-300 border border-purple-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Elements & Editing Section */}
        <div className="p-3 pt-1 space-y-1 border-t border-[#14141e]">
          <div className="text-[9px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
            Elements & Retouch
          </div>
          {elementsNav.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#12121a]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-[#181824] text-purple-300 border border-purple-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Developer & Integration Section */}
        <div className="p-3 pt-1 space-y-1 border-t border-[#14141e]">
          <div className="text-[9px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
            Integrations
          </div>
          {systemNav.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#12121a]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-[#181824] text-purple-300 border border-purple-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom User & Plan Strip */}
      <div className="p-3 border-t border-[#181822] space-y-2.5 mt-auto">
        <button
          onClick={onUpgradeClick}
          className="w-full relative overflow-hidden group p-2.5 rounded-xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-[#0e0e16] border border-purple-500/30 text-left transition-all hover:border-purple-400/60 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Zap className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Nano Field Pro</div>
                <div className="text-[10px] text-purple-300/80">Unlimited 4K & Priority API</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400/60 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        <div 
          onClick={() => setTab('account')}
          className="flex items-center gap-2.5 p-2 rounded-xl bg-[#101018] border border-[#1c1c28] hover:border-purple-500/50 transition-all cursor-pointer group"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" 
            alt="Studio User" 
            className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/40"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">Creator Studio</div>
            <div className="text-[10px] text-purple-400 truncate">
              {isUnlimitedPlan ? '∞ 30-Day Unlimited' : '1,250 Credits Left'}
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-45 transition-transform" />
        </div>
      </div>
    </aside>
  );
}
