import React from 'react';
import { Compass, Sparkles, LayoutGrid, Sliders, Users } from 'lucide-react';

export function MobileNav({ currentTab, setTab }) {
  const items = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'create', label: 'Studio', icon: Sparkles },
    { id: 'storyboard', label: 'Storyboard', icon: LayoutGrid },
    { id: 'edit', label: 'Editor', icon: Sliders },
    { id: 'characters', label: 'Elements', icon: Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#08080c]/95 backdrop-blur-xl border-t border-[#1a1a24] z-50 px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const active = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
              active ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
