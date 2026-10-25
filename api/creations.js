// In-memory persistent creations feed across Vercel invocations
if (!globalThis.nanofieldCreations) {
  globalThis.nanofieldCreations = [
    {
      id: 'c-1',
      title: 'Golden Eagle on Mountain Ledge',
      prompt: 'portrait of a majestic golden eagle perched on a mountain ledge, cinematic lighting, 8k',
      model: 'Nano Banana 2.1',
      aspect: '16:9',
      url: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792911009262_v1_3zl3.png',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      likes: 42
    },
    {
      id: 'c-2',
      title: 'Futuristic Electric Hypercar',
      prompt: 'a sleek futuristic electric sportscar on neon highway, 8k',
      model: 'Nano Banana 2.1',
      aspect: '16:9',
      url: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      likes: 89
    },
    {
      id: 'c-3',
      title: 'Lighthouse on Stormy Coastline',
      prompt: 'a lighthouse on a stormy coastline at golden hour',
      model: 'Nano Banana 2.1',
      aspect: '16:9',
      url: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910064026_v1_lahk.png',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      likes: 64
    }
  ];
}

export function addCreation(item) {
  const newCreation = {
    id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: item.title || item.prompt?.slice(0, 36) || 'Untitled Creation',
    prompt: item.prompt,
    model: item.model || 'Nano Banana 2.1',
    aspect: item.aspect_ratio || '16:9',
    url: item.url,
    timestamp: new Date().toISOString(),
    likes: 0,
    projectId: item.project_id || null
  };
  globalThis.nanofieldCreations.unshift(newCreation);
  return newCreation;
}

export function getCreations(limit = 50) {
  return globalThis.nanofieldCreations.slice(0, limit);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const item = req.body || {};
    const created = addCreation(item);
    return res.status(201).json({ success: true, creation: created });
  }

  const { limit = 50 } = req.query;
  res.status(200).json({
    success: true,
    total: globalThis.nanofieldCreations.length,
    creations: getCreations(Number(limit))
  });
}
