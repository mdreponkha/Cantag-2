import express from 'express';
import path from 'path';
import fs from 'fs';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Default initial data for database
import { PRODUCTS_DATA, SERVICES_DATA, PROJECTS_DATA, CLIENTS_DATA, KPOWER_INFO } from './src/data/themeData';
import { INITIAL_PAGES_CONTENT } from './src/data/pagesInitialData';

const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'data') : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure uploads folder exists
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Could not create uploads dir:', e);
}

const DEFAULT_LOGO_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiO4zlpzfLK4DzN4fsgYH3a8b1hIUneK5r0XBLEQSCvsabtEB4_7qCQ0LqvWMv6DC3USKC9-DglXUL8YrbsKUXZXw0BhqkLzSrraHATr-P0HgX6XlsQWMSRa5nZMvN_v5xg__afGsL0K9QHI9DTywyDJ7MSh4JPuzfwGOSDyZXRKRRQdoSfoH5umx8BFpJX/s2073/ChatGPT%20Image%20Sep%202,%202026,%2006_29_20%20PM.png';

// In-memory fallback cache
let memoryDb: any = null;

// Firebase Firestore Helper for Server-side Sync
let serverFirestoreDb: any = null;
function getServerFirestore() {
  if (serverFirestoreDb) return serverFirestoreDb;
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const app = getApps().length === 0 ? initializeApp(cfg) : getApp();
      serverFirestoreDb = cfg.firestoreDatabaseId ? getFirestore(app, cfg.firestoreDatabaseId) : getFirestore(app);
      return serverFirestoreDb;
    }
  } catch (err) {
    console.warn('Server Firestore initialization notice:', err);
  }
  return null;
}

export async function syncToFirestoreAsync(data: any) {
  try {
    const db = getServerFirestore();
    if (db) {
      const ref = doc(db, 'canstar_site_data', 'main_content');
      const sanitized = JSON.parse(JSON.stringify(data));
      await setDoc(ref, sanitized, { merge: true });
      console.log('Synced database to Firestore successfully');
    }
  } catch (fsErr) {
    console.warn('Server Firestore background sync notice:', fsErr);
  }
}

export async function hydrateDatabaseFromFirestore() {
  try {
    const db = getServerFirestore();
    if (db) {
      const snap = await getDoc(doc(db, 'canstar_site_data', 'main_content'));
      if (snap.exists()) {
        const firestoreData = snap.data();
        if (firestoreData && (firestoreData.customizer || firestoreData.products || firestoreData.pagesContent)) {
          const current = memoryDb || loadDatabase();
          memoryDb = {
            ...current,
            ...firestoreData,
            pagesContent: {
              ...(current.pagesContent || {}),
              ...(firestoreData.pagesContent || {}),
              home: {
                ...(current.pagesContent?.home || {}),
                ...(firestoreData.pagesContent?.home || {})
              },
              mdMessage: {
                ...(current.pagesContent?.mdMessage || {}),
                ...(firestoreData.pagesContent?.mdMessage || {})
              },
              ceoMessage: {
                ...(current.pagesContent?.ceoMessage || {}),
                ...(firestoreData.pagesContent?.ceoMessage || {})
              }
            }
          };
          try {
            if (!fs.existsSync(DATA_DIR)) {
              fs.mkdirSync(DATA_DIR, { recursive: true });
            }
            fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
            console.log('Hydrated server database from Firestore successfully!');
          } catch {}
        }
      }
    }
  } catch (err) {
    console.warn('Firestore server hydration notice:', err);
  }
}

// Initial async hydration on server boot
hydrateDatabaseFromFirestore();

// Initialize database data if not exists
export function getInitialDb() {
  return {
    customizer: {
      logoUrl: DEFAULT_LOGO_URL,
      primaryColor: '#08192E',
      secondaryColor: '#2563EB',
      accentColor: '#D97706',
      heroHeadline: 'Reliable Power for Secure Data',
      heroSubheadline: 'With Teksan generator sets that comply with Uptime Institute Tier III and Tier IV requirements, all data is secure.',
      heroBadge: 'TIER III & TIER IV COMPLIANT',
      phone: KPOWER_INFO.phone,
      email: KPOWER_INFO.email,
      address: KPOWER_INFO.address,
      suppliedUnits: KPOWER_INFO.suppliedUnits,
      uptimeGuarantee: KPOWER_INFO.uptimeGuarantee,
      completedProjects: KPOWER_INFO.completedProjects,
    },
    pagesContent: INITIAL_PAGES_CONTENT,
    products: PRODUCTS_DATA,
    services: SERVICES_DATA,
    projects: PROJECTS_DATA,
    clients: CLIENTS_DATA,
    quotes: [
      {
        id: 'quote_init_1',
        name: 'Bashundhara Group Engineering Dept',
        company: 'Bashundhara Group',
        phone: '+880 1711 000000',
        email: 'procurement@bashundhara.com',
        capacity: '1000 kVA',
        fuel: 'Diesel',
        application: 'Continuous Industrial Factory',
        message: 'Requesting formal quotation for 2 units of 1000 kVA Perkins engine TEKSAN generator with sync panel.',
        status: 'contacted',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ],
    chatMessages: [
      {
        id: 'msg_welcome',
        sender: 'admin',
        name: 'CAN STAR Engineering Desk',
        message: 'Welcome to CAN STAR POWER TECH! How can our engineering team assist you with TEKSAN generators today?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        unreadByAdmin: false,
      }
    ],
    adminCredentials: {
      email: 'admin@canstarpowertech.com',
      password: 'Admin@2244@'
    },
    metaPixel: {
      enabled: true,
      pixelId: '124890342940291',
      conversionsApiToken: 'EAAG9Q3X0...FB_CAPI_TOKEN_SECURE',
      testEventCode: 'TEST92834',
      trackPageView: true,
      trackLead: true,
      trackContact: true,
      trackViewContent: true,
    },
    pathao: {
      enabled: true,
      environment: 'production',
      clientId: 'pathao_canstar_client_982',
      clientSecret: 'c4e98f0293b82194ad98f7',
      username: 'dispatch@canstarpowertech.com',
      password: '••••••••••••',
      storeId: '34892',
      webhookUrl: 'https://canstarpowertech.com/api/webhooks/pathao',
      autoCreateParcel: false,
      defaultItemType: 'Industrial Documents & Generator Parts',
      senderCity: 'Dhaka',
      senderZone: 'Motijheel / Fakirapool',
    },
    speed: {
      browserCaching: true,
      gzipCompression: true,
      webpAutoConvert: true,
      lazyLoadImages: true,
      minifyCssJs: true,
      criticalCssPreload: true,
      cdnCloudflare: true,
      dnsPrefetch: true,
      cacheTtlHours: 168,
    },
    lastUpdated: new Date().toISOString()
  };
}

export function loadDatabase() {
  if (memoryDb) {
    return memoryDb;
  }
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    }
    
    // Check bundled seed file in cwd/data/database.json
    const seedFile = path.join(process.cwd(), 'data', 'database.json');
    if (fs.existsSync(seedFile)) {
      const raw = fs.readFileSync(seedFile, 'utf-8');
      memoryDb = JSON.parse(raw);
      try {
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
      } catch {
        // Filesystem restricted
      }
      return memoryDb;
    }

    // Default fallback
    memoryDb = getInitialDb();
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
    } catch {
      // Ignore
    }
    return memoryDb;
  } catch (err) {
    console.error('Error reading database file:', err);
    memoryDb = getInitialDb();
    return memoryDb;
  }
}

export const sseClients: Set<express.Response> = new Set();

export function broadcastDatabaseUpdate(updatedDb: any, eventType = 'content_updated') {
  const payload = JSON.stringify({
    type: eventType,
    version: updatedDb.version || 1,
    lastUpdated: updatedDb.lastUpdated,
    timestamp: new Date().toISOString(),
    data: updatedDb
  });
  
  for (const client of sseClients) {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch {
      sseClients.delete(client);
    }
  }
}

export function saveDatabase(data: any, eventType = 'content_updated') {
  try {
    data.version = (typeof data.version === 'number' ? data.version : 0) + 1;
    data.lastUpdated = new Date().toISOString();
    memoryDb = data;

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Filesystem write not permitted in current runtime, stored in memory cache:', err);
    }

    // Keep Firestore cloud database in continuous sync
    syncToFirestoreAsync(data);

    broadcastDatabaseUpdate(data, eventType);
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// Create configured Express Application
export function createServerApp(): express.Express {
  const app = express();

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Serve uploaded images with persistent Firestore restoration fallback
  app.get('/uploads/:filename', async (req, res, next) => {
    try {
      const filename = req.params.filename;
      const localPath = path.join(UPLOADS_DIR, filename);
      if (fs.existsSync(localPath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return res.sendFile(localPath);
      }

      // If file not on disk (e.g. after container restart or redeploy), restore from Firestore!
      const cleanDocId = `img_${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
      const db = getServerFirestore();
      if (db) {
        const snap = await getDoc(doc(db, 'canstar_site_data', cleanDocId));
        if (snap.exists()) {
          const imgDoc = snap.data();
          if (imgDoc && imgDoc.dataUrl) {
            const matches = imgDoc.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
              const mimeType = matches[1];
              const buf = Buffer.from(matches[2], 'base64');
              try {
                if (!fs.existsSync(UPLOADS_DIR)) {
                  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
                }
                fs.writeFileSync(localPath, buf);
              } catch (wErr) {
                console.warn('Local disk cache write failed, streaming directly:', wErr);
              }
              res.setHeader('Content-Type', mimeType);
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              return res.send(buf);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Persistent image retrieval notice:', err);
    }
    next();
  });

  // Serve uploaded images statically if already on disk
  app.use('/uploads', express.static(UPLOADS_DIR));

  // CORS and options headers for cloud hosting compatibility
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  const router = express.Router();

  // API: Direct Photo/Image Upload Handler (saves to /uploads/ and permanently to Firestore)
  router.post('/upload', async (req, res) => {
    try {
      const { filename, dataUrl, base64 } = req.body;
      const rawData = dataUrl || base64;
      if (!rawData) {
        return res.status(400).json({ success: false, message: 'No image data provided.' });
      }

      // Extract format and pure base64 data
      const matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let ext = 'jpg';
      let mimeType = 'image/jpeg';
      let buffer: Buffer;

      if (matches && matches.length === 3) {
        mimeType = matches[1];
        if (mimeType.includes('png')) ext = 'png';
        else if (mimeType.includes('webp')) ext = 'webp';
        else if (mimeType.includes('svg')) ext = 'svg';
        else if (mimeType.includes('gif')) ext = 'gif';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(rawData, 'base64');
      }

      const cleanBase = (filename || 'img')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_{2,}/g, '_')
        .slice(0, 40);
      const uniqueName = `${cleanBase}_${Date.now()}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, uniqueName);

      try {
        if (!fs.existsSync(UPLOADS_DIR)) {
          fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
        fs.writeFileSync(filePath, buffer);
      } catch (writeErr) {
        console.warn('Local disk cache write notice:', writeErr);
      }

      // Save permanently to Firestore so it NEVER disappears across container restarts
      const cleanDocId = `img_${uniqueName.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
      try {
        const db = getServerFirestore();
        if (db) {
          await setDoc(doc(db, 'canstar_site_data', cleanDocId), {
            id: cleanDocId,
            filename: uniqueName,
            dataUrl: rawData,
            mimeType,
            createdAt: new Date().toISOString()
          }, { merge: true });
          console.log(`Saved image ${uniqueName} permanently to Firestore ${cleanDocId}`);
        }
      } catch (fsErr) {
        console.warn('Firestore image persist error:', fsErr);
      }

      const publicUrl = `/uploads/${uniqueName}`;

      res.json({
        success: true,
        url: publicUrl,
        filename: uniqueName,
        message: 'Photo uploaded and stored permanently!'
      });
    } catch (err: any) {
      console.error('Image upload error:', err);
      res.status(500).json({ success: false, message: err?.message || 'Failed to process image upload.' });
    }
  });

  // API 1: Health & Database connection check
  router.get('/health', (req, res) => {
    const db = loadDatabase();
    res.json({
      status: 'ok',
      database: 'connected',
      storageType: IS_VERCEL ? 'vercel_serverless_store' : 'persistent_json_store',
      version: db.version || 1,
      lastUpdated: db.lastUpdated || new Date().toISOString(),
      activeSyncClients: sseClients.size,
      timestamp: new Date().toISOString()
    });
  });

  // API: Real-Time Server-Sent Events (SSE) Live Sync Stream
  router.get('/sync/stream', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    
    res.write(': connected to canstar worldwide sync\n\n');
    
    const db = loadDatabase();
    res.write(`data: ${JSON.stringify({
      type: 'connected',
      version: db.version || 1,
      lastUpdated: db.lastUpdated,
      clientsCount: sseClients.size + 1,
      timestamp: new Date().toISOString(),
    })}\n\n`);

    sseClients.add(res);

    const interval = setInterval(() => {
      try {
        res.write(`: heartbeat ${new Date().toISOString()}\n\n`);
      } catch {
        clearInterval(interval);
        sseClients.delete(res);
      }
    }, 15000);

    req.on('close', () => {
      clearInterval(interval);
      sseClients.delete(res);
    });
  });

  // API: Fast Sync Check (for fallback polling or version validation)
  router.get('/sync/check', (req, res) => {
    try {
      const clientVersion = req.query.version ? parseInt(req.query.version as string, 10) : null;
      const db = loadDatabase();
      const serverVersion = db.version || 1;
      
      if (clientVersion === null || isNaN(clientVersion) || clientVersion !== serverVersion) {
        res.json({
          changed: true,
          version: serverVersion,
          lastUpdated: db.lastUpdated,
          activeClients: sseClients.size,
          data: db
        });
      } else {
        res.json({
          changed: false,
          version: serverVersion,
          lastUpdated: db.lastUpdated,
          activeClients: sseClients.size
        });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // API: Test Broadcast Ping
  router.post('/sync/ping', (req, res) => {
    const db = loadDatabase();
    broadcastDatabaseUpdate(db, 'ping_test');
    res.json({
      success: true,
      message: 'Worldwide broadcast ping dispatched to all connected clients!',
      clientCount: sseClients.size,
      version: db.version || 1
    });
  });

  // API: Export database backup
  router.get('/db/export', (req, res) => {
    const db = loadDatabase();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=canstar_database_backup_${Date.now()}.json`);
    res.send(JSON.stringify(db, null, 2));
  });

  // API 2: Get entire site content from database
  router.get('/content', (req, res) => {
    try {
      const db = loadDatabase();
      res.json({
        success: true,
        data: db
      });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // API 3: Update and save site content to database (worldwide persistent)
  router.post('/content', (req, res) => {
    try {
      const currentDb = loadDatabase();
      const updates = req.body;

      const merged = {
        ...currentDb,
        ...updates,
        adminCredentials: currentDb.adminCredentials || {
          email: 'admin@canstarpowertech.com',
          password: 'Admin@2244@'
        }
      };

      const ok = saveDatabase(merged);
      if (ok) {
        res.json({
          success: true,
          message: 'Saved successfully to persistent database! Visible worldwide.',
          lastUpdated: merged.lastUpdated
        });
      } else {
        res.status(500).json({ success: false, message: 'Failed to write to database storage.' });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // API 4: Admin Authentication Login
  router.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const db = loadDatabase();
    const creds = db.adminCredentials || {
      email: 'admin@canstarpowertech.com',
      password: 'Admin@2244@'
    };

    if (
      email &&
      password &&
      email.trim().toLowerCase() === creds.email.toLowerCase() &&
      password === creds.password
    ) {
      res.json({
        success: true,
        token: `canstar_auth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        user: {
          email: creds.email,
          role: 'superadmin',
          name: 'CAN STAR Admin'
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please use authorized credentials.'
      });
    }
  });

  // API 5: Live Chat - Get all messages
  router.get('/chat/messages', (req, res) => {
    const db = loadDatabase();
    res.json({
      success: true,
      messages: db.chatMessages || []
    });
  });

  // API 6: Live Chat - Send a new message
  router.post('/chat/messages', (req, res) => {
    const { sender, name, phone, email, message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message content is required.' });
    }

    const db = loadDatabase();
    const newMessage = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sender: sender === 'admin' ? 'admin' : 'visitor',
      name: name || (sender === 'admin' ? 'CAN STAR Support Desk' : 'Visitor'),
      phone: phone || '',
      email: email || '',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      unreadByAdmin: sender !== 'admin'
    };

    if (!Array.isArray(db.chatMessages)) {
      db.chatMessages = [];
    }
    db.chatMessages.push(newMessage);
    saveDatabase(db);

    res.json({
      success: true,
      message: newMessage
    });
  });

  // API 7: Customer Quote Inquiries
  router.post('/quotes', (req, res) => {
    const quoteData = req.body;
    const db = loadDatabase();
    if (!Array.isArray(db.quotes)) {
      db.quotes = [];
    }

    const newQuote = {
      id: `quote_${Date.now()}`,
      ...quoteData,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    db.quotes.unshift(newQuote);
    saveDatabase(db);

    res.json({
      success: true,
      message: 'Quote request registered successfully in database.'
    });
  });

  // Mount router under both '/api' and '/' for maximum environment compatibility
  app.use('/api', router);
  app.use('/', router);

  return app;
}

export const app = createServerApp();
export default app;
