import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const data = req.body || {};
  const weight = parseFloat(data.weight) || 0;
  const height = parseFloat(data.height) || 0;
  const heightM = height / 100 || 1;
  const bmi = (weight && heightM) ? (weight / (heightM * heightM)).toFixed(2) : 'N/A';
n  const date = new Date().toLocaleDateString();
  const entry = `\n========================================\n[DATE: ${date}]\nNAME: ${data.name || ''}\nPHONE: ${data.phone || ''} | EMAIL: ${data.email || ''}\nID: ${data.nationalId || ''} | ADDRESS: ${data.address || ''}\nTYPE: ${data.subscription || ''} | PAYMENT: ${data.paymentStatus || ''}\nMEDICAL: ${data.medical || ''}\nPROFILE: ${data.weight || ''}kg, ${data.age || ''}y, ${data.gender || ''} | BMI: ${bmi}\nPLAN: ${data.goal || ''}\n========================================\n`;

  // write to the existing archive clients file if present, otherwise create in repo root
  const repoRoot = path.resolve(process.cwd(), '..');
  const candidates = [path.join(repoRoot, 'archive', 'clients_database.txt'), path.join(process.cwd(), 'clients_database.txt')];
  let target = candidates.find(p => fs.existsSync(p)) || candidates[0];
  try {
    fs.appendFileSync(target, entry, 'utf8');
    res.status(200).json({ message: 'Client registered', savedTo: target });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save', error: String(err) });
  }
}
