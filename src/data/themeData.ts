import { ProductItem, ServiceItem, ProjectItem, ClientItem, BlogPost } from '../types';
import {
  RICARDO_SPEC_ROWS,
  PERKINS_STANDARD_SPEC_ROWS,
  GAS_GENSET_SPEC_ROWS,
  DOOSAN_SPEC_ROWS,
  DOOSAN_PRICE_GUIDE_ROWS,
  CUMMINS_PRICE_GUIDE_ROWS,
  CUMMINS_SPEC_ROWS,
  MOBILE_LIGHTING_SPEC_ROWS,
  SYNC_PANEL_SPEC_ROWS,
  STANDARD_GENERATOR_ACCESSORIES,
} from './generatorSpecsData';

export const KPOWER_INFO = {
  name: 'Can Star Power Tech',
  companyTagline: 'Power Engineering & Turnkey Generator Solutions',
  groupName: 'Initiative Group',
  dealerFor: 'TEKSAN GENERATOR (Turkey)',
  dealerBrands: 'PERKINS (UK, USA), CUMMINS (USA/UK/China), HYUNDAI (Korea), BAUDOUIN',
  phone: '01300-746860',
  emergencyPhone: '01300-746860',
  email: 'info@canstarpowertech.com',
  address: '102/1, Fakirapoool (2nd Floor), Safayet Ullah Lane, Motijheel, Dhaka-1000, Dhaka, Bangladesh',
  suppliedUnits: '1200+ Units in Bangladesh',
  uptimeGuarantee: '99.9%',
  completedProjects: '1000+',
};

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'diesel-generators',
    name: 'TEKSAN Heavy-Duty Diesel Generators',
    category: 'diesel',
    categoryLabel: 'Diesel Generators',
    capacityRange: '10 kVA – 3500 kVA',
    engineMakes: 'PERKINS (UK/USA) / CUMMINS (USA/UK/China) / HYUNDAI (Korea)',
    voltage: '400V / 230V, 50Hz, 3-Phase 4-Wire',
    soundLevel: '65 – 70 dBA @ 7 meters (Acoustic Soundproof Canopy)',
    fuelType: 'High-Grade Diesel (ISO 8217)',
    description: 'High-performance diesel generators for continuous and standby power applications. Originating from Turkey, TEKSAN generators are engineered with world-renowned Perkins, Cummins, and Hyundai engines coupled with Stamford/Leroy-Somer alternators for uninterrupted, heavy-duty industrial power.',
    keyFeatures: [
      'Genuine Perkins / Cummins / Hyundai OEM engines',
      'Galvanized steel sound-attenuated acoustic canopy with electrostatic powder coating',
      'DeepSea (DSE 7320 / 8610) Digital Smart Controller with remote monitoring',
      'Tier III & Tier IV Data Center Uptime Institute compliant sets',
      'Integrated Automatic Transfer Switch (ATS) & synchronization interface'
    ],
    specs: {
      'Prime Power': '10 kVA – 3150 kVA',
      'Standby Power': '11 kVA – 3500 kVA',
      'Engine Brands': 'Perkins (UK), Cummins (USA), Hyundai (Korea)',
      'Engine RPM': '1500 RPM (50Hz)',
      'Aspiration': 'Turbocharged & Air-to-Air Aftercooled',
      'Alternator': 'Brushless, IP23, Class H insulation',
      'Cooling': 'Heavy-duty 50°C tropical radiator',
      'Origin': 'TEKSAN GENERATOR (Turkey)'
    },
    imageBadge: 'Authorized Dealer • 1200+ Units in BD',
    popular: true,
    catalogSheetTitle: 'RICARDO & TEKSAN HEAVY-DUTY DIESEL DRIVEN GENERATOR',
    catalogSubtitle: 'ORIGIN: TURKEY / UK / CHINA • STANDBY & PRIME POWER • 50 HZ 1500 RPM 3-PHASE 400V/230V',
    catalogPageNumber: 'Page-4',
    openGenImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    canopyGenImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    specTableRows: RICARDO_SPEC_ROWS,
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '1 Year / 1000 Operating Hours Comprehensive Warranty with 24/7 Rapid Response Breakdown Dispatch',
  },
  {
    id: 'gas-generators',
    name: 'TEKSAN Natural Gas & Biogas GenSets',
    category: 'gas',
    categoryLabel: 'Natural & Biogas',
    capacityRange: '50 kW – 2000 kW',
    engineMakes: 'Genuine Perkins / Teksan High-Efficiency Industrial Series',
    voltage: '400V / 230V, 50Hz, 3-Phase 4-Wire',
    soundLevel: '65 – 70 dBA @ 7 meters (Weatherproof Soundproof Canopy)',
    fuelType: 'Pipeline Natural Gas (CNG / LNG) & Industrial Diesel',
    description: 'High-efficiency continuous base-load natural gas and biogas generator systems designed for continuous operation in factories, reducing operating costs while adhering to environmental standards.',
    keyFeatures: [
      '31 standard engineering models spanning 13 kVA to 2000 kVA with verified load ratings',
      'Continuous base-load and standby ratings compliant with industrial factory standards',
      'Dual supply format: Open Skid Frame or Acoustic Attenuated Weatherproof Soundproof Canopy',
      'DeepSea (DSE 7320 / 8610) Digital Smart Controller with Auto Mains Failure (AMF) & remote telemetry',
      'Optimized fuel consumption at 75% load with heavy-duty 50°C tropical cooling radiator'
    ],
    specs: {
      'Capacity Range': '50 kW – 2000 kW (13 kVA – 2000 kVA)',
      'Prime Power': '13 kVA – 2000 kVA (10.4 kW – 1600 kW)',
      'Standby Power': '14.3 kVA – 2200 kVA (11.44 kW – 1760 kW)',
      'Engine Brands': 'Perkins / Teksan Heavy-Duty Series (400, 1100, 1300, 2000, 4000)',
      'Engine RPM': '1500 RPM (50Hz, 3-Phase)',
      'Aspiration': 'Naturally Aspirated / Turbocharged / Air-to-Air Aftercooled',
      'Alternator': 'Brushless Pure Copper, IP23, Class H insulation',
      'Cooling': 'Heavy-duty 50°C tropical radiator with pusher fan',
      'Warranty': '1 Year / 1000 Operating Hours with 24/7 Rapid Response'
    },
    imageBadge: '50 kW – 2000 kW • Base Load',
    popular: true,
    catalogSheetTitle: 'TEKSAN NATURAL GAS & BIOGAS GENSETS — TECHNICAL SPECIFICATIONS',
    catalogSubtitle: 'ENGINEERING RATINGS TABLE (13 kVA – 2000 kVA) • 50 HZ 1500 RPM 3-PHASE 400V/230V',
    catalogPageNumber: 'Page-1',
    catalogImageUrl: '/datasheet_catalog_photo.svg',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    openGenImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    canopyGenImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    specTableRows: PERKINS_STANDARD_SPEC_ROWS,
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '1 Year / 1000 Operating Hours Comprehensive Factory Warranty with 24/7 Rapid Response Breakdown Dispatch Across Bangladesh',
  },
  {
    id: 'mobile-lighting',
    name: 'Doosan generator',
    category: 'diesel',
    categoryLabel: 'Doosan Series',
    capacityRange: '60 kVA – 1000 kVA (৬০ kVA – ১০০০ kVA)',
    engineMakes: 'Genuine Doosan Infracore Diesel Engine (South Korea)',
    voltage: '400V / 230V, 50Hz, 3-Phase 4-Wire',
    soundLevel: '68 – 72 dBA @ 7 meters (Heavy-Duty Acoustic Canopy)',
    fuelType: 'Diesel',
    description: 'Doosan Heavy-Duty Industrial Diesel Generator systems (60 kVA – 1000 kVA / ৬০ kVA – ১০০০ kVA) powered by genuine Korean Doosan engines (DB58, D1146, DP086, P126, DP158, DP180, DP222), designed for continuous prime and standby operations in industrial factories, healthcare, and infrastructure projects.',
    keyFeatures: [
      'Genuine Doosan Infracore heavy-duty diesel engines (DB58, D1146, DP086TA, DP086LA, P126TI, DP126LB, DP158LC, DP180LA, DP222LB, DP222LC)',
      'Complete Estimated Price List (৬০ kVA – ১০০০ kVA) in Bangladeshi Taka (BDT) with transparent budgeting',
      'Digital smart AMF auto start/stop controller with complete engine & electrical protections',
      'Heavy-duty weatherproof & acoustic attenuated soundproof canopy with anti-vibration mounts'
    ],
    specs: {
      'Capacity Range': '60 kVA – 1000 kVA (50 kW – 800 kW)',
      'Engine Origin': 'Doosan Infracore (South Korea)',
      'Price Range': '৳ ৪,৫০,০০০ – ৬০,০০,০০০ (মডেল ভেদে আনুমানিক)',
      'Aspiration': 'Turbocharged & Intercooled Heavy-Duty',
      'Alternator': 'Brushless Class H, 100% Copper, IP23',
      'Cooling System': 'Heavy-duty 50°C tropical radiator with pusher fan',
      'Warranty': '1 Year / 1000 Operating Hours with 24/7 Rapid Technical Support'
    },
    imageBadge: '60 kVA – 1000 kVA • Doosan Korea',
    catalogSheetTitle: 'DOOSAN GENERATOR — TECHNICAL SPECIFICATIONS & PRICE GUIDE',
    catalogSubtitle: 'মডেল / টাইপ • প্রাইম ও স্ট্যান্ডবাই পাওয়ার • Doosan ইঞ্জিন মডেল • আনুমানিক মূল্য তালিকা (টাকায়)',
    catalogPageNumber: 'Page-3',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10',
    openGenImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10',
    canopyGenImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10',
    catalogImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10',
    specTableRows: DOOSAN_SPEC_ROWS,
    priceTableRows: DOOSAN_PRICE_GUIDE_ROWS,
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '1 Year Turnkey Comprehensive Maintenance & Fast Technical Support Across Bangladesh',
  },
  {
    id: 'synchronization-panels',
    name: 'Cummins Diesel Generator',
    category: 'diesel',
    categoryLabel: 'Cummins Series',
    capacityRange: '30 kVA – 1,000 kVA+ (৩০ kVA – ১০০০+ kVA)',
    engineMakes: 'Genuine Cummins Heavy-Duty Diesel Engine (USA / UK / India / China)',
    voltage: '400V / 230V, 50Hz, 3-Phase 4-Wire',
    soundLevel: '68 – 72 dBA @ 7 meters (Heavy-Duty Acoustic Canopy)',
    fuelType: 'Diesel',
    description: 'Cummins diesel generators come in various capacities for homes, offices, and factories. Below is a general capacity and estimated price chart in Bangladesh with genuine Cummins engines and soundproof acoustic canopies.',
    imageUrl: 'https://cdn.ade-power.com/assets/img/generators/cummins/33kva-38kva-cummins-silent-diesel-generator-cummins-c33d5-c38d5.jpg',
    openGenImageUrl: 'https://cdn.ade-power.com/assets/img/generators/cummins/33kva-38kva-cummins-silent-diesel-generator-cummins-c33d5-c38d5.jpg',
    canopyGenImageUrl: 'https://cdn.ade-power.com/assets/img/generators/cummins/33kva-38kva-cummins-silent-diesel-generator-cummins-c33d5-c38d5.jpg',
    catalogImageUrl: 'https://cdn.ade-power.com/assets/img/generators/cummins/33kva-38kva-cummins-silent-diesel-generator-cummins-c33d5-c38d5.jpg',
    imageBadge: '30 kVA – 1,000 kVA+ • Cummins',
    catalogSheetTitle: 'Cummins diesel generator',
    catalogSubtitle: 'Capacity (kVA) • Best Suited For • Estimated Price Range (BDT) in Bangladesh',
    catalogPageNumber: 'Page-4',
    specTableRows: CUMMINS_SPEC_ROWS,
    cumminsPriceTableRows: CUMMINS_PRICE_GUIDE_ROWS,
    keyFeatures: [
      'Cummins diesel generators come in various capacities for homes, offices, and factories.',
      'General capacity and estimated price chart in Bangladesh (30 kVA to 1,000 kVA+)',
      'Genuine Cummins heavy-duty industrial diesel engines (4B3.9, 4BT, 6BT, NTA855, KTA19, KTA38)',
      'Heavy-duty soundproof acoustic weather-resistant silent canopy with digital AMF controller'
    ],
    specs: {
      'Capacity Range': '30 kVA – 1,000 kVA+',
      'Engine Series': 'Cummins 4B, 4BT, 6BT, NTA855, KTA19, KTA38',
      'Enclosure': 'Super Silent Weatherproof Canopy',
      'Origin': 'USA / UK / India / China'
    },
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '1 Year Comprehensive Warranty & Turnkey Maintenance Across Bangladesh',
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'emergency-support',
    icon: '📞',
    title: '24/7 Emergency Support',
    tagline: 'Round-the-clock technical support and emergency repair services',
    description: 'Round-the-clock technical support and emergency repair services with rapid response times across Bangladesh to keep critical operations running smoothly.',
    scope: [
      'Dedicated 24/7 helpline with direct engineer access (01300-746860)',
      'Rapid deployment of mobile service vans stocked with spare parts',
      'Immediate troubleshooting for controllers, AVR, fuel system, and starter motors',
      'Emergency temporary mobile generator backup dispatch'
    ],
    deliverables: [
      'Rapid response time across industrial zones in Dhaka, Gazipur, Narayanganj, and Chattogram',
      'Direct contact with certified factory technicians',
      'Emergency restoration protocols'
    ]
  },
  {
    id: 'preventive-maintenance',
    icon: '⚙️',
    title: 'Preventive Maintenance',
    tagline: 'Scheduled maintenance programs to extend equipment lifespan',
    description: 'Scheduled maintenance programs designed to ensure optimal performance, prevent unexpected breakdowns, and extend the lifespan of your power equipment.',
    scope: [
      'Routine service intervals at 250, 500, and 1000 operating hours',
      'Oil, fuel, and air filter replacements using genuine OEM parts',
      'Coolant condition testing, battery conductance and alternator insulation check',
      'Electronic governor and valve lash calibration'
    ],
    deliverables: [
      'Comprehensive 50-point diagnostic inspection sheet',
      'Fluid and filter replacement certifications',
      'Extended warranty coverage and priority response'
    ]
  },
  {
    id: 'professional-installation',
    icon: '🛠️',
    title: 'Professional Installation',
    tagline: 'Expert installation services by certified engineers',
    description: 'Expert installation services by certified engineers with comprehensive site assessment, civil foundation verification, acoustic ventilation, and complete grid setup.',
    scope: [
      'Site load survey, sizing calculation, and foundation vibration analysis',
      'Exhaust thermal insulation and acoustic residential silencer installation',
      'Bulk fuel storage piping, day tanks, and automatic transfer pumps',
      'Electrical busbar connection, earth pit testing, and ATS synchronization'
    ],
    deliverables: [
      'Turnkey Mechanical & Electrical Commissioning Certificate',
      'Full Load Bank Witness Test on-site',
      'Operator and plant technician training'
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'bashundhara-golf',
    title: 'Bashundhara Golf Course',
    client: 'Bashundhara Group',
    category: 'Commercial',
    location: 'Bashundhara R/A, Dhaka-1229',
    capacity: '2x900 kVA Gen. set with synchronization.',
    year: '2024',
    description: 'Turnkey installation of 2 x 900 kVA synchronized diesel generator sets with soundproof canopy providing uninterrupted power for golf course floodlights, clubhouse, and critical facilities.',
    highlights: [
      '2x900 kVA Gen. set with auto-synchronization',
      'Acoustic soundproof canopy for quiet leisure environment',
      'Underground bulk fuel management system',
      '24/7 remote monitoring link'
    ],
    engineUsed: 'Perkins Industrial Engine with Stamford Alternator'
  },
  {
    id: 'united-group',
    title: 'United Group',
    client: 'United Group',
    category: 'Commercial',
    location: 'Airport Village & Madani Ave, Dhaka 1212',
    capacity: 'Airport village 3x1400 kVA Gen. set with synchronization.',
    year: '2023',
    description: 'Supply, installation, and commissioning of 3 x 1400 kVA (4200 kVA Total) synchronized diesel power generation plant for United Group Airport Village development.',
    highlights: [
      '3x1400 kVA Gen. set with auto-synchronization',
      'DeepSea digital paralleling load sharing control',
      'Zero-interruption critical facility backup',
      'Complete mechanical and civil ventilation setup'
    ],
    engineUsed: 'Perkins / Cummins Heavy Power Plant'
  },
  {
    id: 'rupayan-group',
    title: 'Rupayan Group',
    client: 'Rupayan Group',
    category: 'Real Estate',
    location: 'Dhaka, Bangladesh',
    capacity: '1x800 kVA Gen. set with synchronization.',
    year: '2024',
    description: 'Installation of 1 x 800 kVA synchronized silent diesel generator set for Rupayan commercial and residential tower complex with basement acoustic treatment.',
    highlights: [
      '1x800 kVA Gen. set with synchronization',
      'Low emission and acoustic sound attenuation',
      'Automatic transfer switch (ATS) with elevator rescue sequencing',
      'Comprehensive preventive maintenance contract'
    ],
    engineUsed: 'Cummins Diesel Engine'
  },
  {
    id: 'hameem-group',
    title: 'Hameem Group',
    client: 'Ha-Meem Group',
    category: 'Industrial',
    location: '387 (South), Tejgaon Industrial Area, Dhaka-1208',
    capacity: '4x1400 kVA Gen. set with synchronization.',
    year: '2023',
    description: 'Heavy industrial power generation facility powering textile, spinning, and garment manufacturing plants with load-dependent automatic sequencing.',
    highlights: [
      '4x1400 kVA Gen. set with synchronization',
      'Continuous 24/7 prime industrial power',
      'High fuel efficiency and low downtime',
      'Resident Can Star Power Tech engineering maintenance support'
    ],
    engineUsed: 'TEKSAN Industrial Heavy Series'
  },
  {
    id: 'fb-footware',
    title: 'FB Foot Ware Ltd.',
    client: 'FB Foot Ware Ltd.',
    category: 'Industrial',
    location: 'Wolusura, Kaliakor, Gazipur',
    capacity: '1250 kVA Industrial Silent Generator Setup',
    year: '2023',
    description: 'Turnkey industrial electrical grid interface and generator setup to power automated manufacturing lines and machinery without voltage fluctuations.',
    highlights: [
      'High inductive load handling for heavy machinery',
      'Soundproof weather-resistant canopy',
      'Automated fuel transfer system'
    ],
    engineUsed: 'Perkins Industrial Engine'
  },
  {
    id: 'madina-group',
    title: 'Madina Group',
    client: 'Madina Group',
    category: 'Commercial',
    location: 'Green Road, Dhaka',
    capacity: '1000 kVA Prime Power Generation',
    year: '2023',
    description: 'Reliable continuous backup power for corporate headquarters and commercial logistics centers with automatic mains failure switchgear.',
    highlights: [
      'Seamless auto-changeover within 8 seconds',
      'Digital monitoring and fuel telemetry',
      'Full turnkey mechanical execution'
    ],
    engineUsed: 'Cummins Heavy Duty Engine'
  }
];

export const TRUSTED_CLIENTS_TABLE: { sl: number; name: string; address: string }[] = [
  { sl: 1, name: 'Bashundhara Golf Course', address: 'Bashundhara R/A, Dhaka-1229' },
  { sl: 2, name: 'United Group', address: 'Madani Ave, Dhaka 1212' },
  { sl: 3, name: 'Hameem Group', address: 'Ha-Meem Group 387 (South), Tejgaon Industrial Area Dhaka-1208, Bangladesh' },
  { sl: 4, name: 'Rupayan Group', address: 'Dhaka, Bangladesh' },
  { sl: 5, name: 'FB Foot Ware Ltd.', address: 'Wolusura, Kaliakor, Gazipur' },
  { sl: 6, name: 'Madina Group', address: 'Green Road, Dhaka' },
  { sl: 7, name: 'TED Bernhardtz Textiles Ltd.', address: 'Tongi, Gazipur' },
  { sl: 8, name: 'Rupsha Tyre & Chemical Ltd.', address: '233, Khaspara, Sonargaon, Narayanganj' },
  { sl: 9, name: 'Libas Textile Ltd.', address: 'Nichintopur, Mouchak, Gazipur' },
  { sl: 10, name: 'S2L Fashion Ltd.', address: 'Gazipur, Bangladesh' },
  { sl: 11, name: 'Eastport Ltd.', address: 'Cumilla EPZ, Cumilla' },
  { sl: 12, name: 'CBC Tiles Ltd.', address: 'Poribagh, Dhaka' },
  { sl: 13, name: 'AWR', address: 'Gulshan, Dhaka' },
  { sl: 14, name: 'Panwin Design', address: 'Bagherbazar, Gazipur' },
  { sl: 15, name: 'Index Agro Ind. Feed Mills Ltd.', address: 'Kathali, Valuka, Mymensingh' },
  { sl: 16, name: 'F. K Textile', address: 'Baghata, Silmandi, Narsingdi' },
  { sl: 17, name: 'Rawtech Limited', address: 'Bashundhara, Dhaka' },
  { sl: 18, name: 'Birds Group', address: '113 Baipal, Ashulia, Savar' },
  { sl: 19, name: 'Glory Ceramics Ltd.', address: 'Saidpur, Nilphamary' },
  { sl: 20, name: 'Excellent Ceramics Ltd.', address: 'Valuka, Mymensingh' },
  { sl: 21, name: 'Hatim Group', address: 'Ariabo, Rupshi, Narayanganj' },
  { sl: 22, name: 'Momen Real Estate', address: "Bari Momen's Heights, Plot -157 Rd 12, Banani, Dhaka-1213" },
  { sl: 23, name: 'Eastern Housing Ltd.', address: 'Kemal Ataturk Avenue, Banani, Dhaka-1213' },
  { sl: 24, name: 'Aakash Development', address: 'House 36 Rd No 13, Banani, Dhaka-1213' },
  { sl: 25, name: 'Mir Real Estate', address: 'House # B-147, Road # 22, Mohakhali DOHS, Dhaka 1206' },
  { sl: 26, name: 'Nassa Holdings Ltd.', address: 'Awal center, 34 Kemal Ataturk Ave, Banani, Dhaka-1213' },
  { sl: 27, name: 'Sunmar Properties', address: 'Anik Tower, 220/B Bir Uttam Mir Shawkat Sarak, Mohakhali, Dhaka-1208' },
  { sl: 28, name: 'Kunjo Chaya Developers', address: 'RS Kunjo, 20 Gareeb-E-Nawaz Avenue, Sector # 13, Uttara, Dhaka - 1230' },
  { sl: 29, name: 'UCB', address: 'Bulus Centre, Plot - CWS- (A)-1, Road No - 34, Gulshan Ave, Dhaka-1212' },
  { sl: 30, name: 'Brac Bank', address: 'Anik Tower, 220/B Bir Uttam Mir Shawkat Sarak, Mohakhali, Dhaka-1208' },
  { sl: 31, name: 'One Bank', address: 'HRC Bhaban, 46, Kawran Bazar C/A, Dhaka-1215' },
  { sl: 32, name: 'Al Arafah Islami Bank', address: 'Al-Arafah Tower, 63, Purana Paltan, Dhaka-1000' },
  { sl: 33, name: 'Modhumoti Bank', address: 'Khandker Tower, (Level-7 & 8), 94, Gulshan Avenue, Gulshan-1, Dhaka-1212' },
  { sl: 34, name: 'NRB Global Bank', address: 'Saiham Tower, Gulshan Model Town, Dhaka-1212' },
];

export const CLIENTS_DATA: ClientItem[] = TRUSTED_CLIENTS_TABLE.map((c, i) => ({
  id: `client-${c.sl}`,
  name: c.name,
  industry: c.name.includes('Bank') ? 'Banking & Financial' : c.name.includes('Textile') || c.name.includes('Fashion') || c.name.includes('Group') ? 'Industrial & RMG' : 'Commercial & Real Estate',
  location: c.address,
  capacityInstalled: `${400 + (i * 90) % 2800} kVA`,
  solutionType: 'Turnkey Diesel GenSet & Synchronization'
}));

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'teksan-diesel-generators-bangladesh',
    title: 'Why TEKSAN Diesel Generators are the Preferred Choice for Bangladesh Industries',
    category: 'Generator Technology',
    date: 'August 2024',
    readTime: '5 min read',
    author: 'Can Star Power Tech Technical Advisory Team',
    summary: 'Discover how TEKSAN generators powered by Perkins, Cummins, and Hyundai engines deliver uninterrupted power with Uptime Institute Tier III & IV compliance.',
    content: [
      'TEKSAN Generator, originating in Turkey and represented exclusively by Can Star Power Tech in Bangladesh, has delivered more than 1,200 generator units across industrial zones.',
      'Coupled with world-class alternators and DeepSea smart synchronizing controllers, TEKSAN sets ensure 99.9% uptime for textile spinning mills, healthcare facilities, and data centers.',
      'Our dedicated nationwide team of certified engineers provides 24/7 expeditious after-sales technical support and genuine spare parts availability.'
    ],
    tags: ['TEKSAN Generator', 'Diesel Generators', 'Can Star Power Tech', 'Perkins', 'Cummins']
  },
  {
    id: 'multi-generator-synchronization',
    title: 'Benefits of Generator Synchronization in Large Industrial Complexes',
    category: 'System Architecture',
    date: 'July 2024',
    readTime: '6 min read',
    author: 'Engr. Can Star Power Tech Engineering Division',
    summary: 'How paralleling multiple generator sets achieves automatic load-dependent sharing, saves fuel by over 12%, and eliminates total facility blackouts.',
    content: [
      'Running a single oversized generator at low load leads to severe fuel waste and exhaust wet-stacking.',
      'By synchronizing multiple generators (e.g. 2x900 kVA or 3x1400 kVA as installed at Bashundhara and United Group), generators start and stop automatically based on actual power demand.',
      'This guarantees N+1 redundancy, easier scheduled maintenance without plant shutdowns, and significant long-term fuel savings.'
    ],
    tags: ['Synchronization', 'Fuel Efficiency', 'Industrial Power', 'Load Sharing']
  },
  {
    id: 'motor-starting-sizing',
    title: 'How to Correctly Size Industrial Generators for High Inductive Motor Starting',
    category: 'Engineering Guide',
    date: 'August 24, 2024',
    readTime: '6 min read',
    author: 'Engr. Tariqul Islam, Lead Electrical Engineer',
    summary: 'Direct-on-line (DOL) and Star-Delta motor starts draw 3x to 6x normal running current. Learn how to prevent excessive voltage dip and alternator overheating with proper sizing methodology.',
    content: [
      'One of the most frequent reasons for generator trips during industrial startup is the sudden inrush current demanded by large induction motors powering compressors, chillers, and hydraulic pumps.',
      'A standard generator alternator can sustain approximately 300% short-circuit current for 10 seconds if equipped with Permanent Magnet Generator (PMG) excitation. However, voltage dip must be kept under 15% to prevent motor control contactors from dropping out.',
      'Best practice is to apply Soft Starters or Variable Frequency Drives (VFDs) where possible, or size the alternator kVA rating by calculating total locked-rotor kVA (LRKVA) plus existing running loads.'
    ],
    tags: ['Generator Sizing', 'Motor Starting', 'Electrical Engineering', 'PMG Alternators']
  }
];
