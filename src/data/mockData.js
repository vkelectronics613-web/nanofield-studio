export const MOCK_CREATIONS = [
  {
    id: 'c1',
    title: 'Editorial Portrait',
    prompt: 'High-fashion editorial portrait of a young woman in black dress, warm sunset rim light, cinematic 8k',
    model: 'Banana 2.1 Pro',
    aspect: '16:9',
    date: 'Oct 24, 2026 • 2:15 PM',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    category: 'Portrait'
  },
  {
    id: 'c2',
    title: 'Cyberpunk Hypercar',
    prompt: 'Futuristic black aerodynamic sports car speeding through neon wet streets of Neo-Tokyo, rain reflections, 8k raytracing',
    model: 'Banana 2.1 Pro',
    aspect: '16:9',
    date: 'Oct 24, 2026 • 1:40 PM',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    category: 'Automotive'
  },
  {
    id: 'c3',
    title: 'Fantasy Citadel',
    prompt: 'Epic majestic white marble castle perched on floating mountain peaks, dramatic clouds, golden hour sunlight',
    model: 'Banana 2.0 Fast',
    aspect: '16:9',
    date: 'Oct 24, 2026 • 11:20 AM',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    category: 'Fantasy'
  },
  {
    id: 'c4',
    title: 'Golden Retriever in Sunglasses',
    prompt: 'A golden retriever wearing cool sunglasses at the sunny tropical beach, cinematic lighting, high detail, photorealistic',
    model: 'Banana 2.1 Pro',
    aspect: '16:9',
    date: 'Oct 24, 2026 • 9:05 AM',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    category: 'Animals'
  },
  {
    id: 'c5',
    title: 'Luxury Perfume Elegance',
    prompt: 'Crystal minimalist perfume glass bottle standing on wet black obsidian slab, water droplets, soft dramatic studio lighting',
    model: 'Banana Ultra',
    aspect: '1:1',
    date: 'Oct 23, 2026 • 6:45 PM',
    url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    category: 'Product'
  },
  {
    id: 'c6',
    title: 'Cyberpunk Neon Assassin',
    prompt: 'Cybernetic warrior with glowing holographic visor, matte titanium tactical gear, neon rain backdrop',
    model: 'Banana 2.1 Pro',
    aspect: '9:16',
    date: 'Oct 23, 2026 • 4:30 PM',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    category: 'Sci-Fi'
  }
];

export const MOCK_CHARACTERS = [
  {
    id: 'char-1',
    name: 'Elena Rostova',
    role: 'Cyberpunk Protagonist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    variations: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'char-2',
    name: 'Marcus Vance',
    role: 'Sci-Fi Pilot',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    variations: []
  },
  {
    id: 'char-3',
    name: 'Dr. Aris Thorne',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    variations: []
  },
  {
    id: 'char-4',
    name: 'Kaelen Sky',
    role: 'Rebel Hacker',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    variations: []
  }
];

export const PROMPT_TEMPLATES = [
  {
    id: 't1',
    category: 'Cinematic',
    title: 'Cyberpunk Noir Detective',
    prompt: 'Cinematic wide shot of a futuristic cyber detective standing under flickering neon signs in rain, volumetric fog, anamorphic lens flare, 8k',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't2',
    category: 'Product',
    title: 'Minimalist Perfume Ad',
    prompt: 'Commercial product photography of an amber glass perfume bottle on white limestone rock, morning dappled sunlight, palm shadows, clean luxury',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't3',
    category: 'Anime',
    title: 'Vibrant Shonen Hero',
    prompt: 'Dynamic anime character portrait, expressive electric blue eyes, windblown hair, glowing mystical runes, Makoto Shinkai style, masterwork',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't4',
    category: 'Photorealistic',
    title: 'Alpine Lake Sunrise',
    prompt: 'National Geographic photo of mirror reflection on emerald alpine lake at dawn, snow-capped jagged peaks, morning mist, 8k resolution',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't5',
    category: 'Illustration',
    title: 'Floating Fantasy Citadel',
    prompt: 'Whimsical fantasy illustration of floating islands with stone bridges and glowing lanterns, Studio Ghibli inspired, vibrant warm colors',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't6',
    category: 'Vintage',
    title: 'Retro 70s Sports Coupe',
    prompt: 'Vintage 1970s Italian sports car parked on coastal cliff highway, warm 35mm film grain, golden hour, Kodak Portra 400 aesthetics',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't7',
    category: 'Minimal',
    title: 'Bauhaus Architectural Geometry',
    prompt: 'Minimalist architectural photography of concrete curve and circular skylight, stark geometric shadows, monochromatic clean aesthetic',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 't8',
    category: 'Fantasy',
    title: 'Crystal Dragon Lair',
    prompt: 'Mystic iridescent crystal cavern with glowing amethyst stalactites, ethereal blue water pool, mythical fantasy ambiance, hyper-detailed',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  }
];

export const MOCK_PROJECT = {
  name: 'Summer Campaign',
  updated: '2 days ago',
  count: 12,
  items: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
  ]
};
