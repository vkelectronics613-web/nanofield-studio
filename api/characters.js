// In-memory persistent character elements feed across Vercel invocations
if (!globalThis.nanofieldCharacters) {
  globalThis.nanofieldCharacters = [
    {
      id: 'el-1',
      handle: '@cyber_samurai',
      name: 'Kaelen Vance',
      role: 'Cyberpunk Ronin',
      avatar: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png',
      dna: {
        hair: 'Neon cyan undercut braid',
        eyes: 'Cybernetic amber iris',
        age: '28 Earth Years',
        ethnicity: 'Neo-Tokyo Nomad',
        expression: 'Fierce calculated stoicism',
        wardrobe: 'Weathered matte-black techwear haori with carbon fiber plating',
        prop: 'Plasma edge nodachi with violet emitter core'
      },
      variations: [
        'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png'
      ]
    },
    {
      id: 'el-2',
      handle: '@elena_botanist',
      name: 'Dr. Elena Thorne',
      role: 'Xenobotanist Explorer',
      avatar: 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792911009262_v1_3zl3.png',
      dna: {
        hair: 'Loose chestnut curl bun with brass probe clip',
        eyes: 'Emerald hazel with bio-luminescent flecks',
        age: '34 Standard Years',
        ethnicity: 'Mediterranean Alpine',
        expression: 'Intrigued discovery warmth',
        wardrobe: 'Reinforced bio-hazard canvas jumpsuit with copper hardware',
        prop: 'Bioluminescent spore specimen jar'
      },
      variations: [
        'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792911009262_v1_3zl3.png'
      ]
    }
  ];
}

export function createCharacter(item) {
  const handle = item.handle?.startsWith('@') ? item.handle : `@${item.handle || 'persona'}`;
  const newChar = {
    id: `el-${Date.now()}`,
    handle,
    name: item.name || 'Unnamed Persona',
    role: item.role || 'Protagonist',
    avatar: item.avatar || 'https://web-nine-eta-b63lv577w6.vercel.app/media/nanofield_1792910472373_v1_nq1e.png',
    dna: {
      hair: item.dna?.hair || item.hair || 'Midnight black parted',
      eyes: item.dna?.eyes || item.eyes || 'Dark brown',
      age: item.dna?.age || item.age || '30',
      ethnicity: item.dna?.ethnicity || item.ethnicity || 'Universal',
      expression: item.dna?.expression || item.expression || 'Focused',
      wardrobe: item.dna?.wardrobe || item.wardrobe || 'Modern minimalist studio apparel',
      prop: item.dna?.prop || item.prop || 'Smart optical device'
    },
    variations: item.avatar ? [item.avatar] : []
  };
  globalThis.nanofieldCharacters.unshift(newChar);
  return newChar;
}

export function getCharacters() {
  return globalThis.nanofieldCharacters;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const item = req.body || {};
    if (!item.name && !item.handle) {
      return res.status(400).json({ error: 'Missing name or handle for character' });
    }
    const created = createCharacter(item);
    return res.status(201).json({ success: true, character: created });
  }

  res.status(200).json({
    success: true,
    total: globalThis.nanofieldCharacters.length,
    characters: getCharacters()
  });
}
