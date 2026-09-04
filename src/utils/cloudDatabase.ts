import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, Firestore } from 'firebase/firestore';
import { safeStorage } from './storage';
import builtInFirebaseConfig from '../../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = currentAuth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain?: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  firestoreDatabaseId?: string;
}

const STORAGE_KEY_FIREBASE_CONFIG = 'cpt_firebase_config';
const COLLECTION_NAME = 'canstar_site_data';
const DOC_ID = 'main_content';

let currentApp: FirebaseApp | null = null;
let currentDb: Firestore | null = null;
let currentAuth: Auth | null = null;
let unsubscribeSnapshot: (() => void) | null = null;

/**
 * Retrieve active Firebase config from localStorage, env, or built-in project config
 */
export function getSavedFirebaseConfig(): FirebaseConfig | null {
  // 1. Check env first
  if (
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_API_KEY
  ) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    };
  }

  // 2. Check localStorage for user overrides
  const saved = safeStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    } catch (e) {
      console.warn('Invalid saved Firebase config');
    }
  }

  // 3. Fallback to built-in Firebase config provisioned directly in this applet
  if (builtInFirebaseConfig && builtInFirebaseConfig.apiKey && builtInFirebaseConfig.projectId) {
    return {
      apiKey: builtInFirebaseConfig.apiKey,
      authDomain: builtInFirebaseConfig.authDomain || `${builtInFirebaseConfig.projectId}.firebaseapp.com`,
      projectId: builtInFirebaseConfig.projectId,
      storageBucket: builtInFirebaseConfig.storageBucket || `${builtInFirebaseConfig.projectId}.firebasestorage.app`,
      messagingSenderId: builtInFirebaseConfig.messagingSenderId || '',
      appId: builtInFirebaseConfig.appId || '',
      firestoreDatabaseId: (builtInFirebaseConfig as any).firestoreDatabaseId || '',
    };
  }

  return null;
}

/**
 * Save Firebase configuration to localStorage
 */
export function saveFirebaseConfig(config: FirebaseConfig): void {
  safeStorage.setItem(STORAGE_KEY_FIREBASE_CONFIG, JSON.stringify(config));
  // Reset singleton so next init uses new config
  currentApp = null;
  currentDb = null;
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }
}

/**
 * Clear Firebase configuration
 */
export function clearFirebaseConfig(): void {
  safeStorage.removeItem(STORAGE_KEY_FIREBASE_CONFIG);
  currentApp = null;
  currentDb = null;
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }
}

/**
 * Initialize Firestore instance safely
 */
export function initFirestore(): Firestore | null {
  if (currentDb) return currentDb;

  const config = getSavedFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return null;
  }

  try {
    let app: FirebaseApp;
    if (getApps().length === 0) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    currentApp = app;
    try {
      currentAuth = getAuth(app);
    } catch {
      // optional auth initialization
    }

    if (config.firestoreDatabaseId) {
      currentDb = getFirestore(app, config.firestoreDatabaseId);
    } else {
      currentDb = getFirestore(app);
    }
    return currentDb;
  } catch (err) {
    console.error('Failed to initialize Firebase Firestore:', err);
    return null;
  }
}

/**
 * Fetch database content from Firestore once
 */
export async function fetchFromFirestore(): Promise<any | null> {
  const db = initFirestore();
  if (!db) return null;

  const docPath = `${COLLECTION_NAME}/${DOC_ID}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err: any) {
    handleFirestoreError(err, OperationType.GET, docPath);
  }
  return null;
}

/**
 * Save database content to Firestore
 */
export async function saveToFirestore(data: any): Promise<{ success: boolean; message: string }> {
  const db = initFirestore();
  if (!db) {
    return {
      success: false,
      message: 'Firebase database is not configured. Please enter your Firebase credentials in Admin Panel.',
    };
  }

  const docPath = `${COLLECTION_NAME}/${DOC_ID}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const cleanData = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    await setDoc(docRef, cleanData, { merge: true });
    return {
      success: true,
      message: 'Cloud Database-এ সফলভাবে সেভ হয়েছে! এটি এখন সারা বিশ্বের যেকোনো ডিভাইস ও ভিজিটরের জন্য লাইভ।',
    };
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
    return {
      success: false,
      message: `Firebase Save Error: ${err?.message || 'Unknown error'}`,
    };
  }
}

/**
 * Helper to parse a raw string from Firebase console (either JSON or JS object syntax)
 */
export function parseFirebaseConfigString(raw: string): FirebaseConfig | null {
  if (!raw || !raw.trim()) return null;
  const trimmed = raw.trim();

  // Try direct JSON.parse
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed.apiKey && (parsed.projectId || parsed.appId)) {
      return {
        apiKey: parsed.apiKey,
        authDomain: parsed.authDomain || `${parsed.projectId}.firebaseapp.com`,
        projectId: parsed.projectId,
        storageBucket: parsed.storageBucket || `${parsed.projectId}.appspot.com`,
        messagingSenderId: parsed.messagingSenderId || '',
        appId: parsed.appId || '',
      };
    }
  } catch {}

  // Try regex extraction from javascript snippet
  const extract = (key: string): string => {
    const match = trimmed.match(new RegExp(`${key}\\s*:\\s*["']([^"']+)["']`));
    return match ? match[1] : '';
  };

  const apiKey = extract('apiKey');
  const projectId = extract('projectId');
  const appId = extract('appId');
  const authDomain = extract('authDomain') || (projectId ? `${projectId}.firebaseapp.com` : '');
  const storageBucket = extract('storageBucket') || (projectId ? `${projectId}.appspot.com` : '');
  const messagingSenderId = extract('messagingSenderId');

  if (apiKey && projectId) {
    return {
      apiKey,
      projectId,
      appId: appId || '',
      authDomain,
      storageBucket,
      messagingSenderId,
    };
  }

  return null;
}

/**
 * Test Firebase Firestore connection by attempting a write & read
 */
export async function testFirebaseConnection(config: FirebaseConfig): Promise<{ success: boolean; message: string }> {
  try {
    const testApp = initializeApp(config, `test_app_${Date.now()}`);
    const testDb = config.firestoreDatabaseId ? getFirestore(testApp, config.firestoreDatabaseId) : getFirestore(testApp);
    const testDoc = doc(testDb, COLLECTION_NAME, '_connection_test');
    
    // Write test
    await setDoc(testDoc, {
      testTime: new Date().toISOString(),
      agent: 'Can Star Power Tech Admin Desk',
      status: 'verified',
    });

    // Read test
    const snap = await getDoc(testDoc);
    if (snap.exists()) {
      return {
        success: true,
        message: 'কানেকশন সফল হয়েছে! ক্লাউড ডাটাবেস সম্পূর্ণ সক্রিয় এবং লাইভ রয়েছে।',
      };
    } else {
      return {
        success: false,
        message: 'ডাটাবেস কানেক্ট হয়েছে কিন্তু রিড পারমিশন পাওয়া যায়নি।',
      };
    }
  } catch (err: any) {
    console.error('Firebase test error:', err);
    let msg = err?.message || 'Unknown error occurred';
    if (msg.includes('permission-denied')) {
      msg = 'Permission Denied: Firebase Console > Firestore Database > Rules-এ গিয়ে নিশ্চিত করুন: "allow read, write: if true;" দেওয়া আছে।';
    } else if (msg.includes('api-key-not-valid') || msg.includes('invalid-api-key')) {
      msg = 'Invalid API Key: আপনার দেওয়া Firebase API Key সঠিক নয়।';
    }
    return {
      success: false,
      message: `কানেকশন ব্যর্থ হয়েছে: ${msg}`,
    };
  }
}

/**
 * Listen for real-time Firestore database updates across all worldwide clients
 */
export function subscribeToFirestore(onUpdate: (data: any) => void): (() => void) | null {
  const db = initFirestore();
  if (!db) return null;

  try {
    const docPath = `${COLLECTION_NAME}/${DOC_ID}`;
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          onUpdate(data);
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.GET, docPath);
      }
    );
    unsubscribeSnapshot = unsub;
    return unsub;
  } catch (err) {
    console.error('Failed to setup Firestore listener:', err);
    return null;
  }
}
