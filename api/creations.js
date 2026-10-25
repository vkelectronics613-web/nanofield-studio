// In-memory persistent creations feed across Vercel invocations
if (!globalThis.nanofieldCreations) {
  globalThis.nanofieldCreations = [];
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
