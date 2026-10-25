// Vercel Serverless Function: Stream & Cache Nano Field Media under official website domain
export const config = {
  api: {
    responseLimit: false
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const file = req.query.file || req.query.name;
  if (!file || typeof file !== 'string') {
    return res.status(400).send('Missing file parameter');
  }

  // Sanitize filename to prevent directory traversal
  const cleanName = file.replace(/[^a-zA-Z0-9_.-]/g, '');
  if (!cleanName.endsWith('.png') && !cleanName.endsWith('.jpg') && !cleanName.endsWith('.jpeg')) {
    return res.status(400).send('Invalid file format requested');
  }

  const localEngineUrl = process.env.NANOFIELD_ENGINE_URL || 'https://keyword-lou-indianapolis-sitting.trycloudflare.com';

  try {
    const upstreamRes = await fetch(`${localEngineUrl}/media/${cleanName}`, {
      signal: AbortSignal.timeout(15000)
    });

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send('Media not found on engine');
    }

    const contentType = cleanName.endsWith('.jpg') || cleanName.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const buffer = await upstreamRes.arrayBuffer();
    return res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    console.error('[Media Proxy Error]:', err.message);
    return res.status(502).send('Error retrieving media from storage: ' + err.message);
  }
}
