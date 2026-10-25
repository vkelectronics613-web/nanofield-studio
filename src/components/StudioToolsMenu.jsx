import React from 'react';
import { 
  Image as ImageIcon, 
  Type, 
  LayoutGrid, 
  MousePointerClick, 
  Paintbrush, 
  Repeat, 
  Smile, 
  Maximize2, 
  Compass, 
  Lightbulb, 
  CaseSensitive, 
  Shirt, 
  Camera,
  Check
} from 'lucide-react';

export const STUDIO_TOOLS_LIST = [
  { id: 'image-edit', label: 'Image Edit', icon: ImageIcon, tab: 'edit', tool: 'prompt-edit', desc: 'Transform images with natural language instructions' },
  { id: 'text-to-image', label: 'Text to Image', icon: Type, tab: 'create', tool: 'text-to-image', desc: 'Generate 8K visuals with Nano Banana Pro' },
  { id: 'storyboard', label: 'Storyboard', icon: LayoutGrid, tab: 'storyboard', tool: 'storyboard', desc: 'Plan multi-shot cinematic narrative sequences' },
  { id: 'click-to-edit', label: 'Click to Edit', icon: MousePointerClick, tab: 'edit', tool: 'click-to-edit', desc: 'Point and click on specific elements to edit' },
  { id: 'inpaint', label: 'Inpaint', icon: Paintbrush, tab: 'edit', tool: 'inpaint', desc: 'Brush mask area and generative fill' },
  { id: 'char-swap', label: 'Image Character Swap', icon: Repeat, tab: 'edit', tool: 'char-swap', desc: 'Swap character while locking pose and geometry' },
  { id: 'face-swap', label: 'Image Face Swap', icon: Smile, tab: 'edit', tool: 'face-swap', desc: 'High-precision facial swap with lighting match' },
  { id: 'upscale', label: 'Image Upscale', icon: Maximize2, tab: 'edit', tool: 'upscale-4k', desc: 'Enhance details with 4K clarity synthesis' },
  { id: 'photo-angle', label: 'Photo Angle Editor', icon: Compass, tab: 'edit', tool: 'photo-angle', desc: '3D orbit camera angle switcher (Hero, Drone, Dutch)' },
  { id: 'relight', label: 'Relight Studio', icon: Lightbulb, tab: 'edit', tool: 'relight', desc: 'Reposition studio light, golden hour, and neon rim' },
  { id: 'edit-text', label: 'Edit Text', icon: CaseSensitive, tab: 'edit', tool: 'edit-text', desc: 'Prompt-based typography and title overlay' },
  { id: 'try-on', label: 'Virtual Try-On (AnyShoot)', icon: Shirt, tab: 'edit', tool: 'try-on', desc: 'Apparel fashion try-on photoshoot on any model' },
  { id: 'product-photo', label: 'Product Photography', icon: Camera, tab: 'edit', tool: 'product-photo', desc: 'Commercial packshot studio with pedestal staging' },
];

export function StudioToolsMenu({ activeTool, onSelectTool, onClose }) {
  return (
    <div className="w-80 bg-[#12121a] border border-[#242436] rounded-2xl shadow-2xl py-2 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
      <div className="px-4 py-2.5 border-b border-[#1c1c28] flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Higgsfield AI Tools</span>
        <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">13 Features</span>
      </div>

      <div className="max-h-[480px] overflow-y-auto py-1 divide-y divide-[#181824]/50 scrollbar-thin scrollbar-thumb-[#1e1e2c]">
        {STUDIO_TOOLS_LIST.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.tool || activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                onSelectTool(tool);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600/15 text-white border-l-2 border-purple-500'
                  : 'text-slate-300 hover:text-white hover:bg-[#1a1a26]'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${
                isActive ? 'bg-purple-600 text-white shadow-md' : 'bg-[#08080c] border border-[#20202e] text-slate-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                  <span>{tool.label}</span>
                  {tool.id === 'try-on' && (
                    <span className="text-[9px] text-amber-400 font-mono">AnyShoot</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 truncate">{tool.desc}</p>
              </div>
              {isActive && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
