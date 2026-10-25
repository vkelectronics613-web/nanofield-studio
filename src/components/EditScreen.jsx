import React, { useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Download, 
  RefreshCw, 
  Wand2, 
  ArrowLeftRight, 
  Scissors, 
  Maximize2, 
  Crop, 
  Mic, 
  Volume2, 
  Languages, 
  CheckCircle2, 
  Play, 
  Layers,
  ChevronDown
} from 'lucide-react';

export function EditScreen({ deductCredits }) {
  // Active editing mode: 'prompt-edit', 'bg-remove', 'upscale-4k', 'reframe', 'lipsync-dub'
  const [activeTool, setActiveTool] = useState('prompt-edit');

  const [instruction, setInstruction] = useState(
    'Change the background to a luxury cybernetic penthouse overlooking neon rain, keeping the character lighting consistent'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeView, setActiveView] = useState('slider'); // 'slider' or 'split'

  // Image source & edited output
  const [originalImage, setOriginalImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  );
  const [editedImage, setEditedImage] = useState(
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  );

  // Re-framing / Outpainting targets
  const [targetRatio, setTargetRatio] = useState('21:9');

  // Lip Sync & AI Dubbing (18 Languages) State
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [dubbingSpeaker, setDubbingSpeaker] = useState('Aman (Natural Docu)');
  const [dubbingText, setDubbingText] = useState(
    'Welcome to Nano Field Studio. Here you can direct and create cinematic visuals with pure imagination.'
  );
  const [isPlayingDub, setIsPlayingDub] = useState(false);

  const LANGUAGES_18 = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', voice: 'Aman' },
    { code: 'en', name: 'English', native: 'English', voice: 'James' },
    { code: 'es', name: 'Spanish', native: 'Español', voice: 'Mateo' },
    { code: 'fr', name: 'French', native: 'Français', voice: 'Camille' },
    { code: 'de', name: 'German', native: 'Deutsch', voice: 'Felix' },
    { code: 'ja', name: 'Japanese', native: '日本語', voice: 'Kenji' },
    { code: 'ko', name: 'Korean', native: '한국어', voice: 'Min-ho' },
    { code: 'zh', name: 'Mandarin', native: '中文', voice: 'Wei' },
    { code: 'pt', name: 'Portuguese', native: 'Português', voice: 'Lucas' },
    { code: 'it', name: 'Italian', native: 'Italiano', voice: 'Marco' },
    { code: 'ar', name: 'Arabic', native: 'العربية', voice: 'Tariq' },
    { code: 'ru', name: 'Russian', native: 'Русский', voice: 'Dmitri' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe', voice: 'Emre' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands', voice: 'Lars' },
    { code: 'pl', name: 'Polish', native: 'Polski', voice: 'Jakub' },
    { code: 'sv', name: 'Swedish', native: 'Svenska', voice: 'Astrid' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa', voice: 'Budi' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', voice: 'Minh' }
  ];

  // Execute AI Transformation via Nano Field API
  const handleExecuteTool = async () => {
    setIsProcessing(true);
    deductCredits(10);

    if (activeTool === 'prompt-edit') {
      setProcessingStage('Synthesizing inpainting mask & restyling scene...');
    } else if (activeTool === 'bg-remove') {
      setProcessingStage('Isolating foreground subject and clipping alpha channel...');
    } else if (activeTool === 'upscale-4k') {
      setProcessingStage('Synthesizing 4K super-resolution texture layers...');
    } else if (activeTool === 'reframe') {
      setProcessingStage(`Expanding canvas to ${targetRatio} Ultra-Wide with generative outpainting...`);
    } else if (activeTool === 'lipsync-dub') {
      setProcessingStage(`Synthesizing ${selectedLanguage} neural phonemes & aligning lip mesh...`);
    }

    try {
      let promptPayload = instruction;
      if (activeTool === 'bg-remove') {
        promptPayload = 'isolated sticker cutout of person, transparent background silhouette, pure studio lighting, sharp borders';
      } else if (activeTool === 'upscale-4k') {
        promptPayload = 'ultra-high resolution 4k sharp details, master skin pores, crisp cloth textures, photorealistic raw photography';
      } else if (activeTool === 'reframe') {
        promptPayload = `extended wide angle panorama in ${targetRatio} ratio, cinematic environment continuation`;
      }

      const res = await fetch('http://localhost:3001/api/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptPayload,
          model: 'Nano Banana Pro',
          aspect_ratio: activeTool === 'reframe' ? (targetRatio === '21:9' ? '16:9' : targetRatio) : '16:9',
          variants: 1
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.image_url) {
          setEditedImage(data.image_url);
        }
      }
    } catch (err) {
      console.warn('AI Editor note:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulateDubAudio = () => {
    setIsPlayingDub(true);
    setTimeout(() => {
      setIsPlayingDub(false);
    }, 3500);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sliders className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">AI Image Editor</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              TIMELINE-FREE
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Prompt-based generative editor: background removal, 4K upscaling, re-framing, and 18-language AI dubbing & lip sync.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveView('slider')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeView === 'slider'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Split Slider
          </button>
          <button
            onClick={() => setActiveView('split')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeView === 'split'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {/* Editor Tool Switcher Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 shadow-xl">
        {[
          { id: 'prompt-edit', label: 'Prompt Inpainting', icon: Wand2, desc: 'Natural Language' },
          { id: 'bg-remove', label: 'Background Removal', icon: Scissors, desc: 'Sticker Cutout' },
          { id: 'upscale-4k', label: '4K Upscaling', icon: Maximize2, desc: 'Detail Enhancer' },
          { id: 'reframe', label: 'Re-framing / Outpaint', icon: Crop, desc: '21:9 & 16:9 Expand' },
          { id: 'lipsync-dub', label: 'Lip Sync & Dubbing', icon: Languages, desc: '18 Languages' }
        ].map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <span className="text-xs font-bold leading-tight">{tool.label}</span>
              </div>
              <div className={`text-[10px] ${isActive ? 'text-purple-200' : 'text-slate-500'}`}>{tool.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Main Studio Console & Canvas Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Tool Settings (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl">
          {/* Tool 1: Prompt Inpainting */}
          {activeTool === 'prompt-edit' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white">Natural Language Edit Instruction</label>
                <p className="text-[11px] text-slate-400 mt-0.5">Describe what to add, replace, or alter</p>
              </div>
              <textarea
                rows={4}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/70 resize-none leading-relaxed"
                placeholder="Change jacket to black leather, make lighting golden hour..."
              />
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-500">Quick Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Add neon violet rim lighting',
                    'Swap background to rainy Tokyo night',
                    'Make outfit high-fashion haute couture',
                    'Add film grain & chromatic aberration'
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setInstruction(p)}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-purple-500/50 hover:text-white transition-all text-left"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tool 2: Background Removal */}
          {activeTool === 'bg-remove' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white">One-Click AI Background Removal</label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Isolates subjects with hair-level precision, perfect for Stickman Hybrid sticker cutouts.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sub-Pixel Alpha Feathering</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Generates clean transparent PNG or pure studio white backdrop ready for overlay into any scene or collage card.
                </p>
              </div>
            </div>
          )}

          {/* Tool 3: 4K Upscaling */}
          {activeTool === 'upscale-4k' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white">4K Super-Resolution Detail Enhancer</label>
                <p className="text-[11px] text-slate-400 mt-0.5">Synthesizes photorealistic microscopic textures</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Target Resolution</div>
                  <div className="text-sm font-bold text-white mt-1">3840 × 2160</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Scale Factor</div>
                  <div className="text-sm font-bold text-purple-300 mt-1">4× Neural Upscale</div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 4: Re-framing & Outpainting */}
          {activeTool === 'reframe' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white">Generative Re-Framing & Outpainting</label>
                <p className="text-[11px] text-slate-400 mt-0.5">Expand boundaries to widescreen or portrait</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['21:9', '16:9', '9:16'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setTargetRatio(r)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                      targetRatio === r
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tool 5: Lip Sync & Dubbing (18 Languages) */}
          {activeTool === 'lipsync-dub' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white">AI Dubbing & Lip Sync (18 Languages)</label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Synchronize facial phonemes with natural speech in 18 global languages.
                </p>
              </div>

              {/* Language Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">Target Language (18 Available)</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  {LANGUAGES_18.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name} ({lang.native}) • Speaker {lang.voice}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dubbing Script Text */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">Dialogue / Narration Lines</label>
                <textarea
                  rows={3}
                  value={dubbingText}
                  onChange={(e) => setDubbingText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 resize-none"
                />
              </div>

              {/* Audio Waveform Simulator */}
              <button
                onClick={handleSimulateDubAudio}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 flex items-center justify-center gap-2 text-xs font-semibold hover:border-purple-500/50 transition-colors"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingDub ? 'text-green-400 animate-pulse' : ''}`} />
                <span>{isPlayingDub ? 'Playing Neural Speech Preview...' : 'Audition Voice Track'}</span>
              </button>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleExecuteTool}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing AI Operation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Apply Generative Edit</span>
              </>
            )}
          </button>
        </div>

        {/* Right Viewport (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Generative Canvas Inspection</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    Before / After
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Drag slider to compare original vs AI edit</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={editedImage}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Result</span>
                </a>
              </div>
            </div>

            {/* Slider View */}
            {activeView === 'slider' && (
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 aspect-[16/9] select-none">
                {/* Edited Image (Bottom Layer) */}
                <img src={editedImage} alt="Edited" className="absolute inset-0 w-full h-full object-cover" />

                {/* Original Image (Top Layer clipped by slider) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={originalImage}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-xl text-[10px] font-bold text-white">
                    Original Source
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-purple-600/80 border border-purple-400/50 px-2.5 py-1 rounded-xl text-[10px] font-bold text-white">
                  AI Output
                </div>

                {/* Vertical Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center text-xs font-bold">
                    ⇄
                  </div>
                </div>

                {/* Transparent Slider Range Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />

                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-30">
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                    <div className="text-sm font-semibold text-white">{processingStage}</div>
                  </div>
                )}
              </div>
            )}

            {/* Side-by-Side Split View */}
            {activeView === 'split' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 aspect-video">
                  <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-slate-950/80 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white">
                    Before
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-black border border-purple-500/50 aspect-video">
                  <img src={editedImage} alt="Edited" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-purple-600/90 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white">
                    After (AI Edit)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
