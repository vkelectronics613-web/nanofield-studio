import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Users, 
  Layers, 
  ArrowRight, 
  Download, 
  RefreshCw, 
  Eye, 
  Tv, 
  Sliders, 
  Compass, 
  Flame, 
  Heart, 
  Copy, 
  Check,
  ChevronRight,
  Zap,
  AtSign,
  LayoutGrid
} from 'lucide-react';
import { MOCK_CREATIONS } from '../data/mockData';

export function HomeScreen({ setTab, setInitialPrompt }) {
  const [heroPrompt, setHeroPrompt] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Photorealistic', 'Cinematic', 'Cyberpunk', 'Anime', 'Fashion', '3D CGI', 'Macro'];

  const handleHeroGenerate = () => {
    if (heroPrompt.trim()) {
      setInitialPrompt(heroPrompt);
    }
    setTab('create');
  };

  const handleCopyPrompt = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const actionCards = [
    {
      id: 'create-studio',
      title: 'Image Studio',
      badge: 'Flagship 2.1 & Pro',
      desc: 'Prompt console with aspect ratios, variations & reference uploads',
      icon: Sparkles,
      tab: 'create',
      color: 'from-purple-600/30 via-indigo-600/20 to-transparent',
      borderColor: 'border-purple-500/40 hover:border-purple-400'
    },
    {
      id: 'storyboard-studio',
      title: 'Storyboard',
      badge: 'Multi-Shot',
      desc: 'Plan cinematic narrative sequences with custom lenses & scripts',
      icon: LayoutGrid,
      tab: 'storyboard',
      color: 'from-fuchsia-600/30 via-pink-600/20 to-transparent',
      borderColor: 'border-fuchsia-500/40 hover:border-fuchsia-400'
    },
    {
      id: 'ai-image-editor',
      title: 'AI Image Editor',
      badge: '13 AI Tools',
      desc: 'Photo Angle, Relight, AnyShoot Try-On, Product Staging & 4K',
      icon: Sliders,
      tab: 'edit',
      color: 'from-amber-600/30 via-orange-600/20 to-transparent',
      borderColor: 'border-amber-500/40 hover:border-amber-400'
    },
    {
      id: 'character-elements',
      title: 'Character Elements',
      badge: '19 Categories',
      desc: 'Lock consistent personas to your library with @ handle tagging',
      icon: Users,
      tab: 'characters',
      color: 'from-emerald-600/30 via-teal-600/20 to-transparent',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400'
    },
    {
      id: 'ads-supercomputer',
      title: 'Ads Supercomputer',
      badge: 'Autonomous Agent',
      desc: 'Takes brand briefs and generates 4-shot commercial packages',
      icon: Tv,
      tab: 'ads',
      color: 'from-blue-600/30 via-cyan-600/20 to-transparent',
      borderColor: 'border-blue-500/40 hover:border-blue-400'
    }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Higgsfield Hero Studio Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#12121a] via-[#0c0c12] to-[#08080c] border border-[#1f1f2e] p-8 md:p-12 shadow-2xl">
        {/* Glow ambient backdrops */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>Higgsfield-Grade AI Creation Engine • Nano Banana Pro</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Create. Edit. Imagine.
            </h1>
            <p className="text-sm md:text-base text-slate-300/80 font-normal max-w-xl leading-relaxed">
              Generate ultra-realistic humans, posters with perfect typography, consistent characters across scenes, and full commercial ad packages.
            </p>
          </div>

          {/* Unified Higgsfield Floating Prompt Console */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0f0f16]/90 border border-[#242436] shadow-2xl focus-within:border-purple-500/80 focus-within:ring-2 focus-within:ring-purple-500/30 transition-all backdrop-blur-md">
              <input 
                type="text"
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleHeroGenerate()}
                placeholder="Describe your scene or type @ to mention a character..."
                className="flex-1 bg-transparent px-4 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button 
                onClick={handleHeroGenerate}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all active:scale-95 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Image</span>
              </button>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-slate-400">
              <span className="shrink-0 text-slate-500 flex items-center gap-1 font-semibold">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>Trending:</span>
              </span>
              {[
                'Cyberpunk hacker girl in rain',
                'Minimalist Swiss typography poster',
                'Macro water droplet on titanium watch',
                'Ancient samurai meditating in sakura'
              ].map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setHeroPrompt(idea);
                    setInitialPrompt(idea);
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-[#14141e] border border-[#20202e] hover:border-purple-500/50 hover:text-white transition-all text-[11px]"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Higgsfield Workspaces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              onClick={() => setTab(card.tab)}
              className={`group cursor-pointer p-5 rounded-3xl bg-[#0e0e16] border ${card.borderColor} bg-gradient-to-b ${card.color} transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl space-y-3.5 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#141420] border border-[#242436] flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  {card.badge}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-[#1a1a28] flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                <span>Launch Workspace</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Showcase (Higgsfield Feed) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-400" />
              <span>Explore Community Creations</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">High-fidelity generations rendered with Nano Banana models</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#0d0d14] p-1.5 rounded-2xl border border-[#1c1c28]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {MOCK_CREATIONS.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-[#0d0d14] border border-[#1a1a28] aspect-[3/4] cursor-pointer hover:border-purple-500/60 transition-all shadow-lg"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Top Overlaid Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[9px] font-mono text-purple-300 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.model}
              </div>

              {/* Bottom Details Drawer on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <div className="text-[11px] font-bold text-white truncate">{item.title}</div>
                <div className="text-[9px] text-slate-300 truncate mt-0.5">"{item.prompt}"</div>

                <div className="flex items-center gap-1.5 mt-2.5">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setInitialPrompt(item.prompt);
                      setTab('create');
                    }}
                    className="flex-1 py-1 rounded-lg bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-purple-500 transition-colors shadow-md"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Remix</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPrompt(item.id, item.prompt);
                    }}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Copy Prompt"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
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
