import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Check, 
  ShieldCheck, 
  AtSign, 
  Layers, 
  Sliders, 
  Tag, 
  Eye, 
  Smile, 
  Shirt, 
  Scissors, 
  BookmarkCheck,
  ChevronDown
} from 'lucide-react';

export function CharactersScreen({ deductCredits }) {
  // Saved Elements & Characters with @ Tagging
  const [elements, setElements] = useState([
    {
      id: 'el-1',
      handle: '@cyber_samurai',
      name: 'Kenji Sato',
      role: 'Cyber Samurai Ronin',
      avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
      dna: {
        hair: 'Black topknot undercut',
        eyes: 'Cybernetic neon cyan',
        age: 'Late 20s (28)',
        ethnicity: 'East Asian',
        expression: 'Stoic intense focus',
        wardrobe: 'Black carbon-fiber ronin tactical armor with orange accents',
        prop: 'Damascus katana hilt with LED glow'
      },
      variations: [
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'el-2',
      handle: '@elena_detective',
      name: 'Elena Rostova',
      role: 'Noir Cyber Investigator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      dna: {
        hair: 'Platinum blonde sharp bob',
        eyes: 'Emerald green',
        age: 'Early 30s (32)',
        ethnicity: 'Eastern European',
        expression: 'Subtle enigmatic smirk',
        wardrobe: 'High-collar dark grey wool trenchcoat with titanium clasps',
        prop: 'Holographic scanner datapad'
      },
      variations: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'el-3',
      handle: '@stick_guide',
      name: 'Aman the Stick Elder',
      role: 'Documentary Narrator Figure',
      avatar: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
      dna: {
        hair: 'Minimalist round stick head with tribal headband',
        eyes: 'Dot eyes with expressive brow',
        age: 'Ageless Ancient',
        ethnicity: 'Universal Stickman',
        expression: 'Shocked dramatic stare',
        wardrobe: 'Linen tunic sticker cutout',
        prop: 'Ancient wooden walking staff'
      },
      variations: [
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ]);

  const [selectedElement, setSelectedElement] = useState(elements[0]);

  React.useEffect(() => {
    fetch('/api/characters')
      .then(res => res.json())
      .then(data => {
        if (data.characters && data.characters.length > 0) {
          setElements(data.characters);
          setSelectedElement(data.characters[0]);
        }
      })
      .catch(() => {});
  }, []);

  // Prompt input with @ auto-suggestion
  const [scenePrompt, setScenePrompt] = useState(
    '@cyber_samurai walking through a rain-drenched neon marketplace, eating ramen under steam, cinematic lighting'
  );
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('recall'); // 'recall' or 'builder'

  // 19-Category Persona Builder Form State
  const [newHandle, setNewHandle] = useState('@marcus_pilot');
  const [newName, setNewName] = useState('Marcus Vance');
  const [newRole, setNewRole] = useState('Orbital Cargo Pilot');

  const [dnaHairStyle, setDnaHairStyle] = useState('Messy textured fade');
  const [dnaHairColor, setDnaHairColor] = useState('Chestnut brown');
  const [dnaEyeColor, setDnaEyeColor] = useState('Amber hazel');
  const [dnaAge, setDnaAge] = useState('34 years old');
  const [dnaEthnicity, setDnaEthnicity] = useState('Mixed Heritage');
  const [dnaBodyBuild, setDnaBodyBuild] = useState('Athletic muscular');
  const [dnaFacialHair, setDnaFacialHair] = useState('Trimmed 5 oclock shadow');
  const [dnaExpression, setDnaExpression] = useState('Confident relaxed smile');
  const [dnaWardrobeStyle, setDnaWardrobeStyle] = useState('Sci-Fi flight techwear');
  const [dnaUpperClothing, setDnaUpperClothing] = useState('Distressed leather bomber jacket with thermal patches');
  const [dnaLowerClothing, setDnaLowerClothing] = useState('Reinforced flight cargo trousers');
  const [dnaFootwear, setDnaFootwear] = useState('Magnetic traction flight boots');
  const [dnaHeadwear, setDnaHeadwear] = useState('None');
  const [dnaEyewear, setDnaEyewear] = useState('Aviator HUD smart shades');
  const [dnaJewelry, setDnaJewelry] = useState('Silver dog tags');
  const [dnaTattoos, setDnaTattoos] = useState('Compass star tattoo on right forearm');
  const [dnaLighting, setDnaLighting] = useState('Warm cockpit instrument glow');
  const [dnaPosing, setDnaPosing] = useState('Leaning against flight control console');
  const [dnaProp, setDnaProp] = useState('Metal thermos flask');

  // Handle Prompt Input Change and Detect '@'
  const handlePromptChange = (e) => {
    const val = e.target.value;
    setScenePrompt(val);

    const lastWord = val.split(/\s+/).pop() || '';
    if (lastWord.startsWith('@')) {
      setShowTagSuggestions(true);
    } else {
      setShowTagSuggestions(false);
    }
  };

  const handleSelectTag = (handle) => {
    const words = scenePrompt.split(/\s+/);
    words.pop();
    words.push(handle);
    setScenePrompt(words.join(' ') + ' ');
    setShowTagSuggestions(false);
  };

  // Generate Consistent Character Scene via Nano Field API
  const handleGenerateConsistentScene = async () => {
    if (!scenePrompt.trim()) return;
    setIsGenerating(true);
    deductCredits(15);

    // Expand @handles into their visual DNA
    let resolvedPrompt = scenePrompt;
    elements.forEach((el) => {
      if (resolvedPrompt.includes(el.handle)) {
        const dnaString = `[Character Persona: ${el.name}, ${el.dna.hair}, ${el.dna.eyes}, ${el.dna.ethnicity}, ${el.dna.expression}, wearing ${el.dna.wardrobe}, with ${el.dna.prop}]`;
        resolvedPrompt = resolvedPrompt.replace(new RegExp(el.handle, 'g'), dnaString);
      }
    });

    try {
      let res;
      try {
        res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `${resolvedPrompt}, consistent facial bone structure, award-winning photography, 8k resolution`,
            model: 'Nano Banana Pro',
            aspect_ratio: '16:9',
            variants: 2
          })
        });
      } catch {
        res = await fetch('http://localhost:3001/api/v1/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `${resolvedPrompt}, consistent facial bone structure, award-winning photography, 8k resolution`,
            model: 'Nano Banana Pro',
            aspect_ratio: '16:9',
            variants: 2
          })
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setSelectedElement((prev) => ({
            ...prev,
            variations: [data.images[0].url, data.images[1]?.url || data.images[0].url, ...prev.variations]
          }));
        }
      }
    } catch (err) {
      console.warn('API generation note:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save new 19-category character to Elements
  const handleSaveCharacter = () => {
    const newEl = {
      id: `el-${Date.now()}`,
      handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
      name: newName,
      role: newRole,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      dna: {
        hair: `${dnaHairColor} ${dnaHairStyle}`,
        eyes: dnaEyeColor,
        age: dnaAge,
        ethnicity: dnaEthnicity,
        expression: dnaExpression,
        wardrobe: `${dnaUpperClothing}, ${dnaLowerClothing}, ${dnaFootwear}`,
        prop: dnaProp
      },
      variations: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
      ]
    };

    setElements([newEl, ...elements]);
    setSelectedElement(newEl);
    setActiveTab('recall');

    fetch('/api/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEl)
    }).catch(() => {});
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Character Builder & Elements (@ Tagging)
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              19 CATEGORIES
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Build consistent personas with 19 biometric & wardrobe categories. Save to your Elements and recall them instantly in any prompt with the @ symbol.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('recall')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'recall'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AtSign className="w-3.5 h-3.5" />
            <span>@ Tagging Studio</span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'builder'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>19-Category DNA Builder</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: @ TAGGING STUDIO & ROSTER                              */}
      {/* ============================================================== */}
      {activeTab === 'recall' && (
        <div className="space-y-6">
          {/* Elements Roster Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Saved Persona Elements ({elements.length})
              </span>
              <button
                onClick={() => setActiveTab('builder')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Element</span>
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {elements.map((el) => {
                const isSelected = selectedElement.id === el.id;
                return (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElement(el)}
                    className={`shrink-0 w-44 rounded-2xl overflow-hidden bg-slate-900 border p-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-purple-500 ring-2 ring-purple-500/40 shadow-xl shadow-purple-900/30'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5">
                      <img src={el.avatar} alt={el.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-slate-950/90 text-purple-300 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold">
                        {el.handle}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{el.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{el.role}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive @ Tag Prompt Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <AtSign className="w-4 h-4 text-purple-400" />
                  <span>Prompt Editor with Instant @ Recall</span>
                </label>
                <span className="text-[10px] text-purple-400 font-mono">Type @ to invoke persona</span>
              </div>

              {/* Prompt box with suggestion popover */}
              <div className="relative">
                <textarea
                  value={scenePrompt}
                  onChange={handlePromptChange}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/70 resize-none leading-relaxed"
                  placeholder="Type @ to tag any saved character persona..."
                />

                {/* Autocomplete Dropdown */}
                {showTagSuggestions && (
                  <div className="absolute left-4 bottom-14 z-30 bg-slate-900 border border-purple-500/50 rounded-2xl p-2 shadow-2xl w-64 space-y-1 backdrop-blur-md">
                    <div className="text-[10px] font-mono text-purple-300 px-2 py-1 uppercase">Select Element:</div>
                    {elements.map((el) => (
                      <button
                        key={el.id}
                        onClick={() => handleSelectTag(el.handle)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-purple-600/30 text-left transition-colors"
                      >
                        <img src={el.avatar} alt={el.name} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-bold text-white">{el.handle}</div>
                          <div className="text-[10px] text-slate-400">{el.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Persona Injection Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-500">Quick Insert:</span>
                {elements.map((el) => (
                  <button
                    key={el.id}
                    onClick={() => handleSelectTag(el.handle)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 hover:border-purple-500 transition-colors"
                  >
                    {el.handle}
                  </button>
                ))}
              </div>

              {/* Render Action */}
              <button
                onClick={handleGenerateConsistentScene}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rendering Consistent Character Scene...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Render Scene with @ Persona DNA</span>
                  </>
                )}
              </button>
            </div>

            {/* Selected Persona DNA Card & Output Gallery (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedElement.avatar}
                      alt={selectedElement.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{selectedElement.name}</h3>
                      <span className="text-xs font-mono text-purple-400">{selectedElement.handle}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>DNA Locked</span>
                  </span>
                </div>

                {/* DNA Badges Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500">Hair:</span>
                    <div className="font-semibold text-slate-200 mt-0.5">{selectedElement.dna.hair}</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500">Eyes:</span>
                    <div className="font-semibold text-slate-200 mt-0.5">{selectedElement.dna.eyes}</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500">Expression:</span>
                    <div className="font-semibold text-slate-200 mt-0.5">{selectedElement.dna.expression}</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-500">Prop:</span>
                    <div className="font-semibold text-slate-200 mt-0.5">{selectedElement.dna.prop}</div>
                  </div>
                </div>

                {/* Scene Variations Gallery */}
                <div>
                  <div className="text-xs font-bold text-white mb-2">Cross-Scene Variations</div>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedElement.variations.map((vUrl, i) => (
                      <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
                        <img src={vUrl} alt={`Variation ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: 19-CATEGORY PERSONA BUILDER                            */}
      {/* ============================================================== */}
      {activeTab === 'builder' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">19-Category Biometric & Wardrobe Persona DNA</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure complete character anatomy, wardrobe layers, accessories, and signature props.
              </p>
            </div>
            <button
              onClick={handleSaveCharacter}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Save Persona to Elements</span>
            </button>
          </div>

          {/* Identity Basics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Element Handle (@)</label>
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-purple-300 font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Role / Archetype</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
            </div>
          </div>

          {/* 19 Categories Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            {/* 1. Hair Style */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">1. Hair Style</label>
              <input
                type="text"
                value={dnaHairStyle}
                onChange={(e) => setDnaHairStyle(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 2. Hair Color */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">2. Hair Color</label>
              <input
                type="text"
                value={dnaHairColor}
                onChange={(e) => setDnaHairColor(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 3. Eye Color */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">3. Eye Color</label>
              <input
                type="text"
                value={dnaEyeColor}
                onChange={(e) => setDnaEyeColor(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 4. Age Bracket */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">4. Age</label>
              <input
                type="text"
                value={dnaAge}
                onChange={(e) => setDnaAge(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 5. Ethnicity */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">5. Ethnicity / Heritage</label>
              <input
                type="text"
                value={dnaEthnicity}
                onChange={(e) => setDnaEthnicity(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 6. Body Build */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">6. Body Build</label>
              <input
                type="text"
                value={dnaBodyBuild}
                onChange={(e) => setDnaBodyBuild(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 7. Facial Hair */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">7. Facial Hair</label>
              <input
                type="text"
                value={dnaFacialHair}
                onChange={(e) => setDnaFacialHair(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 8. Expression */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">8. Facial Expression</label>
              <input
                type="text"
                value={dnaExpression}
                onChange={(e) => setDnaExpression(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 9. Wardrobe Style */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">9. Wardrobe Aesthetic</label>
              <input
                type="text"
                value={dnaWardrobeStyle}
                onChange={(e) => setDnaWardrobeStyle(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 10. Upper Clothing */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">10. Upper Clothing</label>
              <input
                type="text"
                value={dnaUpperClothing}
                onChange={(e) => setDnaUpperClothing(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 11. Lower Clothing */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">11. Lower Clothing</label>
              <input
                type="text"
                value={dnaLowerClothing}
                onChange={(e) => setDnaLowerClothing(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 12. Footwear */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">12. Footwear</label>
              <input
                type="text"
                value={dnaFootwear}
                onChange={(e) => setDnaFootwear(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 13. Headwear */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">13. Headwear</label>
              <input
                type="text"
                value={dnaHeadwear}
                onChange={(e) => setDnaHeadwear(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 14. Eyewear */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">14. Eyewear</label>
              <input
                type="text"
                value={dnaEyewear}
                onChange={(e) => setDnaEyewear(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 15. Jewelry */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">15. Jewelry & Accs</label>
              <input
                type="text"
                value={dnaJewelry}
                onChange={(e) => setDnaJewelry(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 16. Tattoos */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">16. Tattoos & Marks</label>
              <input
                type="text"
                value={dnaTattoos}
                onChange={(e) => setDnaTattoos(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 17. Lighting Key */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">17. Lighting Key</label>
              <input
                type="text"
                value={dnaLighting}
                onChange={(e) => setDnaLighting(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 18. Posing Archetype */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">18. Posing Archetype</label>
              <input
                type="text"
                value={dnaPosing}
                onChange={(e) => setDnaPosing(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            {/* 19. Signature Prop */}
            <div className="md:col-span-2">
              <label className="text-[11px] font-semibold text-slate-400">19. Signature Prop</label>
              <input
                type="text"
                value={dnaProp}
                onChange={(e) => setDnaProp(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
