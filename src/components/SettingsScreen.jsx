import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Moon, Sliders, Check } from 'lucide-react';

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState('General');
  const [defaultModel, setDefaultModel] = useState('Nano Banana 2.1');
  const [defaultAspect, setDefaultAspect] = useState('16:9');
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Platform Settings</h2>
        <p className="text-xs text-slate-400">Configure your default AI models, canvas preferences, and privacy</p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-3">
        {['General', 'Privacy', 'Notifications'].map((tab) => (
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

      {/* General Settings Card */}
      {activeTab === 'General' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          {/* Language Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">Interface Language</div>
              <div className="text-[11px] text-slate-400">Select your preferred system language</div>
            </div>
            <select className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 w-44">
              <option>English (US)</option>
              <option>Japanese (日本語)</option>
              <option>Spanish (Español)</option>
              <option>German (Deutsch)</option>
            </select>
          </div>

          {/* Default Model */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">Default Generation Model</div>
              <div className="text-[11px] text-slate-400">Default model loaded when opening the studio</div>
            </div>
            <select 
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 w-44"
            >
              <option value="Nano Banana 2.1">🍌 Nano Banana 2.1 (Flagship)</option>
              <option value="Nano Banana Pro">🍌 Nano Banana Pro (Maximum Quality)</option>
            </select>
          </div>

          {/* Default Aspect Ratio */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">Default Canvas Aspect Ratio</div>
              <div className="text-[11px] text-slate-400">Default dimensions for prompt box</div>
            </div>
            <select 
              value={defaultAspect}
              onChange={(e) => setDefaultAspect(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 w-44"
            >
              <option value="16:9">16:9 (Landscape)</option>
              <option value="1:1">1:1 (Square)</option>
              <option value="9:16">9:16 (Story/Mobile)</option>
              <option value="4:3">4:3 (Classic Poster)</option>
            </select>
          </div>

          {/* Advanced Settings Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">Show Advanced Sampling Controls</div>
              <div className="text-[11px] text-slate-400">Display seed input, CFG scale, and negative prompt fields</div>
            </div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                showAdvanced ? 'bg-purple-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  showAdvanced ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Save Generation History Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-white">Save Generation History Across Sessions</div>
              <div className="text-[11px] text-slate-400">Automatically backup generated renders to private cloud storage</div>
            </div>
            <button
              onClick={() => setSaveHistory(!saveHistory)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                saveHistory ? 'bg-purple-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  saveHistory ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center justify-between">
            {savedNotification ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Settings saved successfully
              </span>
            ) : <span />}
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
