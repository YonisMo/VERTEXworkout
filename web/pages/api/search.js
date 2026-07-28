import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const name = (req.query.name || '').toString();
  const repoRoot = path.resolve(process.cwd(), '..');
  const candidates = [path.join(repoRoot, 'archive', 'clients_database.txt'), path.join(process.cwd(), 'clients_database.txt')];
  const target = candidates.find(p => fs.existsSync(p));
  if (!target) return res.status(200).json({ results: [] });
  try {
    const data = fs.readFileSync(target, 'utf8');
    const records = data.split('========================================');
    const found = records.filter(r => r.includes(name)).map(r => r.trim()).filter(Boolean);
    res.status(200).json({ results: found });
  } catch (err) {
    res.status(500).json({ results: [], error: String(err) });
  }
}
