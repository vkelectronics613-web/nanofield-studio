import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  Code2, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Zap
} from 'lucide-react';

// Custom AI Brand Logos
function ClaudeLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M13.5 3L11.5 8.5L8.5 4.5L7.5 9.5L2 10.5L6.5 13L3.5 17L8.5 15.5L9.5 21L12.5 16L16 19.5L15 14L20.5 13.5L16.5 11L21 7.5L15.5 8L13.5 3Z" fill="#D97706" />
    </svg>
  );
}

function CursorLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#3B82F6" fillOpacity="0.2" />
      <path d="M3 7V17L12 22V12L3 7Z" fill="#2563EB" fillOpacity="0.4" />
      <path d="M21 7V17L12 22V12L21 7Z" fill="#1D4ED8" fillOpacity="0.6" />
    </svg>
  );
}

function WindsurfLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2L2 12L12 22L22 12L12 2ZM12 6L18 12L12 18L6 12L12 6Z" fill="#06B6D4" />
      <circle cx="12" cy="12" r="2.5" fill="#22D3EE" />
    </svg>
  );
}

function OpenClawLogo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="10" width="18" height="11" rx="3" fill="#10B981" fillOpacity="0.2" />
      <circle cx="8.5" cy="15.5" r="1.5" fill="#10B981" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="#10B981" />
      <path d="M12 2v4M8 6h8" stroke="#10B981" strokeLinecap="round" />
    </svg>
  );
}

export function McpDashboardScreen() {
  const [copiedKey, setCopiedKey] = useState('');
  const [activeTab, setActiveTab] = useState('claude'); // 'claude', 'cursor', 'windsurf', 'openclaw'

  // Interactive In-Browser MCP Tester State
  const [mcpTool, setMcpTool] = useState('nanofield_generate');
  const [mcpPrompt, setMcpPrompt] = useState('A sleek futuristic hovercraft drifting through a cyber city canyon, 8k render');
  const [mcpModel, setMcpModel] = useState('Nano Banana 2.1');
  const [mcpRatio, setMcpRatio] = useState('16:9');
  const [mcpVariants, setMcpVariants] = useState(2);
  const [isExecuting, setIsExecuting] = useState(false);
  const [mcpResponse, setMcpResponse] = useState(null);

  const PUBLIC_MCP_URL = 'https://web-nine-eta-b63lv577w6.vercel.app/api/mcp?sse=true';

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const claudeConfig = JSON.stringify({
    "mcpServers": {
      "nanofield": {
        "url": PUBLIC_MCP_URL
      }
    }
  }, null, 2);

  const cursorConfig = JSON.stringify({
    "cursor.mcpServers": {
      "nanofield": {
        "url": PUBLIC_MCP_URL
      }
    }
  }, null, 2);

  const windsurfConfig = JSON.stringify({
    "mcpServers": {
      "nanofield": {
        "url": PUBLIC_MCP_URL
      }
    }
  }, null, 2);

  const openClawConfig = `openclaw mcp add nanofield --url "${PUBLIC_MCP_URL}"`;

  // Test live MCP execution
  const handleTestMcpCall = async () => {
    setIsExecuting(true);
    setMcpResponse(null);

    let callParams = { name: mcpTool, arguments: {} };
    if (mcpTool === 'nanofield_generate') {
      callParams.arguments = {
        prompt: mcpPrompt,
        model: mcpModel,
        aspect_ratio: mcpRatio,
        variants: mcpVariants
      };
    } else if (mcpTool === 'nanofield_create_project') {
      callParams.arguments = {
        name: 'HyperDrive Campaign 2026',
        description: 'Autonomous multi-shot commercial asset collection',
        category: 'Commercial Ads'
      };
    } else if (mcpTool === 'nanofield_create_character') {
      callParams.arguments = {
        handle: '@cyber_samurai',
        name: 'Kaelen Vance',
        role: 'Cyberpunk Ronin',
        hair: 'Neon cyan undercut braid',
        eyes: 'Amber cybernetic iris',
        wardrobe: 'Matte-black techwear haori'
      };
    } else if (mcpTool === 'nanofield_edit_image') {
      callParams.arguments = {
        image_url: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png',
        action: 'photo_angle',
        camera_angle: '3/4 Turn (45° Cinematic)',
        prompt: 'Re-angle camera to 45 degree cinematic hero turn with volumetric rim glow'
      };
    } else if (mcpTool === 'nanofield_storyboard_create') {
      callParams.arguments = {
        title: 'Cyberpunk Chronicles 2026',
        shots: [
          { name: 'Shot 1: Extreme Wide', type: 'Establishing', lens: '24mm Wide', prompt: 'Neo Tokyo skyline in rain' },
          { name: 'Shot 2: Hero Close-Up', type: 'Close-Up', lens: '85mm Portrait', prompt: 'Operative focused on terminal' }
        ]
      };
    }

    try {
      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method: 'tools/call',
          params: callParams
        })
      });
      const data = await res.json();
      setMcpResponse(data);
    } catch (err) {
      setMcpResponse({
        jsonrpc: '2.0',
        id: 99,
        error: {
          code: -32000,
          message: err.message
        }
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const clientOptions = [
    { id: 'claude', icon: ClaudeLogo, title: 'Claude' },
    { id: 'cursor', icon: CursorLogo, title: 'Cursor' },
    { id: 'windsurf', icon: WindsurfLogo, title: 'Windsurf' },
    { id: 'openclaw', icon: OpenClawLogo, title: 'OpenClaw' }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e0e16] p-6 rounded-3xl border border-[#1c1c28] shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Terminal className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">MCP</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ACTIVE
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Model Context Protocol connection URL. Add directly to your environment to generate images from any client.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#08080c] border border-[#1f1f2e] text-xs font-mono text-purple-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SSE Endpoint Active</span>
          </div>
        </div>
      </div>

      {/* Grid: Client Setup (Left 6 Cols) & Interactive Playground (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Client Setup Snippets */}
        <div className="lg:col-span-6 space-y-5 bg-[#0e0e16] border border-[#1c1c28] p-6 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>MCP Configuration</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">JSON-RPC 2.0</span>
          </div>

          {/* Clean Brand Logo Toggles (Only logos, no AI name text, no desktop/web text) */}
          <div className="grid grid-cols-4 gap-2 bg-[#08080c] p-2 rounded-2xl border border-[#181824]">
            {clientOptions.map((client) => {
              const Logo = client.icon;
              const isActive = activeTab === client.id;
              return (
                <button
                  key={client.id}
                  onClick={() => setActiveTab(client.id)}
                  title={client.title}
                  aria-label={client.title}
                  className={`flex items-center justify-center py-3.5 px-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/50 scale-[1.02]'
                      : 'hover:bg-[#12121a] text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  <Logo className="w-6 h-6" />
                </button>
              );
            })}
          </div>

          {/* Configuration Code Box */}
          <div className="relative">
            <pre className="bg-[#08080c] border border-[#1f1f2e] rounded-2xl p-4 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed max-h-72">
              {activeTab === 'claude' && claudeConfig}
              {activeTab === 'cursor' && cursorConfig}
              {activeTab === 'windsurf' && windsurfConfig}
              {activeTab === 'openclaw' && openClawConfig}
            </pre>

            <button
              onClick={() => {
                const text =
                  activeTab === 'claude'
                    ? claudeConfig
                    : activeTab === 'cursor'
                    ? cursorConfig
                    : activeTab === 'windsurf'
                    ? windsurfConfig
                    : openClawConfig;
                copyToClipboard(text, activeTab);
              }}
              className="absolute top-3 right-3 p-2 rounded-xl bg-[#14141e]/90 border border-[#242436] hover:border-purple-500 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {copiedKey === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Direct MCP Endpoint Link */}
          <div className="p-4 rounded-2xl bg-[#08080c] border border-[#1f1f2e] space-y-2 text-xs text-slate-400 leading-relaxed">
            <div className="font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Remote MCP Endpoint</span>
              </span>
              <button
                onClick={() => copyToClipboard(PUBLIC_MCP_URL, 'url')}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
              >
                {copiedKey === 'url' ? 'Copied' : 'Copy URL'}
              </button>
            </div>
            <div className="bg-[#101018] px-3 py-2 rounded-xl border border-[#20202e] font-mono text-[11px] text-purple-300 break-all">
              {PUBLIC_MCP_URL}
            </div>
          </div>
        </div>

        {/* Right: In-Browser MCP Playground */}
        <div className="lg:col-span-6 space-y-5 bg-[#0e0e16] border border-[#1c1c28] p-6 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-purple-400" />
              <span>MCP Tester</span>
            </h3>
            <span className="text-[10px] font-mono text-purple-300">Live API</span>
          </div>

          {/* Tool Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'nanofield_generate', label: 'Generate' },
              { id: 'nanofield_edit_image', label: '13 Studio Tools' },
              { id: 'nanofield_storyboard_create', label: 'Storyboard' },
              { id: 'nanofield_create_project', label: 'Project' },
              { id: 'nanofield_create_character', label: 'Persona' },
              { id: 'nanofield_list_creations', label: 'Creations' },
              { id: 'nanofield_list_projects', label: 'All Projects' },
              { id: 'nanofield_status', label: 'Status' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setMcpTool(t.id)}
                className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  mcpTool === t.id
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                    : 'bg-[#08080c] border-[#1f1f2e] text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {mcpTool === 'nanofield_generate' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Prompt Parameter</label>
                <textarea
                  rows={3}
                  value={mcpPrompt}
                  onChange={(e) => setMcpPrompt(e.target.value)}
                  className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] rounded-xl p-3 text-xs text-slate-200 resize-none focus:outline-none focus:border-purple-500/70"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400">Model</label>
                  <select
                    value={mcpModel}
                    onChange={(e) => setMcpModel(e.target.value)}
                    className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] text-slate-200 text-xs rounded-xl px-2.5 py-1.5"
                  >
                    <option value="Nano Banana 2.1">Nano Banana 2.1</option>
                    <option value="Nano Banana Pro">Nano Banana Pro</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400">Aspect Ratio</label>
                  <select
                    value={mcpRatio}
                    onChange={(e) => setMcpRatio(e.target.value)}
                    className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] text-slate-200 text-xs rounded-xl px-2.5 py-1.5"
                  >
                    <option value="16:9">16:9</option>
                    <option value="1:1">1:1</option>
                    <option value="9:16">9:16</option>
                    <option value="4:3">4:3</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400">Variants</label>
                  <select
                    value={mcpVariants}
                    onChange={(e) => setMcpVariants(Number(e.target.value))}
                    className="w-full mt-1 bg-[#08080c] border border-[#1f1f2e] text-slate-200 text-xs rounded-xl px-2.5 py-1.5"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Call Action */}
          <button
            onClick={handleTestMcpCall}
            disabled={isExecuting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Invoking MCP Tool...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Execute MCP Call</span>
              </>
            )}
          </button>

          {/* Response Inspector */}
          {mcpResponse && (
            <div className="space-y-3 pt-3 border-t border-[#1f1f2e]">
              <span className="text-[10px] uppercase font-mono text-slate-400">JSON-RPC 2.0 Response:</span>
              <pre className="bg-[#08080c] border border-[#1f1f2e] rounded-xl p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48 leading-relaxed">
                {JSON.stringify(mcpResponse, null, 2)}
              </pre>

              {/* If images returned, show thumbnail grid */}
              {mcpResponse.result?.images && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {mcpResponse.result.images.map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-black border border-[#1f1f2e]">
                      <img src={img.url} alt={`MCP Variant ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
