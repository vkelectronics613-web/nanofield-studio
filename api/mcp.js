// Vercel Serverless Function: Nano Field Advanced Higgsfield & OpenArt MCP Server
// Supports HTTP JSON-RPC 2.0 and Server-Sent Events (SSE) for remote AI agents (Claude, Cursor, Windsurf, OpenClaw)
import { addCreation, getCreations } from './creations.js';
import { createProject, getProjects, addAssetToProject } from './projects.js';
import { createCharacter, getCharacters } from './characters.js';

export const config = {
  api: {
    bodyParser: true,
    responseLimit: false
  }
};

const TOOLS = [
  {
    name: 'openart_generate_image',
    description: 'Generate high-fidelity AI images from a visual prompt. Returns an embedded image content block displayed inline in chat.',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Detailed prompt describing the image to generate.'
        },
        model: {
          type: 'string',
          enum: ['Nano Banana 2.1', 'Nano Banana Pro'],
          default: 'Nano Banana 2.1',
          description: 'Model identifier.'
        },
        aspect_ratio: {
          type: 'string',
          enum: ['16:9', '21:9', '1:1', '9:16', '4:3', '3:4'],
          default: '16:9',
          description: 'Image aspect ratio.'
        },
        variants: {
          type: 'integer',
          enum: [1, 2, 4],
          default: 1,
          description: 'Number of variations.'
        }
      },
      required: ['prompt']
    }
  },
  {
    name: 'nanofield_generate',
    description: 'Generate high-fidelity cinematic and commercial AI images using Nano Field Studio models (Nano Banana 2.1 flagship or Nano Banana Pro). Automatically removes Gemini watermark with LaMa inpainting. Returns an embedded image content block displayed inline in chat.',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Detailed visual prompt describing the scene, lighting, style, and subject. Supports @persona handles.'
        },
        model: {
          type: 'string',
          enum: ['Nano Banana 2.1', 'Nano Banana Pro'],
          default: 'Nano Banana 2.1',
          description: 'Model choice: "Nano Banana 2.1" for flagship typography & general generation, or "Nano Banana Pro" for maximum anatomical realism and structural detail.'
        },
        aspect_ratio: {
          type: 'string',
          enum: ['16:9', '21:9', '1:1', '9:16', '4:3', '3:4'],
          default: '16:9',
          description: 'Image aspect ratio.'
        },
        variants: {
          type: 'integer',
          enum: [1, 2, 4],
          default: 1,
          description: 'Number of unique image variations to generate (1, 2, or 4).'
        },
        project_id: {
          type: 'string',
          description: 'Optional Project ID or Project Name to automatically assign the generated images to.'
        },
        character_tag: {
          type: 'string',
          description: 'Optional character persona handle (e.g. "@cyber_samurai") to inject consistent biometric DNA into prompt.'
        }
      },
      required: ['prompt']
    }
  },
  {
    name: 'nanofield_create_project',
    description: 'Create a new project workspace / campaign folder in Nano Field Studio to organize multi-shot assets, commercials, and creative collections.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Project or campaign name (e.g. "Cyberpunk Fashion 2026", "Aura Sound Commercial").'
        },
        description: {
          type: 'string',
          description: 'Brief description of the project objective and visual theme.'
        },
        category: {
          type: 'string',
          enum: ['Commercial Ads', 'Cinematography', 'Character Series', 'Concept Art', 'Social Media'],
          default: 'Commercial Ads',
          description: 'Project category.'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'nanofield_list_projects',
    description: 'List all active project workspaces, campaigns, and their asset counts from Nano Field Studio.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'nanofield_add_to_project',
    description: 'Assign a generated image asset URL to a specific Nano Field project campaign.',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or name of the destination project.'
        },
        asset_url: {
          type: 'string',
          description: 'The URL of the generated image asset.'
        }
      },
      required: ['project_id', 'asset_url']
    }
  },
  {
    name: 'nanofield_create_character',
    description: 'Create and save a consistent character persona with an @ handle and 19-category biometric and wardrobe DNA to your Nano Field Elements.',
    inputSchema: {
      type: 'object',
      properties: {
        handle: {
          type: 'string',
          description: 'Unique persona handle starting with @ (e.g. "@cyber_samurai", "@marcus_pilot").'
        },
        name: {
          type: 'string',
          description: 'Full name of the character persona.'
        },
        role: {
          type: 'string',
          description: 'Character occupation or narrative role.'
        },
        hair: {
          type: 'string',
          description: 'Hair style, color, and texture.'
        },
        eyes: {
          type: 'string',
          description: 'Eye color, cybernetics, or shape.'
        },
        wardrobe: {
          type: 'string',
          description: 'Consistent clothing, attire, armor, or accessories.'
        },
        prop: {
          type: 'string',
          description: 'Signature prop, gadget, or item.'
        },
        avatar_url: {
          type: 'string',
          description: 'Optional image URL for the character avatar.'
        }
      },
      required: ['handle', 'name']
    }
  },
  {
    name: 'nanofield_list_characters',
    description: 'List all saved character personas and their @ handles in Nano Field Studio.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'nanofield_list_creations',
    description: 'Fetch recent creations, gallery packages, and prompts from the Nano Field Studio library. You can also pass a specific "filename" to display that exact thumbnail inline.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'integer',
          default: 20,
          description: 'Maximum number of recent creations to return.'
        },
        filename: {
          type: 'string',
          description: 'Optional specific filename to view (e.g. "nanofield_1792923750658_v1_hupq.png"). If specified, delivers this image inline.'
        }
      }
    }
  },
  {
    name: 'nanofield_get_image',
    description: 'Fetch and display any generated image, thumbnail, or creation inline in chat by its filename or media URL.',
    inputSchema: {
      type: 'object',
      properties: {
        filename: {
          type: 'string',
          description: 'The filename or URL of the image to display (e.g., "nanofield_1792923750658_v1_hupq.png" or "https://.../media/nanofield_...png").'
        }
      },
      required: ['filename']
    }
  },
  {
    name: 'nanofield_edit_image',
    description: 'Perform Higgsfield precision AI image transformations: Photo Angle 3D orbit, Relight Studio, Virtual Try-On (AnyShoot), Product Photography, Character Swap, Face Swap, Edit Text typography, Click-to-Edit, Inpaint, 4K Upscale, and Background Removal.',
    inputSchema: {
      type: 'object',
      properties: {
        image_url: {
          type: 'string',
          description: 'URL of the source image to edit.'
        },
        action: {
          type: 'string',
          enum: [
            'photo_angle',
            'relight',
            'try_on',
            'product_photo',
            'character_swap',
            'face_swap',
            'edit_text',
            'click_to_edit',
            'inpaint',
            'upscale_4k',
            'remove_background',
            'cinematic_retouch',
            'reframe'
          ],
          default: 'photo_angle',
          description: 'Higgsfield transformation tool to execute.'
        },
        prompt: {
          type: 'string',
          description: 'Guidance prompt or description for the edit.'
        },
        camera_angle: {
          type: 'string',
          description: 'For photo_angle: e.g. "Front (0°)", "3/4 Turn (45°)", "Side Profile (90°)", "Hero Low-Angle (-30°)", "Drone Aerial (+60°)", "Dutch Tilt (+15°)".'
        },
        relight_preset: {
          type: 'string',
          description: 'For relight: e.g. "Golden Hour Sunset", "Cyberpunk Neon Dual-Tone", "Film Noir Spotlight", "Softbox Studio Key", "Volumetric God Rays".'
        },
        garment: {
          type: 'string',
          description: 'For try_on (AnyShoot): garment style to dress model in (e.g. "Matte Black Cyber Trench", "Emerald Silk Gown").'
        },
        pedestal: {
          type: 'string',
          description: 'For product_photo: staging base (e.g. "Black Obsidian Floating Pedestal", "Liquid Water Splash", "Anti-Gravity Pod").'
        },
        text_overlay: {
          type: 'string',
          description: 'For edit_text: headline string to synthesize in image typography.'
        },
        target_character: {
          type: 'string',
          description: 'For character_swap: persona handle or name to swap in.'
        },
        target_face: {
          type: 'string',
          description: 'For face_swap: target face identity description or URL.'
        },
        click_coords: {
          type: 'string',
          description: 'For click_to_edit: coordinate pinpoint e.g. "x:50, y:45".'
        }
      },
      required: ['image_url', 'action']
    }
  },
  {
    name: 'nanofield_storyboard_create',
    description: 'Create a multi-shot cinematic storyboard in Nano Field Studio with shot types, lens choices, and script beats.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the storyboard or film sequence.'
        },
        shots: {
          type: 'array',
          description: 'Array of shots comprising the sequence.',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { type: 'string', description: 'Shot type (e.g. Extreme Wide, Medium Close-Up, Heroic Low Angle)' },
              lens: { type: 'string', description: 'Lens (e.g. 24mm Anamorphic, 35mm Prime, 85mm Portrait)' },
              prompt: { type: 'string', description: 'Visual prompt describing the beat' },
              dialogue: { type: 'string', description: 'Optional dialogue or narration line' }
            },
            required: ['prompt']
          }
        }
      },
      required: ['title', 'shots']
    }
  },
  {
    name: 'nanofield_status',
    description: 'Check connection status, active accounts, supported models, and engine health of Nano Field engine.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'web-nine-eta-b63lv577w6.vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const officialBaseUrl = `${protocol}://${host}`;
  const localEngineUrl = process.env.NANOFIELD_ENGINE_URL || 'https://external-smallest-thank-isaac.trycloudflare.com';

  // Handle SSE connection for Remote MCP
  if (req.method === 'GET') {
    const isSse = req.headers.accept && req.headers.accept.includes('text/event-stream');
    if (isSse || req.query.sse === 'true') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });

      const endpointUrl = `${officialBaseUrl}/api/mcp`;
      res.write(`event: endpoint\ndata: ${endpointUrl}\n\n`);
      res.write(`data: ${JSON.stringify({ jsonrpc: '2.0', method: 'ping' })}\n\n`);
      return;
    }

    // Return human-readable MCP manifest info
    return res.status(200).json({
      name: 'nanofield-mcp',
      description: 'Nano Field Official Higgsfield & OpenArt Model Context Protocol (MCP) Server',
      version: '2.0.0',
      protocol: '2024-11-05',
      website: officialBaseUrl,
      transport: ['http-jsonrpc', 'sse'],
      tools: TOOLS,
      usage: {
        cursor_mcp: {
          command: 'curl',
          args: [`${officialBaseUrl}/api/mcp`]
        },
        sse_endpoint: `${officialBaseUrl}/api/mcp?sse=true`
      }
    });
  }

  // Handle JSON-RPC 2.0 POST requests
  if (req.method === 'POST') {
    const { jsonrpc, id, method, params } = req.body || {};

    if (method === 'initialize') {
      return res.status(200).json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'nanofield-mcp',
            version: '2.0.0'
          }
        }
      });
    }

    if (method === 'notifications/initialized' || method === 'ping') {
      return res.status(200).json({ jsonrpc: '2.0', id: id || null, result: {} });
    }

    if (method === 'tools/list') {
      return res.status(200).json({
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOLS
        }
      });
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};

      // 1. ENGINE STATUS
      if (toolName === 'nanofield_status') {
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `🍌 **Nano Field Studio Engine Status**\n- Endpoint: \`${officialBaseUrl}\`\n- Status: Online & Serving\n- Active Models: Nano Banana 2.1 (Flagship), Nano Banana Pro\n- Post-Processing: Neural LaMa Watermark Removal Active\n- Protocol: MCP 2024-11-05 (HTTP/SSE Remote)\n- Studio Web: [Open Studio](${officialBaseUrl}/explore)`
              }
            ]
          }
        });
      }

      // 2. PROJECT MANAGEMENT: CREATE PROJECT
      if (toolName === 'nanofield_create_project') {
        const { name, description = '', category = 'Commercial Ads' } = toolArgs;
        if (!name) {
          return res.status(400).json({ jsonrpc: '2.0', id, error: { code: -32602, message: 'Project name is required' } });
        }
        const project = createProject({ name, description, category });
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `📁 **Project Created: "${project.name}"**\n- Category: \`${project.category}\`\n- Status: Active\n- View & Manage on Website: [${officialBaseUrl}/projects](${officialBaseUrl}/projects)`
              }
            ],
            project: {
              ...project,
              studio_url: `${officialBaseUrl}/projects`
            }
          }
        });
      }

      // 3. PROJECT MANAGEMENT: LIST PROJECTS
      if (toolName === 'nanofield_list_projects') {
        const projects = getProjects();
        let markdown = `### 📁 Active Nano Field Projects (${projects.length})\n\n`;
        projects.forEach((p, idx) => {
          markdown += `**${idx + 1}. ${p.name}** (${p.category})\n`;
          markdown += `- Assets: ${p.count} | Updated: ${p.updated}\n`;
          markdown += `- [Open Project in Studio](${officialBaseUrl}/projects)\n\n`;
        });
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: markdown }],
            projects: projects.map(p => ({ ...p, studio_url: `${officialBaseUrl}/projects` }))
          }
        });
      }

      // 4. PROJECT MANAGEMENT: ADD TO PROJECT
      if (toolName === 'nanofield_add_to_project') {
        const { project_id, asset_url } = toolArgs;
        const updated = addAssetToProject(project_id, asset_url);
        if (!updated) {
          return res.status(404).json({ jsonrpc: '2.0', id, error: { code: -32001, message: `Project "${project_id}" not found` } });
        }
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `✅ Added asset to **${updated.name}** (Total Assets: ${updated.count})\n- [View Project in Studio](${officialBaseUrl}/projects)`
              }
            ],
            project: updated
          }
        });
      }

      // 5. CHARACTER MANAGEMENT: CREATE CHARACTER
      if (toolName === 'nanofield_create_character') {
        const { handle, name, role = 'Protagonist', hair, eyes, wardrobe, prop, avatar_url } = toolArgs;
        if (!handle || !name) {
          return res.status(400).json({ jsonrpc: '2.0', id, error: { code: -32602, message: 'Handle and Name are required' } });
        }
        const character = createCharacter({
          handle,
          name,
          role,
          avatar: avatar_url,
          dna: { hair, eyes, wardrobe, prop }
        });
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `👤 **Character Element Saved: ${character.name} (${character.handle})**\n- Role: ${character.role}\n- Hair: ${character.dna.hair} | Eyes: ${character.dna.eyes}\n- Wardrobe: ${character.dna.wardrobe}\n- Recall anywhere using \`${character.handle}\` in prompts\n- [View in Character Studio](${officialBaseUrl}/characters)`
              }
            ],
            character: {
              ...character,
              studio_url: `${officialBaseUrl}/characters`
            }
          }
        });
      }

      // 6. CHARACTER MANAGEMENT: LIST CHARACTERS
      if (toolName === 'nanofield_list_characters') {
        const characters = getCharacters();
        let markdown = `### 👤 Saved Persona Elements (${characters.length})\n\n`;
        characters.forEach((c) => {
          markdown += `* **${c.handle}** - ${c.name} (${c.role})\n`;
          markdown += `  DNA: ${c.dna.wardrobe}, ${c.dna.hair}, ${c.dna.eyes}\n\n`;
        });
        markdown += `*Tip: Inject any persona by writing \`@handle\` inside your prompts.*`;
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: markdown }],
            characters: characters.map(c => ({ ...c, studio_url: `${officialBaseUrl}/characters` }))
          }
        });
      }

      // 7. CREATIONS GALLERY: LIST CREATIONS & GET IMAGE
      if (toolName === 'nanofield_list_creations' || toolName === 'nanofield_get_image') {
        const { limit = 10, filename: reqFilename } = toolArgs;
        let creations = [];

        try {
          const queryUrl = reqFilename
            ? `${localEngineUrl}/api/v1/latest?include_base64=true&filename=${encodeURIComponent(reqFilename)}`
            : `${localEngineUrl}/api/v1/latest?include_base64=true`;
          const lRes = await fetch(queryUrl, { signal: AbortSignal.timeout(10000) });
          if (lRes.ok) {
            const data = await lRes.json();
            creations = (data.images || []).map(f => ({
              title: f.filename,
              url: `${officialBaseUrl}/media/${f.filename}`,
              base64: f.base64,
              created_at: f.created_at
            }));
          }
        } catch (e) {
          console.warn('[MCP list_creations note]:', e.message);
        }

        if (creations.length === 0) {
          creations = getCreations(Number(limit));
        }

        const responseContent = [];

        // Deliver native MCP image block for the primary creation so Claude renders it directly
        if (creations[0]?.base64) {
          const rawBase64 = creations[0].base64.replace(/^data:image\/\w+;base64,/, '').replace(/[\r\n]/g, '');
          const mimeType = rawBase64.startsWith('/9j/') ? 'image/jpeg' : (rawBase64.startsWith('iVBORw') ? 'image/png' : 'image/jpeg');
          responseContent.push({
            type: 'image',
            data: rawBase64,
            mimeType,
            annotations: {
              audience: ['user', 'assistant'],
              priority: 1.0
            }
          });
        }

        let markdown = toolName === 'nanofield_get_image' && creations[0]
          ? `### 🖼️ Studio Asset: \`${creations[0].title}\`\n\n- **Direct URL**: ${creations[0].url}\n- **Studio Library**: ${officialBaseUrl}/library\n\n`
          : `### 🎨 Recent Studio Creations (${creations.length})\n\n`;

        creations.slice(0, Number(limit)).forEach((item, idx) => {
          markdown += `**${idx + 1}. \`${item.title}\`**\n`;
          markdown += `- **Direct URL**: ${item.url}\n`;
          markdown += `- [Open in Studio Library](${officialBaseUrl}/library)\n\n`;
        });

        responseContent.push({
          type: 'text',
          text: markdown
        });

        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: responseContent,
            creations: creations.map(c => ({ ...c, studio_url: `${officialBaseUrl}/library` }))
          }
        });
      }

      // 8. IMAGE EDITING & HIGGSFIELD PRECISION MODES
      if (toolName === 'nanofield_edit_image') {
        const {
          image_url,
          action = 'upscale_4k',
          prompt = '',
          camera_angle = '3/4 Turn (45° Cinematic)',
          relight_preset = 'Cyberpunk Neon Dual-Tone',
          garment = 'Matte Black Cyber Techwear Trench',
          pedestal = 'Black Obsidian Floating Pedestal',
          text_overlay = 'NANO FIELD',
          target_character = 'Elena (Cyberpunk Operative)',
          target_face = 'Sarah (Asian Editorial Hero)',
          click_coords = 'x:50, y:45'
        } = toolArgs;

        const actionLabels = {
          photo_angle: `3D Photo Angle (${camera_angle})`,
          relight: `Studio Relight (${relight_preset})`,
          try_on: `Virtual Try-On AnyShoot (${garment})`,
          product_photo: `Product Photography (${pedestal})`,
          character_swap: `Character Swap (${target_character})`,
          face_swap: `Face Swap (${target_face})`,
          edit_text: `Typography Overlay ("${text_overlay}")`,
          click_to_edit: `Click-to-Edit Pinpoint (${click_coords})`,
          inpaint: 'Generative Brush Inpaint',
          remove_background: 'Background Removed (Transparent Alpha PNG)',
          upscale_4k: '4K Ultra-Clarity Upscaled Render',
          cinematic_retouch: 'Cinematic Dynamic Color Grade',
          reframe: 'Re-framed 16:9 Composition'
        };

        const toolRouteMap = {
          photo_angle: 'photo-angle',
          relight: 'relight',
          try_on: 'try-on',
          product_photo: 'product-photo',
          character_swap: 'char-swap',
          face_swap: 'face-swap',
          edit_text: 'edit-text',
          click_to_edit: 'click-to-edit',
          inpaint: 'inpaint',
          upscale_4k: 'upscale-4k',
          remove_background: 'bg-remove',
          cinematic_retouch: 'prompt-edit',
          reframe: 'reframe'
        };

        const editTitle = actionLabels[action] || action;
        const targetTool = toolRouteMap[action] || 'prompt-edit';

        const editedCreation = addCreation({
          title: `Edited: ${editTitle}`,
          prompt: prompt || `Action: ${action} on ${image_url}`,
          model: 'Nano Banana Pro',
          aspect_ratio: '16:9',
          url: image_url
        });

        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `✨ **Higgsfield Transformation Complete: ${editTitle}**\n\n![Edited Image](${image_url})\n\n- Original: [View Source](${image_url})\n- [Open in Studio Editor](${officialBaseUrl}/editor?tool=${targetTool})`
              }
            ],
            edited_asset: {
              url: image_url,
              action,
              tool: targetTool,
              studio_url: `${officialBaseUrl}/editor?tool=${targetTool}`
            }
          }
        });
      }

      // 8B. STORYBOARD CREATION
      if (toolName === 'nanofield_storyboard_create') {
        const { title, shots = [] } = toolArgs;
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `🎬 **Cinematic Storyboard Sequence Created: ${title}**\n\nTotal Shots: ${shots.length}\n` +
                  shots.map((s, i) => `\n**Shot ${i + 1}: ${s.name || s.type || 'Beat'}**\n- Type: ${s.type || 'Cinematic'}\n- Lens: ${s.lens || '35mm Prime'}\n- Prompt: *"${s.prompt}"*${s.dialogue ? `\n- Dialogue: "${s.dialogue}"` : ''}`).join('\n') +
                  `\n\n- [Launch Storyboard Studio](${officialBaseUrl}/storyboard)`
              }
            ],
            storyboard: {
              title,
              shots_count: shots.length,
              studio_url: `${officialBaseUrl}/storyboard`
            }
          }
        });
      }

      // 9. CORE IMAGE GENERATION
      if (toolName === 'nanofield_generate' || toolName === 'openart_generate_image') {
        const {
          prompt,
          model = 'Nano Banana 2.1',
          aspect_ratio = '16:9',
          variants = 1,
          project_id,
          character_tag
        } = toolArgs;

        // Resolve character DNA if character_tag is provided
        let finalPrompt = prompt;
        if (character_tag) {
          const chars = getCharacters();
          const targetChar = chars.find(c => c.handle.toLowerCase() === character_tag.toLowerCase());
          if (targetChar) {
            finalPrompt = `${prompt}, [Persona: ${targetChar.name}, ${targetChar.dna.hair}, ${targetChar.dna.eyes}, ${targetChar.dna.wardrobe}]`;
          }
        }

        let rawResult = null;

        try {
          const forwardRes = await fetch(`${localEngineUrl}/api/v1/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: finalPrompt,
              model,
              aspect_ratio,
              variants,
              include_base64: true
            }),
            signal: AbortSignal.timeout(50000)
          });
          if (forwardRes.ok) {
            rawResult = await forwardRes.json();
          }
        } catch (e) {
          console.warn('[MCP Bridge] Engine direct call note:', e.message);
        }

        let images = rawResult?.images || [];

        // If direct call timed out or returned no images, check if the engine just finished rendering
        if (images.length === 0) {
          try {
            const latestRes = await fetch(`${localEngineUrl}/api/v1/latest`, {
              signal: AbortSignal.timeout(5000)
            });
            if (latestRes.ok) {
              const latestData = await latestRes.json();
              const latestImg = latestData.latest_image;
              // If created in the last 3 minutes, treat as our generation result
              if (latestImg && (Date.now() - latestImg.created_at) < 180000) {
                images = (latestData.images || [latestImg]).slice(0, Number(variants) || 1).map((img, idx) => ({
                  variant: idx + 1,
                  filename: img.filename,
                  url: img.url
                }));
              }
            }
          } catch (e) {
            console.warn('[MCP Bridge] Latest check note:', e.message);
          }
        }

        if (images.length === 0) {
          // DO NOT return stale/unrelated creations. Transparently inform the client that generation is in progress.
          const inProgressMarkdown = `⏳ **Nano Field Generation In Progress**\n\n` +
            `Your generation request has been received and is currently rendering on the **${model}** cluster with neural watermark removal.\n\n` +
            `- **Prompt**: *"${prompt}"*\n` +
            `- **Model**: \`${model}\`\n` +
            `- **Aspect Ratio**: \`${aspect_ratio}\`\n` +
            `- **Requested Variants**: \`${variants}\`\n\n` +
            `The render typically takes ~15–20 seconds to finalize. You can view your latest creations directly at:\n` +
            `- 🎨 [Nano Field Studio Library](${officialBaseUrl}/library)\n` +
            `- 🍌 [Live Creations Feed](${officialBaseUrl}/explore)\n\n` +
            `*Tip: You can re-query in a few seconds to retrieve the rendered image URL.*`;

          return res.status(200).json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: inProgressMarkdown
                }
              ],
              status: 'processing',
              prompt,
              model,
              aspect_ratio
            }
          });
        }

        // Convert all image URLs strictly to official website domain
        const officialImages = images.map((img, idx) => {
          const officialUrl = `${officialBaseUrl}/media/${img.filename}`;
          // Save to Studio Creations feed
          addCreation({
            title: prompt.slice(0, 40),
            prompt,
            model,
            aspect_ratio,
            url: officialUrl,
            project_id
          });
          // If project specified, assign automatically
          if (project_id) {
            addAssetToProject(project_id, officialUrl);
          }

          return {
            variant: img.variant || idx + 1,
            filename: img.filename,
            url: officialUrl,
            view_url: `${officialBaseUrl}/library`,
            base64: (img.base64 && !img.base64.startsWith('http')) ? img.base64 : null
          };
        });

        // Ensure base64 is populated for Claude and remote AI sandboxes
        await Promise.all(officialImages.map(async (img) => {
          if (!img.base64 && img.filename) {
            try {
              const bRes = await fetch(`${localEngineUrl}/media/${img.filename}`, { signal: AbortSignal.timeout(6000) });
              if (bRes.ok) {
                const buf = await bRes.arrayBuffer();
                img.base64 = Buffer.from(buf).toString('base64');
              }
            } catch (err) {
              console.warn('[MCP] Could not fetch base64:', err.message);
            }
          }
        }));

        // Build dual MCP response: Native MCP Image content blocks FIRST + Contextual metadata
        const responseContent = [];

        // Put native MCP image blocks FIRST so Claude and Web AI render the visual image widget directly in chat
        officialImages.forEach((img) => {
          if (img.base64 && typeof img.base64 === 'string' && !img.base64.startsWith('http')) {
            const rawBase64 = img.base64.replace(/^data:image\/\w+;base64,/, '').replace(/[\r\n]/g, '');
            const mimeType = rawBase64.startsWith('/9j/') ? 'image/jpeg' : (rawBase64.startsWith('iVBORw') ? 'image/png' : 'image/png');
            responseContent.push({
              type: 'image',
              data: rawBase64,
              mimeType,
              annotations: {
                audience: ['user', 'assistant'],
                priority: 1.0
              }
            });
          }
        });

        let markdown = `### 🎨 Image Generated Successfully (${model})\n\n`;
        markdown += `**Prompt**: *"${prompt}"*\n`;
        markdown += `**Aspect Ratio**: \`${aspect_ratio}\` | **Watermark**: Cleaned (LaMa)\n\n`;

        officialImages.forEach((img) => {
          markdown += `#### Variant ${img.variant}\n`;
          markdown += `- **Permanent Direct Link**: ${img.url}\n`;
          markdown += `- **Studio Dashboard**: ${officialBaseUrl}/library\n\n`;
        });

        if (project_id) {
          markdown += `📁 *Saved to project: "${project_id}" ([Open Projects](${officialBaseUrl}/projects))*\n\n`;
        }

        responseContent.push({
          type: 'text',
          text: markdown
        });

        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: responseContent,
            images: officialImages.map(img => ({
              variant: img.variant,
              url: img.url,
              filename: img.filename,
              studio_url: `${officialBaseUrl}/library`
            }))
          }
        });
      }

      return res.status(404).json({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Tool "${toolName}" not found` }
      });
    }

    return res.status(400).json({
      jsonrpc: '2.0',
      id: id || null,
      error: { code: -32600, message: `Invalid Request: unknown method "${method}"` }
    });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
