export type PageView = 'home' | 'about' | 'md-message' | 'ceo-message' | 'products' | 'services' | 'projects' | 'clients' | 'calculator' | 'contact' | 'blog' | 'admin' | 'product-detail';

export interface GeneratorSpecRow {
  id: string;
  model: string;          // e.g. "13KVA" or "GF-15KW / GFS-15KW"
  gensetRating?: string;  // e.g. "13KVA", "20KVA", etc.
  primeKva?: string;      // e.g. "13"
  primeKw?: string;       // e.g. "10.4"
  standbyKva: string;     // e.g. "14.3" or "20Kva"
  standbyKw: string;      // e.g. "11.44" or "15Kw"
  fuelCons: string;       // e.g. "2.8" or "3"
  currentA?: string;      // e.g. "27"
  frequencyHz?: string;   // e.g. "50"
  rpm?: string;           // e.g. "1500"
  cylinders?: string;     // e.g. "4"
  engineModel: string;    // e.g. "403D-15G" or "395AD / 2100D"
  alternatorModel?: string;// e.g. "STC-15"
  dimensionsMm?: string;  // e.g. "1330X620X960 / 1430X720X1000"
  dimensionsCm?: string;  // e.g. "115x56x117" (LxWxH)
  weightKg: string;       // e.g. "470" or "650 / 820"
  priceBdt?: string;      // e.g. "৳ 3,85,000" or "Call for Quote"
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'diesel' | 'gas' | 'biogas' | 'mobile' | 'lighting' | 'hybrid' | 'portable' | 'sync';
  categoryLabel: string;
  capacityRange: string;
  engineMakes: string;
  voltage: string;
  soundLevel: string;
  fuelType: string;
  description: string;
  keyFeatures: string[];
  specs: Record<string, string>;
  imageBadge: string;
  popular?: boolean;
  imageUrl?: string;
  // Full-page Catalog Datasheet Properties (matching user's uploaded photo)
  catalogSheetTitle?: string;
  catalogSubtitle?: string;
  catalogPageNumber?: string;
  openGenImageUrl?: string;
  canopyGenImageUrl?: string;
  catalogImageUrl?: string; // Direct link to uploaded catalog / technical datasheet photo
  specTableRows?: GeneratorSpecRow[];
  standardAccessories?: string[];
  warrantyInfo?: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  scope: string[];
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'Commercial' | 'Industrial' | 'Healthcare' | 'Real Estate' | 'Banking';
  location: string;
  capacity: string;
  year: string;
  description: string;
  highlights: string[];
  engineUsed: string;
  imageUrl?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  industry: string;
  location: string;
  capacityInstalled: string;
  solutionType: string;
  logoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
  tags: string[];
}

export interface HeroSlideItem {
  id: number | string;
  image: string;
  title: string;
  subtitle: string;
  tag?: string;
  ctaText?: string;
}

export interface ThemeCustomizerState {
  logoUrl?: string;
  groupLogoUrl?: string;
  initiativeLogoUrl?: string;
  primaryColor: string;
  accentColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  activeFont: string;
  suppliedUnits?: string;
  uptimeGuarantee?: string;
  completedProjects?: string;
}

export interface QuoteFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  capacity: string;
  fuel: string;
  serviceType: string;
  message: string;
  date?: string;
  status?: 'new' | 'contacted' | 'in-progress' | 'completed';
}

export interface PagesContentState {
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    heroBadge: string;
    aboutHeadline: string;
    aboutText: string;
    bannerImage?: string;
    heroImageUrl?: string;
    aboutImageUrl?: string;
    // Multi-slides
    heroSlides?: HeroSlideItem[];
    // Feature Purple Banner
    purpleBannerTitle?: string;
    purpleBannerSubtitle?: string;
    uptimeGuarantee?: string;
    projectsCompleted?: string;
    // About Section on Home
    aboutBadge?: string;
    aboutParagraph1?: string;
    aboutParagraph2?: string;
    aboutParagraph3?: string;
    // Diesel Generator Solutions Section on Home (Generation Section)
    generationTitle?: string;
    generationSubtitle?: string;
    generationImageUrl?: string;
    generationSeriesLabel?: string;
    generationCard1Title?: string;
    generationCard1Desc?: string;
    generationCard2Title?: string;
    generationCard2Desc?: string;
  };
  about: {
    title: string;
    subtitle: string;
    corpOverview: string;
    historyText: string;
    missionText: string;
    photoUrl?: string;
  };
  mdMessage: {
    name: string;
    designation: string;
    quote: string;
    paragraphs: string[];
    photoUrl?: string;
  };
  ceoMessage: {
    name: string;
    designation: string;
    quote: string;
    paragraphs: string[];
    photoUrl?: string;
  };
  products: {
    title: string;
    subtitle: string;
    bannerNotice: string;
    bannerImageUrl?: string;
  };
  services: {
    title: string;
    subtitle: string;
    dispatchNotice: string;
  };
  projects: {
    title: string;
    subtitle: string;
    bannerImageUrl?: string;
  };
  clients: {
    title: string;
    subtitle: string;
    bannerImageUrl?: string;
  };
  contact: {
    title: string;
    subtitle: string;
    officeAddress: string;
    hotline: string;
    emailDesk: string;
    businessHours: string;
    mapEmbedUrl?: string;
  };
}

export interface MetaPixelSettings {
  enabled: boolean;
  pixelId: string;
  conversionsApiToken: string;
  testEventCode: string;
  trackPageView: boolean;
  trackLead: boolean;
  trackContact: boolean;
  trackViewContent: boolean;
}

export interface PathaoCourierSettings {
  enabled: boolean;
  environment: 'sandbox' | 'production';
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  storeId: string;
  webhookUrl: string;
  autoCreateParcel: boolean;
  defaultItemType: string;
  senderCity: string;
  senderZone: string;
}

export interface SpeedOptimizationSettings {
  browserCaching: boolean;
  gzipCompression: boolean;
  webpAutoConvert: boolean;
  lazyLoadImages: boolean;
  minifyCssJs: boolean;
  criticalCssPreload: boolean;
  cdnCloudflare: boolean;
  dnsPrefetch: boolean;
  cacheTtlHours: number;
}

export interface ChatMessage {
  id: string;
  sender: 'visitor' | 'admin';
  name: string;
  phone?: string;
  email?: string;
  message: string;
  timestamp: string;
  unreadByAdmin?: boolean;
}

export interface DatabasePayload {
  customizer: ThemeCustomizerState;
  pagesContent: PagesContentState;
  products: ProductItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  clients: ClientItem[];
  quotes: QuoteFormData[];
  chatMessages: ChatMessage[];
  metaPixel?: MetaPixelSettings;
  pathao?: PathaoCourierSettings;
  speed?: SpeedOptimizationSettings;
  lastUpdated: string;
}
