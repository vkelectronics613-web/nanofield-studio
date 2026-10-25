import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Download, 
  RefreshCw, 
  Wand2, 
  Scissors, 
  Maximize2, 
  Crop, 
  Languages, 
  CheckCircle2, 
  Play, 
  Layers,
  ChevronDown,
  Compass,
  Lightbulb,
  CaseSensitive,
  Shirt,
  Camera,
  MousePointerClick,
  Paintbrush,
  Repeat,
  Smile,
  Upload,
  RotateCcw,
  Check,
  Eye,
  Sun,
  Flame,
  Volume2
} from 'lucide-react';

const SAMPLE_PRESETS = [
  {
    id: 'portrait',
    name: 'Cyberpunk Operative',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    type: 'person'
  },
  {
    id: 'fashion',
    name: 'Editorial Fashion Model',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    type: 'person'
  },
  {
    id: 'sneaker',
    name: 'Sneaker Commercial',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    type: 'product'
  },
  {
    id: 'watch',
    name: 'Chronograph Watch',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    type: 'product'
  }
];

export function EditScreen({ deductCredits, initialTool = 'prompt-edit' }) {
  const [activeTool, setActiveTool] = useState(initialTool || 'prompt-edit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeView, setActiveView] = useState('slider'); // 'slider' or 'split'

  // Image source & edited output
  const [originalImage, setOriginalImage] = useState(SAMPLE_PRESETS[0].url);
  const [editedImage, setEditedImage] = useState(
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  );

  useEffect(() => {
    if (initialTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool]);

  // Tool 1: Prompt Inpainting
  const [instruction, setInstruction] = useState(
    'Change the background to a luxury cybernetic penthouse overlooking neon rain, keeping the character lighting consistent'
  );

  // Tool 2: Click to Edit
  const [clickPoint, setClickPoint] = useState({ x: 50, y: 45 });
  const [clickPrompt, setClickPrompt] = useState('Change hair highlight to glowing cyber cyan');

  // Tool 3: Inpaint
  const [brushSize, setBrushSize] = useState(35);
  const [inpaintPrompt, setInpaintPrompt] = useState('Replace with futuristic biometric ocular visor');
  const [invertMask, setInvertMask] = useState(false);

  // Tool 4: Character Swap
  const [selectedChar, setSelectedChar] = useState('Elena (Cyberpunk Operative)');
  const [lockPose, setLockPose] = useState(true);
  const [lockLighting, setLockLighting] = useState(true);

  // Tool 5: Face Swap
  const [selectedFace, setSelectedFace] = useState('Sarah (Asian Editorial Hero)');
  const [faceBlendStrength, setFaceBlendStrength] = useState(85);
  const [matchSkinTone, setMatchSkinTone] = useState(true);

  // Tool 6: Photo Angle Editor
  const [cameraAngle, setCameraAngle] = useState('3/4 Turn (45° Cinematic)');
  const [elevationDeg, setElevationDeg] = useState(15);
  const [focalLength, setFocalLength] = useState('35mm Prime');

  // Tool 7: Relight Studio
  const [relightPreset, setRelightPreset] = useState('Cyberpunk Neon Dual-Tone');
  const [lightDirection, setLightDirection] = useState('Top Left 45°');
  const [lightIntensity, setLightIntensity] = useState(80);
  const [colorTemp, setColorTemp] = useState(3200);

  // Tool 8: Edit Text / Typography
  const [textOverlay, setTextOverlay] = useState('NANO FIELD');
  const [fontStyle, setFontStyle] = useState('Cinematic Serif');
  const [textPosition, setTextPosition] = useState('Lower Third');
  const [textColor, setTextColor] = useState('#E0E7FF');

  // Tool 9: Virtual Try-On (AnyShoot)
  const [garmentStyle, setGarmentStyle] = useState('Matte Black Cyber Techwear Trench');
  const [modelFit, setModelFit] = useState('Runway Haute Couture');
  const [preserveSilhouette, setPreserveSilhouette] = useState(true);

  // Tool 10: Product Photography
  const [productPedestal, setProductPedestal] = useState('Black Obsidian Floating Pedestal');
  const [productEnvironment, setProductEnvironment] = useState('Dark Luxury Minimal Studio with Rim Neon');
  const [depthOfField, setDepthOfField] = useState('f/2.0 Creamy Cinematic Bokeh');

  // Tool 11: Upscale 4K
  const [upscaleFactor, setUpscaleFactor] = useState('4K Ultra Detail (4x)');
  const [faceEnhance, setFaceEnhance] = useState(true);

  // Tool 12: Reframe / Outpaint
  const [targetRatio, setTargetRatio] = useState('21:9');

  // Tool 13: Lip Sync & Dubbing (18 Languages)
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
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

  // Click on viewport to set precision beacon
  const handleCanvasClick = (e) => {
    if (activeTool !== 'click-to-edit') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setClickPoint({ x, y });
  };

  // Execute AI Transformation
  const handleExecuteTool = async () => {
    setIsProcessing(true);
    if (deductCredits) deductCredits(10);

    let promptPayload = '';
    let stageDesc = 'Synthesizing AI transformation...';

    switch (activeTool) {
      case 'prompt-edit':
        promptPayload = instruction;
        stageDesc = 'Synthesizing contextual inpainting mask & restyling scene...';
        break;
      case 'click-to-edit':
        promptPayload = `Precision localized edit at coordinate (${clickPoint.x}%, ${clickPoint.y}%): ${clickPrompt}, natural photographic blend`;
        stageDesc = `Targeting coordinates (${clickPoint.x}%, ${clickPoint.y}%) and applying neural micro-edit...`;
        break;
      case 'inpaint':
        promptPayload = `Generative inpainting fill: ${inpaintPrompt}, brush radius ${brushSize}px, seamless edge feathering`;
        stageDesc = 'Generating inpaint fill with sub-pixel feathering...';
        break;
      case 'char-swap':
        promptPayload = `Character swap subject to ${selectedChar}, locking pose, camera perspective and scene lighting`;
        stageDesc = `Synthesizing persona swap to ${selectedChar} while preserving spatial geometry...`;
        break;
      case 'face-swap':
        promptPayload = `Photorealistic face swap with ${selectedFace}, ${faceBlendStrength}% identity match, synchronized gaze and contact shadows`;
        stageDesc = `Aligning 68 facial landmarks and blending ${selectedFace}...`;
        break;
      case 'photo-angle':
        promptPayload = `Cinematic perspective re-render from ${cameraAngle}, elevation ${elevationDeg} deg, shot on ${focalLength}, master camera geometry`;
        stageDesc = `Re-projecting 3D scene geometry to ${cameraAngle}...`;
        break;
      case 'relight':
        promptPayload = `Cinematic studio relight: ${relightPreset}, key source from ${lightDirection}, ${colorTemp}K temperature, ${lightIntensity}% intensity, photorealistic shadows`;
        stageDesc = `Computing inverse radiosity and casting ${relightPreset}...`;
        break;
      case 'edit-text':
        promptPayload = `Cinematic image with graphic typography overlay reading "${textOverlay}" in ${fontStyle} typeface positioned at ${textPosition}, color ${textColor}, 8k graphic design`;
        stageDesc = `Synthesizing neural typography "${textOverlay}" in ${fontStyle}...`;
        break;
      case 'try-on':
        promptPayload = `High fashion editorial AnyShoot photoshoot: model wearing ${garmentStyle}, ${modelFit} silhouette fit, ultra-detailed fabric drape and textures`;
        stageDesc = `Tailoring ${garmentStyle} onto subject with dynamic fabric physics...`;
        break;
      case 'product-photo':
        promptPayload = `Luxury commercial packshot advertising: product placed on ${productPedestal}, environment ${productEnvironment}, ${depthOfField}, 8k raw commercial photography`;
        stageDesc = `Staging commercial packshot on ${productPedestal}...`;
        break;
      case 'upscale-4k':
        promptPayload = `Ultra-high resolution 4k sharp details, master skin pores, crisp cloth textures, photorealistic raw photography, ${upscaleFactor}`;
        stageDesc = `Synthesizing 4K super-resolution texture layers...`;
        break;
      case 'bg-remove':
        promptPayload = 'isolated sticker cutout of person, transparent background silhouette, pure studio lighting, sharp borders';
        stageDesc = 'Isolating foreground subject and clipping alpha channel...';
        break;
      case 'reframe':
        promptPayload = `extended wide angle panorama in ${targetRatio} ratio, cinematic environment continuation`;
        stageDesc = `Expanding canvas to ${targetRatio} with generative outpainting...`;
        break;
      case 'lipsync-dub':
        stageDesc = `Synthesizing ${selectedLanguage} neural phonemes & aligning lip mesh...`;
        break;
      default:
        promptPayload = instruction;
    }

    setProcessingStage(stageDesc);

    try {
      const endpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001/api/v1/generate'
        : '/api/generate';

      const res = await fetch(endpoint, {
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
        const newUrl = data.image_url || data.images?.[0]?.url;
        if (newUrl) {
          setEditedImage(newUrl);
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

  // Tool categories for clean selector
  const TOOL_CATEGORIES = [
    {
      name: 'Higgsfield Core Tools',
      items: [
        { id: 'prompt-edit', label: 'Image Edit', icon: Wand2, badge: 'Smart' },
        { id: 'click-to-edit', label: 'Click to Edit', icon: MousePointerClick, badge: 'Pinpoint' },
        { id: 'inpaint', label: 'Inpaint', icon: Paintbrush, badge: 'Brush' },
        { id: 'upscale-4k', label: 'Image Upscale', icon: Maximize2, badge: '4K/8K' },
        { id: 'photo-angle', label: 'Photo Angle', icon: Compass, badge: '3D Orbit' },
        { id: 'relight', label: 'Relight Studio', icon: Lightbulb, badge: 'Lighting' },
        { id: 'try-on', label: 'Virtual Try-On', icon: Shirt, badge: 'AnyShoot' },
        { id: 'product-photo', label: 'Product Photo', icon: Camera, badge: 'Packshot' },
        { id: 'char-swap', label: 'Character Swap', icon: Repeat, badge: 'Persona' },
        { id: 'face-swap', label: 'Face Swap', icon: Smile, badge: 'Precision' },
        { id: 'edit-text', label: 'Edit Text', icon: CaseSensitive, badge: 'Type' },
        { id: 'bg-remove', label: 'Remove BG', icon: Scissors, badge: 'Alpha' },
        { id: 'lipsync-dub', label: 'Lip Sync & Dub', icon: Languages, badge: '18 Lang' }
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#101018] p-5 rounded-2xl border border-[#222234] shadow-2xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sliders className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">AI Studio Editor</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              13 Higgsfield AI Tools
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Precision neural visual suite: 3D photo angles, studio relighting, AnyShoot virtual try-on, product staging, and 4K upscaling.
          </p>
        </div>

        {/* View Toggle & Preset Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex bg-[#08080c] p-1 rounded-xl border border-[#222234]">
            <button
              onClick={() => setActiveView('slider')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'slider'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Split Slider
            </button>
            <button
              onClick={() => setActiveView('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'split'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>
      </div>

      {/* Preset Asset Picker */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Sample Assets:
        </span>
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setOriginalImage(preset.url);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border shrink-0 transition-all ${
              originalImage === preset.url
                ? 'bg-purple-600/20 border-purple-500 text-white font-semibold'
                : 'bg-[#101018] border-[#222234] text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <img src={preset.url} alt={preset.name} className="w-4 h-4 rounded-full object-cover" />
            <span>{preset.name}</span>
          </button>
        ))}
        <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border border-dashed border-[#34344e] bg-[#101018] text-slate-300 hover:border-purple-500 hover:text-white cursor-pointer shrink-0 transition-all">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Custom</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setOriginalImage(url);
              }
            }}
          />
        </label>
      </div>

      {/* Editor Tool Switcher Strip (All 13 Tools) */}
      <div className="bg-[#101018] p-2 rounded-2xl border border-[#222234] shadow-xl overflow-x-auto scrollbar-none">
        <div className="flex gap-1.5 min-w-max">
          {TOOL_CATEGORIES[0].items.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30 font-bold'
                    : 'bg-[#08080c] border-[#1e1e2e] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <div className="leading-tight">
                  <div className="text-xs truncate">{tool.label}</div>
                  <div className={`text-[9px] font-mono ${isActive ? 'text-purple-200' : 'text-slate-500'}`}>
                    {tool.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Console & Canvas Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Tool Settings (4 Cols) */}
        <div className="lg:col-span-4 space-y-5 bg-[#101018] border border-[#222234] p-5 rounded-2xl shadow-xl">
          {/* Tool 1: Prompt Inpainting */}
          {activeTool === 'prompt-edit' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-purple-400" />
                  <span>Natural Language Image Edit</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">Describe what to add, replace, or restyle</p>
              </div>
              <textarea
                rows={4}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="w-full bg-[#08080c] border border-[#222234] rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                placeholder="Change jacket to black leather, make lighting golden hour..."
              />
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-400">Quick Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Add neon violet rim lighting',
                    'Swap background to rainy Tokyo night',
                    'Make outfit high-fashion haute couture',
                    'Add subtle atmospheric volumetric fog'
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setInstruction(p)}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-[#08080c] border border-[#222234] text-slate-300 hover:border-purple-500 hover:text-white transition-all text-left"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tool 2: Click to Edit */}
          {activeTool === 'click-to-edit' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4 text-purple-400" />
                  <span>Click to Edit (Precision Pinpoint)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Click anywhere on the preview canvas to target an element
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#08080c] border border-[#222234] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Selected Coordinate:</span>
                <span className="font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  X: {clickPoint.x}% • Y: {clickPoint.y}%
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Target Modification Instruction</label>
                <textarea
                  rows={3}
                  value={clickPrompt}
                  onChange={(e) => setClickPrompt(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="e.g. Change color to emerald green, add glowing runes..."
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Preset Directives:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Swap color to crimson red',
                    'Add iridescent metallic finish',
                    'Remove blemishes & smooth',
                    'Make eyes glow amber gold'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setClickPrompt(preset)}
                      className="p-1.5 rounded-lg bg-[#08080c] border border-[#222234] text-[10px] text-slate-300 hover:border-purple-500 text-left truncate"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tool 3: Inpaint */}
          {activeTool === 'inpaint' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Paintbrush className="w-4 h-4 text-purple-400" />
                  <span>Brush Inpainting & Generative Fill</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">Mask specific areas and prompt for replacements</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Brush Radius:</span>
                  <span className="text-purple-300 font-mono font-bold">{brushSize}px</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Replacement Prompt</label>
                <textarea
                  rows={3}
                  value={inpaintPrompt}
                  onChange={(e) => setInpaintPrompt(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Describe what should appear inside the painted mask..."
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#08080c] border border-[#222234] text-xs">
                <span className="text-slate-300">Invert Brush Mask</span>
                <input
                  type="checkbox"
                  checked={invertMask}
                  onChange={(e) => setInvertMask(e.target.checked)}
                  className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Tool 4: Character Swap */}
          {activeTool === 'char-swap' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-purple-400" />
                  <span>Image Character Swap</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Swap character identity while locking pose, camera angle & lighting
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Select Target Persona</label>
                <select
                  value={selectedChar}
                  onChange={(e) => setSelectedChar(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2.5"
                >
                  <option value="Elena (Cyberpunk Operative)">Elena • Cyberpunk Operative</option>
                  <option value="Marcus (Streetwear Rebel)">Marcus • Streetwear Rebel</option>
                  <option value="Sarah (High Fashion Model)">Sarah • High Fashion Model</option>
                  <option value="Aman (Documentary Explorer)">Aman • Documentary Explorer</option>
                  <option value="Viktor (Sci-Fi Commander)">Viktor • Sci-Fi Commander</option>
                </select>
              </div>

              <div className="space-y-2 p-3 rounded-xl bg-[#08080c] border border-[#222234]">
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="text-slate-300">Lock Body Pose & Angles</span>
                  <input
                    type="checkbox"
                    checked={lockPose}
                    onChange={(e) => setLockPose(e.target.checked)}
                    className="accent-purple-500 w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="text-slate-300">Match Scene Lighting & Shadows</span>
                  <input
                    type="checkbox"
                    checked={lockLighting}
                    onChange={(e) => setLockLighting(e.target.checked)}
                    className="accent-purple-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Tool 5: Face Swap */}
          {activeTool === 'face-swap' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Smile className="w-4 h-4 text-purple-400" />
                  <span>Image Face Swap (High Precision)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  High-fidelity face replacement with skin texture & lighting preservation
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Target Identity</label>
                <select
                  value={selectedFace}
                  onChange={(e) => setSelectedFace(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2.5"
                >
                  <option value="Sarah (Asian Editorial Hero)">Sarah • Asian Editorial Hero</option>
                  <option value="David (Nordic Cinematic Hero)">David • Nordic Cinematic Hero</option>
                  <option value="Maya (Latin Vogue Model)">Maya • Latin Vogue Model</option>
                  <option value="Kenji (Neo Tokyo Pilot)">Kenji • Neo Tokyo Pilot</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Identity Blend Ratio:</span>
                  <span className="text-purple-300 font-mono font-bold">{faceBlendStrength}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={faceBlendStrength}
                  onChange={(e) => setFaceBlendStrength(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#08080c] border border-[#222234] text-xs cursor-pointer">
                <span className="text-slate-300">Match Skin Undertone & Warmth</span>
                <input
                  type="checkbox"
                  checked={matchSkinTone}
                  onChange={(e) => setMatchSkinTone(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>
            </div>
          )}

          {/* Tool 6: Photo Angle Editor */}
          {activeTool === 'photo-angle' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-400" />
                  <span>Photo Angle Editor (3D Orbit)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Change the camera viewpoint and optical focal length
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-300">Camera Viewpoint</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Front (0° Eye Level)',
                    '3/4 Turn (45° Cinematic)',
                    'Side Profile (90°)',
                    'Hero Low-Angle (-30°)',
                    'Drone Aerial (+60°)',
                    'Dutch Tilt (+15°)'
                  ].map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setCameraAngle(angle)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        cameraAngle === angle
                          ? 'bg-purple-600 text-white border-purple-400 font-bold'
                          : 'bg-[#08080c] border-[#222234] text-slate-400 hover:text-white'
                      }`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Camera Lens</label>
                <select
                  value={focalLength}
                  onChange={(e) => setFocalLength(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="24mm Anamorphic Ultra-Wide">24mm Anamorphic Ultra-Wide</option>
                  <option value="35mm Prime">35mm Prime (Cinematic Standard)</option>
                  <option value="50mm Human Eye Natural">50mm Human Eye Natural</option>
                  <option value="85mm Portrait Telephoto">85mm Portrait Telephoto</option>
                  <option value="135mm Studio Compression">135mm Studio Compression</option>
                </select>
              </div>
            </div>
          )}

          {/* Tool 7: Relight Studio */}
          {activeTool === 'relight' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-purple-400" />
                  <span>Relight Studio (Lighting Engine)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Reposition key, fill and rim lights with volumetric raytracing
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-300">Atmospheric Lighting Presets</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Golden Hour Sunset',
                    'Cyberpunk Neon Dual-Tone',
                    'Film Noir Spotlight',
                    'Softbox Studio Key',
                    'Volumetric God Rays',
                    'Bioluminescent Emerald'
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setRelightPreset(preset)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        relightPreset === preset
                          ? 'bg-purple-600 text-white border-purple-400 font-bold'
                          : 'bg-[#08080c] border-[#222234] text-slate-400 hover:text-white'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Light Direction</label>
                <select
                  value={lightDirection}
                  onChange={(e) => setLightDirection(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Top Left 45°">Top Left 45° (Classic Studio)</option>
                  <option value="Direct Front High Key">Direct Front High Key</option>
                  <option value="Backlight Rim Halo">Backlight Rim Halo (Dramatic)</option>
                  <option value="Bottom Up Dramatic">Bottom Up Dramatic (Mystery)</option>
                  <option value="Right Side 90° Split">Right Side 90° Split</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Intensity</span>
                    <span className="text-purple-300 font-mono">{lightIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Temp</span>
                    <span className="text-purple-300 font-mono">{colorTemp}K</span>
                  </div>
                  <input
                    type="range"
                    min="2200"
                    max="7500"
                    step="100"
                    value={colorTemp}
                    onChange={(e) => setColorTemp(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tool 8: Edit Text */}
          {activeTool === 'edit-text' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <CaseSensitive className="w-4 h-4 text-purple-400" />
                  <span>Edit Text (Neural Typography)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Generate typographic headlines and graphic text directly in-frame
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Text Content</label>
                <input
                  type="text"
                  value={textOverlay}
                  onChange={(e) => setTextOverlay(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="e.g. NANO FIELD, CYBERPUNK 2026..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Typography Style</label>
                <select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Cinematic Serif">Cinematic Serif (Vogue / Luxury)</option>
                  <option value="Futuristic Cyberpunk Sans">Futuristic Cyberpunk Sans</option>
                  <option value="Bold Impact Block Poster">Bold Impact Block Poster</option>
                  <option value="Retro Neon Glow Lettering">Retro Neon Glow Lettering</option>
                  <option value="Handcrafted Brush Script">Handcrafted Brush Script</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Position</label>
                  <select
                    value={textPosition}
                    onChange={(e) => setTextPosition(e.target.value)}
                    className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                  >
                    <option value="Top Center">Top Center</option>
                    <option value="Headline Center">Headline Center</option>
                    <option value="Lower Third">Lower Third</option>
                    <option value="Bottom Corner Brand">Bottom Corner</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Color</label>
                  <div className="flex items-center gap-2 bg-[#08080c] border border-[#222234] rounded-xl px-3 py-1.5">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-300">{textColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tool 9: Virtual Try-On (AnyShoot) */}
          {activeTool === 'try-on' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-purple-400" />
                  <span>Virtual Try-On (AnyShoot)</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                    AnyShoot
                  </span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Editorial apparel photoshoot on any model with realistic garment draping
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Select Garment Look</label>
                <select
                  value={garmentStyle}
                  onChange={(e) => setGarmentStyle(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2.5"
                >
                  <option value="Matte Black Cyber Techwear Trench">Matte Black Cyber Techwear Trench</option>
                  <option value="Emerald Green Silk Haute Couture Gown">Emerald Green Silk Haute Couture Gown</option>
                  <option value="Vintage Distressed Leather Biker Jacket">Vintage Distressed Leather Biker Jacket</option>
                  <option value="Italian Wool Double-Breasted Suit">Italian Wool Double-Breasted Suit</option>
                  <option value="Athletic Streetwear Oversized Hoodie">Athletic Streetwear Oversized Hoodie</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Model Stance & Fit</label>
                <select
                  value={modelFit}
                  onChange={(e) => setModelFit(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Runway Haute Couture">Runway Haute Couture (Slim & Tailored)</option>
                  <option value="Athletic Contemporary Fit">Athletic Contemporary Fit</option>
                  <option value="Relaxed Oversized Drape">Relaxed Oversized Drape</option>
                </select>
              </div>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#08080c] border border-[#222234] text-xs cursor-pointer">
                <span className="text-slate-300">Preserve Model Identity & Posture</span>
                <input
                  type="checkbox"
                  checked={preserveSilhouette}
                  onChange={(e) => setPreserveSilhouette(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>
            </div>
          )}

          {/* Tool 10: Product Photography */}
          {activeTool === 'product-photo' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-purple-400" />
                  <span>Commercial Product Photography</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  High-end commercial packshot staging with custom pedestals & studio lighting
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Pedestal Base</label>
                <select
                  value={productPedestal}
                  onChange={(e) => setProductPedestal(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Black Obsidian Floating Pedestal">Black Obsidian Floating Pedestal</option>
                  <option value="Dynamic Liquid Water Splash">Dynamic Liquid Water Splash</option>
                  <option value="Anti-Gravity Floating Pod with Ring Light">Anti-Gravity Floating Pod</option>
                  <option value="Minimalist Carrara White Marble">Minimalist Carrara White Marble</option>
                  <option value="Rich Crimson Velvet Cushion">Rich Crimson Velvet Cushion</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Studio Environment</label>
                <select
                  value={productEnvironment}
                  onChange={(e) => setProductEnvironment(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Dark Luxury Minimal Studio with Rim Neon">Dark Luxury Minimal Studio with Rim Neon</option>
                  <option value="Pure Apple Keynote Clean Studio White">Pure Apple Keynote Clean Studio White</option>
                  <option value="Golden Sunlight with Palm Leaf Shadowplay">Golden Sunlight & Palm Shadowplay</option>
                  <option value="Futuristic Cyberpunk Glass Platform">Futuristic Cyberpunk Glass Platform</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Depth of Field</label>
                <select
                  value={depthOfField}
                  onChange={(e) => setDepthOfField(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="f/1.4 Ultra Creamy Bokeh">f/1.4 Ultra Creamy Bokeh (Commercial Focus)</option>
                  <option value="f/2.8 Clean Product Separation">f/2.8 Clean Product Separation</option>
                  <option value="f/8 Total Deep Sharpness">f/8 Total Deep Sharpness</option>
                </select>
              </div>
            </div>
          )}

          {/* Tool 11: 4K Upscaling */}
          {activeTool === 'upscale-4k' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-purple-400" />
                  <span>4K Super-Resolution Detail Enhancer</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">Synthesizes microscopic photorealistic textures</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-xl bg-[#08080c] border border-[#222234]">
                  <div className="text-[10px] text-slate-400 uppercase">Target Resolution</div>
                  <div className="text-sm font-bold text-white mt-1">3840 × 2160</div>
                </div>
                <div className="p-3 rounded-xl bg-[#08080c] border border-[#222234]">
                  <div className="text-[10px] text-slate-400 uppercase">Scale Factor</div>
                  <div className="text-sm font-bold text-purple-300 mt-1">4× Neural Upscale</div>
                </div>
              </div>
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#08080c] border border-[#222234] text-xs cursor-pointer">
                <span className="text-slate-300">Facial Feature Enhancement (GFPGAN)</span>
                <input
                  type="checkbox"
                  checked={faceEnhance}
                  onChange={(e) => setFaceEnhance(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>
            </div>
          )}

          {/* Tool 12: Background Removal */}
          {activeTool === 'bg-remove' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-purple-400" />
                  <span>Sub-Pixel Background Removal</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Isolates subjects with hair-level precision, perfect for sticker cutouts
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#08080c] border border-[#222234] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sub-Pixel Alpha Feathering</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Generates clean transparent PNG or pure studio white backdrop ready for overlay into any scene.
                </p>
              </div>
            </div>
          )}

          {/* Tool 13: Lip Sync & Dubbing */}
          {activeTool === 'lipsync-dub' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Languages className="w-4 h-4 text-purple-400" />
                  <span>AI Dubbing & Lip Sync (18 Languages)</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Synchronize facial phonemes with speech in 18 global languages
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Target Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  {LANGUAGES_18.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name} ({lang.native}) • Speaker {lang.voice}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">Dialogue / Narration Script</label>
                <textarea
                  rows={3}
                  value={dubbingText}
                  onChange={(e) => setDubbingText(e.target.value)}
                  className="w-full bg-[#08080c] border border-[#222234] rounded-xl p-3 text-xs text-slate-200 resize-none"
                />
              </div>

              <button
                onClick={handleSimulateDubAudio}
                className="w-full p-2.5 rounded-xl bg-[#08080c] border border-[#222234] text-purple-300 flex items-center justify-center gap-2 text-xs font-semibold hover:border-purple-500 transition-colors"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingDub ? 'text-green-400 animate-pulse' : ''}`} />
                <span>{isPlayingDub ? 'Playing Neural Speech Preview...' : 'Audition Voice Track'}</span>
              </button>
            </div>
          )}

          {/* Action Trigger Button */}
          <button
            onClick={handleExecuteTool}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
          <div className="bg-[#101018] border border-[#222234] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Generative Canvas Inspection</span>
                  <span className="text-[10px] bg-[#1e1e2c] text-purple-300 px-2 py-0.5 rounded-full font-mono border border-purple-500/30">
                    Live Viewport
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeTool === 'click-to-edit'
                    ? 'Click on the preview to place the edit beacon'
                    : 'Drag slider to compare source vs AI modification'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={editedImage}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#08080c] border border-[#222234] text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Result</span>
                </a>
              </div>
            </div>

            {/* Slider View */}
            {activeView === 'slider' && (
              <div 
                onClick={handleCanvasClick}
                className="relative rounded-2xl overflow-hidden bg-black border border-[#222234] aspect-[16/9] select-none cursor-crosshair group"
              >
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
                  <div className="absolute top-4 left-4 bg-[#08080c]/90 border border-[#222234] px-2.5 py-1 rounded-lg text-[10px] font-bold text-white">
                    Original Source
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-purple-600/90 border border-purple-400/50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white">
                  AI Output
                </div>

                {/* Click-to-edit Beacon Pin */}
                {activeTool === 'click-to-edit' && (
                  <div
                    className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${clickPoint.x}%`, top: `${clickPoint.y}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500/30 border border-purple-400 animate-ping absolute" />
                      <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-[#08080c]/90 border border-purple-500 text-[10px] font-mono text-purple-200 px-2 py-0.5 rounded shadow whitespace-nowrap">
                        ({clickPoint.x}%, {clickPoint.y}%)
                      </div>
                    </div>
                  </div>
                )}

                {/* Vertical Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center pointer-events-none z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center text-xs font-bold">
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
                  <div className="absolute inset-0 bg-[#08080c]/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-30">
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                    <div className="text-sm font-semibold text-white">{processingStage}</div>
                  </div>
                )}
              </div>
            )}

            {/* Side-by-Side Split View */}
            {activeView === 'split' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden bg-black border border-[#222234] aspect-video">
                  <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#08080c]/90 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white border border-[#222234]">
                    Source
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-black border border-purple-500/50 aspect-video">
                  <img src={editedImage} alt="Edited" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-purple-600/90 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white">
                    AI Output
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
