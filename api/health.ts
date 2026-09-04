import { loadDatabase, sseClients } from '../serverApp';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const db = loadDatabase();
  return res.status(200).json({
    status: 'ok',
    database: 'connected',
    storageType: 'vercel_serverless_store',
    version: db.version || 1,
    lastUpdated: db.lastUpdated || new Date().toISOString(),
    activeSyncClients: sseClients.size,
    timestamp: new Date().toISOString(),
  });
}
