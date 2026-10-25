export const config = {
  api: {
    responseLimit: false
  }
};

export default async function handler(req, res) {
  const start = Date.now();
  await new Promise(r => setTimeout(r, 25000));
  const elapsed = (Date.now() - start) / 1000;
  res.json({ ok: true, elapsed });
}