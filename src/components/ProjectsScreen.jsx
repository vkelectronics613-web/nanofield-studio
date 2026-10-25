import React, { useState } from 'react';
import { Plus, FolderKanban, Calendar, Clock, Download, Share2, MoreHorizontal } from 'lucide-react';
import { MOCK_PROJECT } from '../data/mockData';

export function ProjectsScreen({ setTab }) {
  const [activeTab, setActiveTab] = useState('Images');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Project Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
              Active Project
            </span>
            <span className="text-xs text-slate-400">• Updated {MOCK_PROJECT.updated}</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">{MOCK_PROJECT.name}</h1>
          <p className="text-xs text-slate-400">{MOCK_PROJECT.count} assets generated in this collection</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setTab('create')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Project</span>
          </button>
          <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
        {['Overview', 'Images', 'Prompt History', 'Settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Project Assets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_PROJECT.items.map((url, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3]">
            <img src={url} alt={`Asset ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
              <span className="text-xs font-medium text-white">Campaign Shot #{i + 1}</span>
              <a 
                href={url} 
                target="_blank" 
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 shadow"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
