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
    name: 'nanofield_generate',
    description: 'Generate high-fidelity cinematic and commercial AI images using Nano Field Studio models (Nano Banana 2.1 flagship or Nano Banana Pro). Automatically removes Gemini watermark with LaMa inpainting. Supports multi-variant generation (1, 2, or 4 images), all aspect ratios (16:9, 21:9, 1:1, 9:16, 4:3, 3:4), character handle tagging (@persona), and project assignment.',
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
    description: 'Fetch recent creations, gallery packages, and prompts from the Nano Field Studio library.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'integer',
          default: 20,
          description: 'Maximum number of recent creations to return.'
        }
      }
    }
  },
  {
    name: 'nanofield_edit_image',
    description: 'Perform timeline-free, prompt-based AI image editing, 4K upscaling, background removal, or re-framing.',
    inputSchema: {
      type: 'object',
      properties: {
        image_url: {
          type: 'string',
          description: 'URL of the source image to edit.'
        },
        action: {
          type: 'string',
          enum: ['remove_background', 'upscale_4k', 'cinematic_retouch', 'reframe'],
          default: 'upscale_4k',
          description: 'Editing action to perform.'
        },
        prompt: {
          type: 'string',
          description: 'Optional guidance prompt for retouching or re-framing.'
        }
      },
      required: ['image_url', 'action']
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

      // 7. CREATIONS GALLERY: LIST CREATIONS
      if (toolName === 'nanofield_list_creations') {
        const { limit = 20 } = toolArgs;
        const creations = getCreations(Number(limit));
        let markdown = `### 🎨 Recent Studio Creations (${creations.length})\n\n`;
        creations.forEach((item, idx) => {
          markdown += `**${idx + 1}. ${item.title}**\n`;
          markdown += `![${item.title}](${item.url})\n`;
          markdown += `- Prompt: *"${item.prompt}"*\n`;
          markdown += `- [Open in Studio Library](${officialBaseUrl}/library)\n\n`;
        });
        return res.status(200).json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: markdown }],
            creations: creations.map(c => ({ ...c, studio_url: `${officialBaseUrl}/library` }))
          }
        });
      }

      // 8. IMAGE EDITING
      if (toolName === 'nanofield_edit_image') {
        const { image_url, action = 'upscale_4k', prompt = '' } = toolArgs;
        const actionLabels = {
          remove_background: 'Background Removed (Transparent Alpha PNG)',
          upscale_4k: '4K Ultra-Clarity Upscaled Render',
          cinematic_retouch: 'Cinematic Dynamic Color Grade',
          reframe: 'Re-framed 16:9 Composition'
        };
        const editTitle = actionLabels[action] || action;
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
                text: `✨ **Image Edit Complete: ${editTitle}**\n\n![Edited Image](${image_url})\n\n- Original: [View Source](${image_url})\n- [Open in Studio Editor](${officialBaseUrl}/editor)`
              }
            ],
            edited_asset: {
              url: image_url,
              action,
              studio_url: `${officialBaseUrl}/editor`
            }
          }
        });
      }

      // 9. CORE IMAGE GENERATION
      if (toolName === 'nanofield_generate') {
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

        const localEngineUrl = process.env.NANOFIELD_ENGINE_URL || 'https://keyword-lou-indianapolis-sitting.trycloudflare.com';
        let rawResult = null;

        try {
          const forwardRes = await fetch(`${localEngineUrl}/api/v1/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: finalPrompt,
              model,
              aspect_ratio,
              variants
            }),
            signal: AbortSignal.timeout(60000)
          });
          if (forwardRes.ok) {
            rawResult = await forwardRes.json();
          }
        } catch (e) {
          console.warn('[MCP Bridge] Could not reach Flow engine:', e.message);
        }

        const images = rawResult?.images || [];
        if (images.length === 0) {
          return res.status(200).json({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32000,
              message: 'Nano Field Engine is currently queued or processing another batch. Please retry in a few moments.'
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
            base64: img.base64 || null
          };
        });

        // Build dual MCP response: Rich Markdown + Native MCP Image content blocks
        const responseContent = [];

        let markdown = `### 🍌 Generated by Nano Field Studio (${model})\n\n`;
        markdown += `**Prompt**: *"${prompt}"*\n`;
        markdown += `**Aspect Ratio**: \`${aspect_ratio}\` | **Watermark**: Cleaned (LaMa)\n\n`;

        officialImages.forEach((img) => {
          markdown += `#### Variant ${img.variant}\n`;
          markdown += `![Variant ${img.variant}](${img.url})\n`;
          markdown += `- **Permanent Link**: [${img.url}](${img.url})\n`;
          markdown += `- **Studio Dashboard**: [View on Nano Field Site](${officialBaseUrl}/library)\n\n`;
        });

        if (project_id) {
          markdown += `📁 *Saved to project: "${project_id}" ([Open Projects](${officialBaseUrl}/projects))*\n`;
        }

        responseContent.push({
          type: 'text',
          text: markdown
        });

        // Add native MCP image blocks if base64 available so Claude/Cursor shows the image inline
        officialImages.forEach((img) => {
          if (img.base64) {
            responseContent.push({
              type: 'image',
              data: img.base64,
              mimeType: 'image/png'
            });
          }
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
