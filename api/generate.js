export const config = {
  api: {
    bodyParser: true
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    prompt,
    model = 'Nano Banana 2.1',
    aspect_ratio = '16:9',
    variants = 1,
    num_images
  } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "prompt" parameter' });
  }

  const targetVariants = Number(variants || num_images || 1);

  // Connect to live Nano Field Flow Engine via Cloudflare tunnel or environment URL
  const localEngineUrl = process.env.NANOFIELD_ENGINE_URL || 'https://keyword-lou-indianapolis-sitting.trycloudflare.com';
  
  try {
    const bridgeRes = await fetch(`${localEngineUrl}/api/v1/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model,
        aspect_ratio,
        variants: targetVariants
      }),
      signal: AbortSignal.timeout(60000)
    });
    if (bridgeRes.ok) {
      const data = await bridgeRes.json();
      return res.status(200).json(data);
    } else {
      const errData = await bridgeRes.json().catch(() => ({}));
      return res.status(bridgeRes.status || 500).json({
        success: false,
        error: errData.error || 'Engine generation failed',
        message: errData.message
      });
    }
  } catch (e) {
    console.error('Engine connection error:', e.message);
    return res.status(503).json({
      success: false,
      error: 'Nano Field Engine worker is currently busy or connecting. Please retry in a few seconds.',
      details: e.message
    });
  }
}
