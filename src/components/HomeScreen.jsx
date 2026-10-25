import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  ArrowUp, 
  BookOpen, 
  Plus, 
  SlidersHorizontal, 
  Crown, 
  MessageCircle, 
  CheckCircle2, 
  X,
  Check,
  Compass,
  Play,
  Film,
  Camera,
  Shirt,
  Repeat
} from 'lucide-react';

export function HomeScreen({ setTab, setInitialPrompt, isUnlimitedPlan, onActivateUnlimited }) {
  const [promptText, setPromptText] = useState('');
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro');
  const [selectedCanvas, setSelectedCanvas] = useState('16:9 Canvas');
  const [showBanner, setShowBanner] = useState(true);
  const [showSkillDrawer, setShowSkillDrawer] = useState(false);
  const [showUnlimitedModal, setShowUnlimitedModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const carouselRef = useRef(null);

  // Top Model Showcase Cards (Matching Screenshot)
  const SHOWCASE_CARDS = [
    {
      id: 'banana-pro',
      title: 'NANO BANANA PRO',
      sub: '30 DAYS UNLIMITED',
      caption: 'Nano Banana Pro Image Model',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'text-amber-400',
      tag: 'ultra photorealistic masterwork'
    },
    {
      id: 'banana-21',
      title: 'NANO BANANA 2.1',
      sub: 'FLAGSHIP 8K',
      caption: 'Nano Banana 2.1 Flagship',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'text-purple-300',
      tag: 'cinematic lighting, award winning'
    },
    {
      id: 'banana-2',
      title: 'NANO BANANA 2',
      sub: 'HIGH FIDELITY',
      caption: 'Nano Banana 2 Fast',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'text-emerald-400',
      tag: 'editorial portrait, studio lighting'
    },
    {
      id: '3d-builder',
      title: '3D CAMERA STAGING',
      sub: 'ORBIT STUDIO',
      caption: '3D Builder & Angle Studio',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'text-blue-400',
      tag: '3d perspective re-angle'
    },
    {
      id: 'kling-ultra',
      title: 'NANO FIELD 4K',
      sub: 'COMING SOON',
      caption: 'Nano Field 4K Ultra Synth',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'text-amber-400',
      tag: 'cyberpunk 4k raytracing'
    }
  ];

  // Quick Skills (Matching Bottom Skill Pills)
  const SKILL_PILLS = [
    {
      id: 'motion-design',
      title: 'Cinematic Image Design',
      icon: '🎨',
      bg: 'from-pink-500 to-rose-600',
      prompt: 'Cinematic wide angle establishing shot of cyberpunk metropolis in pouring rain, volumetric neon violet lighting, highly detailed 8k photography'
    },
    {
      id: 'film-script',
      title: 'Short Story Visualizer',
      icon: '🎬',
      bg: 'from-amber-500 to-orange-600',
      prompt: 'Dramatic noir mystery scene, detective in trench coat smoking under flickering street lamp, moody shadows, 35mm film grain'
    },
    {
      id: 'actor-expression',
      title: 'Actor Expression & Persona',
      icon: '👤',
      bg: 'from-purple-500 to-indigo-600',
      prompt: 'High fashion editorial close-up portrait, intense emotional gaze, ultra-sharp skin pores, studio catchlight in eyes'
    },
    {
      id: 'explainer-maker',
      title: 'Explainer & Technical Diagram',
      icon: '📐',
      bg: 'from-blue-500 to-cyan-600',
      prompt: 'Futuristic holographic blueprint schematic of orbital spacecraft, clean glowing cyan laser lines, dark obsidian background'
    },
    {
      id: 'recast-relight',
      title: 'Image Recast & Relight',
      icon: '💡',
      bg: 'from-emerald-500 to-teal-600',
      prompt: 'Golden hour sunset relighting on subject, 2800K warm rim illumination, soft natural lens flare, photorealistic'
    },
    {
      id: 'ugc-ads',
      title: 'UGC Commercial Brand Ads',
      icon: '📱',
      bg: 'from-yellow-500 to-amber-600',
      prompt: 'Viral social media product commercial photography, floating luxury sneaker on anti-gravity splash pedestal, crisp 8k'
    }
  ];

  // 4 Bottom Unlimited Plan Cards
  const UNLIMITED_PLANS = [
    {
      id: 'plan-banana-2',
      title: 'Nano Banana 2',
      duration: '30 DAYS UNLIMITED',
      desc: 'Unlimited 1K/2K Fast Generations',
      icon: SlidersHorizontal,
      price: '$9.9',
      isPopular: false
    },
    {
      id: 'plan-banana-21',
      title: 'Nano Banana 2.1',
      duration: '30 DAYS UNLIMITED',
      desc: 'Flagship Photorealism & Typography',
      icon: Zap,
      price: '$19',
      isPopular: false
    },
    {
      id: 'plan-banana-pro',
      title: 'Nano Banana Pro',
      duration: '30 DAYS UNLIMITED',
      desc: 'UNLIMITED IMAGES • 4K Resolution • Zero Queue',
      icon: Crown,
      price: '$29',
      isPopular: true,
      highlight: true
    },
    {
      id: 'plan-studio-365',
      title: 'Studio 365 Enterprise',
      duration: '365 DAYS UNLIMITED',
      desc: 'All Models Unlimited for 1 Full Year',
      icon: Sparkles,
      price: '$199',
      isPopular: false
    }
  ];

  const handleLaunchPrompt = () => {
    if (promptText.trim()) {
      setInitialPrompt(promptText);
    }
    setTab('create');
  };

  const handleSelectSkill = (skill) => {
    setPromptText(skill.prompt);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleConfirmUnlimited = () => {
    if (onActivateUnlimited) {
      onActivateUnlimited();
    }
    setShowUnlimitedModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white select-none pb-16">
      
      {/* 1. TOP ANNOUNCEMENT PROMOTIONAL STRIP (Matching Screenshot Header) */}
      {showBanner && (
        <div className="w-full bg-[#3b0764] border-b border-purple-500/30 px-4 py-2.5 flex items-center justify-between text-xs transition-all shadow-lg">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-0.5">
            {/* Yellow Badge */}
            <span className="bg-[#facc15] text-slate-950 font-black px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider shrink-0 shadow">
              {isUnlimitedPlan ? 'ACTIVE: UNLIMITED ACTIVE' : 'Nano Banana Pro $9.9 / 30d • 30-Day Unlimited'}
            </span>

            {/* Middle Promo Text */}
            <span className="font-bold text-purple-100 shrink-0 hidden sm:inline">
              30-Day Unlimited: <strong className="text-amber-300">Nano Banana Pro</strong> & <strong className="text-purple-300">Nano Banana 2.1</strong> & <strong className="text-emerald-300">4K Studio Ultra</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 ml-2">
            <button
              onClick={() => {
                if (isUnlimitedPlan) {
                  alert('30-Day Unlimited Plan is already active on your account!');
                } else {
                  setShowUnlimitedModal(true);
                }
              }}
              className="bg-white hover:bg-slate-100 text-slate-950 font-black px-3.5 py-1 rounded-md text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isUnlimitedPlan ? 'Plan Active' : 'Get Unlimited'}</span>
              <span className="font-bold">➔</span>
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 rounded-full text-purple-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-10">

        {/* 2. TOP MODEL SHOWCASE CARDS (Carousel Strip) */}
        <div className="relative group">
          <div
            ref={carouselRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
          >
            {SHOWCASE_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  setPromptText(`Cinematic image generated with ${card.title}, ${card.tag}`);
                }}
                className="w-56 md:w-64 shrink-0 space-y-2 cursor-pointer group/card"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#222234] bg-black shadow-xl group-hover/card:border-purple-500/80 transition-all duration-200">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  {/* Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 text-center">
                    <div className="text-xs font-black tracking-wider text-white drop-shadow">
                      {card.title}
                    </div>
                    <div className={`text-[9px] font-extrabold uppercase tracking-widest ${card.badgeColor} mt-0.5`}>
                      {card.sub}
                    </div>
                  </div>
                </div>

                {/* Subtitle Caption */}
                <div className="text-xs font-medium text-slate-300 group-hover/card:text-white transition-colors truncate">
                  {card.caption}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Chevron */}
          <button
            onClick={() => scrollCarousel('right')}
            className="hidden md:flex absolute -right-3 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-[#181824]/90 border border-[#2a2a3e] text-white items-center justify-center shadow-2xl hover:bg-purple-600 transition-all z-20 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3. MASSIVE HERO HEADLINE */}
        <div className="text-center pt-2 pb-1 space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase drop-shadow-2xl">
            TURN STORIES INTO MASTERPIECE IMAGES
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-2xl mx-auto">
            The next-generation autonomous AI visual studio. Generate photorealistic 8K imagery, multi-shot narratives, and commercial packshots with Google Nano Banana.
          </p>
        </div>

        {/* 4. FLOATING AGENT CONSOLE (Hero Prompt Box) */}
        <div className="max-w-4xl mx-auto relative">
          {/* Ambient Purple Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-fuchsia-600/20 to-indigo-600/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

          {/* Console Container */}
          <div className="relative bg-[#101018]/95 border border-[#26263a] rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-2xl space-y-4">
            
            {/* Top Bar inside Box */}
            <div className="flex items-center justify-between border-b border-[#1c1c28] pb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-sm">Image Agent</span>
                <select
                  value={selectedCanvas}
                  onChange={(e) => setSelectedCanvas(e.target.value)}
                  className="bg-[#181824] border border-[#2c2c3e] text-slate-300 text-xs px-2.5 py-1 rounded-xl focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="16:9 Canvas">16:9 Canvas</option>
                  <option value="4:3 Editorial">4:3 Editorial</option>
                  <option value="1:1 Square">1:1 Square</option>
                  <option value="9:16 Vertical">9:16 Reel</option>
                  <option value="21:9 Anamorphic">21:9 Widescreen</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTab('storyboard')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Storyboard Studio ➔
                </button>
              </div>
            </div>

            {/* Prompt Textarea */}
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Ask Nano Field to turn your imagination into photorealistic master images..."
              className="w-full bg-transparent text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
            />

            {/* Bottom Toolbar inside Box */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1a1a26]">
              {/* Left Group */}
              <div className="flex items-center gap-2">
                {/* Attach File Button */}
                <button
                  onClick={() => setTab('create')}
                  title="Upload visual reference"
                  className="w-8 h-8 rounded-xl bg-[#181824] border border-[#2c2c3e] text-slate-300 hover:text-white flex items-center justify-center hover:border-purple-500 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Skill Selector Pill */}
                <button
                  onClick={() => setShowSkillDrawer(!showSkillDrawer)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181824] border border-[#2c2c3e] text-slate-300 hover:text-white text-xs font-semibold hover:border-purple-500 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Skill</span>
                </button>

                {/* Model Selector Dropdown */}
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-[#181824] border border-[#2c2c3e] text-slate-200 text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-purple-500 cursor-pointer font-medium"
                >
                  <option value="Nano Banana Pro">🍌 Nano Banana Pro (4K Pro)</option>
                  <option value="Nano Banana 2.1">🍌 Nano Banana 2.1 (Flagship)</option>
                  <option value="Nano Banana 2">🍌 Nano Banana 2 (Fast 1K/2K)</option>
                </select>
              </div>

              {/* Right Group: AI Engine + Send Arrow */}
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline text-[11px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-lg">
                  {isUnlimitedPlan ? '∞ Unlimited 30d' : 'Nano Banana 2.1'}
                </span>

                {/* Send / Generate Button */}
                <button
                  onClick={handleLaunchPrompt}
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. QUICK SKILLS / PRESETS PILL BAR (Matching Screenshot) */}
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SKILL_PILLS.map((skill) => (
            <button
              key={skill.id}
              onClick={() => handleSelectSkill(skill)}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#12121a] border border-[#20202e] hover:border-purple-500/60 hover:bg-[#181824] transition-all shrink-0 text-xs text-slate-200 cursor-pointer group shadow"
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${skill.bg} flex items-center justify-center text-xs shadow-sm shrink-0`}>
                {skill.icon}
              </div>
              <span className="font-semibold group-hover:text-white">{skill.title}</span>
            </button>
          ))}
          <button
            onClick={() => setTab('prompts')}
            className="px-3.5 py-2 rounded-2xl bg-[#12121a] border border-[#20202e] hover:border-purple-500 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-all shrink-0 cursor-pointer"
          >
            More Skills ➔
          </button>
        </div>

        {/* 6. BOTTOM UNLIMITED PLAN CARDS (Matching Screenshot Bottom Row) */}
        <div className="space-y-3 pt-6 border-t border-[#181824]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Unlimited Image Generation Plans
              </h3>
            </div>
            {isUnlimitedPlan && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>30-Day Unlimited Active</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {UNLIMITED_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => {
                  if (plan.highlight) {
                    setShowUnlimitedModal(true);
                  } else {
                    handleConfirmUnlimited();
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-purple-950/60 via-[#12121a] to-[#0c0c14] border-purple-500/70 hover:border-purple-400 shadow-xl shadow-purple-900/20'
                    : 'bg-[#101018] border-[#20202e] hover:border-slate-700'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-400 to-fuchsia-500 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                    Most Popular
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-[#181824] border border-[#28283c] flex items-center justify-center text-purple-400">
                      <plan.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black tracking-wider text-amber-400 font-mono">
                      {plan.duration}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {plan.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {plan.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1a1a26] flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white text-base">{plan.price}</strong>
                    <span className="text-[10px] text-slate-500"> / 30 days</span>
                  </div>
                  <button className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition-all shadow">
                    {isUnlimitedPlan && plan.highlight ? 'Activated' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 30-DAY UNLIMITED PLAN ACTIVATION MODAL */}
      {showUnlimitedModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121a] border border-purple-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowUnlimitedModal(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>30-Day Unlimited Nano Banana Pro Plan</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Unlimited Master Image Generations
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Generate as many photorealistic visuals as you want for 30 full days with zero credit deductions.
              </p>
            </div>

            {/* Feature List */}
            <div className="p-4 rounded-2xl bg-[#08080c] border border-[#242436] space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>∞ Unlimited Generations:</strong> Nano Banana Pro & 2.1</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Zero Credit Cost:</strong> Direct priority queue on Google Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>4K Super-Resolution:</strong> LaMa watermark auto-cleaner active</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>All 13 Higgsfield AI Tools:</strong> Storyboard, Relight, AnyShoot</span>
              </div>
            </div>

            {/* Activate Action */}
            <div className="space-y-2">
              <button
                onClick={handleConfirmUnlimited}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-fuchsia-600 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Crown className="w-4 h-4 fill-white" />
                <span>Activate 30-Day Unlimited Pass ($29.00 • 1-Click Free Pass)</span>
              </button>
              <p className="text-[10px] text-center text-slate-500">
                Instantly activates 30 days of unlimited generations in this browser session.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Celebratory Activation Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161624] border border-amber-400/60 rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
            <Crown className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">30-Day Unlimited Plan Activated! 🎉</div>
            <div className="text-[11px] text-amber-300">Unlimited Nano Banana Pro generations enabled.</div>
          </div>
        </div>
      )}

      {/* Floating Purple Support / Chat Widget in Bottom Right (Matching Screenshot) */}
      <div 
        onClick={() => setTab('create')}
        title="Open Studio Assistant"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>
  );
}
