import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Database,
  Cloud,
  Download,
  Copy,
  Check,
  Radio,
  RefreshCw,
  Server,
  Zap,
  Globe,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Layers,
  ArrowRight,
  Code,
  Key,
  Eye,
  EyeOff,
  GitCommit,
  Sparkles,
  Flame,
  AlertCircle
} from 'lucide-react';
import JSZip from 'jszip';
import { commitDatabaseToGitHub, downloadDatabaseJson } from '../utils/githubSync';
import {
  getSavedFirebaseConfig,
  saveFirebaseConfig,
  clearFirebaseConfig,
  testFirebaseConnection,
  parseFirebaseConfigString,
  saveToFirestore,
  FirebaseConfig,
} from '../utils/cloudDatabase';

interface GitHubDatabaseManagerProps {
  lastUpdated?: string;
  dbVersion?: number;
  onRefreshDatabase?: () => void;
}

export const GitHubDatabaseManager: React.FC<GitHubDatabaseManagerProps> = ({
  lastUpdated,
  dbVersion = 1,
  onRefreshDatabase,
}) => {
  const [githubUrl, setGithubUrl] = useState('https://github.com/n85711813/canstar-power-tech.git');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);
  const [activeDeployTab, setActiveDeployTab] = useState<'render' | 'railway' | 'vps' | 'docker'>('render');
  
  // Firebase Cloud Database State
  const [savedFirebase, setSavedFirebase] = useState(() => getSavedFirebaseConfig());
  const [firebaseInputMode, setFirebaseInputMode] = useState<'paste' | 'fields'>('paste');
  const [rawFirebaseConfig, setRawFirebaseConfig] = useState('');
  const [fbApiKey, setFbApiKey] = useState(savedFirebase?.apiKey || '');
  const [fbProjectId, setFbProjectId] = useState(savedFirebase?.projectId || '');
  const [fbAppId, setFbAppId] = useState(savedFirebase?.appId || '');
  const [fbAuthDomain, setFbAuthDomain] = useState(savedFirebase?.authDomain || '');
  const [isTestingFb, setIsTestingFb] = useState(false);
  const [fbTestMsg, setFbTestMsg] = useState<{ success: boolean; message: string } | null>(null);
  const [isPushingToFb, setIsPushingToFb] = useState(false);
  const [fbPushMsg, setFbPushMsg] = useState<string | null>(null);

  // Direct GitHub API Commit State
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('cpt_github_token') || '');
  const [repoName, setRepoName] = useState(() => localStorage.getItem('cpt_github_repo') || 'Cantag');
  const [branchName, setBranchName] = useState('main');
  const [autoCommit, setAutoCommit] = useState(() => localStorage.getItem('cpt_auto_commit') === 'true');
  const [showToken, setShowToken] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitResult, setCommitResult] = useState<{ success: boolean; message: string; commitUrl?: string } | null>(null);

  const [liveStats, setLiveStats] = useState<{
    status: string;
    version: number;
    lastUpdated: string;
    activeSyncClients: number;
  }>({
    status: 'connected',
    version: dbVersion,
    lastUpdated: lastUpdated || new Date().toISOString(),
    activeSyncClients: 1,
  });

  // Fetch health and live sync status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setLiveStats({
            status: data.status || 'ok',
            version: data.version || dbVersion,
            lastUpdated: data.lastUpdated || lastUpdated || new Date().toISOString(),
            activeSyncClients: data.activeSyncClients || 1,
          });
        }
      } catch (e) {
        console.error('Error fetching live stats', e);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 6000);
    return () => clearInterval(interval);
  }, [dbVersion, lastUpdated]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleTestBroadcastPing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await fetch('/api/sync/ping', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPingResult(`Broadcast succeeded! Dispatched worldwide to ${data.clientCount || 1} active connected client(s).`);
        if (onRefreshDatabase) onRefreshDatabase();
      } else {
        setPingResult('Ping failed: Server responded with error.');
      }
    } catch (err: any) {
      setPingResult(`Ping error: ${err.message}`);
    } finally {
      setIsPinging(false);
    }
  };

  const handleDownloadZip = async () => {
    setIsExportingZip(true);
    try {
      const zip = new JSZip();

      // Fetch database content
      const dbRes = await fetch('/api/content');
      const dbJson = await dbRes.json();
      zip.folder('data')?.file('database.json', JSON.stringify(dbJson.data || {}, null, 2));

      // Generate export README & package details
      zip.file(
        'README.md',
        `# Canstar Power Tech - Industrial Generator Platform\n\n` +
          `Authorized TEKSAN GENERATOR (Turkey) Dealer in Bangladesh.\n\n` +
          `## Quick Start:\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n` +
          `## Production Build:\n\`\`\`bash\nnpm run build\nnpm start\n\`\`\`\n`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `canstar_power_tech_source_${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (e) {
      console.error('ZIP export error:', e);
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleSaveGitHubConfig = () => {
    localStorage.setItem('cpt_github_token', githubToken.trim());
    localStorage.setItem('cpt_github_repo', repoName.trim());
    localStorage.setItem('cpt_auto_commit', autoCommit ? 'true' : 'false');
    setCommitResult({
      success: true,
      message: 'GitHub সেটিংস ব্রাউজারে সফলভাবে সংরক্ষিত হয়েছে!',
    });
    setTimeout(() => setCommitResult(null), 3500);
  };

  const handleDirectCommit = async () => {
    if (!githubToken.trim()) {
      setCommitResult({
        success: false,
        message: 'অনুগ্রহ করে নিচে আপনার GitHub Personal Access Token (PAT) লিখুন।',
      });
      return;
    }
    setIsCommitting(true);
    setCommitResult(null);
    try {
      // 1. Fetch current database content
      let content: any = {};
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (json.data) content = json.data;
        }
      } catch (e) {
        console.warn('Could not fetch from API, reading from localStorage', e);
      }

      if (!content || Object.keys(content).length === 0) {
        // Fallback to localStorage data
        const cust = localStorage.getItem('cpt_customizer');
        const prods = localStorage.getItem('cpt_products');
        const srvs = localStorage.getItem('cpt_services');
        const prjs = localStorage.getItem('cpt_projects');
        const clnts = localStorage.getItem('cpt_clients');
        const qts = localStorage.getItem('cpt_quotes');
        const pgs = localStorage.getItem('cpt_pages_content');
        content = {
          version: dbVersion + 1,
          lastUpdated: new Date().toISOString(),
          customizer: cust ? JSON.parse(cust) : {},
          products: prods ? JSON.parse(prods) : [],
          services: srvs ? JSON.parse(srvs) : [],
          projects: prjs ? JSON.parse(prjs) : [],
          clients: clnts ? JSON.parse(clnts) : [],
          quotes: qts ? JSON.parse(qts) : [],
          pagesContent: pgs ? JSON.parse(pgs) : {},
        };
      }

      // 2. Commit to GitHub
      const res = await commitDatabaseToGitHub(content, {
        token: githubToken.trim(),
        repo: repoName.trim(),
        branch: branchName.trim() || 'main',
      });

      // Save settings
      localStorage.setItem('cpt_github_token', githubToken.trim());
      localStorage.setItem('cpt_github_repo', repoName.trim());
      localStorage.setItem('cpt_auto_commit', autoCommit ? 'true' : 'false');

      setCommitResult({
        success: true,
        message: 'সফলভাবে GitHub-এ ডাটাবেস কমিট হয়েছে! Vercel এখন আপনার পরিবর্তনগুলো সারা বিশ্বে (UK, USA, বাংলাদেশ) স্বয়ংক্রিয়ভাবে লাইভ করছে।',
        commitUrl: res.commitUrl,
      });

      if (onRefreshDatabase) onRefreshDatabase();
    } catch (err: any) {
      setCommitResult({
        success: false,
        message: `কমিট ব্যর্থ হয়েছে: ${err.message}`,
      });
    } finally {
      setIsCommitting(false);
    }
  };

  const handleDownloadDirectJson = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          downloadDatabaseJson(json.data, 'database.json');
          return;
        }
      }
    } catch (e) {}

    // Fallback to local
    const cust = localStorage.getItem('cpt_customizer');
    const prods = localStorage.getItem('cpt_products');
    const pgs = localStorage.getItem('cpt_pages_content');
    downloadDatabaseJson({
      version: dbVersion,
      lastUpdated: new Date().toISOString(),
      customizer: cust ? JSON.parse(cust) : {},
      products: prods ? JSON.parse(prods) : [],
      pagesContent: pgs ? JSON.parse(pgs) : {},
    }, 'database.json');
  };

  const gitCommands = [
    '# 1. Initialize git in your project root',
    'git init',
    '',
    '# 2. Stage all project files',
    'git add .',
    '',
    '# 3. Create initial commit',
    'git commit -m "feat: complete canstar power tech platform with real-time global database"',
    '',
    '# 4. Set branch name to main',
    'git branch -M main',
    '',
    '# 5. Link your GitHub repository',
    `git remote add origin ${githubUrl.trim() || 'https://github.com/YOUR_USERNAME/canstar-power-tech.git'}`,
    '',
    '# 6. Push code to GitHub',
    'git push -u origin main',
  ].join('\n');

  const handleConnectFirebase = async () => {
    let configToSave: FirebaseConfig | null = null;
    if (firebaseInputMode === 'paste') {
      configToSave = parseFirebaseConfigString(rawFirebaseConfig);
      if (!configToSave) {
        setFbTestMsg({ success: false, message: 'সঠিক Firebase কনফিগ পাওয়া যায়নি। কনসোল থেকে কপি করা কোডটি পেস্ট করুন।' });
        return;
      }
    } else {
      if (!fbApiKey.trim() || !fbProjectId.trim()) {
        setFbTestMsg({ success: false, message: 'API Key এবং Project ID উভয়ই বাধ্যতামূলক।' });
        return;
      }
      configToSave = {
        apiKey: fbApiKey.trim(),
        projectId: fbProjectId.trim(),
        appId: fbAppId.trim(),
        authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
      };
    }

    setIsTestingFb(true);
    setFbTestMsg(null);
    const testResult = await testFirebaseConnection(configToSave);
    setIsTestingFb(false);

    if (testResult.success) {
      saveFirebaseConfig(configToSave);
      setSavedFirebase(configToSave);
      setFbTestMsg({ success: true, message: '🎉 ' + testResult.message });
      if (onRefreshDatabase) onRefreshDatabase();
    } else {
      setFbTestMsg(testResult);
    }
  };

  const handleDisconnectFirebase = () => {
    clearFirebaseConfig();
    setSavedFirebase(null);
    setFbTestMsg({ success: true, message: 'Firebase ক্লাউড ডাটাবেস সংযোগ বিচ্ছিন্ন করা হয়েছে।' });
  };

  const handlePushCurrentToCloud = async () => {
    setIsPushingToFb(true);
    setFbPushMsg(null);
    try {
      const res = await fetch('/api/content');
      let dataToPush = null;
      if (res.ok) {
        const json = await res.json();
        dataToPush = json.data;
      }
      if (!dataToPush) {
        const customizer = JSON.parse(localStorage.getItem('cpt_customizer') || '{}');
        const products = JSON.parse(localStorage.getItem('cpt_products') || '[]');
        const pagesContent = JSON.parse(localStorage.getItem('cpt_pages_content') || '{}');
        dataToPush = { customizer, products, pagesContent, lastUpdated: new Date().toISOString() };
      }
      const saveRes = await saveToFirestore(dataToPush);
      setFbPushMsg(saveRes.message);
    } catch (e: any) {
      setFbPushMsg('Error: ' + e.message);
    } finally {
      setIsPushingToFb(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Overview */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-blue-500/30 rounded-xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wide flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5" />
                GitHub Ready & Worldwide Database
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                Live Real-Time Sync Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              GitHub প্রকাশনা এবং লাইভ গ্লোবাল ডাটাবেস সিস্টেম
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              আপনার ওয়েবসাইটের ডাটাবেস যেকোনো স্থান থেকে পরিবর্তন হলে পৃথিবীর যেকোনো প্রান্তে ভিজিটরদের স্ক্রিনে সেকেন্ডের মধ্যে কোনো পেজ রিলোড ছাড়াই সাথে সাথে পরিবর্তন দেখা যাবে। নিচে GitHub-এ আপলোড করার সম্পূর্ণ কমান্ড এবং ফ্রি ক্লাউড হোস্টিং গাইড দেওয়া হলো।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/api/db/export"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shadow"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export Database JSON</span>
            </a>

            <button
              onClick={handleDownloadZip}
              disabled={isExportingZip}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/40 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingZip ? 'Preparing ZIP...' : zipSuccess ? 'Downloaded!' : 'Download Project ZIP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 1: GOOGLE CLOUD FIREBASE FIRESTORE REALTIME DATABASE   */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-[#121E36] via-[#0F1B2E] to-[#0A1220] border-2 border-amber-500/50 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-5">
          {/* Header & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Google Firebase ক্লাউড ডাটাবেস (Persistent Cloud DB)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Recommended for Live Updates
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Vercel বা যেকোনো সার্ভারে পরিবর্তন স্থায়ী রাখতে এবং Bangladesh, UK, USA সহ পৃথিবীর যেকোনো স্থান থেকে ভিজিটরদের ইনস্ট্যান্ট লাইভ দেখাতে এটি কানেক্ট করুন।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                savedFirebase
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full ${savedFirebase ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                <span>{savedFirebase ? 'Cloud Database Connected' : 'Not Connected'}</span>
              </span>
            </div>
          </div>

          {/* Active Connected State */}
          {savedFirebase ? (
            <div className="bg-[#0A1424] border border-emerald-500/40 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>গুগল ক্লাউড ফায়ারবেস ডাটাবেস সম্পূর্ণ সক্রিয় ও সংযুক্ত!</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    Project ID: <strong className="text-white">{savedFirebase.projectId}</strong>
                    {savedFirebase.appId && <span className="ml-3 text-slate-400">App ID: {savedFirebase.appId.slice(0, 16)}...</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handlePushCurrentToCloud}
                    disabled={isPushingToFb}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>{isPushingToFb ? 'Uploading to Cloud...' : 'Push Local Data to Cloud'}</span>
                  </button>

                  <button
                    onClick={handleDisconnectFirebase}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 text-slate-400 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>

              {fbPushMsg && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{fbPushMsg}</span>
                </div>
              )}

              <div className="text-xs text-slate-400 flex items-start gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-200">কীভাবে কাজ করছে:</strong> আপনি এডমিন প্যানেলে যেকোনো ছবি, টেক্সট, প্রোডাক্ট বা প্রাইস পরিবর্তন করে <strong>"Save & Publish Worldwide"</strong>-এ ক্লিক করলেই স্বয়ংক্রিয়ভাবে Google Cloud Firestore-এ সেভ হয়ে যায়। ভিজিটররা ওয়েবসাইট খুললেই এই ডাটাবেস থেকে তাৎক্ষণিকভাবে লাইভ ডাটা দেখতে পাবে।
                </p>
              </div>
            </div>
          ) : (
            /* Setup / Connect Form */
            <div className="bg-[#0A1424] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Connect Your Firebase Project in 1 Minute (100% Free)</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-700 text-xs">
                  <button
                    onClick={() => setFirebaseInputMode('paste')}
                    className={`px-2.5 py-1 rounded transition ${
                      firebaseInputMode === 'paste' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1-Click Paste Config
                  </button>
                  <button
                    onClick={() => setFirebaseInputMode('fields')}
                    className={`px-2.5 py-1 rounded transition ${
                      firebaseInputMode === 'fields' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Manual Fields
                  </button>
                </div>
              </div>

              {firebaseInputMode === 'paste' ? (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Paste Firebase Config Code Snippet (বা JSON):
                  </label>
                  <textarea
                    rows={4}
                    value={rawFirebaseConfig}
                    onChange={(e) => setRawFirebaseConfig(e.target.value)}
                    placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "your-app.firebaseapp.com",\n  projectId: "your-app-id",\n  storageBucket: "your-app.appspot.com",\n  messagingSenderId: "...",\n  appId: "..."\n};`}
                    className="w-full bg-[#070D18] border border-slate-700 rounded-lg p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    Firebase Console &gt; Project Settings &gt; General &gt; Your apps &gt; Web app থেকে কনফিগ কোডটি কপি করে সরাসরি এখানে পেস্ট করুন।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Firebase API Key *</label>
                    <input
                      type="text"
                      value={fbApiKey}
                      onChange={(e) => setFbApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Firebase Project ID *</label>
                    <input
                      type="text"
                      value={fbProjectId}
                      onChange={(e) => setFbProjectId(e.target.value)}
                      placeholder="e.g. canstar-power-tech"
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">App ID</label>
                    <input
                      type="text"
                      value={fbAppId}
                      onChange={(e) => setFbAppId(e.target.value)}
                      placeholder="1:1234567890:web:abcdef"
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Auth Domain (Optional)</label>
                    <input
                      type="text"
                      value={fbAuthDomain}
                      onChange={(e) => setFbAuthDomain(e.target.value)}
                      placeholder="e.g. canstar.firebaseapp.com"
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {fbTestMsg && (
                <div className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                  fbTestMsg.success
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                }`}>
                  {fbTestMsg.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{fbTestMsg.message}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Free Tier (Google Cloud Firestore)</span>
                </div>

                <button
                  type="button"
                  onClick={handleConnectFirebase}
                  disabled={isTestingFb}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-900/40 cursor-pointer disabled:opacity-50"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{isTestingFb ? 'Testing & Connecting...' : 'Connect & Test Database'}</span>
                </button>
              </div>

              {/* 3-Step Bengali Instructions */}
              <div className="mt-3 p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span>কীভাবে ১ মিনিটে ফ্রি Firebase ডাটাবেস তৈরি করবেন:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  <li>
                    <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-semibold">
                      console.firebase.google.com
                    </a> এ গিয়ে আপনার জিমেইল দিয়ে লগইন করে <strong>"Add project"</strong>-এ ক্লিক করুন (নাম দিন: Canstar Tech)।
                  </li>
                  <li>
                    বামপাশের মেনু থেকে <strong>Build &gt; Firestore Database</strong>-এ গিয়ে <strong>"Create database"</strong>-এ চাপুন এবং <strong>"Start in test mode"</strong> সিলেক্ট করে Enable করুন।
                  </li>
                  <li>
                    Project Settings (গিয়ার আইকন) &gt; General &gt; Your apps &gt; <strong>Web (&lt;/&gt;)</strong> আইকনে ক্লিক করে রেজিস্টার করুন। যে <strong>firebaseConfig</strong> কোডটি দেখতে পাবেন, তা কপি করে ওপরের বক্সে পেস্ট করে <strong>"Connect & Test Database"</strong> বাটনে চাপুন।
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Direct GitHub API 1-Click Commit & Vercel Worldwide Auto-Deploy Card */}
      <div className="bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0A1128] border-2 border-emerald-500/40 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Globe className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>সরাসরি GitHub-এ সেভ এবং Vercel বিশ্বব্যাপী লাইভ ডিপ্লয়</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Recommended for Vercel
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  Vercel সার্ভারলেসে পরিবর্তন স্থায়ী রাখতে এখানে আপনার GitHub Token দিয়ে সেভ করুন। UK, USA বা পৃথিবীর যেকোনো স্থান থেকে ভিজিটররা তৎক্ষণাৎ নতুন ছবি ও লেখা দেখতে পাবে।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadDirectJson}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
                title="Download current database.json file"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Download database.json</span>
              </button>
            </div>
          </div>

          {/* GitHub Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-1">
            
            {/* Token Input */}
            <div className="sm:col-span-6 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  GitHub Personal Access Token (PAT):
                </label>
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=CanstarPowerTechAdmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                >
                  টোকেন নেই? ১-ক্লিকে তৈরি করুন <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 pr-10 text-xs font-mono text-emerald-300 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 block">
                টোকেনটি ব্রাউজারের নিরাপদ স্টোরেজে থাকে। টোকেন তৈরি করার সময় শুধু <strong className="text-emerald-400">repo</strong> অপশনে টিক দিন।
              </span>
            </div>

            {/* Repository Name */}
            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                GitHub Repository:
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="username/repo-name"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block">
                যেমন: n85711813/canstar-power-tech
              </span>
            </div>

            {/* Branch */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Branch:</label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="main"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block">default: main</span>
            </div>

          </div>

          {/* Action Row & Auto-commit toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoCommit}
                onChange={(e) => setAutoCommit(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
              />
              <span className="text-xs text-slate-300">
                এডমিন প্যানেলে যেকোনো <strong className="text-white">Save</strong> বাটনে চাপলেই স্বয়ংক্রিয়ভাবে GitHub-এ পুশ করুন
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveGitHubConfig}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              >
                Save Settings
              </button>

              <button
                type="button"
                onClick={handleDirectCommit}
                disabled={isCommitting}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition cursor-pointer disabled:opacity-50"
              >
                <GitCommit className={`w-4 h-4 ${isCommitting ? 'animate-spin' : ''}`} />
                <span>{isCommitting ? 'Committing to GitHub...' : '১-ক্লিকে GitHub-এ পুশ করুন (Commit & Deploy)'}</span>
              </button>
            </div>
          </div>

          {/* Feedback message banner */}
          {commitResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                commitResult.success
                  ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/60 border border-rose-500/50 text-rose-200'
              }`}
            >
              {commitResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold">{commitResult.message}</p>
                {commitResult.commitUrl && (
                  <a
                    href={commitResult.commitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-mono text-[11px]"
                  >
                    View commit on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Grid: 2 Columns - Database Live Sync Engine + GitHub Push Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Worldwide Real-Time Database Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0B1629] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">গ্লোবাল ডাটাবেস স্ট্যাটাস</h3>
                  <p className="text-[11px] text-slate-400">Worldwide Live Replication</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Broadcast
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">ডাটাবেস রিভিশন</span>
                <span className="text-lg font-black text-amber-400">v{liveStats.version}</span>
                <span className="text-[10px] text-slate-500 block">Atomic version</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">লাইভ কানেক্টেড ক্লায়েন্ট</span>
                <span className="text-lg font-black text-emerald-400">{liveStats.activeSyncClients || 1} Device(s)</span>
                <span className="text-[10px] text-slate-500 block">SSE Active Stream</span>
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>সর্বশেষ ডাটাবেস আপডেট:</span>
                <span className="text-slate-200 font-mono">
                  {new Date(liveStats.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {new Date(liveStats.lastUpdated).toLocaleDateString(undefined, {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* Live Test Broadcast Button */}
            <div className="pt-2">
              <button
                onClick={handleTestBroadcastPing}
                disabled={isPinging}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs transition shadow cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Broadcasting Worldwide...' : 'টেস্ট লাইভ সিঙ্ক পিং পাঠান (Test Worldwide Sync)'}</span>
              </button>
              {pingResult && (
                <p className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded p-2 mt-2">
                  {pingResult}
                </p>
              )}
            </div>

            {/* How it works box */}
            <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-lg text-xs space-y-2">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                কীভাবে সারা বিশ্বে সাথে সাথে আপডেট হবে?
              </span>
              <ul className="text-slate-300 text-[11px] space-y-1.5 list-disc pl-4">
                <li>এডমিন প্যানেলে কোনো জেনারেটরের স্পেক্স, ফোন নাম্বার বা ব্যানার এডিট করে <strong>Save & Publish Worldwide</strong> বাটনে ক্লিক করলে তা সরাসরি সেন্ট্রাল ফাইলে সেভ হয়।</li>
                <li>সার্ভার স্বয়ংক্রিয়ভাবে <strong>Server-Sent Events (SSE)</strong> স্ট্রিমের মাধ্যমে সংযুক্ত সকল ব্রাউজারে রিয়েল-টাইম পুশ নোটিফিকেশন পাঠায়।</li>
                <li>ভিজিটরকে কোনো রিলোড দিতে হয় না, তাৎক্ষণিকভাবে স্ক্রিন আপডেট হয়ে যায়!</li>
              </ul>
            </div>
          </div>

          {/* Database Backup Box */}
          <div className="bg-[#0B1629] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              ডাটাবেস ব্যাকআপ এবং নিরাপত্তা
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              সকল প্রোডাক্ট, কাস্টমার কোট এবং মেসেজ <code className="text-amber-400 font-mono bg-slate-900 px-1 py-0.5 rounded">data/database.json</code> ফাইলে সুরক্ষিত থাকে। যেকোনো সময় ব্যাকআপ ডাউনলোড বা রিস্টোর করতে পারেন।
            </p>
            <div className="flex gap-2">
              <a
                href="/api/db/export"
                download="canstar_database_backup.json"
                className="flex-1 text-center py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              >
                Download Backup
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): GitHub Publishing & Cloud Deployment Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0B1629] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <FolderGit2 className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">GitHub-এ আপলোড করার সহজ নিয়ম</h3>
                  <p className="text-[11px] text-slate-400">Step-by-step terminal commands</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(gitCommands, 'all-commands')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
              >
                {copiedSection === 'all-commands' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'all-commands' ? 'Copied!' : 'Copy All Commands'}</span>
              </button>
            </div>

            {/* Custom GitHub Repo Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>আপনার GitHub রিপোজিটরি লিংক (GitHub Repository URL):</span>
                <span className="text-[10px] text-slate-400">লিংক বসালে নিচের কমান্ড স্বয়ংক্রিয় আপডেট হবে</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/YOUR_USERNAME/canstar-power-tech.git"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Step-by-Step Terminal Commands */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  টার্মিনালে এই কমান্ডগুলো রান করুন (Run in terminal):
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto relative group">
                <button
                  onClick={() => copyToClipboard(gitCommands, 'box-copy')}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Copy commands"
                >
                  {copiedSection === 'box-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <div className="text-slate-500"># 1. Initialize git</div>
                <div className="text-emerald-400">git init</div>
                <div className="text-slate-500 pt-1"># 2. Add all files</div>
                <div className="text-emerald-400">git add .</div>
                <div className="text-slate-500 pt-1"># 3. Commit files</div>
                <div className="text-emerald-400">git commit -m "feat: complete canstar power tech platform with real-time global database"</div>
                <div className="text-slate-500 pt-1"># 4. Set main branch</div>
                <div className="text-emerald-400">git branch -M main</div>
                <div className="text-slate-500 pt-1"># 5. Connect GitHub remote</div>
                <div className="text-emerald-400 break-all">git remote add origin {githubUrl.trim() || 'https://github.com/YOUR_USERNAME/canstar-power-tech.git'}</div>
                <div className="text-slate-500 pt-1"># 6. Push to GitHub</div>
                <div className="text-emerald-400 font-bold">git push -u origin main</div>
              </div>
            </div>

            {/* Cloud Deployment Options */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-blue-400" />
                  ফ্রি ক্লাউডে লাইভ হোস্ট করার নিয়ম (1-Click Deployment):
                </span>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800 gap-2">
                <button
                  onClick={() => setActiveDeployTab('render')}
                  className={`pb-2 px-2 text-xs font-semibold transition cursor-pointer border-b-2 ${
                    activeDeployTab === 'render'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Render.com (Free & Recommended)
                </button>
                <button
                  onClick={() => setActiveDeployTab('railway')}
                  className={`pb-2 px-2 text-xs font-semibold transition cursor-pointer border-b-2 ${
                    activeDeployTab === 'railway'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Railway.app
                </button>
                <button
                  onClick={() => setActiveDeployTab('vps')}
                  className={`pb-2 px-2 text-xs font-semibold transition cursor-pointer border-b-2 ${
                    activeDeployTab === 'vps'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  VPS / Ubuntu Server
                </button>
                <button
                  onClick={() => setActiveDeployTab('docker')}
                  className={`pb-2 px-2 text-xs font-semibold transition cursor-pointer border-b-2 ${
                    activeDeployTab === 'docker'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Docker Container
                </button>
              </div>

              {/* Tab Contents */}
              {activeDeployTab === 'render' && (
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                  <p className="font-semibold text-slate-200">Render.com-এ লাইভ করার নিয়ম:</p>
                  <ol className="text-slate-300 text-[11px] list-decimal pl-4 space-y-1">
                    <li><a href="https://dashboard.render.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">render.com</a>-এ ফ্রি একাউন্ট খুলে <strong>New + Web Service</strong> এ ক্লিক করুন।</li>
                    <li>আপনার GitHub একাউন্ট কানেক্ট করে এই রিপোজিটরিটি সিলেক্ট করুন।</li>
                    <li>
                      <strong>Build Command:</strong> <code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded font-mono">npm run build</code>
                    </li>
                    <li>
                      <strong>Start Command:</strong> <code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded font-mono">npm start</code>
                    </li>
                    <li><strong>Deploy Web Service</strong> এ চাপ দিলেই ২ মিনিটের মধ্যে আপনার লাইভ লিংক রেডি হয়ে যাবে!</li>
                  </ol>
                </div>
              )}

              {activeDeployTab === 'railway' && (
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                  <p className="font-semibold text-slate-200">Railway.app-এ লাইভ করার নিয়ম:</p>
                  <ol className="text-slate-300 text-[11px] list-decimal pl-4 space-y-1">
                    <li><a href="https://railway.app" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">railway.app</a>-এ লগইন করুন।</li>
                    <li><strong>New Project</strong> &rarr; <strong>Deploy from GitHub repo</strong> সিলেক্ট করুন।</li>
                    <li>রেপোজিটরি সিলেক্ট করলেই Railway স্বয়ংক্রিয়ভাবে আমাদের দেওয়া Dockerfile বা Node কনফিগারেশন ডিটেক্ট করে লাইভ করে দেবে।</li>
                  </ol>
                </div>
              )}

              {activeDeployTab === 'vps' && (
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                  <p className="font-semibold text-slate-200">নিজস্ব VPS বা Ubuntu সার্ভারে চালানোর কমান্ড:</p>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1">
                    <div>git clone {githubUrl}</div>
                    <div>cd canstar-power-tech</div>
                    <div>npm install</div>
                    <div>npm run build</div>
                    <div>npm install -g pm2</div>
                    <div>pm2 start dist/server.cjs --name "canstar-power-tech"</div>
                    <div>pm2 save && pm2 startup</div>
                  </div>
                </div>
              )}

              {activeDeployTab === 'docker' && (
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                  <p className="font-semibold text-slate-200">প্রজেক্টে দেওয়া Dockerfile ব্যবহার করে চালানোর কমান্ড:</p>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1">
                    <div>docker build -t canstar-app .</div>
                    <div>docker run -d -p 3000:3000 --name canstar-container canstar-app</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
