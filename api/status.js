export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'online',
    service: 'Nano Field Cloud Engine & Web Studio',
    version: '2.1.0',
    protocol: 'MCP 2024-11-05',
    models: [
      { id: 'Nano Banana 2.1', description: 'Flagship model: Enhanced typography & multi-turn consistency' },
      { id: 'Nano Banana Pro', description: 'Maximum structural fidelity for anatomically correct humans & posters' }
    ],
    endpoints: {
      studio: `https://${req.headers.host}`,
      mcp: `https://${req.headers.host}/api/mcp`,
      mcp_sse: `https://${req.headers.host}/api/mcp?sse=true`,
      generate: `https://${req.headers.host}/api/generate`
    }
  });
}
