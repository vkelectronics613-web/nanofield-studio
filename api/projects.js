// In-memory persistent projects feed across Vercel invocations
if (!globalThis.nanofieldProjects) {
  globalThis.nanofieldProjects = [
    {
      id: 'proj-1',
      name: 'Autumn Cyberpunk Brand Campaign',
      description: 'High-converting flagship assets for next-gen apparel and automotive release',
      category: 'Commercial Ads',
      status: 'Active',
      updated: 'Just now',
      items: [
        'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png',
        'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792911009262_v1_3zl3.png'
      ],
      count: 2
    },
    {
      id: 'proj-2',
      name: 'Coastal Nature Series',
      description: 'Golden hour dramatic landscape studies with 16:9 cinematic depth',
      category: 'Cinematography',
      status: 'Archived',
      updated: '1 hour ago',
      items: [
        'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910064026_v1_lahk.png'
      ],
      count: 1
    }
  ];
}

export function createProject({ name, description = '', category = 'Creative' }) {
  const newProj = {
    id: `proj-${Date.now()}`,
    name,
    description,
    category,
    status: 'Active',
    updated: 'Just now',
    items: [],
    count: 0
  };
  globalThis.nanofieldProjects.unshift(newProj);
  return newProj;
}

export function addAssetToProject(projectId, assetUrl) {
  const project = globalThis.nanofieldProjects.find(p => p.id === projectId || p.name.toLowerCase() === projectId.toLowerCase());
  if (!project) return null;
  project.items.unshift(assetUrl);
  project.count = project.items.length;
  project.updated = 'Just now';
  return project;
}

export function getProjects() {
  return globalThis.nanofieldProjects;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { action, name, description, category, project_id, asset_url } = req.body || {};

    if (action === 'add_asset' || (project_id && asset_url)) {
      const updated = addAssetToProject(project_id, asset_url);
      if (!updated) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json({ success: true, project: updated });
    }

    if (!name) {
      return res.status(400).json({ error: 'Missing "name" for project' });
    }

    const created = createProject({ name, description, category });
    return res.status(201).json({ success: true, project: created });
  }

  res.status(200).json({
    success: true,
    total: globalThis.nanofieldProjects.length,
    projects: getProjects()
  });
}
