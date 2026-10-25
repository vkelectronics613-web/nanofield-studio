import React, { useState } from 'react';
import { 
  Film, 
  Camera, 
  Sparkles, 
  Sliders, 
  Layers, 
  Clock, 
  Palette, 
  Heart, 
  Play, 
  Download, 
  Eye, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  FileText,
  Volume2,
  Image as ImageIcon,
  ChevronDown,
  Compass,
  Wand2,
  Tv
} from 'lucide-react';

export function CinemaStudioScreen({ deductCredits }) {
  // Main Studio Mode: 'master' (Cinema Master Studio) or 'stickman' (Stickman Hybrid Director)
  const [studioMode, setStudioMode] = useState('master');

  // ==========================================
  // CINEMA MASTER STUDIO STATE
  // ==========================================
  const [prompt, setPrompt] = useState(
    'A solitary cybernetic ronin standing at the edge of a rainy Neo-Tokyo precipice, reflective chrome armor catching cyan and magenta neon light, volumetric fog'
  );
  const [sixteenBitDepth, setSixteenBitDepth] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('21:9');
  const [cameraBody, setCameraBody] = useState('Arri Alexa 65');
  const [lensSim, setLensSim] = useState('Panavision C-Series Anamorphic');
  const [focalLength, setFocalLength] = useState('35mm');
  const [aperture, setAperture] = useState('f/1.4');
  const [genre, setGenre] = useState('Sci-Fi Cyberpunk');
  const [era, setEra] = useState('Modern 8K HDR');
  const [tempo, setTempo] = useState('Slow Burn Atmospheric');
  const [activeEmotion, setActiveEmotion] = useState('Dread');
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro');

  // Live generation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');
  const [renderedCinemaImage, setRenderedCinemaImage] = useState(
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'
  );

  // ==========================================
  // STICKMAN HYBRID DOCUMENTARY STATE (D:\Downloads\stickman-animation)
  // ==========================================
  const [stickmanTopic, setStickmanTopic] = useState('1 Boy vs 100 Girls in Ancient Civilisation');
  const [stickmanLook, setStickmanLook] = useState('warm'); // bright, warm, ink, painted, night
  const [stickmanLanguage, setStickmanLanguage] = useState('Hindi / Hinglish (Indic Parler - Aman)');
  const [stickmanLength, setStickmanLength] = useState('5 minutes');
  const [activeCheckpoint, setActiveCheckpoint] = useState(2); // 1: Script, 2: Pictures & Stickers, 3: Sound & QC
  const [isStickmanBatchGenerating, setIsStickmanBatchGenerating] = useState(false);

  // Stickman scenes & elements mock/live data
  const [stickmanScenes, setStickmanScenes] = useState([
    {
      id: 1,
      title: 'Scene 1: The Gathering at the Oasis',
      cue: '00:00 - 00:04',
      spokenLine: 'Ancient world mein aisi jagah jahan 100 ladkiyan aur sirf ek ladka!',
      shotType: 'Wide Establishing full-colour',
      status: 'Ready',
      preview: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      sticker: 'Surprised Stickman Face (+pop on "sirf ek")'
    },
    {
      id: 2,
      title: 'Scene 2: Village Council Meeting',
      cue: '00:04 - 00:08',
      spokenLine: 'Sabhi elders ne milkar yeh faisla liya tha.',
      shotType: 'Council interior warm ochre',
      status: 'Ready',
      preview: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      sticker: 'Ancient Clay Tablet (+pop on "faisla")'
    },
    {
      id: 3,
      title: 'Scene 3: The Daily Survival Challenge',
      cue: '00:08 - 00:12',
      spokenLine: 'Lekin yeh paradise nahi, sabse bada survival challenge tha!',
      shotType: 'Desert dunes midday sun',
      status: 'Pending',
      preview: 'https://images.unsplash.com/photo-1473580044384-7ba9967a16a0?auto=format&fit=crop&w=800&q=80',
      sticker: 'Fire Torch Flame (+pop on "challenge")'
    }
  ]);

  // Emotion wheel configuration
  const emotionWheel = [
    { name: 'Euphoria', color: 'from-amber-400 to-yellow-500', border: 'border-yellow-400', tag: 'golden vibrant radiance, euphoric warmth' },
    { name: 'Tension', color: 'from-rose-600 to-red-700', border: 'border-red-500', tag: 'high contrast crimson rim, sharp shadows, tense claustrophobia' },
    { name: 'Melancholy', color: 'from-blue-600 to-indigo-800', border: 'border-blue-400', tag: 'deep indigo wash, subdued sorrow, diffused cool fog' },
    { name: 'Dread', color: 'from-emerald-700 to-teal-950', border: 'border-emerald-500', tag: 'sickly green tint, lurking darkness, psychological horror lighting' },
    { name: 'Awe', color: 'from-cyan-400 to-blue-600', border: 'border-cyan-400', tag: 'grand celestial luminescence, awe-inspiring scale, god rays' },
    { name: 'Intimacy', color: 'from-orange-400 to-pink-600', border: 'border-orange-400', tag: 'warm amber candlelight, soft edge blur, gentle breathing atmosphere' },
    { name: 'Nostalgia', color: 'from-amber-600 to-rose-700', border: 'border-amber-500', tag: 'vintage Kodak 5247 tint, memory haze, warm grain' },
    { name: 'Rage', color: 'from-red-600 to-orange-600', border: 'border-red-600', tag: 'volcanic backlight, searing embers, aggressive hard key' },
  ];

  // 5 Looks from D:\Downloads\stickman-animation\skills\stickman-hybrid\looks\README.md
  const stickmanLooks = [
    {
      id: 'warm',
      name: 'Warm Ochre',
      desc: 'Golden ochre, painterly, cosy. Best for ancient humans, civilisation, and Hindi audiences.',
      palette: '#d97706, #92400e, #fef3c7',
      textCard: 'Ochre card'
    },
    {
      id: 'bright',
      name: 'Bright Cartoon',
      desc: 'Clean flat cartoon, blue skies, greens, white rooms. Science & everyday history default.',
      palette: '#0284c7, #16a34a, #f8fafc',
      textCard: 'Light cream to pale blue'
    },
    {
      id: 'ink',
      name: 'Ink & Paper',
      desc: 'Black ink line on off-white, flat colour accents. Numbers, comparisons, psychology.',
      palette: '#0f172a, #dc2626, #f1f5f9',
      textCard: 'White paper'
    },
    {
      id: 'painted',
      name: 'Painted Hero',
      desc: 'Detailed painted places, muted and cinematic. Survival stories, disasters, epic journeys.',
      palette: '#475569, #334155, #64748b',
      textCard: 'Grey-blue'
    },
    {
      id: 'night',
      name: 'Deep Night',
      desc: 'Deep blue night, firelight and moonlight. Mysteries, space, dark history.',
      palette: '#1e1b4b, #ea580c, #0f172a',
      textCard: 'Dark navy, cream text'
    }
  ];

  // Trigger Cinema Generation via Nano Field API
  const handleGenerateCinema = async () => {
    setIsGenerating(true);
    setGenerationStage('Simulating 16-bit color quantization curve...');
    deductCredits(15);

    const emotionTag = emotionWheel.find(e => e.name === activeEmotion)?.tag || '';
    const fullCinemaPrompt = `${prompt}, cinematic 21:9 anamorphic frame, shot on ${cameraBody} with ${lensSim} (${focalLength} ${aperture}), ${genre} tone, ${era} film stock, ${tempo} atmosphere, ${emotionTag}, 16-bit color fidelity, ultra-fine photorealistic textures, master cinematography 8k`;

    try {
      setGenerationStage('Connecting to Nano Field Engine worker...');
      const res = await fetch('http://localhost:3001/api/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullCinemaPrompt,
          model: selectedModel,
          aspect_ratio: aspectRatio === '21:9' ? '16:9' : aspectRatio,
          variants: 1
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.image_url) {
          setRenderedCinemaImage(data.image_url);
        }
      }
    } catch (err) {
      console.warn('Cinema API generation fallback preview:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger Stickman Batch Generation via Nano Field API
  const handleGenerateStickmanBatch = async () => {
    setIsStickmanBatchGenerating(true);
    deductCredits(25);

    const activeLookData = stickmanLooks.find(l => l.id === stickmanLook);
    const lookStylePrefix = `full-bleed background filling frame, ${activeLookData?.name} look, ${activeLookData?.desc}, simple round-head stick-figure character with clean silhouette, high-contrast separation for sticker cutout, no text`;

    try {
      const res = await fetch('http://localhost:3001/api/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${lookStylePrefix}, ${stickmanTopic}: scene 1 desert dunes oasis, vibrant storytelling illustration`,
          model: 'Nano Banana 2.1', // Stickman hybrid uses 2.1
          aspect_ratio: '16:9',
          variants: 2
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setStickmanScenes(prev => [
            {
              ...prev[0],
              preview: data.images[0].url,
              status: 'Rendered (Live)'
            },
            {
              ...prev[1],
              preview: data.images[1]?.url || data.images[0].url,
              status: 'Rendered (Live)'
            },
            ...prev.slice(2)
          ]);
        }
      }
    } catch (err) {
      console.warn('Stickman batch error:', err);
    } finally {
      setIsStickmanBatchGenerating(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Film className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">Cinema Studio</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              16-BIT HDR
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Hollywood-grade camera optics, 21:9 cinemascope ratios, emotion tuning & Stickman Hybrid documentary direction.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setStudioMode('master')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              studioMode === 'master'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Cinema Master</span>
          </button>
          <button
            onClick={() => setStudioMode('stickman')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              studioMode === 'stickman'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Stickman Hybrid Director</span>
            <span className="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.2 rounded font-mono">Pack</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: CINEMA MASTER STUDIO                                  */}
      {/* ============================================================== */}
      {studioMode === 'master' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl">
            {/* Visual Depth & 21:9 Widescreen Header Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">16-Bit Visual Depth</span>
              </div>
              <button
                onClick={() => setSixteenBitDepth(!sixteenBitDepth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  sixteenBitDepth ? 'bg-purple-600' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    sixteenBitDepth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Prompt Console */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">Cinematic Scene Prompt</label>
                <span className="text-[10px] text-purple-400 font-mono">DCI-P3 Color Gamut</span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/70 transition-all resize-none leading-relaxed"
                placeholder="Describe the shot, cinematic lighting, blocking, and atmosphere..."
              />
            </div>

            {/* Aspect Ratio Picker (With 21:9 Focus) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Aspect Ratio & Canvas Framing</label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: '21:9', label: '21:9 Ultra', badge: 'Anamorphic' },
                  { id: '16:9', label: '16:9', badge: 'IMAX' },
                  { id: '1.85:1', label: '1.85:1', badge: 'Theatrical' },
                  { id: '4:3', label: '4:3', badge: 'Classic' },
                  { id: '1:1', label: '1:1', badge: 'Square' }
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all ${
                      aspectRatio === ratio.id
                        ? 'border-purple-500 bg-purple-500/20 text-purple-200 shadow-md shadow-purple-500/10'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{ratio.label}</div>
                    <div className="text-[9px] text-slate-500 font-normal">{ratio.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera & Lens Simulation Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              {/* Camera Body */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">Camera Body</label>
                <div className="relative">
                  <select
                    value={cameraBody}
                    onChange={(e) => setCameraBody(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 appearance-none focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Arri Alexa 65">Arri Alexa 65 (Large Format)</option>
                    <option value="RED V-Raptor 8K">RED V-Raptor 8K VV</option>
                    <option value="Sony Venice 2">Sony Venice 2 (Dual ISO)</option>
                    <option value="Panavision DXL2">Panavision Millennium DXL2</option>
                    <option value="16mm Bolex Film">16mm Bolex Vintage</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Lens Simulation */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">Lens Simulation</label>
                <div className="relative">
                  <select
                    value={lensSim}
                    onChange={(e) => setLensSim(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 appearance-none focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="Panavision C-Series Anamorphic">Panavision C-Series (Anamorphic)</option>
                    <option value="Cooke S4/i Prime">Cooke S4/i Prime (Warm Look)</option>
                    <option value="Zeiss Master Prime">Zeiss Master Prime (Clinical)</option>
                    <option value="Canon K-35 Vintage">Canon K-35 Vintage 1970s</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Focal Length */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">Focal Length</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {['24mm', '35mm', '50mm', '85mm'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFocalLength(f)}
                      className={`py-1 text-[11px] font-medium rounded-lg transition-all ${
                        focalLength === f ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aperture */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">Shutter & Depth</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {['f/1.2', 'f/2.8', 'f/5.6'].map((ap) => (
                    <button
                      key={ap}
                      onClick={() => setAperture(ap)}
                      className={`py-1 text-[11px] font-medium rounded-lg transition-all ${
                        aperture === ap ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {ap}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Film Setup: Genre, Era & Tempo */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-bold text-slate-300">Film Setup: Genre, Era & Tempo</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 text-slate-200 text-[11px] rounded-lg px-2 py-1.5"
                  >
                    <option value="Sci-Fi Cyberpunk">Sci-Fi Cyberpunk</option>
                    <option value="Film Noir">Film Noir</option>
                    <option value="Psychological Thriller">Psychological Thriller</option>
                    <option value="Historical Epic">Historical Epic</option>
                    <option value="Neo-Western">Neo-Western</option>
                    <option value="Dark Fantasy">Dark Fantasy</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Film Era</label>
                  <select
                    value={era}
                    onChange={(e) => setEra(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 text-slate-200 text-[11px] rounded-lg px-2 py-1.5"
                  >
                    <option value="Modern 8K HDR">Modern 8K HDR</option>
                    <option value="1990s Kodak 5247">1990s Kodak 5247</option>
                    <option value="1980s VHS Grain">1980s VHS Grain</option>
                    <option value="1970s Technicolor">1970s Technicolor</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Tempo / Pacing</label>
                  <select
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 text-slate-200 text-[11px] rounded-lg px-2 py-1.5"
                  >
                    <option value="Slow Burn Atmospheric">Slow Burn</option>
                    <option value="Fast-cut Action">Fast-cut Action</option>
                    <option value="Dreamlike Montage">Dream Montage</option>
                    <option value="Real-time Docu">Real-time Docu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Emotion Wheel */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">Emotion Wheel & Mood Key</label>
                <span className="text-[10px] font-semibold text-purple-400">{activeEmotion}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {emotionWheel.map((em) => (
                  <button
                    key={em.name}
                    onClick={() => setActiveEmotion(em.name)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      activeEmotion === em.name
                        ? `bg-slate-950 ${em.border} text-white shadow-lg`
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 mx-auto rounded-full bg-gradient-to-tr ${em.color} mb-1`} />
                    <div className="text-[10px] font-medium leading-tight">{em.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector & Action */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Rendering Engine:</span>
                <span className="text-xs font-bold text-purple-300">🍌 {selectedModel}</span>
              </div>

              <button
                onClick={handleGenerateCinema}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rendering 16-Bit Cinema Frame...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Render Cinema 21:9 Master</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Preview Viewport (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>21:9 Cinema Master Output</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                      {aspectRatio} • {cameraBody} • {focalLength}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">16-bit Quantization • ACEScc Color Pipeline</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={renderedCinemaImage}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex items-center justify-center aspect-[21/9]">
                <img
                  src={renderedCinemaImage}
                  alt="Cinema Master Output"
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Anamorphic Mask & Framing Marks */}
                <div className="absolute inset-0 pointer-events-none border border-white/10 flex flex-col justify-between p-4">
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>21:9 SCOPE</span>
                    <span>16-BIT RAW</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>{lensSim}</span>
                    <span>EMOTION: {activeEmotion.toUpperCase()}</span>
                  </div>
                </div>

                {isGenerating && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-6 text-center">
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                    <div className="text-sm font-semibold text-white">{generationStage}</div>
                    <div className="text-xs text-purple-300">Nano Field Multi-Account Engine Active</div>
                  </div>
                )}
              </div>

              {/* Technical Optics Readout */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 uppercase">Aperture</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">{aperture}</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 uppercase">Shutter</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">180° Angle</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 uppercase">Film Profile</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">{era.split(' ')[0]}</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-500 uppercase">Engine Model</div>
                  <div className="text-xs font-bold text-purple-300 mt-0.5">{selectedModel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: STICKMAN HYBRID DOCUMENTARY DIRECTOR                    */}
      {/* (Folder: D:\Downloads\stickman-animation instructions)         */}
      {/* ============================================================== */}
      {studioMode === 'stickman' && (
        <div className="space-y-8">
          {/* Top Banner Notice */}
          <div className="bg-amber-950/30 border border-amber-500/30 p-5 rounded-3xl flex items-start gap-4">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-200">
                Stickman Hybrid Documentary Director Engine
              </h3>
              <p className="text-xs text-amber-300/80 mt-1 leading-relaxed">
                Full-colour scene pictures + cut-out stickers popping on spoken words, animated counters, and paper collage beats in the style of viral ancient civilization documentaries. Powered directly by <strong>Nano Field Engine</strong> (Nano Banana 2.1) without any external tool dependencies.
              </p>
            </div>
          </div>

          {/* Setup Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Configuration (5 cols) */}
            <div className="lg:col-span-5 space-y-6 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Documentary Project Setup
              </div>

              {/* Topic Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">Documentary Topic</label>
                  <button
                    onClick={() => setStickmanTopic('The 100,000 Year Mystery of How Humans Conquered Fire')}
                    className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    + Suggest Viral Topic
                  </button>
                </div>
                <input
                  type="text"
                  value={stickmanTopic}
                  onChange={(e) => setStickmanTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/70"
                />
              </div>

              {/* Look Selector (5 Curated Looks from looks/README.md) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Choose Approved Look (PLAYBOOK §9)</label>
                <div className="space-y-2">
                  {stickmanLooks.map((look) => (
                    <div
                      key={look.id}
                      onClick={() => setStickmanLook(look.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        stickmanLook === look.id
                          ? 'bg-amber-950/20 border-amber-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{look.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{look.textCard}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{look.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language & Voice Setup */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">Narration Language</label>
                  <select
                    value={stickmanLanguage}
                    onChange={(e) => setStickmanLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2"
                  >
                    <option value="Hindi / Hinglish (Indic Parler - Aman)">Hindi / Hinglish (Aman)</option>
                    <option value="English (Kokoro 1.0x)">English (Kokoro)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400">Target Duration</label>
                  <select
                    value={stickmanLength}
                    onChange={(e) => setStickmanLength(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2"
                  >
                    <option value="2 minutes">2 minutes (Punchy)</option>
                    <option value="5 minutes">5 minutes (Standard)</option>
                    <option value="8 minutes">8 minutes (In-Depth)</option>
                    <option value="10 minutes">10 minutes (Masterclass)</option>
                  </select>
                </div>
              </div>

              {/* Batch Action */}
              <button
                onClick={handleGenerateStickmanBatch}
                disabled={isStickmanBatchGenerating}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isStickmanBatchGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Scene Pictures & Stickers...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Documentary Pack (Nano Banana 2.1)</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Pipeline Inspection & Checkpoints (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 3 Checkpoints Progress Bar */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Three Checkpoints Pipeline</h3>
                  <span className="text-[10px] font-mono text-amber-300">Workflow Rules §2-§7</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 1, label: '1. Script & Lines', sub: 'SCRIPT.md + LINES.tsv' },
                    { id: 2, label: '2. Look & Pictures', sub: 'Nano Banana 2.1 + Stickers' },
                    { id: 3, label: '3. Voice & Final QC', sub: 'Parler/Kokoro + Sound' }
                  ].map((cp) => (
                    <button
                      key={cp.id}
                      onClick={() => setActiveCheckpoint(cp.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        activeCheckpoint === cp.id
                          ? 'bg-amber-950/30 border-amber-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold">{cp.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{cp.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scene & Cutout Contact Sheet Display */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Contact Sheet & Sticker Cutouts</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Word-timed cuts with pop-in sticker elements</p>
                  </div>
                  <span className="text-xs bg-slate-800 text-amber-300 px-2.5 py-1 rounded-xl font-mono">
                    {stickmanScenes.length} Shots Planned
                  </span>
                </div>

                <div className="space-y-3">
                  {stickmanScenes.map((scene) => (
                    <div
                      key={scene.id}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center"
                    >
                      <img
                        src={scene.preview}
                        alt={scene.title}
                        className="w-full md:w-36 h-24 object-cover rounded-xl border border-slate-800 shrink-0"
                      />
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{scene.title}</h4>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {scene.cue}
                          </span>
                        </div>
                        <p className="text-xs text-amber-200/90 italic font-medium">"{scene.spokenLine}"</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                          <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-purple-300">
                            🎯 {scene.sticker}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-emerald-400">
                            ✓ {scene.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
