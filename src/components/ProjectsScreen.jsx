import React, { useState, useEffect } from 'react';
import { Plus, FolderKanban, Calendar, Clock, Download, Share2, MoreHorizontal, RefreshCw } from 'lucide-react';
import { MOCK_PROJECT } from '../data/mockData';

export function ProjectsScreen({ setTab }) {
  const [activeTab, setActiveTab] = useState('Images');
  const [projects, setProjects] = useState([MOCK_PROJECT]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const loadProjects = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProjectName.trim(),
          description: newProjectDesc.trim(),
          category: 'Commercial Ads'
        })
      });
      if (res.ok) {
        setNewProjectName('');
        setNewProjectDesc('');
        setIsCreatingNew(false);
        loadProjects();
      }
    } catch {}
  };

  const currentProject = projects[selectedProjectIndex] || projects[0] || MOCK_PROJECT;
  const projectItems = currentProject.items || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Project Selector Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-[#0e0e16] p-4 rounded-2xl border border-[#1c1c28]">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Campaigns:</span>
          {projects.map((p, idx) => (
            <button
              key={p.id || idx}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedProjectIndex === idx
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-[#08080c] border border-[#1f1f2e] text-slate-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCreatingNew(!isCreatingNew)}
          className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {isCreatingNew && (
        <form onSubmit={handleCreateProject} className="bg-[#0e0e16] border border-purple-500/30 p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white">Create New Project Workspace</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Project Name (e.g. Nike Lunar 2026)"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="bg-[#08080c] border border-[#1f1f2e] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <input
              type="text"
              placeholder="Brief Description (e.g. Neon footwear campaign assets)"
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
              className="bg-[#08080c] border border-[#1f1f2e] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="px-3 py-1.5 rounded-xl bg-[#08080c] text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-purple-600 text-xs font-semibold text-white hover:bg-purple-500"
            >
              Create Project
            </button>
          </div>
        </form>
      )}

      {/* Project Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
              {currentProject.status || 'Active'}
            </span>
            <span className="text-xs text-slate-400">• Updated {currentProject.updated || 'Recently'}</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">{currentProject.name}</h1>
          <p className="text-xs text-slate-400">{projectItems.length} assets generated in this collection</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setTab('create')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate to Project</span>
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
      {projectItems.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-[#1f1f2e] rounded-3xl bg-[#08080c] space-y-3">
          <FolderKanban className="w-8 h-8 text-purple-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">No assets in this project yet</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Generate images via Image Studio or call the MCP tool <code className="text-purple-300 font-mono">nanofield_generate</code> with <code className="text-purple-300 font-mono">project_id: "{currentProject.name}"</code> from Claude/Cursor.
          </p>
          <button
            onClick={() => setTab('create')}
            className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-500"
          >
            Generate Image Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projectItems.map((url, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3]">
              <img src={url} alt={`Asset ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
                <span className="text-xs font-medium text-white">Asset #{i + 1}</span>
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
      )}
    </div>
  );
}
