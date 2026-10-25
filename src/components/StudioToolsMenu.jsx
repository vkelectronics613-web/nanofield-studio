import React from 'react';
import { 
  Check,
  ChevronRight
} from 'lucide-react';
import { 
  HIGGSFIELD_MENU_ITEMS
} from './Sidebar';

export function StudioToolsMenu({ activeTool, onSelectTool, onClose }) {
  return (
    <div className="w-80 bg-[#0d0e14]/95 border border-[#242636] rounded-2xl shadow-2xl py-2 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
      <div className="px-4 py-2.5 border-b border-[#1c1d28] flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Higgsfield AI Tools</span>
        <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">12 Features</span>
      </div>

      <div className="max-h-[500px] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-[#1e1e2c]">
        {HIGGSFIELD_MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTool === item.tool || activeTool === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTool(item);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3.5 p-2 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? 'bg-purple-600/15 border border-purple-500/40 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#161722] border border-transparent'
              }`}
            >
              {/* Rounded Square Icon Box with TOP Badge */}
              <div className="relative shrink-0">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-purple-600 border-purple-400 text-white shadow-md' 
                    : 'bg-[#181920] border-[#242633] text-slate-300 group-hover:border-slate-600 group-hover:text-white'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {item.badge === 'TOP' && (
                  <span className="absolute -top-1.5 -left-1.5 bg-rose-600 text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded shadow ring-2 ring-[#0d0e14]">
                    TOP
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="text-[13px] font-bold text-white tracking-tight truncate leading-tight group-hover:text-purple-200 transition-colors">
                  {item.title}
                </div>
                <p className="text-[11px] text-slate-400 font-normal leading-tight truncate mt-0.5">
                  {item.desc}
                </p>
              </div>

              {isActive && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
