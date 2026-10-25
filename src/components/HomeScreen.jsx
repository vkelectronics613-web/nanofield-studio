import React, { useState } from 'react';
import { Sparkles, Wand2, Users, Layers, ArrowRight, Download, RefreshCw, Eye } from 'lucide-react';
import { MOCK_CREATIONS } from '../data/mockData';

export function HomeScreen({ setTab, setInitialPrompt }) {
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleHeroGenerate = () => {
    if (heroPrompt.trim()) {
      setInitialPrompt(heroPrompt);
      setTab('create');
    } else {
      setTab('create');
    }
  };

  const actionCards = [
    {
      id: 'cinema-studio',
      title: 'Cinema Studio',
      desc: '16-bit depth, 21:9 anamorphic & Stickman Hybrid Director',
      icon: Wand2,
      tab: 'cinema',
      color: 'from-amber-600/20 to-orange-600/20',
      border: 'hover:border-amber-500/50'
    },
    {
      id: 'ads-supercomputer',
      title: 'Ads Supercomputer',
      desc: 'Autonomous multi-shot commercial narrative agent',
      icon: Sparkles,
      tab: 'ads',
      color: 'from-purple-600/20 to-indigo-600/20',
      border: 'hover:border-purple-500/50'
    },
    {
      id: 'character-elements',
      title: 'Characters & @ Elements',
      desc: '19-category persona builder with @ symbol recall',
      icon: Users,
      tab: 'characters',
      color: 'from-emerald-600/20 to-teal-600/20',
      border: 'hover:border-emerald-500/50'
    },
    {
      id: 'ai-image-editor',
      title: 'AI Image Editor',
      desc: 'Background removal, 4K upscaling & 18-language dubbing',
      icon: Layers,
      tab: 'edit',
      color: 'from-blue-600/20 to-cyan-600/20',
      border: 'hover:border-blue-500/50'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/60 border border-purple-500/20 p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Nano Banana 2.1 & Pro Engine</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Your ideas, now in images.
            </h1>
            <p className="text-base text-slate-300/90 font-normal max-w-xl">
              Create stunning visuals, precise typography posters, and consistent characters — all in one unified studio.
            </p>
          </div>

          {/* Interactive Prompt Bar */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl focus-within:border-purple-500/70 focus-within:ring-2 focus-within:ring-purple-500/30 transition-all">
            <input 
              type="text"
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHeroGenerate()}
              placeholder="Describe your image... (e.g. Vintage 70s Swiss typography poster for jazz concert)"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button 
              onClick={handleHeroGenerate}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              onClick={() => setTab(card.tab)}
              className={`group cursor-pointer p-5 rounded-2xl bg-gradient-to-br ${card.color} bg-slate-900/80 border border-slate-800/80 ${card.border} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 text-sm group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Creations Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Recent Creations</h2>
            <p className="text-xs text-slate-400">High-fidelity generations from our community</p>
          </div>
          <button 
            onClick={() => setTab('library')}
            className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_CREATIONS.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 aspect-[3/4] cursor-pointer"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <div className="text-[11px] font-semibold text-white truncate">{item.title}</div>
                <div className="text-[9px] text-purple-300">{item.model}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setInitialPrompt(item.prompt);
                      setTab('create');
                    }}
                    className="flex-1 py-1 rounded-md bg-purple-600 text-white text-[10px] font-semibold flex items-center justify-center gap-1 hover:bg-purple-500"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Remix</span>
                  </button>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1 rounded-md bg-slate-800/90 text-slate-200 hover:text-white"
                  >
                    <Eye className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
