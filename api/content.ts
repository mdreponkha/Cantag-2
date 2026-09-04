import { loadDatabase, saveDatabase } from '../serverApp';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const db = loadDatabase();
      return res.status(200).json({ success: true, data: db });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const current = loadDatabase();
      const updates = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const merged = {
        ...current,
        ...updates,
      };
      saveDatabase(merged);
      return res.status(200).json({
        success: true,
        message: 'Saved successfully to persistent database! Visible worldwide.',
        lastUpdated: merged.lastUpdated,
      });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
