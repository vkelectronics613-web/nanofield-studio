import React from 'react';
import { 
  Home, 
  Sparkles, 
  Film, 
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
  AtSign
} from 'lucide-react';
import { BananaLogo } from './BananaLogo';

export function Sidebar({ currentTab, setTab, onUpgradeClick }) {
  const primaryNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create', label: 'Create Studio', icon: Sparkles, badge: '2.1' },
    { id: 'cinema', label: 'Cinema Studio', icon: Film, badge: '21:9' },
    { id: 'ads', label: 'Ads Supercomputer', icon: Tv, badge: 'Agent' },
  ];

  const workflowNav = [
    { id: 'characters', label: 'Characters & @ Elements', icon: Users, badge: '19 Cat' },
    { id: 'edit', label: 'AI Image Editor', icon: Sliders, badge: '18 Lang' },
    { id: 'mcp', label: 'Nano Field MCP', icon: Terminal, badge: 'Stdio' },
    { id: 'prompts', label: 'Prompt Library', icon: BookOpen },
    { id: 'library', label: 'Asset Library', icon: FolderHeart },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
  ];

  return (
    <aside className="w-64 bg-[#0d111d] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/60">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-inner">
            <BananaLogo className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">Nano Field</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">PRO</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Create. Edit. Imagine.</p>
          </div>
        </div>

        {/* Primary Creation Tools */}
        <div className="p-3 space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
            Studio Workspaces
          </div>
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-800 text-purple-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Workflow & Asset Tools */}
        <div className="p-3 pt-1 space-y-1 border-t border-slate-800/50">
          <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 tracking-wider">
            Modules & Connectors
          </div>
          {workflowNav.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-800 text-purple-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800/60 space-y-2 mt-auto">
        {/* Upgrade Card */}
        <button
          onClick={onUpgradeClick}
          className="w-full relative overflow-hidden group p-2.5 rounded-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900 border border-purple-500/30 text-left transition-all hover:border-purple-400/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Zap className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Upgrade to Pro</div>
                <div className="text-[10px] text-purple-300/80">Unlimited 4K & fast priority</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400/60 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Profile Pill */}
        <div 
          onClick={() => setTab('account')}
          className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800/70 hover:border-slate-700/80 transition-all cursor-pointer group"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" 
            alt="User" 
            className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/40"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white truncate">Pro Studio Workspace</div>
            <div className="text-[10px] text-slate-400 truncate">1 Account Active</div>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-45 transition-transform" />
        </div>
      </div>
    </aside>
  );
}
