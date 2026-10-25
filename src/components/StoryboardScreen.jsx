import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Sparkles, 
  Plus, 
  Trash2, 
  Play, 
  Download, 
  RefreshCw, 
  Sliders, 
  Eye, 
  Film, 
  Camera, 
  Clock, 
  ChevronRight,
  Maximize2,
  CheckCircle2
} from 'lucide-react';

export function StoryboardScreen({ deductCredits }) {
  const [storyboardTitle, setStoryboardTitle] = useState('Chronicles of Neo-Tokyo: The Infiltration');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [chosenModel, setChosenModel] = useState('Nano Banana 2.1');
  const [isBatchRendering, setIsBatchRendering] = useState(false);
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  const [shots, setShots] = useState([
    {
      id: 1,
      name: 'Shot 1: The Skyline Infiltration',
      type: 'Establishing (Extreme Wide)',
      lens: '24mm Anamorphic Wide',
      duration: '3.5s',
      prompt: 'Aerial establishing shot of rain-drenched Neo-Tokyo cyberpunk skyscrapers, volumetric neon purple fog, holographic billboards, 8k cinematic lighting',
      dialogue: 'The grid went dark at midnight. That was our cue.',
      image: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png',
      status: 'Rendered'
    },
    {
      id: 2,
      name: 'Shot 2: The Rooftop Approach',
      type: 'Full Shot (Hero)',
      lens: '35mm Prime',
      duration: '2.8s',
      prompt: 'Cyberpunk operative in matte black techwear coat crouching on rooftop ledge, rain dripping from hood, cybernetic eye glowing amber, cinematic reflections',
      dialogue: 'Security drones on sector 4. Stay below the radar line.',
      image: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792911705124_v1_l6u6.png',
      status: 'Rendered'
    },
    {
      id: 3,
      name: 'Shot 3: The Terminal Hack',
      type: 'Close-Up (Expression)',
      lens: '85mm Portrait Anamorphic',
      duration: '4.0s',
      prompt: 'Dramatic cinematic close-up of operative face illuminated by cyan terminal reflection, intense focused expression, raindrops on skin, shallow depth of field',
      dialogue: 'Decryption key verified. We are inside the core vault.',
      image: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792911009262_v1_3zl3.png',
      status: 'Rendered'
    },
    {
      id: 4,
      name: 'Shot 4: The Cliffside Extraction',
      type: 'Low Angle (Heroic Departure)',
      lens: '50mm Standard Cinematic',
      duration: '3.2s',
      prompt: 'Low angle shot of operative leaping toward waiting hovercraft over stormy coastal horizon at dawn, volumetric mist and golden atmospheric lighting',
      dialogue: 'Extraction point reached. Mission accomplished.',
      image: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910064026_v1_lahk.png',
      status: 'Rendered'
    }
  ]);

  const SHOT_TYPES = [
    'Establishing (Extreme Wide)',
    'Full Shot (Hero)',
    'Medium Shot (Dialogue)',
    'Close-Up (Expression)',
    'Extreme Macro (Detail)',
    'Low Angle (Heroic)',
    'Aerial Drone (Top-Down)'
  ];

  const LENS_PRESETS = [
    '24mm Anamorphic Wide',
    '35mm Prime',
    '50mm Standard Cinematic',
    '85mm Portrait Anamorphic',
    '135mm Telephoto'
  ];

  const handleUpdateShot = (index, field, value) => {
    setShots((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddShot = () => {
    const nextId = shots.length + 1;
    const newShot = {
      id: nextId,
      name: `Shot ${nextId}: Beat Narrative`,
      type: 'Medium Shot (Dialogue)',
      lens: '50mm Standard Cinematic',
      duration: '3.0s',
      prompt: 'Cinematic scene continuation, cohesive atmosphere, volumetric lighting, photorealistic 8k',
      dialogue: 'Next narrative beat dialogue...',
      image: null,
      status: 'Draft'
    };
    setShots([...shots, newShot]);
    setActiveShotIndex(shots.length);
  };

  const handleRemoveShot = (index) => {
    if (shots.length <= 1) return;
    const filtered = shots.filter((_, i) => i !== index);
    setShots(filtered);
    setActiveShotIndex(Math.max(0, index - 1));
  };

  const handleRenderSingleShot = async (index) => {
    const shot = shots[index];
    if (!shot.prompt) return;

    handleUpdateShot(index, 'status', 'Rendering...');
    if (deductCredits) deductCredits(10);

    try {
      const endpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001/api/v1/generate'
        : '/api/generate';

      let res;
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `${shot.prompt}, ${shot.type}, shot on ${shot.lens}, award-winning cinematography, 8k resolution`,
            model: chosenModel,
            aspect_ratio: aspectRatio,
            variants: 1,
            project_id: storyboardTitle
          })
        });
      } catch (e) {
        res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `${shot.prompt}, ${shot.type}, shot on ${shot.lens}, award-winning cinematography, 8k resolution`,
            model: chosenModel,
            aspect_ratio: aspectRatio,
            variants: 1,
            project_id: storyboardTitle
          })
        });
      }

      if (res && res.ok) {
        const data = await res.json();
        const outputUrl = data.image_url || data.images?.[0]?.url;
        if (outputUrl) {
          handleUpdateShot(index, 'image', outputUrl);
          handleUpdateShot(index, 'status', 'Rendered');
        }
      } else {
        handleUpdateShot(index, 'status', 'Failed');
      }
    } catch (err) {
      handleUpdateShot(index, 'status', 'Failed');
    }
  };

  const handleRenderAllShots = async () => {
    setIsBatchRendering(true);
    for (let i = 0; i < shots.length; i++) {
      setActiveShotIndex(i);
      await handleRenderSingleShot(i);
    }
    setIsBatchRendering(false);
  };

  const currentShot = shots[activeShotIndex] || shots[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e0e16] p-6 rounded-3xl border border-[#1c1c28] shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Film className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Cinematic Storyboard Studio</span>
            <span className="text-xs text-slate-500">• {shots.length} Narrative Beats</span>
          </div>
          <input
            type="text"
            value={storyboardTitle}
            onChange={(e) => setStoryboardTitle(e.target.value)}
            className="text-xl md:text-2xl font-black text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-purple-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="bg-[#08080c] border border-[#1f1f2e] text-slate-200 text-xs rounded-xl px-3 py-2 font-medium"
          >
            <option value="16:9">16:9 Cinematic</option>
            <option value="21:9">21:9 Anamorphic</option>
            <option value="9:16">9:16 Vertical Reel</option>
          </select>

          <button
            onClick={handleRenderAllShots}
            disabled={isBatchRendering}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {isBatchRendering ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Batch Rendering Sequence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Render All Shots</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Grid (Left Shot Editor 5 Cols, Right Live Preview 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Shot Configuration Panel */}
        <div className="lg:col-span-5 space-y-5 bg-[#0e0e16] border border-[#1c1c28] p-6 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between border-b border-[#181824] pb-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" />
              <span>Shot #{activeShotIndex + 1} Directives</span>
            </span>
            <button
              onClick={() => handleRemoveShot(activeShotIndex)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Shot</span>
            </button>
          </div>

          {/* Shot Name & Type */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400">Shot Name</label>
              <input
                type="text"
                value={currentShot.name}
                onChange={(e) => handleUpdateShot(activeShotIndex, 'name', e.target.value)}
                className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400">Framing / Shot Type</label>
                <select
                  value={currentShot.type}
                  onChange={(e) => handleUpdateShot(activeShotIndex, 'type', e.target.value)}
                  className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] rounded-xl px-2.5 py-2 text-xs text-slate-200"
                >
                  {SHOT_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">Camera Lens</label>
                <select
                  value={currentShot.lens}
                  onChange={(e) => handleUpdateShot(activeShotIndex, 'lens', e.target.value)}
                  className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] rounded-xl px-2.5 py-2 text-xs text-slate-200"
                >
                  {LENS_PRESETS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Visual Action Prompt */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-300">Visual Action / Environment Prompt</label>
            <textarea
              rows={3}
              value={currentShot.prompt}
              onChange={(e) => handleUpdateShot(activeShotIndex, 'prompt', e.target.value)}
              className="w-full bg-[#08080c] border border-[#1f1f2e] rounded-xl p-3 text-xs text-slate-200 resize-none focus:outline-none focus:border-purple-500"
              placeholder="Describe the action, lighting, actor expression, and backdrop..."
            />
          </div>

          {/* Spoken Dialogue / Voiceover Beat */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">Script Dialogue / Voice Beat</label>
            <input
              type="text"
              value={currentShot.dialogue}
              onChange={(e) => handleUpdateShot(activeShotIndex, 'dialogue', e.target.value)}
              className="w-full bg-[#08080c] border border-[#1f1f2e] rounded-xl px-3 py-2 text-xs text-slate-300 italic focus:outline-none focus:border-purple-500"
              placeholder="Narration or character dialogue spoken during this shot..."
            />
          </div>

          {/* Render Action */}
          <button
            onClick={() => handleRenderSingleShot(activeShotIndex)}
            disabled={currentShot.status === 'Rendering...'}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {currentShot.status === 'Rendering...' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing Shot #{activeShotIndex + 1}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Render Shot #{activeShotIndex + 1}</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Large Selected Shot Stage Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#0e0e16] border border-[#1c1c28] aspect-video shadow-2xl flex items-center justify-center group">
            {currentShot.image ? (
              <img
                src={currentShot.image}
                alt={currentShot.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8 space-y-3">
                <Camera className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-400">Unrendered Storyboard Beat</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Click "Render Shot #{activeShotIndex + 1}" to synthesize this scene framing with Nano Banana Pro.
                </p>
              </div>
            )}

            {/* Floating Info Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/10">
                {currentShot.type}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-purple-600/80 backdrop-blur-md text-white text-[11px] font-mono">
                {currentShot.lens}
              </span>
            </div>

            {currentShot.dialogue && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                <p className="text-xs font-medium text-slate-200 italic">
                  "{currentShot.dialogue}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sequential Storyboard Timeline Strip */}
      <div className="bg-[#0e0e16] border border-[#1c1c28] p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-purple-400" />
            <span>Narrative Sequence Reel ({shots.length} Shots)</span>
          </span>
          <button
            onClick={handleAddShot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600 text-xs font-semibold hover:text-white transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Next Shot</span>
          </button>
        </div>

        {/* Thumbnail Film Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
          {shots.map((shot, idx) => {
            const isSelected = activeShotIndex === idx;
            return (
              <div
                key={shot.id}
                onClick={() => setActiveShotIndex(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all ${
                  isSelected
                    ? 'border-purple-500 ring-2 ring-purple-500/40 shadow-xl scale-[1.02]'
                    : 'border-[#1f1f2e] hover:border-slate-600 bg-[#08080c]'
                }`}
              >
                <div className="aspect-video bg-black/50 relative">
                  {shot.image ? (
                    <img src={shot.image} alt={shot.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Camera className="w-5 h-5" />
                    </div>
                  )}
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-purple-300 font-bold">
                    #{idx + 1}
                  </span>
                  <span className={`absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono ${
                    shot.status === 'Rendered' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {shot.status}
                  </span>
                </div>
                <div className="p-2.5 bg-[#0e0e16]">
                  <div className="text-[11px] font-semibold text-white truncate">{shot.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{shot.type}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
