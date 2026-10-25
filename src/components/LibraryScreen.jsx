import React, { useState } from 'react';
import { Search, Filter, Download, Sliders, Trash2, Heart, Share2, MoreVertical, X, Calendar, Layers } from 'lucide-react';
import { MOCK_CREATIONS } from '../data/mockData';

export function LibraryScreen({ setTab, setInitialPrompt }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(MOCK_CREATIONS[3]); // Golden retriever by default
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Images', 'Projects', 'Favorites'];

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      {/* Main Gallery Column */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">My Library</h2>
            <p className="text-xs text-slate-400">All your creations, assets, and project files</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search my library..."
                className="pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <select className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none">
              <option>All Time</option>
              <option>This Week</option>
              <option>Today</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === tab
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid of Creations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {MOCK_CREATIONS.map((item) => {
            const isSelected = selectedImage?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] cursor-pointer border transition-all ${
                  isSelected
                    ? 'border-purple-500 ring-2 ring-purple-500/40 shadow-xl'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end justify-between">
                  <span className="text-[11px] font-semibold text-white truncate">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Inspection Sidebar (Metadata) */}
      {selectedImage && (
        <div className="w-full lg:w-80 shrink-0 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-5 sticky top-24 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Asset Details</h3>
            <button 
              onClick={() => setSelectedImage(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Large Preview */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]">
            <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-full object-cover" />
          </div>

          {/* Title & Prompt */}
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">{selectedImage.title}</h4>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
              "{selectedImage.prompt}"
            </div>
          </div>

          {/* Metadata Specs */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400 py-1 border-b border-slate-800/60">
              <span>Model</span>
              <span className="font-semibold text-purple-300">{selectedImage.model}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 py-1 border-b border-slate-800/60">
              <span>Aspect Ratio</span>
              <span className="font-semibold text-slate-200">{selectedImage.aspect} (1920x1080)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 py-1 border-b border-slate-800/60">
              <span>Date</span>
              <span className="font-semibold text-slate-200">{selectedImage.date}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <a
              href={selectedImage.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download 2K HD</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setInitialPrompt(selectedImage.prompt);
                  setTab('create');
                }}
                className="py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Remix</span>
              </button>

              <button
                onClick={() => setTab('edit')}
                className="py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Favorite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
