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

  // Check if local engine tunnel or bridge is configured
  const localEngineUrl = process.env.NANOFIELD_ENGINE_URL;
  if (localEngineUrl) {
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
      }
    } catch (e) {
      console.warn('Bridge forwarding failed, falling back to cloud rendering provider:', e.message);
    }
  }

  // Real AI image generation via Flux / Cloud Engine
  const ratioMap = {
    '16:9': { width: 1280, height: 720 },
    '21:9': { width: 1344, height: 576 },
    '1:1': { width: 1024, height: 1024 },
    '9:16': { width: 720, height: 1280 },
    '4:3': { width: 1024, height: 768 },
    '3:4': { width: 768, height: 1024 }
  };
  const dims = ratioMap[aspect_ratio] || { width: 1280, height: 720 };
  const baseSeed = Math.floor(Math.random() * 900000) + 100000;

  const images = [];
  for (let i = 0; i < targetVariants; i++) {
    const seed = baseSeed + i * 137;
    const cleanPrompt = encodeURIComponent(prompt.trim());
    const url = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${dims.width}&height=${dims.height}&model=flux&seed=${seed}&nologo=true`;
    images.push({
      variant: i + 1,
      url,
      filename: `nanofield_${Date.now()}_v${i + 1}.jpg`
    });
  }

  res.status(200).json({
    success: true,
    images,
    image_url: images[0]?.url,
    total_generated: images.length,
    model,
    aspect_ratio,
    variants: targetVariants,
    prompt
  });
}
