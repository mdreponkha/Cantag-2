import React, { useState, useEffect } from 'react';
import { PageView, ProductItem, ProjectItem, ServiceItem, ClientItem, QuoteFormData, ThemeCustomizerState, PagesContentState } from './types';
import { Header } from './components/Header';
import { NavigationBar } from './components/NavigationBar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StatsCounter } from './components/StatsCounter';
import { DieselGeneratorSolutions } from './components/DieselGeneratorSolutions';
import { MdMessageSection } from './components/MdMessageSection';
import { CeoMessageSection } from './components/CeoMessageSection';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProjectsSection } from './components/ProjectsSection';
import { ClientsSection } from './components/ClientsSection';
import { CalculatorModal } from './components/CalculatorModal';
import { ContactSection } from './components/ContactSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { LiveChatWidget } from './components/LiveChatWidget';
import { PRODUCTS_DATA, SERVICES_DATA, PROJECTS_DATA, CLIENTS_DATA } from './data/themeData';
import { PERKINS_STANDARD_SPEC_ROWS, RICARDO_SPEC_ROWS } from './data/generatorSpecsData';
import { INITIAL_PAGES_CONTENT } from './data/pagesInitialData';
import { safeStorage, safePushState, safeScrollTo } from './utils/storage';
import { commitDatabaseToGitHub, fetchFromGitHubRaw } from './utils/githubSync';
import {
  fetchFromFirestore,
  saveToFirestore,
  subscribeToFirestore,
  getSavedFirebaseConfig
} from './utils/cloudDatabase';

const DEFAULT_LOGO_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiO4zlpzfLK4DzN4fsgYH3a8b1hIUneK5r0XBLEQSCvsabtEB4_7qCQ0LqvWMv6DC3USKC9-DglXUL8YrbsKUXZXw0BhqkLzSrraHATr-P0HgX6XlsQWMSRa5nZMvN_v5xg__afGsL0K9QHI9DTywyDJ7MSh4JPuzfwGOSDyZXRKRRQdoSfoH5umx8BFpJX/s2073/ChatGPT%20Image%20Sep%202,%202026,%2006_29_20%20PM.png';

export const App: React.FC = () => {
  // Check if current URL or hash is /admin
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    const p = window.location.pathname.toLowerCase();
    const h = window.location.hash.toLowerCase();
    const s = window.location.search.toLowerCase();
    return (
      p === '/admin' ||
      p === '/admin/' ||
      p.startsWith('/admin') ||
      h === '#admin' ||
      h === '#/admin' ||
      s.includes('page=admin') ||
      s.includes('admin')
    );
  };

  const isInitialAdmin = checkIsAdmin();

  const [activePage, setActivePage] = useState<PageView>(isInitialAdmin ? 'admin' : 'home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [quoteSubject, setQuoteSubject] = useState<string | undefined>(undefined);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return safeStorage.getItem('cpt_admin_auth_token');
    } catch {
      return null;
    }
  });

  // Dynamic state loaded from safeStorage if available
  const [customizer, setCustomizer] = useState<ThemeCustomizerState>(() => {
    try {
      const saved = safeStorage.getItem('cpt_customizer');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          logoUrl: parsed.logoUrl || DEFAULT_LOGO_URL
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      logoUrl: DEFAULT_LOGO_URL,
      primaryColor: '#08192E',
      accentColor: '#2563EB',
      heroHeadline: 'Reliable Power for Secure Data',
      heroSubheadline: 'With Teksan generator sets that comply with Uptime Institute Tier III and Tier IV requirements, all data is secure.',
      heroBadge: 'TIER III & TIER IV COMPLIANT',
      phone: '01300-746860',
      emergencyPhone: '01300-746860',
      email: 'info@canstarpowertech.com',
      address: '102/1, Fakirapoool (2nd Floor), Safayet Ullah Lane, Motijheel, Dhaka-1000, Dhaka, Bangladesh',
      activeFont: 'Outfit',
      suppliedUnits: '1200+ Units in Bangladesh',
      uptimeGuarantee: '99.9%',
      completedProjects: '1000+'
    };
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = safeStorage.getItem('cpt_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: any) => {
            if (p.id === 'gas-generators' || p.category === 'gas') {
              const rows = (p.specTableRows && p.specTableRows.length >= 10) ? p.specTableRows : PERKINS_STANDARD_SPEC_ROWS;
              const engine = (p.engineMakes && !p.engineMakes.includes('Lean-Burn')) ? p.engineMakes : 'Genuine Perkins / Teksan High-Efficiency Industrial Series';
              const acoustic = (p.soundLevel && !p.soundLevel.includes('68 dBA @ 7 meters with Acoustic Enclosure')) ? p.soundLevel : '65 – 70 dBA @ 7 meters (Weatherproof Soundproof Canopy)';
              return { ...p, specTableRows: rows, engineMakes: engine, soundLevel: acoustic };
            }
            if ((p.id === 'diesel-generators' || p.category === 'diesel') && (!p.specTableRows || p.specTableRows.length < 5)) {
              return { ...p, specTableRows: RICARDO_SPEC_ROWS };
            }
            return p;
          });
        }
      }
      safeStorage.removeItem('cpt_products');
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS_DATA;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = safeStorage.getItem('cpt_services');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SERVICES_DATA;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = safeStorage.getItem('cpt_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PROJECTS_DATA;
  });

  const [clients, setClients] = useState<ClientItem[]>(() => {
    try {
      const saved = safeStorage.getItem('cpt_clients');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CLIENTS_DATA;
  });

  const [quotes, setQuotes] = useState<QuoteFormData[]>(() => {
    try {
      const saved = safeStorage.getItem('cpt_quotes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'quote-1',
        name: 'Tariq Mahmud',
        email: 'tariq@beximco.com',
        phone: '+880 1712 345678',
        company: 'Beximco Industrial Complex',
        capacity: '2000 kVA',
        fuel: 'Diesel',
        serviceType: 'Turnkey Supply & Sync Panel',
        message: 'Looking for 2x1000 kVA synchronized Perkins generator setup with acoustic canopy.',
        date: 'Today',
        status: 'new'
      },
      {
        id: 'quote-2',
        name: 'Kazi Ahsan',
        email: 'ahsan@squaregroup.com',
        phone: '+880 1819 876543',
        company: 'Square Pharmaceuticals Plant',
        capacity: '1250 kVA',
        fuel: 'Diesel / Gas',
        serviceType: 'Emergency Backup',
        message: 'Require Tier III compliant generator set for clean-room power reliability.',
        date: 'Yesterday',
        status: 'contacted'
      }
    ];
  });

  const [pagesContent, setPagesContent] = useState<PagesContentState>(() => {
    try {
      const saved = safeStorage.getItem('cpt_pages_content');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PAGES_CONTENT;
  });

  // Listen to browser URL changes for /admin navigation
  useEffect(() => {
    const handlePopState = () => {
      if (checkIsAdmin()) {
        setActivePage('admin');
      } else if (window.location.hash.startsWith('#/admin')) {
        setActivePage('admin');
      } else if (window.location.pathname === '/' || window.location.pathname === '') {
        setActivePage((prev) => (prev === 'admin' ? 'home' : prev));
      }
    };

    // Run check on mount
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Worldwide Real-time Database Synchronization State
  const [dbVersion, setDbVersion] = useState<number>(1);
  const [lastDatabaseUpdate, setLastDatabaseUpdate] = useState<string>('');

  const applyDatabaseData = (d: any) => {
    if (!d) return;
    if (typeof d.version === 'number') setDbVersion(d.version);
    if (d.lastUpdated) setLastDatabaseUpdate(d.lastUpdated);
    if (d.customizer) setCustomizer(prev => ({ ...prev, ...d.customizer }));
    if (Array.isArray(d.products) && d.products.length > 0) setProducts(d.products);
    if (Array.isArray(d.services) && d.services.length > 0) setServices(d.services);
    if (Array.isArray(d.projects) && d.projects.length > 0) setProjects(d.projects);
    if (Array.isArray(d.clients) && d.clients.length > 0) setClients(d.clients);
    if (Array.isArray(d.quotes) && d.quotes.length > 0) setQuotes(d.quotes);
    if (d.pagesContent) {
      setPagesContent(prev => ({
        ...prev,
        ...d.pagesContent,
        home: { ...prev.home, ...(d.pagesContent.home || {}) },
        about: { ...prev.about, ...(d.pagesContent.about || {}) },
        mdMessage: { ...prev.mdMessage, ...(d.pagesContent.mdMessage || {}) },
        ceoMessage: { ...prev.ceoMessage, ...(d.pagesContent.ceoMessage || {}) },
        contact: { ...prev.contact, ...(d.pagesContent.contact || {}) },
        products: { ...prev.products, ...(d.pagesContent.products || {}) },
        services: { ...prev.services, ...(d.pagesContent.services || {}) },
        projects: { ...prev.projects, ...(d.pagesContent.projects || {}) },
        clients: { ...prev.clients, ...(d.pagesContent.clients || {}) },
      }));
    }
  };

  const reloadDatabase = async () => {
    // 1. Try Firebase Firestore Cloud Database first (Worldwide live persistent)
    try {
      const firestoreData = await fetchFromFirestore();
      if (firestoreData && (firestoreData.customizer || firestoreData.products || firestoreData.pagesContent)) {
        console.log('Applied live database from Firebase Firestore');
        applyDatabaseData(firestoreData);
        return;
      }
    } catch (fsErr) {
      console.log('Firestore initial check skipped:', fsErr);
    }

    // 2. Try local or Vercel /api/content
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          applyDatabaseData(json.data);
          return;
        }
      }
    } catch (err) {
      console.log('API database check failed, attempting GitHub CDN fallback:', err);
    }

    // 3. Try GitHub Raw CDN fallback
    try {
      const savedRepo = safeStorage.getItem('cpt_github_repo') || 'n85711813/canstar-power-tech';
      const rawData = await fetchFromGitHubRaw(savedRepo);
      if (rawData && (rawData.customizer || rawData.products || rawData.pagesContent)) {
        console.log('Applied live database from GitHub worldwide CDN');
        applyDatabaseData(rawData);
      }
    } catch (cdnErr) {
      console.log('GitHub CDN fallback skipped:', cdnErr);
    }
  };

  // Real-time synchronization via Firestore + SSE + Polling
  useEffect(() => {
    // 1. Initial Load
    reloadDatabase();

    // 2. Real-time Firebase Firestore subscription
    let unsubFirestore: (() => void) | null = null;
    try {
      unsubFirestore = subscribeToFirestore((liveData) => {
        if (liveData) {
          applyDatabaseData(liveData);
        }
      });
    } catch (e) {
      console.warn('Firestore real-time subscription:', e);
    }

    // 3. Server-Sent Events (SSE) live connection
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/sync/stream');
      
      eventSource.onmessage = (e) => {
        try {
          const parsed = JSON.parse(e.data);
          if (parsed.type === 'content_updated' && parsed.data) {
            applyDatabaseData(parsed.data);
          } else if (parsed.type === 'connected') {
            if (parsed.version) setDbVersion(parsed.version);
            if (parsed.lastUpdated) setLastDatabaseUpdate(parsed.lastUpdated);
          }
        } catch (parseErr) {
          console.error('Error parsing sync message:', parseErr);
        }
      };

      eventSource.onerror = () => {
        // SSE disconnected or reconnecting; fallback polling ensures updates are not lost
      };
    } catch (sseErr) {
      console.error('SSE initialization error:', sseErr);
    }

    // 4. Fallback smart polling (every 5 seconds)
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sync/check?version=${dbVersion}`);
        if (res.ok) {
          const checkData = await res.json();
          if (checkData.changed && checkData.data) {
            applyDatabaseData(checkData.data);
          }
        }
      } catch {
        // network silent catch
      }
    }, 5000);

    return () => {
      if (unsubFirestore) unsubFirestore();
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
    };
  }, [dbVersion]);

  // Function to save everything to storage
  const handleSaveToLocalStorage = (overrideData?: any) => {
    try {
      if (overrideData?.customizer || customizer) safeStorage.setItem('cpt_customizer', JSON.stringify(overrideData?.customizer || customizer));
      if (overrideData?.products || products) safeStorage.setItem('cpt_products_v2', JSON.stringify(overrideData?.products || products));
      if (overrideData?.services || services) safeStorage.setItem('cpt_services', JSON.stringify(overrideData?.services || services));
      if (overrideData?.projects || projects) safeStorage.setItem('cpt_projects', JSON.stringify(overrideData?.projects || projects));
      if (overrideData?.clients || clients) safeStorage.setItem('cpt_clients', JSON.stringify(overrideData?.clients || clients));
      if (overrideData?.quotes || quotes) safeStorage.setItem('cpt_quotes', JSON.stringify(overrideData?.quotes || quotes));
      if (overrideData?.pagesContent || pagesContent) safeStorage.setItem('cpt_pages_content', JSON.stringify(overrideData?.pagesContent || pagesContent));
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  };

  // Worldwide persistent database save handler
  const handleSaveToDatabase = async (overrideData?: any): Promise<boolean> => {
    handleSaveToLocalStorage(overrideData);
    let isSuccess = false;
    const payload = {
      customizer: overrideData?.customizer ? { ...customizer, ...overrideData.customizer } : customizer,
      products: overrideData?.products ?? products,
      services: overrideData?.services ?? services,
      projects: overrideData?.projects ?? projects,
      clients: overrideData?.clients ?? clients,
      quotes: overrideData?.quotes ?? quotes,
      pagesContent: overrideData?.pagesContent ? {
        ...pagesContent,
        ...overrideData.pagesContent,
        home: { ...pagesContent.home, ...(overrideData.pagesContent.home || {}) }
      } : pagesContent,
    };

    // 1. Save directly to Firebase Firestore (Real Google Cloud Database)
    try {
      const fsRes = await saveToFirestore(payload);
      if (fsRes.success) {
        isSuccess = true;
      }
    } catch (fsErr) {
      console.warn('Cloud database write warning:', fsErr);
    }

    // 2. Save to local/serverless API
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) isSuccess = true;
      }
    } catch (err) {
      console.error('Save to local API error:', err);
    }

    // 3. Auto-commit to GitHub if user has saved a token in GitHub Settings
    const ghToken = safeStorage.getItem('cpt_github_token');
    const autoCommit = safeStorage.getItem('cpt_auto_commit');
    if (ghToken && autoCommit !== 'false') {
      try {
        const repo = safeStorage.getItem('cpt_github_repo') || 'n85711813/canstar-power-tech';
        await commitDatabaseToGitHub(payload, { token: ghToken, repo });
        isSuccess = true;
      } catch (ghErr) {
        console.warn('GitHub auto-commit warning:', ghErr);
      }
    }

    return isSuccess;
  };

  const handleOpenQuoteModal = (subject?: string) => {
    setQuoteSubject(subject);
    setIsQuoteModalOpen(true);
  };

  const handleNavigate = (page: PageView) => {
    setActivePage(page);
    setSelectedProduct(null);
    setSelectedProject(null);
    setMobileMenuOpen(false);
    if (page === 'admin') {
      safePushState(null, '', '/admin');
    } else {
      if (window.location.pathname === '/admin') {
        safePushState(null, '', '/');
      } else if (window.location.hash) {
        safePushState(null, '', window.location.pathname || '/');
      }
    }
    safeScrollTo(0, 0);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleLogoUpload = (newLogoUrl: string) => {
    setCustomizer((prev) => {
      const updated = { ...prev, logoUrl: newLogoUrl };
      safeStorage.setItem('cpt_customizer', JSON.stringify(updated));
      handleSaveToDatabase({ customizer: updated });
      return updated;
    });
  };

  // If user is in Admin Panel view
  if (activePage === 'admin') {
    // If not authenticated, require Admin Login
    if (!adminToken) {
      return (
        <AdminLogin
          onLoginSuccess={(token) => {
            setAdminToken(token);
          }}
          onCancel={() => {
            setActivePage('home');
            safePushState(null, '', '/');
          }}
          logoUrl={customizer.logoUrl}
        />
      );
    }

    return (
      <AdminPanel
        setActivePage={(page) => {
          setActivePage(page);
          if (page !== 'admin') {
            safePushState(null, '', '/');
          }
        }}
        onViewProductDetail={(prod) => {
          setSelectedProduct(prod);
          setActivePage('product-detail');
          safePushState(null, '', `#/product/${prod.id}`);
          safeScrollTo(0, 0);
        }}
        customizer={customizer}
        setCustomizer={setCustomizer}
        products={products}
        setProducts={setProducts}
        services={services}
        setServices={setServices}
        projects={projects}
        setProjects={setProjects}
        clients={clients}
        setClients={setClients}
        quotes={quotes}
        setQuotes={setQuotes}
        pagesContent={pagesContent}
        setPagesContent={setPagesContent}
        onSaveToLocalStorage={handleSaveToLocalStorage}
        onSaveToDatabase={handleSaveToDatabase}
        dbVersion={dbVersion}
        lastUpdated={lastDatabaseUpdate}
        onRefreshDatabase={reloadDatabase}
        onLogout={() => {
          setAdminToken(null);
          safeStorage.removeItem('cpt_admin_auth_token');
          setActivePage('home');
          safePushState(null, '', '/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header with Brand Logos + Search + Admin Access */}
      <Header
        activePage={activePage}
        setActivePage={handleNavigate}
        customizer={customizer}
        onOpenQuoteModal={handleOpenQuoteModal}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onLogoUpload={handleLogoUpload}
      />

      {/* On subpages (not home), Navigation Bar sits right under Top Header */}
      {activePage !== 'home' && (
        <NavigationBar
          activePage={activePage}
          setActivePage={handleNavigate}
          onOpenQuoteModal={handleOpenQuoteModal}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          customizer={customizer}
        />
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            {/* Hero Banner with Auto-Slider, Chevron Arrows, and Uptime Data Center Background */}
            <Hero
              customizer={customizer}
              setActivePage={handleNavigate}
              onOpenQuoteModal={handleOpenQuoteModal}
              homeContent={pagesContent.home}
            />

            {/* Navigation Bar placed under the Banner and sticky on scroll */}
            <NavigationBar
              activePage={activePage}
              setActivePage={handleNavigate}
              onOpenQuoteModal={handleOpenQuoteModal}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              customizer={customizer}
            />

            <StatsCounter />
            <AboutSection
              setActivePage={handleNavigate}
              onOpenQuoteModal={() => handleOpenQuoteModal('General Engineering Consultation')}
              homeContent={pagesContent.home}
            />
            <DieselGeneratorSolutions
              onOpenQuoteModal={handleOpenQuoteModal}
              onExploreProducts={() => handleNavigate('products')}
              content={pagesContent.home}
            />
            <ServicesSection
              onOpenQuoteModal={handleOpenQuoteModal}
              services={services}
              content={pagesContent.services}
            />
            <ProductsSection
              onSelectProduct={handleSelectProduct}
              onOpenQuoteModal={handleOpenQuoteModal}
              products={products}
              content={pagesContent.products}
            />
            <WhyChooseUs />
            <ProjectsSection
              onSelectProject={handleSelectProject}
              onOpenQuoteModal={handleOpenQuoteModal}
              projects={projects}
              content={pagesContent.projects}
            />
            <ClientsSection clients={clients} content={pagesContent.clients} />
          </>
        )}

        {activePage === 'about' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-900 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                About Us
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {pagesContent.about.title}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                {pagesContent.about.subtitle}
              </p>
            </div>
            <AboutSection
              setActivePage={handleNavigate}
              onOpenQuoteModal={() => handleOpenQuoteModal('About Consultation')}
              homeContent={pagesContent.home}
            />
            <StatsCounter />
            <WhyChooseUs />
            <ClientsSection clients={clients} content={pagesContent.clients} />
          </>
        )}

        {activePage === 'md-message' && (
          <MdMessageSection content={pagesContent.mdMessage} />
        )}

        {activePage === 'ceo-message' && (
          <CeoMessageSection content={pagesContent.ceoMessage} />
        )}

        {activePage === 'products' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-950 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Equipment Catalog
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {pagesContent.products.title}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                {pagesContent.products.subtitle}
              </p>
            </div>
            <ProductsSection
              onSelectProduct={handleSelectProduct}
              onOpenQuoteModal={handleOpenQuoteModal}
              products={products}
              content={pagesContent.products}
            />
            <CalculatorModal onOpenQuoteModal={handleOpenQuoteModal} />
          </>
        )}

        {activePage === 'services' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-900 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Turnkey Engineering
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {pagesContent.services.title}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                {pagesContent.services.subtitle}
              </p>
            </div>
            <ServicesSection
              onOpenQuoteModal={handleOpenQuoteModal}
              services={services}
              content={pagesContent.services}
            />
            <WhyChooseUs />
            <ContactSection customizer={customizer} />
          </>
        )}

        {activePage === 'projects' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-900 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Project Case Studies
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {pagesContent.projects.title}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                {pagesContent.projects.subtitle}
              </p>
            </div>
            <ProjectsSection
              onSelectProject={handleSelectProject}
              onOpenQuoteModal={handleOpenQuoteModal}
              projects={projects}
              content={pagesContent.projects}
            />
            <ClientsSection clients={clients} content={pagesContent.clients} />
          </>
        )}

        {activePage === 'clients' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-950 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Trusted Partners
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {pagesContent.clients.title}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                {pagesContent.clients.subtitle}
              </p>
            </div>
            <ClientsSection clients={clients} content={pagesContent.clients} />
            <StatsCounter />
          </>
        )}

        {activePage === 'calculator' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-950 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Engineering Sizing Calculator
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">Generator Load Estimator</h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                Input your plant running kW and motor starting HP to calculate exact required generator capacity.
              </p>
            </div>
            <CalculatorModal onOpenQuoteModal={handleOpenQuoteModal} />
          </>
        )}

        {activePage === 'blog' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-950 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Power Engineering Insights
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">Technical Articles & Guides</h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                Best practices for industrial power generation, paralleling synchronization, and maintenance.
              </p>
            </div>
            <BlogSection />
          </>
        )}

        {activePage === 'contact' && (
          <>
            <div className="bg-gradient-to-b from-[#0A192F] to-slate-900 py-12 px-4 border-b border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Direct Engineering Desk
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
                {pagesContent.contact.title}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
                {pagesContent.contact.subtitle}
              </p>
            </div>
            <ContactSection customizer={customizer} />
          </>
        )}
      </main>

      {/* Footer with quick /admin link */}
      <Footer
        setActivePage={handleNavigate}
        customizer={customizer}
        onOpenQuoteModal={() => handleOpenQuoteModal('Footer Inquiry')}
      />

      {/* Interactive Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      )}

      {isQuoteModalOpen && (
        <QuoteModal
          initialSubject={quoteSubject}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}

      {/* Floating Real-time Live Chat Widget for Visitors */}
      <LiveChatWidget
        primaryColor={customizer.primaryColor}
        accentColor={customizer.accentColor}
      />
    </div>
  );
};

export default App;
