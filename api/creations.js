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
  const localEngineUrl = process.env.NANOFIELD_ENGINE_URL || 'https://external-smallest-thank-isaac.trycloudflare.com';
  let engineCreations = [];

  try {
    const lRes = await fetch(`${localEngineUrl}/api/v1/latest`, { signal: AbortSignal.timeout(3000) });
    if (lRes.ok) {
      const data = await lRes.json();
      engineCreations = (data.images || []).map((img, i) => ({
        id: `eng-${img.created_at || Date.now()}-${i}`,
        title: img.filename,
        prompt: 'Studio Creation',
        model: 'Nano Banana 2.1',
        aspect: '16:9',
        url: `/media/${img.filename}`,
        timestamp: new Date(img.created_at || Date.now()).toISOString(),
        likes: 0
      }));
    }
  } catch (e) {
    // ignore
  }

  const allCreations = [...engineCreations, ...getCreations(Number(limit))];

  res.status(200).json({
    success: true,
    total: allCreations.length,
    creations: allCreations.slice(0, Number(limit))
  });
}
