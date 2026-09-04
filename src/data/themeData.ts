import { ProductItem, ServiceItem, ProjectItem, ClientItem, BlogPost } from '../types';
import {
  RICARDO_SPEC_ROWS,
  GAS_GENSET_SPEC_ROWS,
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
    engineMakes: 'Lean-Burn High Efficiency Gas Engine',
    voltage: '400V / 230V, 50Hz, 3-Phase',
    soundLevel: '68 dBA @ 7 meters with Acoustic Enclosure',
    fuelType: 'Pipeline Natural Gas (CNG / LNG) & Biogas',
    description: 'High-efficiency continuous base-load natural gas and biogas generator systems designed for continuous operation in factories, reducing operating costs while adhering to environmental standards.',
    keyFeatures: [
      'Digital air-fuel ratio (AFR) controller for optimal combustion',
      'Cogeneration & Combined Heat and Power (CHP) ready',
      'Low gas pressure intake tolerance (2 kPa to 50 kPa)',
      'Extremely low emissions and reduced maintenance intervals'
    ],
    specs: {
      'Continuous Output': '50 kW – 2000 kW',
      'Electrical Efficiency': 'Up to 42.5%',
      'Gas Pressure': '2.0 – 50.0 kPa inlet pressure',
      'Methane Number': 'MN > 70',
      'Emissions': 'Low NOx Euro standard compliant'
    },
    imageBadge: 'Eco Clean • Base Load',
    popular: true,
    catalogSheetTitle: 'TEKSAN CONTINUOUS NATURAL GAS & BIOGAS GENERATOR SETS',
    catalogSubtitle: 'HIGH-EFFICIENCY LEAN-BURN COGENERATION • 50 HZ 1500 RPM 3-PHASE 400V',
    catalogPageNumber: 'Page-5',
    openGenImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    canopyGenImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    specTableRows: GAS_GENSET_SPEC_ROWS,
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '1 Year / 1500 Operating Hours Factory Warranty with Gas Valve Safety Certifications',
  },
  {
    id: 'mobile-lighting',
    name: 'TEKSAN Mobile Generators & Lighting Towers',
    category: 'mobile',
    categoryLabel: 'Mobile & Lighting',
    capacityRange: '20 kVA – 500 kVA / 4x1000W LED',
    engineMakes: 'Perkins / Cummins Road-Ready Series',
    voltage: '400V / 230V Dual Selector',
    soundLevel: '62 dBA @ 7 meters (Ultra Silent)',
    fuelType: 'Diesel',
    description: 'Road-towable trailer generators and hydraulic 9-meter LED lighting towers designed for emergency mobile response, highway construction, outdoor events, and temporary industrial power.',
    keyFeatures: [
      'Dual-axle torsion beam trailer with braking system and road lights',
      'Integrated high-capacity base fuel tank for 24-hr operation',
      'Hydraulic 360-degree rotating 9-meter mast with high-lumen LED floodlights',
      'Rapid plug-and-play cam-lock power cable connectors'
    ],
    specs: {
      'Mobility': 'Towing speed up to 80 km/h',
      'Lighting Height': '9.0 meters hydraulic extension',
      'Run Time': 'Up to 200 operating hours per tank',
      'Enclosure': 'Weatherproof & heavy-duty acoustic'
    },
    imageBadge: 'Rapid Mobile Deployment',
    catalogSheetTitle: 'MOBILE TRAILER GENERATORS & HYDRAULIC LIGHTING TOWERS',
    catalogSubtitle: 'HIGHWAY APPROVED DUAL-AXLE TRAILER • 9-METER HYDRAULIC ROTATING MAST',
    catalogPageNumber: 'Page-6',
    openGenImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    canopyGenImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    specTableRows: MOBILE_LIGHTING_SPEC_ROWS,
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '1 Year Turnkey Maintenance & Fast Trailer Spares Guarantee',
  },
  {
    id: 'synchronization-panels',
    name: 'Multi-Generator Auto Synchronization Panels',
    category: 'sync',
    categoryLabel: 'Power Automation',
    capacityRange: 'Up to 32 Generators Paralleling (50 MW+)',
    engineMakes: 'DeepSea DSE 8610 MKII / ComAp InteliGen',
    voltage: '400V / 690V / 11kV',
    soundLevel: 'N/A (Form 4 Enclosure)',
    fuelType: 'All fuel types',
    description: 'Custom engineered digital synchronization and power management switchboards providing automatic load-dependent start/stop, frequency matching, busbar dead-band sensing, and computerized load shedding for critical facilities.',
    keyFeatures: [
      'Touchscreen SCADA HMI with real-time power analytics',
      'Motorized ABB / Schneider Air Circuit Breakers (ACB)',
      'Auto-mains failure (AMF) with zero-break return to grid',
      'Load-dependent auto sequencing saving 12%+ fuel'
    ],
    specs: {
      'Paralleling': 'Up to 32 GenSets + 16 Utility Grid Mains',
      'Breakers': 'ABB Emax 2 / Schneider Masterpact',
      'Busbar': 'High-conductivity tin-plated copper',
      'Monitoring': 'Modbus TCP/IP, SNMP, 4G Cloud Telemetry'
    },
    imageBadge: 'Tier III & IV Data Center Grade',
    catalogSheetTitle: 'AUTOMATIC MULTI-GENERATOR PARALLELING & SYNCHRONIZATION PANELS',
    catalogSubtitle: 'SMART LOAD MANAGEMENT • MOTORIZED ACB • DEEPSEA 8610 / 8660 CONTROLLERS',
    catalogPageNumber: 'Page-7',
    openGenImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    canopyGenImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    specTableRows: SYNC_PANEL_SPEC_ROWS,
    standardAccessories: STANDARD_GENERATOR_ACCESSORIES,
    warrantyInfo: '2 Years Manufacturer Warranty & 24/7 Software Support',
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
