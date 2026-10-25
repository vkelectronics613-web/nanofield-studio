import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Upload, 
  X, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  SlidersHorizontal,
  Maximize2,
  Trash2,
  Scan,
  MessageSquare,
  Paintbrush,
  HelpCircle,
  Plus,
  Minus,
  Check,
  Eye,
  Info
} from 'lucide-react';
import { StudioToolsMenu } from './StudioToolsMenu';

// Official 4-color Google G icon
function GoogleLogo({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  );
}

export function CreateScreen({ initialPrompt = '', deductCredits, onSelectTool, onNavigate }) {
  const [prompt, setPrompt] = useState(
    initialPrompt || "A cat sitting on a table, warm morning light, photorealistic 8k, sharp focus"
  );
  const [model, setModel] = useState('Nano Banana 2');
  const [aspectRatio, setAspectRatio] = useState('4:3');
  const [resolution, setResolution] = useState('1K');
  const [numImages, setNumImages] = useState(1);
  const [autoPolish, setAutoPolish] = useState(true);
  const [isExpandedPrompt, setIsExpandedPrompt] = useState(false);

  // Reference images (up to 14)
  const [references, setReferences] = useState([]);
  const fileInputRef = useRef(null);

  // Modals & Drawers
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const toolsMenuRef = useRef(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);

  // Initial gallery outputs
  const [results, setResults] = useState([
    {
      id: 'r1',
      url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 1'
    },
    {
      id: 'r2',
      url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 2'
    },
    {
      id: 'r3',
      url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 3'
    },
    {
      id: 'r4',
      url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
      label: 'Variant 4'
    }
  ]);

  // Click outside to close tools menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setShowToolsMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEnhancePrompt = () => {
    setPrompt((prev) => 
      prev + ', award-winning cinematography, ultra-detailed 8k resolution, photorealistic raw photography, volumetric light rays'
    );
  };

  const handleCycleAspect = () => {
    const ratios = ['4:3', '16:9', '1:1', '9:16', '21:9', '3:4'];
    const nextIdx = (ratios.indexOf(aspectRatio) + 1) % ratios.length;
    setAspectRatio(ratios[nextIdx]);
  };

  const handleUploadReferences = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newUrls = files.slice(0, 14 - references.length).map(file => URL.createObjectURL(file));
    setReferences(prev => [...prev, ...newUrls].slice(0, 14));
  };

  const handleRemoveReference = (index) => {
    setReferences(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartGeneration = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerationProgress(20);
    setGenerationStage('Synthesizing prompt with Google Nano Banana Engine...');

    const creditsCost = numImages * 20;
    if (deductCredits) deductCredits(creditsCost);

    const finalPrompt = autoPolish
      ? `${prompt}, ultra-high fidelity, master composition, photorealistic raw textures, 8k resolution`
      : prompt;

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
            prompt: finalPrompt,
            model,
            aspect_ratio: aspectRatio,
            variants: numImages
          })
        });
      } catch (err) {
        // Fallback to /api/generate
        res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: finalPrompt,
            model,
            aspect_ratio: aspectRatio,
            variants: numImages
          })
        });
      }

      if (res && res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          const liveResults = data.images.map((img, idx) => ({
            id: `live-${Date.now()}-${idx}`,
            url: img.url || img.official_url,
            label: `Variant ${img.variant || idx + 1}`
          }));
          setResults(liveResults);
        } else if (data.image_url) {
          setResults([
            { id: `live-${Date.now()}`, url: data.image_url, label: `${model} (Live)` }
          ]);
        }
      }
    } catch (e) {
      console.warn('Generation status note:', e);
    } finally {
      setGenerationProgress(100);
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Control Column (Exact UI matching screenshot) - 5 Cols */}
      <div className="lg:col-span-5 space-y-3.5 max-w-lg mx-auto w-full">
        
        {/* SECTION 1: Create Image Header Card */}
        <div 
          onClick={() => setShowInfoModal(!showInfoModal)}
          className="flex items-center justify-between p-3.5 bg-[#12121a] border border-[#20202e] rounded-2xl hover:border-slate-700 transition-all cursor-pointer shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-purple-500/30 shrink-0 bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 p-0.5 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=120&q=80"
                alt="Avatar"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm">Create Image</span>
              <span className="text-slate-400 hover:text-slate-200 p-0.5">
                <HelpCircle className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </div>

        {/* SECTION 2: Model Row Card */}
        <div className="relative">
          <div 
            onClick={() => setShowModelPicker(!showModelPicker)}
            className="flex items-center justify-between p-3.5 bg-[#12121a] border border-[#20202e] rounded-2xl hover:border-purple-500/40 transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#181824] border border-[#262638] flex items-center justify-center shrink-0 shadow-inner">
                <GoogleLogo className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Model</div>
                <div className="text-sm font-bold text-white">{model}</div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${showModelPicker ? 'rotate-90' : ''}`} />
          </div>

          {/* Model Picker Drawer */}
          {showModelPicker && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-[#28283c] rounded-2xl p-2 shadow-2xl z-40 space-y-1 backdrop-blur-xl animate-in fade-in duration-150">
              {[
                { name: 'Nano Banana 2', badge: 'Default', desc: 'Ultra-fast high fidelity 1K/2K generation' },
                { name: 'Nano Banana 2.1', badge: 'Flagship', desc: 'Balanced photorealism & typography' },
                { name: 'Nano Banana Pro', badge: '4K Pro', desc: 'Maximum anatomical detail & cinematic textures' }
              ].map((m) => (
                <button
                  key={m.name}
                  onClick={() => {
                    setModel(m.name);
                    setShowModelPicker(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                    model === m.name
                      ? 'bg-purple-600/20 text-white border border-purple-500/40 font-bold'
                      : 'text-slate-300 hover:bg-[#1a1a26]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{m.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-normal mt-0.5">{m.desc}</p>
                  </div>
                  {model === m.name && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: Describe your image (Main Prompt Box) */}
        <div className="bg-[#12121a] border border-[#20202e] rounded-2xl p-4 space-y-3.5 shadow-xl">
          {/* Card Title & Expand */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Describe your image</span>
            <button 
              onClick={() => setIsExpandedPrompt(!isExpandedPrompt)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50 transition-colors"
              title="Expand text area"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Add Visual References Zone (Highlighted with Neon Magenta Border) */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative overflow-hidden rounded-2xl border-2 border-fuchsia-500/90 bg-gradient-to-r from-[#220d2a] via-[#1a0f26] to-[#140b20] p-3 flex items-center justify-between cursor-pointer hover:border-fuchsia-400 transition-all shadow-[0_0_22px_rgba(217,70,239,0.22)] group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Overlapping mini photo deck */}
              <div className="relative w-12 h-9 shrink-0 flex items-center">
                <div className="absolute left-0 w-7 h-9 rounded-md overflow-hidden border border-fuchsia-400/50 shadow -rotate-12 bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="1" className="w-full h-full object-cover" />
                </div>
                <div className="absolute left-2.5 w-7 h-9 rounded-md overflow-hidden border border-fuchsia-400/70 shadow -rotate-3 bg-slate-900 z-10">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="2" className="w-full h-full object-cover" />
                </div>
                <div className="absolute left-5 w-7 h-9 rounded-md overflow-hidden border border-fuchsia-400 shadow rotate-6 bg-slate-900 z-20">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80" alt="3" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-white truncate">Add visual references</span>
                  <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.2 rounded font-medium">Optional</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">JPEG/PNG/WEBP, 20 MB max</p>
              </div>
            </div>

            <div className="text-xs font-mono font-semibold text-slate-400 shrink-0 ml-2">
              {references.length}/14
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUploadReferences}
            />
          </div>

          {/* Active Reference Thumbnails */}
          {references.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {references.map((ref, idx) => (
                <div key={idx} className="relative group w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-fuchsia-500/50">
                  <img src={ref} alt="ref" className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveReference(idx); }}
                    className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
              {references.length < 14 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-11 h-11 rounded-lg border border-dashed border-slate-700 hover:border-fuchsia-500 flex items-center justify-center text-slate-400 hover:text-white shrink-0 text-xs"
                >
                  +
                </button>
              )}
            </div>
          )}

          {/* Textarea */}
          <textarea
            rows={isExpandedPrompt ? 8 : 4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What do you want to see? Example: 'A cat sitting on a table, warm morning light.'"
            className="w-full bg-transparent text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed py-1"
          />

          {/* Card Bottom Toolbar */}
          <div className="pt-2 border-t border-[#1c1c28] flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Aspect Quick Cycle */}
              <button
                onClick={handleCycleAspect}
                title={`Cycle aspect ratio (current: ${aspectRatio})`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                <Scan className="w-4 h-4" />
              </button>

              {/* Auto Enhance Prompt */}
              <button
                onClick={handleEnhancePrompt}
                title="Polish & auto-enhance prompt"
                className="p-1.5 rounded-lg text-slate-400 hover:text-fuchsia-300 hover:bg-slate-800/60 transition-colors"
              >
                <Wand2 className="w-4 h-4" />
              </button>

              {/* Clear Prompt */}
              <button
                onClick={() => setPrompt('')}
                title="Clear prompt"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Auto Polish Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Auto Polish</span>
              <button
                type="button"
                role="switch"
                aria-checked={autoPolish}
                onClick={() => setAutoPolish(!autoPolish)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${
                  autoPolish ? 'bg-fuchsia-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    autoPolish ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: Output Format Row Card */}
        <div className="relative">
          <div 
            onClick={() => setShowOutputModal(!showOutputModal)}
            className="flex items-center justify-between p-3.5 bg-[#12121a] border border-[#20202e] rounded-2xl hover:border-purple-500/40 transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#181824] border border-[#262638] flex items-center justify-center shrink-0 text-slate-300 shadow-inner">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Output</div>
                <div className="text-sm font-bold text-white">{aspectRatio} | {resolution}</div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${showOutputModal ? 'rotate-90' : ''}`} />
          </div>

          {/* Output Format Settings Dropdown */}
          {showOutputModal && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-[#28283c] rounded-2xl p-4 shadow-2xl z-40 space-y-3.5 backdrop-blur-xl animate-in fade-in duration-150">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aspect Ratio</label>
                <div className="grid grid-cols-6 gap-1.5">
                  {['4:3', '16:9', '1:1', '9:16', '21:9', '3:4'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all ${
                        aspectRatio === r
                          ? 'bg-fuchsia-600 text-white shadow'
                          : 'bg-[#181824] text-slate-400 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resolution</label>
                <div className="grid grid-cols-3 gap-2">
                  {['1K', '2K', '4K'].map((res) => (
                    <button
                      key={res}
                      onClick={() => setResolution(res)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                        resolution === res
                          ? 'bg-purple-600 text-white shadow'
                          : 'bg-[#181824] text-slate-400 hover:text-white'
                      }`}
                    >
                      {res} ({res === '1K' ? 'Standard' : res === '2K' ? 'HD' : 'Ultra 4K'})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: Stepper + Generate Button */}
        <div className="flex items-center gap-2.5">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-[#12121a] border border-[#20202e] rounded-2xl px-3 py-2.5 h-12 shadow-lg">
            <button
              onClick={() => setNumImages(Math.max(1, numImages - 1))}
              disabled={numImages <= 1}
              className="text-slate-400 hover:text-white disabled:opacity-30 p-1 text-sm font-bold cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <div className="mx-2 text-xs font-mono select-none">
              <strong className="text-white text-sm">{numImages}</strong>
              <span className="text-slate-500"> / 8</span>
            </div>
            <button
              onClick={() => setNumImages(Math.min(8, numImages + 1))}
              disabled={numImages >= 8}
              className="text-slate-400 hover:text-white disabled:opacity-30 p-1 text-sm font-bold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Generate Button with Sparkle & Credits */}
          <button
            onClick={handleStartGeneration}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#86198f] via-[#a21caf] to-[#c026d3] hover:from-[#701a75] hover:to-[#a21caf] text-white font-bold text-sm tracking-wide shadow-xl shadow-fuchsia-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-fuchsia-200" />
                <span>Generating ({generationProgress}%)...</span>
              </>
            ) : (
              <>
                <span>Generate</span>
                <Sparkles className="w-4 h-4 fill-white text-white" />
                <span>{numImages * 20}</span>
              </>
            )}
          </button>
        </div>

        {/* SECTION 6: Bottom Navigation Switcher (Chat + Tools Button) */}
        <div className="flex items-center justify-between pt-1 relative" ref={toolsMenuRef}>
          {/* Chat with NEW badge */}
          <div className="relative">
            <div className="absolute -top-2 left-6 bg-[#22c55e] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow">
              NEW
            </div>
            <button
              onClick={() => setShowChatAssistant(!showChatAssistant)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#12121a] border border-transparent hover:border-[#20202e] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span>Chat</span>
            </button>
          </div>

          {/* Tools Capsule Button */}
          <button
            onClick={() => setShowToolsMenu(!showToolsMenu)}
            className="bg-white text-slate-950 font-bold px-6 py-2.5 rounded-full shadow-2xl hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2 cursor-pointer text-xs"
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span>Tools</span>
          </button>

          {/* Studio Tools Popup Menu (13 Higgsfield AI Tools) */}
          {showToolsMenu && (
            <div className="absolute right-0 bottom-full mb-3 z-50">
              <StudioToolsMenu
                onSelectTool={(tool) => {
                  setShowToolsMenu(false);
                  if (onSelectTool) {
                    onSelectTool(tool);
                  } else if (onNavigate) {
                    if (tool.tab === 'storyboard') onNavigate('storyboard');
                    else if (tool.tab === 'edit') onNavigate('edit', tool.tool);
                  }
                }}
                onClose={() => setShowToolsMenu(false)}
              />
            </div>
          )}
        </div>

        {/* AI Chat Prompt Assistant Box */}
        {showChatAssistant && (
          <div className="p-4 rounded-2xl bg-[#12121a] border border-emerald-500/30 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span>AI Prompt Director Assistant</span>
              </div>
              <button 
                onClick={() => setShowChatAssistant(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-300">
              Click any style direction to inject into your prompt:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Make it hyper-realistic cinematic portrait with shallow depth of field',
                'Transform into Neon Tokyo cyber rain with reflections',
                'Add dramatic golden hour sunset and volumetric lens flares',
                'Minimalist clean commercial studio packshot on obsidian'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(suggestion);
                    setShowChatAssistant(false);
                  }}
                  className="text-[10px] text-left p-1.5 rounded-lg bg-[#08080c] border border-[#20202e] text-slate-300 hover:border-emerald-500 hover:text-white transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info Modal */}
        {showInfoModal && (
          <div className="p-4 rounded-2xl bg-[#12121a] border border-[#262638] space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                <span>About Image Studio</span>
              </span>
              <button onClick={() => setShowInfoModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generate photorealistic, cinematic visuals with Google Nano Banana 2 & Pro models. Attach up to 14 visual references, toggle Auto Polish for prompt expansion, and download 4K assets.
            </p>
          </div>
        )}
      </div>

      {/* Right Canvas / Output Panel (7 Cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between bg-[#101018] border border-[#1e1e2c] p-4 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Studio Viewport</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                {model}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rendered in {aspectRatio} • {resolution} Resolution
            </p>
          </div>
          <button 
            onClick={() => {
              results.forEach(r => {
                const a = document.createElement('a');
                a.href = r.url;
                a.download = `nanofield-${Date.now()}.png`;
                a.target = '_blank';
                a.click();
              });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#08080c] border border-[#20202e] hover:border-purple-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All</span>
          </button>
        </div>

        {/* In-Flight Generation Progress State */}
        {isGenerating && (
          <div className="p-6 rounded-2xl bg-[#101018] border border-fuchsia-500/40 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-fuchsia-600/20 flex items-center justify-center text-fuchsia-400 animate-pulse">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{generationStage}</div>
              <div className="text-xs text-fuchsia-300 mt-1">Multi-account Google Flow engine active with auto-watermark removal</div>
            </div>
            <div className="w-full bg-[#08080c] rounded-full h-2 overflow-hidden border border-[#20202e]">
              <div 
                className="bg-gradient-to-r from-fuchsia-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Gallery Grid Outputs */}
        <div className={`grid gap-4 ${numImages === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {results.slice(0, numImages).map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="group relative rounded-2xl overflow-hidden bg-black border border-[#1e1e2c] shadow-2xl aspect-[4/3]"
            >
              <img 
                src={item.url} 
                alt={item.label} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedPreviewImage(item.url)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between pointer-events-none">
                <span className="text-xs font-semibold text-white">{item.label}</span>
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-[#08080c]/90 border border-[#262638] text-slate-200 hover:text-white hover:bg-fuchsia-600 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <button 
                    onClick={() => setSelectedPreviewImage(item.url)}
                    className="p-1.5 rounded-lg bg-[#08080c]/90 border border-[#262638] text-slate-200 hover:text-white hover:bg-fuchsia-600 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {selectedPreviewImage && (
        <div 
          onClick={() => setSelectedPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img 
              src={selectedPreviewImage} 
              alt="Full Preview" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-slate-800" 
            />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <a
                href={selectedPreviewImage}
                target="_blank"
                rel="noreferrer"
                download
                className="p-2 rounded-xl bg-black/80 text-white hover:bg-purple-600 transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setSelectedPreviewImage(null)}
                className="p-2 rounded-xl bg-black/80 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
