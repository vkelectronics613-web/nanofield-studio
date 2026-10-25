import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  Upload, 
  X, 
  Download, 
  Share2, 
  RefreshCw, 
  ChevronDown, 
  SlidersHorizontal,
  Check,
  Maximize2
} from 'lucide-react';

export function CreateScreen({ initialPrompt = '', deductCredits }) {
  const [activeMode, setActiveMode] = useState('text-to-image');
  const [prompt, setPrompt] = useState(
    initialPrompt || 'A golden retriever wearing cool sunglasses at the beach, cinematic lighting, photorealistic 8k'
  );
  const [model, setModel] = useState('Nano Banana 2.1');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [numImages, setNumImages] = useState(4);
  const [references, setReferences] = useState([
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');

  // 4 outputs like screen 2
  const [results, setResults] = useState([
    {
      id: 'r1',
      url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 1'
    },
    {
      id: 'r2',
      url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 2'
    },
    {
      id: 'r3',
      url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 3'
    },
    {
      id: 'r4',
      url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 4'
    }
  ]);

  const handleEnhancePrompt = () => {
    setPrompt((prev) => 
      prev + ', 8k resolution, award-winning cinematography, ultra-detailed textures, volumetric lighting, photorealistic'
    );
  };

  const handleAddSampleReference = () => {
    if (references.length < 3) {
      setReferences([...references, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80']);
    }
  };

  const handleRemoveReference = (index) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  const handleStartGeneration = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationStage('Dispatching to Nano Field API Worker...');
    deductCredits(10);

    try {
      // Attempt live generation via local API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      // Call live Nano Field API Engine with selected variants
      let res;
      try {
        res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            model,
            aspect_ratio: aspectRatio,
            variants: numImages
          }),
          signal: controller.signal
        });
      } catch (err) {
        // Fallback to local port if running outside Vercel
        res = await fetch('http://localhost:3001/api/v1/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            model,
            aspect_ratio: aspectRatio,
            variants: numImages
          }),
          signal: controller.signal
        });
      }

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          const liveResults = data.images.map((img, idx) => ({
            id: `live-${Date.now()}-${idx}`,
            url: img.url,
            label: `Variant ${img.variant || idx + 1} (${model})`
          }));
          setResults(liveResults);
        } else if (data.image_url) {
          setResults([
            { id: `live-${Date.now()}`, url: data.image_url, label: `${model} (Live)` }
          ]);
        }
      } else {
        throw new Error('API offline, running studio preview');
      }
    } catch {
      // Graceful fallback preview simulation
      setGenerationProgress(50);
      setGenerationStage('Rendering preview variations...');
      await new Promise(r => setTimeout(r, 2000));
    } finally {
      setGenerationProgress(100);
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Control Panel (5 Cols) */}
      <div className="lg:col-span-5 space-y-5 bg-[#0e0e16] border border-[#1c1c28] p-6 rounded-3xl shadow-2xl">
        {/* Mode Tabs */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Creation Mode</div>
          <div className="grid grid-cols-3 gap-1 bg-[#08080c] p-1.5 rounded-2xl border border-[#181824]">
            {[
              { id: 'text-to-image', label: 'Text to Image' },
              { id: 'image-to-image', label: 'Image to Image' },
              { id: 'multi-reference', label: 'Multi-Reference' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`py-2 px-2 text-xs font-semibold rounded-xl transition-all ${
                  activeMode === m.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">Visual Prompt</span>
            <button 
              onClick={handleEnhancePrompt}
              className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto-Enhance</span>
            </button>
          </div>
          <div className="relative">
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your scene or type @ to mention a character..."
              className="w-full p-3.5 bg-[#08080c] border border-[#1f1f2e] rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/40 transition-all resize-none leading-relaxed"
            />
            <div className="absolute right-3 bottom-3 text-[10px] text-slate-500 font-mono">
              {prompt.length}/800
            </div>
          </div>

          {/* Quick Style Presets (Higgsfield Style) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
            <span className="text-slate-500 shrink-0 font-medium">Style:</span>
            {[
              { label: 'Cinematic 35mm', tag: 'shot on 35mm Kodak film, anamorphic lens flare, moody volumetric lighting' },
              { label: 'Hyper-Realistic', tag: 'photorealistic 8k, raw studio lighting, ultra-detailed skin textures' },
              { label: 'Cyberpunk', tag: 'cyberpunk neon hues, reflective wet asphalt, glowing holograms' },
              { label: 'Anime Studio', tag: 'vibrant anime aesthetic, Makoto Shinkai lighting, detailed clouds' }
            ].map((st, i) => (
              <button
                key={i}
                onClick={() => setPrompt((prev) => prev + `, ${st.tag}`)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-[#14141e] border border-[#20202e] hover:border-purple-500/50 text-slate-300 hover:text-white transition-colors"
              >
                +{st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reference Images */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Reference Images ({references.length}/3)</span>
            <span className="text-[10px] text-slate-500">Guides style and composition</span>
          </div>

          <div className="flex items-center gap-2">
            {references.map((ref, idx) => (
              <div key={idx} className="relative group w-16 h-16 rounded-xl overflow-hidden border border-purple-500/40 bg-slate-950">
                <img src={ref} alt="ref" className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleRemoveReference(idx)}
                  className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {references.length < 3 && (
              <button 
                onClick={handleAddSampleReference}
                className="w-16 h-16 rounded-xl border border-dashed border-slate-700 hover:border-purple-500/60 flex flex-col items-center justify-center text-slate-400 hover:text-purple-300 transition-all bg-slate-950/40"
              >
                <Upload className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-medium">+ Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Settings Row: Model & Number */}
        <div className="grid grid-cols-2 gap-3">
          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Model</label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:border-purple-500/60"
              >
                <option value="Nano Banana 2.1">🍌 Nano Banana 2.1 (Flagship)</option>
                <option value="Nano Banana Pro">🍌 Nano Banana Pro (Maximum Quality)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Number of Images */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Variations</label>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[1, 2, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumImages(n)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    numImages === n 
                      ? 'bg-purple-600 text-white font-semibold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">Aspect Ratio</label>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { id: '16:9', label: '16:9', icon: '▭' },
              { id: '1:1', label: '1:1', icon: '◻' },
              { id: '9:16', label: '9:16', icon: '▯' },
              { id: '4:3', label: '4:3', icon: '▭' },
              { id: '3:4', label: '3:4', icon: '▯' }
            ].map((ratio) => (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-medium transition-all ${
                  aspectRatio === ratio.id
                    ? 'border-purple-500 bg-purple-500/20 text-purple-200 font-semibold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] mb-0.5 opacity-60">{ratio.icon}</div>
                <div>{ratio.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleStartGeneration}
          disabled={isGenerating}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all ${
            isGenerating
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30 active:scale-[0.99]'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
              <span>Generating ({generationProgress}%)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-mono font-normal">
                • 10 credits
              </span>
            </>
          )}
        </button>
      </div>

      {/* Right Outputs Panel (7 Cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Generated Images</h2>
            <p className="text-xs text-slate-400">Rendered in high resolution with {model}</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Download All</span>
          </button>
        </div>

        {/* Generation Loading State */}
        {isGenerating && (
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/40 space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 animate-pulse">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{generationStage}</div>
              <div className="text-xs text-purple-300 mt-1">Multi-account worker active on Nano Field Cloud Engine</div>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* 2x2 Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {results.slice(0, numImages).map((item) => (
            <div 
              key={item.id} 
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-xl aspect-video"
            >
              <img 
                src={item.url} 
                alt={item.label} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
                <span className="text-xs font-semibold text-white">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900/90 text-slate-200 hover:text-white hover:bg-purple-600 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <button className="p-1.5 rounded-lg bg-slate-900/90 text-slate-200 hover:text-white hover:bg-purple-600 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
