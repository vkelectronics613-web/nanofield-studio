import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, ArrowRight, Copy, Check } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/mockData';

export function PromptLibraryScreen({ setTab, setInitialPrompt }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Popular', 'Creative', 'Product', 'Anime', 'Cinematic', 'Illustration', 'Fantasy', 'Minimal', 'Vintage'];

  const filteredTemplates = PROMPT_TEMPLATES.filter((t) => {
    const matchCat = selectedCategory === 'All' || selectedCategory === 'Popular' || selectedCategory === 'Creative' || t.category === selectedCategory;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleUseTemplate = (prompt) => {
    setInitialPrompt(prompt);
    setTab('create');
  };

  const handleCopyPrompt = (id, prompt, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Prompt Library & Templates</h2>
          <p className="text-xs text-slate-400 mt-0.5">Explore curated, production-tested prompts optimized for Banana 2.1</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates or styles..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/80"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleUseTemplate(template.prompt)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-purple-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-950/30 flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-purple-300 border border-purple-500/20">
                {template.category}
              </div>
              <button
                onClick={(e) => handleCopyPrompt(template.id, template.prompt, e)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/80 text-slate-300 hover:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy Prompt"
              >
                {copiedId === template.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {template.prompt}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
