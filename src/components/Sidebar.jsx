import React from 'react';
import { 
  Zap, 
  Settings,
  ChevronRight,
  Terminal,
  FolderHeart
} from 'lucide-react';
import { BananaLogo } from './BananaLogo';

// Pixel-Accurate Icons matching the uploaded Higgsfield interface
export const CreateImageIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

export const CinematicCamerasIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="14" x="3" y="5" rx="3" />
    <path d="M7 5v14M17 5v14M3 12h18" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

export const CanvasNodesIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="5" cy="6" r="2.5" />
    <circle cx="19" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <path d="M7.5 6h9M6.5 8.5l4 7M17.5 8.5l-4 7" />
  </svg>
);

export const SoulMoodboardIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12c0-3.3 2.7-6 6-6 4 0 4 12 8 12 3.3 0 6-2.7 6-6s-2.7-6-6-6c-4 0-4 12-8 12-3.3 0-6-2.7-6-6z" />
  </svg>
);

export const SoulIdCharacterIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12c0-3.3 2.7-6 6-6 4 0 4 12 8 12 3.3 0 6-2.7 6-6s-2.7-6-6-6c-4 0-4 12-8 12-3.3 0-6-2.7-6-6z" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const AiInfluencerIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M19 3v4M17 5h4" strokeWidth="2" />
  </svg>
);

export const PhotodumpIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="7" y="7" rx="2.5" />
    <path d="M4 17V5a2 2 0 0 1 2-2h12" />
    <circle cx="13" cy="12" r="1.5" />
    <path d="m21 17-3-3-4 4" />
  </svg>
);

export const RelightIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v4M8 4l2 3M16 4l-2 3M5 14h14" />
    <rect width="18" height="5" x="3" y="15" rx="1.5" />
    <circle cx="12" cy="17.5" r="1" />
  </svg>
);

export const InpaintIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 4-2 2M18 7l-2 2M6 20l7-7-2-2-7 7v2h2l7-7" />
    <path d="m19 2 .5 1.5L21 4l-1.5.5L19 6l-.5-1.5L17 4l1.5-.5L19 2z" />
  </svg>
);

export const ImageUpscaleIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export const FaceSwapIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <circle cx="12" cy="12" r="4" />
    <path d="M10 13a2 2 0 0 0 4 0" />
    <circle cx="10.5" cy="11" r=".5" fill="currentColor" />
    <circle cx="13.5" cy="11" r=".5" fill="currentColor" />
  </svg>
);

export const CharacterSwapIcon = ({ className = "w-5 h-5 text-slate-200" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="17" x="3" y="4" rx="2.5" />
    <circle cx="10" cy="10" r="2.5" />
    <path d="M5 18c0-2.5 2-4 5-4s5 1.5 5 4" />
    <path d="M18 4l3 3-3 3M21 7h-4" />
  </svg>
);

// The 12 Flagship Items Matching the Uploaded User Image
export const HIGGSFIELD_MENU_ITEMS = [
  {
    id: 'create-image',
    tab: 'create',
    tool: null,
    title: 'Create Image',
    desc: 'Generate AI images',
    icon: CreateImageIcon,
    badge: null
  },
  {
    id: 'cinematic-cameras',
    tab: 'create',
    tool: 'cinematic',
    title: 'Cinematic Cameras',
    desc: 'Image generation with camera controls',
    icon: CinematicCamerasIcon,
    badge: 'TOP'
  },
  {
    id: 'canvas',
    tab: 'projects',
    tool: null,
    title: 'Canvas',
    desc: 'Visual ideation meets repeatable AI workflows.',
    icon: CanvasNodesIcon,
    badge: null
  },
  {
    id: 'soul-moodboard',
    tab: 'prompts',
    tool: null,
    title: 'Soul Moodboard',
    desc: 'Turn your references into a focused moodboard',
    icon: SoulMoodboardIcon,
    badge: null
  },
  {
    id: 'soul-id-character',
    tab: 'characters',
    tool: null,
    title: 'Soul ID Character',
    desc: 'Create unique character',
    icon: SoulIdCharacterIcon,
    badge: null
  },
  {
    id: 'ai-influencer',
    tab: 'characters',
    tool: 'influencer',
    title: 'AI Influencer',
    desc: 'Create and manage your AI influencer',
    icon: AiInfluencerIcon,
    badge: null
  },
  {
    id: 'photodump',
    tab: 'library',
    tool: null,
    title: 'Photodump',
    desc: 'Generate Your Aesthetic',
    icon: PhotodumpIcon,
    badge: null
  },
  {
    id: 'relight',
    tab: 'edit',
    tool: 'relight',
    title: 'Relight',
    desc: 'Adjust lighting position, color, and brightness',
    icon: RelightIcon,
    badge: null
  },
  {
    id: 'inpaint',
    tab: 'edit',
    tool: 'inpaint',
    title: 'Inpaint',
    desc: 'Select an area, describe the change',
    icon: InpaintIcon,
    badge: null
  },
  {
    id: 'image-upscale',
    tab: 'edit',
    tool: 'upscale-4k',
    title: 'Image Upscale',
    desc: 'Enhance image quality',
    icon: ImageUpscaleIcon,
    badge: null
  },
  {
    id: 'face-swap',
    tab: 'edit',
    tool: 'face-swap',
    title: 'Face Swap',
    desc: 'Create Realistic Face Swaps',
    icon: FaceSwapIcon,
    badge: null
  },
  {
    id: 'character-swap',
    tab: 'edit',
    tool: 'char-swap',
    title: 'Character Swap',
    desc: 'Create Realistic Character Swaps',
    icon: CharacterSwapIcon,
    badge: null
  }
];

export function Sidebar({ currentTab, setTab, onUpgradeClick, isUnlimitedPlan }) {
  // Determine currently active item
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const currentToolParam = searchParams ? searchParams.get('tool') : null;

  const isItemActive = (item) => {
    if (item.tab === 'edit') {
      return currentTab === 'edit' && currentToolParam === item.tool;
    }
    if (item.id === 'create-image') {
      return currentTab === 'create' && currentToolParam !== 'cinematic';
    }
    if (item.id === 'cinematic-cameras') {
      return currentTab === 'storyboard' || (currentTab === 'create' && currentToolParam === 'cinematic');
    }
    return currentTab === item.tab;
  };

  return (
    <aside className="w-72 bg-[#0d0e13] border-r border-[#1a1b24] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e1e2c]">
      {/* Brand Header */}
      <div>
        <div className="p-4 px-5 flex items-center justify-between border-b border-[#181922]">
          <div 
            onClick={() => setTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-inner group-hover:border-purple-500/40 transition-colors">
              <BananaLogo className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  Nano Field
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Higgsfield-Grade Studio</p>
            </div>
          </div>
        </div>

        {/* The 12 Flagship Items Matching Screenshot */}
        <div className="p-2.5 space-y-1">
          {HIGGSFIELD_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.tab === 'edit') {
                    setTab('edit', item.tool);
                  } else {
                    setTab(item.tab, item.tool);
                  }
                }}
                className={`w-full flex items-center gap-3.5 p-2 rounded-xl text-left transition-all duration-150 cursor-pointer group ${
                  active 
                    ? 'bg-purple-600/15 border border-purple-500/40 text-white shadow-lg shadow-purple-600/10' 
                    : 'text-slate-300 hover:bg-[#161722] hover:border-[#262838] border border-transparent'
                }`}
              >
                {/* Rounded Square Icon Box with TOP Badge */}
                <div className="relative shrink-0">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    active 
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md' 
                      : 'bg-[#181920] border-[#242633] text-slate-300 group-hover:border-slate-600 group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {item.badge === 'TOP' && (
                    <span className="absolute -top-1.5 -left-1.5 bg-rose-600 text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded shadow ring-2 ring-[#0d0e13]">
                      TOP
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="text-[13px] font-bold text-white tracking-tight truncate leading-tight group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal leading-tight truncate mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Integration Links */}
        <div className="px-3 pt-2 pb-1 border-t border-[#181922] flex items-center justify-between text-xs">
          <button
            onClick={() => setTab('mcp')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              currentTab === 'mcp'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-[#161722]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>MCP Protocol</span>
          </button>
          <button
            onClick={() => setTab('library')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              currentTab === 'library'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-[#161722]'
            }`}
          >
            <FolderHeart className="w-3.5 h-3.5 text-purple-400" />
            <span>Creations</span>
          </button>
        </div>
      </div>

      {/* Bottom User & Plan Strip */}
      <div className="p-3 border-t border-[#181922] space-y-2 mt-auto">
        <button
          onClick={onUpgradeClick}
          className="w-full relative overflow-hidden group p-2.5 rounded-xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-[#0e0e16] border border-purple-500/30 text-left transition-all hover:border-purple-400/60 shadow-lg cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Zap className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Nano Banana Pro</div>
                <div className="text-[10px] text-purple-300/80">30 Days Unlimited Flagship</div>
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
