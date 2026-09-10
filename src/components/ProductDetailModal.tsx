import React, { useState, useMemo } from 'react';
import { X, ArrowLeft, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Download, Send, Zap, Eye, ZoomIn, Search, BadgePercent, Tag } from 'lucide-react';
import { ProductItem, GeneratorSpecRow, DoosanPriceRow, CumminsPriceRow } from '../types';
import { RICARDO_SPEC_ROWS, PERKINS_STANDARD_SPEC_ROWS, DOOSAN_SPEC_ROWS, DOOSAN_PRICE_GUIDE_ROWS, CUMMINS_SPEC_ROWS, CUMMINS_PRICE_GUIDE_ROWS } from '../data/generatorSpecsData';
import teksanGenImg from '../assets/images/canstar_generator_install_1788331473828.jpg';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenQuoteModal: (productName: string) => void;
  hotlinePhone?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuoteModal,
  hotlinePhone = '01300-746860',
}) => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedPriceRowId, setSelectedPriceRowId] = useState<string | null>(null);
  const [activeTableTab, setActiveTableTab] = useState<'both' | 'ratings' | 'prices'>('both');
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!product) return null;

  // Technical rows: Check if this is Doosan Generator
  const isDoosan =
    product.id === 'mobile-lighting' ||
    product.id === 'doosan-generators' ||
    product.name.toLowerCase().includes('doosan') ||
    product.name.toLowerCase().includes('mobile') ||
    product.name.toLowerCase().includes('lighting') ||
    product.name.toLowerCase().includes('teksan mobile') ||
    (product.capacityRange && (product.capacityRange.includes('4x1000W') || product.capacityRange.includes('60 kVA – 1000 kVA') || product.capacityRange.includes('৬০ kVA'))) ||
    (product.description && (product.description.toLowerCase().includes('road-towable') || product.description.toLowerCase().includes('doosan'))) ||
    (product.specTableRows && product.specTableRows.some(r => r.engineModel?.toLowerCase().includes('db58') || r.model?.toLowerCase().includes('doosan'))) ||
    (product.priceTableRows && product.priceTableRows.some(r => r.engineModel?.toLowerCase().includes('db58') || r.engineModel?.toLowerCase().includes('dp222')));

  // Technical rows: Check if this is Cummins Generator
  const isCummins = !isDoosan && (
    product.id === 'synchronization-panels' ||
    product.id === 'cummins-generators' ||
    product.name.toLowerCase().includes('cummins') ||
    product.description?.toLowerCase().includes('cummins') ||
    (product.cumminsPriceTableRows && product.cumminsPriceTableRows.length > 0)
  );

  // Technical rows: ensure Gas, Perkins products display the 31-model load ratings table
  const isPerkinsOrGas = !isDoosan && !isCummins && (
    product.id === 'gas-generators' || 
    product.category === 'gas' ||
    product.name.toLowerCase().includes('gas') || 
    product.name.toLowerCase().includes('biogas') ||
    product.name.toLowerCase().includes('perkins')
  );

  const specRows: GeneratorSpecRow[] = isDoosan
    ? ((product.specTableRows && product.specTableRows.length > 0 && product.specTableRows.some(r => r.model?.toLowerCase().includes('doosan') || r.engineModel?.toLowerCase().includes('db58t')))
        ? product.specTableRows
        : DOOSAN_SPEC_ROWS)
    : isCummins
    ? ((product.specTableRows && product.specTableRows.length > 0 && product.specTableRows.some(r => r.model?.toLowerCase().includes('cummins') || r.engineModel?.toLowerCase().includes('4b') || r.engineModel?.toLowerCase().includes('6b')))
        ? product.specTableRows
        : CUMMINS_SPEC_ROWS)
    : isPerkinsOrGas
    ? PERKINS_STANDARD_SPEC_ROWS
    : (product.specTableRows && product.specTableRows.length > 0)
    ? product.specTableRows
    : PERKINS_STANDARD_SPEC_ROWS;

  const hasPriceTable = isDoosan || (product.priceTableRows && product.priceTableRows.length > 0);
  const priceRows: DoosanPriceRow[] = (product.priceTableRows && product.priceTableRows.length > 0)
    ? product.priceTableRows
    : (isDoosan ? DOOSAN_PRICE_GUIDE_ROWS : []);

  const hasCumminsPriceTable = isCummins || (product.cumminsPriceTableRows && product.cumminsPriceTableRows.length > 0);
  const cumminsPriceRows: CumminsPriceRow[] = (product.cumminsPriceTableRows && product.cumminsPriceTableRows.length > 0)
    ? product.cumminsPriceTableRows
    : (isCummins ? CUMMINS_PRICE_GUIDE_ROWS : []);

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return specRows;
    const q = searchQuery.toLowerCase().trim();
    return specRows.filter(r =>
      (r.gensetRating && r.gensetRating.toLowerCase().includes(q)) ||
      (r.model && r.model.toLowerCase().includes(q)) ||
      (r.engineModel && r.engineModel.toLowerCase().includes(q)) ||
      (r.primeKva && r.primeKva.toLowerCase().includes(q)) ||
      (r.standbyKva && r.standbyKva.toLowerCase().includes(q))
    );
  }, [specRows, searchQuery]);

  const filteredPriceRows = useMemo(() => {
    if (!searchQuery.trim()) return priceRows;
    const q = searchQuery.toLowerCase().trim();
    return priceRows.filter(r =>
      (r.capacity && r.capacity.toLowerCase().includes(q)) ||
      (r.engineModel && r.engineModel.toLowerCase().includes(q)) ||
      (r.priceRangeBdt && r.priceRangeBdt.toLowerCase().includes(q)) ||
      (r.kva && String(r.kva).includes(q))
    );
  }, [priceRows, searchQuery]);

  const filteredCumminsPriceRows = useMemo(() => {
    if (!searchQuery.trim()) return cumminsPriceRows;
    const q = searchQuery.toLowerCase().trim();
    return cumminsPriceRows.filter(r =>
      (r.capacity && r.capacity.toLowerCase().includes(q)) ||
      (r.bestSuitedFor && r.bestSuitedFor.toLowerCase().includes(q)) ||
      (r.priceRangeBdt && r.priceRangeBdt.toLowerCase().includes(q)) ||
      (r.engineModel && r.engineModel.toLowerCase().includes(q)) ||
      (r.kva && String(r.kva).includes(q))
    );
  }, [cumminsPriceRows, searchQuery]);

  const hasPrimeRatings = !isDoosan && !isCummins && specRows.some(r => !!r.primeKva || !!r.gensetRating);

  const doosanImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10';
  const cumminsImageUrl = 'https://cdn.ade-power.com/assets/img/generators/cummins/33kva-38kva-cummins-silent-diesel-generator-cummins-c33d5-c38d5.jpg';

  const catalogTitle = isDoosan
    ? 'Doosan generator'
    : isCummins
    ? 'Cummins diesel generator'
    : (product.catalogSheetTitle || `${product.name} Technical Datasheet`);

  const catalogSubtitle = isDoosan
    ? 'মডেল / টাইপ • প্রাইম ও স্ট্যান্ডবাই পাওয়ার • ইঞ্জিন মডেল • আনুমানিক মূল্য তালিকা (টাকায়)'
    : isCummins
    ? 'Capacity (kVA) • Best Suited For • Estimated Price Range (BDT) in Bangladesh'
    : (product.catalogSubtitle || (hasPrimeRatings
        ? 'ORIGIN: UK / EUROPE • 50 HZ 1500 RPM 3-PHASE 400V/230V • PRIME & STANDBY LOAD RATINGS'
        : 'ORIGIN: TURKEY / UK / CHINA • STANDBY & PRIME POWER • 50 HZ 1500 RPM 3-PHASE 400V/230V'));

  const pageNumber = isDoosan ? 'Page-3' : isCummins ? 'Page-4' : (product.catalogPageNumber || (hasPrimeRatings ? 'Page-1' : 'Page-4'));

  const openImage = isDoosan ? doosanImageUrl : isCummins ? cumminsImageUrl : (product.openGenImageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80');
  const canopyImage = isDoosan ? doosanImageUrl : isCummins ? cumminsImageUrl : (product.canopyGenImageUrl || product.imageUrl || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80');
  const customMainImage = product.imageUrl && product.imageUrl !== canopyImage && product.imageUrl !== openImage ? product.imageUrl : null;

  const selectedRow = specRows.find(r => r.id === selectedRowId);
  const selectedPriceRow = priceRows.find(r => r.id === selectedPriceRowId);
  const selectedCumminsPriceRow = cumminsPriceRows.find(r => r.id === selectedPriceRowId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#081325] border-2 border-sky-600/60 rounded-xl max-w-6xl w-full max-h-[96vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Top Control Bar with Back button and Close */}
        <div className="bg-[#0c1f3c] border-b border-sky-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-800 text-sky-200 border border-sky-700/60 text-xs font-bold transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-sky-500 text-slate-950">
              {pageNumber}
            </span>
            <span className="hidden md:inline-block text-xs text-sky-300 font-semibold truncate max-w-md">
              CAN STAR POWER TECH • ENGINEERING SPECIFICATIONS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal(`Quote for ${isDoosan ? 'Doosan generator' : product.name}`)}
              className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer shadow flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Quote</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/90 text-slate-300 hover:text-white hover:bg-red-600 transition cursor-pointer"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#091527]">
          
          {/* Catalog Title and Subtitle matching Brochure Header */}
          <div className="text-center bg-gradient-to-r from-slate-900 via-[#0D2447] to-slate-900 p-4 rounded-xl border border-sky-700/50 shadow-inner">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase block mb-1">
              CAN STAR POWER TECH ENGINEERING CATALOG
            </span>
            <h1 className="font-['Outfit'] font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wide uppercase">
              {catalogTitle}
            </h1>
            <p className="text-xs sm:text-sm text-sky-200/90 mt-1 tracking-wider font-semibold">
              {catalogSubtitle}
            </p>
          </div>

          {/* Product Photos Section */}
          <div className="space-y-3">
            {isDoosan ? (
              <div className="bg-[#0B1A33] border border-sky-800/80 rounded-xl p-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    Doosan Heavy-Duty Soundproof Canopy Generator (60 kVA – 1000 kVA / ৬০ kVA – ১০০০ kVA)
                  </span>
                  <span className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 font-bold">
                    Doosan Infracore (Korea)
                  </span>
                </div>
                <div
                  onClick={() => setExpandedImage(doosanImageUrl)}
                  className="w-full max-w-xl h-56 sm:h-64 bg-slate-950/70 rounded-lg flex items-center justify-center p-3 overflow-hidden border border-sky-900/60 cursor-pointer relative group"
                >
                  <img
                    src={doosanImageUrl}
                    alt="Doosan Generator"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = teksanGenImg;
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                    <ZoomIn className="w-4 h-4 text-amber-400" />
                    <span>Click to Zoom Image</span>
                  </div>
                </div>
                <p className="text-xs text-sky-200/90 mt-2.5 font-medium text-center">
                  Doosan Heavy-Duty Industrial Series with Weatherproof Acoustic Canopy &amp; Smart Digital Control Panel
                </p>
              </div>
            ) : isCummins ? (
              <div className="space-y-3">
                <div className="bg-[#0B1A33] border border-sky-800/80 rounded-xl p-4 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      Cummins Heavy-Duty Silent Diesel Generator (30 kVA – 1,000 kVA+)
                    </span>
                    <span className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 font-bold">
                      Cummins (USA / UK)
                    </span>
                  </div>
                  <div
                    onClick={() => setExpandedImage(cumminsImageUrl)}
                    className="w-full max-w-xl h-56 sm:h-64 bg-slate-950/70 rounded-lg flex items-center justify-center p-3 overflow-hidden border border-sky-900/60 cursor-pointer relative group"
                  >
                    <img
                      src={cumminsImageUrl}
                      alt="Cummins Silent Diesel Generator"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = teksanGenImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                      <ZoomIn className="w-4 h-4 text-emerald-400" />
                      <span>Click to Zoom Image</span>
                    </div>
                  </div>
                  <p className="text-xs text-sky-200/90 mt-2.5 font-medium text-center">
                    Cummins Heavy-Duty Silent Diesel Generator with Weatherproof Acoustic Enclosure &amp; AMF Auto-Start Controller
                  </p>
                </div>

                {/* User's exact introductory message */}
                <div className="bg-gradient-to-r from-sky-950/90 via-[#0B1A33] to-sky-950/90 border-l-4 border-emerald-500 rounded-r-xl p-3.5 sm:p-4 text-slate-100 shadow-md">
                  <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                    Cummins diesel generators come in various capacities for homes, offices, and factories. Below is a general capacity and estimated price chart in Bangladesh:
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Open Skid Type */}
                <div className="bg-[#0B1A33] border border-sky-900/80 rounded-xl p-3 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between mb-2 px-1">
                    <span className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      1. Open Skid Type Generator
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Industrial Base
                    </span>
                  </div>
                  <div
                    onClick={() => setExpandedImage(openImage)}
                    className="w-full h-48 sm:h-52 bg-slate-950/60 rounded-lg flex items-center justify-center p-2 overflow-hidden border border-slate-800 cursor-pointer relative group"
                  >
                    <img
                      src={openImage}
                      alt="Open Skid Generator"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = teksanGenImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-bold">
                      <ZoomIn className="w-4 h-4 text-sky-400" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>

                {/* 2. Soundproof Weatherproof Canopy Type */}
                <div className="bg-[#0B1A33] border border-sky-900/80 rounded-xl p-3 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between mb-2 px-1">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      2. Soundproof Canopy Type
                    </span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Acoustic Enclosure
                    </span>
                  </div>
                  <div
                    onClick={() => setExpandedImage(canopyImage)}
                    className="w-full h-48 sm:h-52 bg-slate-950/60 rounded-lg flex items-center justify-center p-2 overflow-hidden border border-slate-800 cursor-pointer relative group"
                  >
                    <img
                      src={canopyImage}
                      alt="Soundproof Canopy Generator"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = teksanGenImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-bold">
                      <ZoomIn className="w-4 h-4 text-amber-400" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* TECHNICAL RATINGS & PRICE GUIDE TABLES                                    */}
          {/* ========================================================================= */}
          <div className="space-y-4">
            {/* View Switcher Tabs (For Doosan, Cummins, or products with Price Table) */}
            {(hasPriceTable || hasCumminsPriceTable) && (
              <div className="bg-[#0B1A33] p-2 rounded-xl border border-sky-800/80 flex flex-wrap items-center justify-between gap-2 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider pl-1 hidden sm:inline">
                    তালিকা নির্বাচন:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveTableTab('both')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTableTab === 'both'
                          ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>📋 উভয় তালিকা দেখুন (All Tables)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTableTab('ratings')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTableTab === 'ratings'
                          ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
                      <span>⚡ পাওয়ার রেটিং ও স্পেক্স ({filteredRows.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTableTab('prices')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTableTab === 'prices'
                          ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <BadgePercent className="w-3.5 h-3.5 text-slate-950" />
                      <span>💰 {isCummins ? 'ক্যাপাসিটি ও মূল্য তালিকা' : 'আনুমানিক মূল্য তালিকা'} ({isCummins ? filteredCumminsPriceRows.length : filteredPriceRows.length})</span>
                    </button>
                  </div>
                </div>

                <span className="text-[11px] text-amber-300 bg-amber-950/70 border border-amber-800/80 px-2.5 py-1 rounded-md font-semibold">
                  {filteredRows.length} রেটিং + {isCummins ? filteredCumminsPriceRows.length : filteredPriceRows.length} মূল্য তালিকা
                </span>
              </div>
            )}

            {(activeTableTab === 'both' || activeTableTab === 'ratings') && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B1A33] p-2.5 rounded-lg border border-slate-700/60">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDoosan ? 'bg-amber-400' : isCummins ? 'bg-emerald-400' : hasPrimeRatings ? 'bg-emerald-400' : 'bg-[#009FE3]'}`}></span>
                <h3 className="font-['Outfit'] font-black text-sm sm:text-base text-white tracking-wide">
                  {isDoosan
                    ? 'DOOSAN GENERATOR RATINGS (100 kVA – 825 kVA)'
                    : isCummins
                    ? 'CUMMINS DIESEL GENERATOR SPECIFICATIONS (30 kVA – 1,000 kVA+)'
                    : hasPrimeRatings
                    ? `${product.name.toUpperCase()} RATINGS (13 kVA – 2000 kVA)`
                    : 'TECHNICAL SPECIFICATION & LOAD RATINGS'}
                </h3>
                <span className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 font-bold">
                  {filteredRows.length} Models
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search kVA or engine model..."
                    className="w-full bg-[#081325] border border-slate-700 text-slate-100 text-xs rounded-md pl-8 pr-7 py-1.5 focus:outline-none focus:border-emerald-500 placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>

                <span className={`hidden md:inline-block text-[11px] font-medium px-2.5 py-1 rounded border ${
                  isDoosan
                    ? 'text-amber-300 bg-amber-950/70 border-amber-800'
                    : hasPrimeRatings
                    ? 'text-emerald-300 bg-emerald-950/70 border-emerald-800'
                    : 'text-sky-300 bg-sky-950/60 border-sky-800/80'
                }`}>
                  Click row to select &amp; quote
                </span>
              </div>
            </div>

            {isDoosan ? (
              /* ========================================================================= */
              /* EXACT 4-COLUMN DOOSAN RATINGS TABLE MATCHING USER REQUEST */
              /* মডেল / টাইপ | প্রাইম পাওয়ার (Prime Power) | স্ট্যান্ডবাই পাওয়ার (Standby Power) | ইঞ্জিন মডেল (Doosan Engine) */
              /* ========================================================================= */
              <div className="overflow-x-auto rounded-lg border-2 border-sky-600 shadow-2xl bg-white text-slate-900">
                <table className="w-full text-center border-collapse text-xs sm:text-sm font-sans min-w-[720px]">
                  <thead className="bg-[#0b2545] text-white font-black select-none">
                    <tr className="border-b border-sky-600 text-xs uppercase tracking-wide">
                      <th className="py-3 px-3.5 border-r border-sky-700 text-left font-black min-w-[150px] bg-[#071d37]">
                        মডেল / টাইপ
                      </th>
                      <th className="py-3 px-3.5 border-r border-sky-700 text-center font-black min-w-[170px] bg-[#0d2e57]">
                        প্রাইম পাওয়ার (Prime Power)
                      </th>
                      <th className="py-3 px-3.5 border-r border-sky-700 text-center font-black min-w-[170px] bg-[#0d2e57]">
                        স্ট্যান্ডবাই পাওয়ার (Standby Power)
                      </th>
                      <th className="py-3 px-3.5 border-r border-sky-700 text-center font-black min-w-[150px] bg-[#071d37]">
                        ইঞ্জিন মডেল (Doosan Engine)
                      </th>
                      <th className="py-3 px-3 text-center font-black min-w-[110px] bg-[#05162a]">
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 text-slate-900 font-medium">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                          No Doosan model matching "{searchQuery}". Try searching 100 kVA or DB58T.
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row, idx) => {
                        const isSelected = selectedRowId === row.id;
                        const isEven = idx % 2 === 0;
                        const primeText = row.primeKva && row.primeKw 
                          ? `${row.primeKva} / ${row.primeKw}` 
                          : row.primeKva || row.standbyKva;
                        const standbyText = row.standbyKva && row.standbyKw 
                          ? `${row.standbyKva} / ${row.standbyKw}` 
                          : row.standbyKva;

                        return (
                          <tr
                            key={row.id || idx}
                            onClick={() => setSelectedRowId(isSelected ? null : row.id)}
                            className={`transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-amber-100 font-bold'
                                : isEven
                                ? 'bg-white hover:bg-sky-50'
                                : 'bg-slate-50 hover:bg-sky-50'
                            }`}
                          >
                            {/* মডেল / টাইপ */}
                            <td className="py-3 px-3.5 border-r border-slate-300 font-black text-slate-950 text-left whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 font-bold text-sky-950">
                                <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                                {row.model || row.gensetRating}
                              </span>
                            </td>

                            {/* প্রাইম পাওয়ার (Prime Power) */}
                            <td className="py-3 px-3.5 border-r border-slate-300 font-bold text-emerald-800 text-center whitespace-nowrap">
                              {primeText}
                            </td>

                            {/* স্ট্যান্ডবাই পাওয়ার (Standby Power) */}
                            <td className="py-3 px-3.5 border-r border-slate-300 font-bold text-blue-800 text-center whitespace-nowrap">
                              {standbyText}
                            </td>

                            {/* ইঞ্জিন মডেল (Doosan Engine) */}
                            <td className="py-3 px-3.5 border-r border-slate-300 font-black font-mono text-slate-900 text-center whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded bg-slate-200 border border-slate-300 text-xs font-mono font-bold text-slate-900">
                                {row.engineModel}
                              </span>
                            </td>

                            {/* Action */}
                            <td className="py-3 px-3 text-center bg-sky-50/50 whitespace-nowrap">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenQuoteModal(`Quote for ${row.model} (Engine: ${row.engineModel} - Prime: ${primeText}, Standby: ${standbyText})`);
                                }}
                                className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow cursor-pointer"
                              >
                                Get Quote
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            ) : hasPrimeRatings ? (
              <div className="overflow-x-auto rounded-lg border-2 border-emerald-700 shadow-2xl bg-white text-slate-900">
                <table className="w-full text-center border-collapse text-[11px] sm:text-xs font-sans min-w-[860px]">
                  <thead className="bg-[#05442b] text-white font-black uppercase select-none">
                    <tr className="border-b border-emerald-600">
                      <th rowSpan={2} className="py-2.5 px-3 border-r border-emerald-700 text-center font-black min-w-[90px] bg-[#043d26]">
                        GENSET<br />Rating
                      </th>
                      <th colSpan={2} className="py-1 px-2 border-r border-emerald-700 text-center font-black bg-[#055335]">
                        Prime
                      </th>
                      <th colSpan={2} className="py-1 px-2 border-r border-emerald-700 text-center font-black bg-[#055335]">
                        Standby
                      </th>
                      <th rowSpan={2} className="py-2.5 px-3 border-r border-emerald-700 text-center font-black min-w-[120px] bg-[#043d26]">
                        Engine Model
                      </th>
                      <th rowSpan={2} className="py-2.5 px-3 border-r border-emerald-700 text-center font-black min-w-[125px] bg-[#043d26]">
                        Open Set (L×W×H) cm
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 border-r border-emerald-700 text-center font-black min-w-[80px] bg-[#043d26]">
                        Open Set (Kgs)
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 border-r border-emerald-700 text-center font-black min-w-[95px] bg-[#043d26]">
                        Fuel Cons.<br />@ 75% (L/H)
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 text-center font-black bg-[#033320] min-w-[85px]">
                        Action
                      </th>
                    </tr>
                    <tr className="border-b border-emerald-700 bg-[#065f3d]">
                      <th className="py-1 px-2 border-r border-emerald-700 text-center font-black min-w-[55px]">
                        KVA
                      </th>
                      <th className="py-1 px-2 border-r border-emerald-700 text-center font-black min-w-[55px]">
                        KW
                      </th>
                      <th className="py-1 px-2 border-r border-emerald-700 text-center font-black min-w-[55px]">
                        KVA
                      </th>
                      <th className="py-1 px-2 border-r border-emerald-700 text-center font-black min-w-[55px]">
                        KW
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-300 text-slate-900 font-medium">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-slate-500 text-xs">
                          No generator model matching "{searchQuery}". Try searching for another kVA (e.g. 100KVA) or engine model.
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row, idx) => {
                        const isSelected = selectedRowId === row.id;
                        const isEven = idx % 2 === 0;

                      return (
                        <tr
                          key={row.id || idx}
                          onClick={() => setSelectedRowId(isSelected ? null : row.id)}
                          className={`transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 font-bold'
                              : isEven
                              ? 'bg-white hover:bg-emerald-50/70'
                              : 'bg-slate-50 hover:bg-emerald-50/70'
                          }`}
                        >
                          {/* GENSET Rating */}
                          <td className="py-2 px-2 border-r border-slate-300 font-black text-slate-950 whitespace-nowrap">
                            {row.gensetRating || row.model}
                          </td>

                          {/* Prime KVA */}
                          <td className="py-2 px-2 border-r border-slate-300 font-bold text-emerald-800">
                            {row.primeKva || row.standbyKva}
                          </td>

                          {/* Prime KW */}
                          <td className="py-2 px-2 border-r border-slate-300 font-bold text-slate-800">
                            {row.primeKw || row.standbyKw}
                          </td>

                          {/* Standby KVA */}
                          <td className="py-2 px-2 border-r border-slate-300 font-bold text-blue-700">
                            {row.standbyKva}
                          </td>

                          {/* Standby KW */}
                          <td className="py-2 px-2 border-r border-slate-300 font-bold text-slate-800">
                            {row.standbyKw}
                          </td>

                          {/* Engine Model */}
                          <td className="py-2 px-2.5 border-r border-slate-300 font-bold font-mono text-slate-950 whitespace-nowrap">
                            {row.engineModel}
                          </td>

                          {/* Open Set (L×W×H) cm */}
                          <td className="py-2 px-2.5 border-r border-slate-300 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                            {row.dimensionsCm || row.dimensionsMm}
                          </td>

                          {/* Open Set (Kgs) */}
                          <td className="py-2 px-2 border-r border-slate-300 font-bold text-slate-900">
                            {row.weightKg}
                          </td>

                          {/* Fuel Cons @ 75% (L/H) */}
                          <td className="py-2 px-2 border-r border-slate-300 font-bold text-amber-800">
                            {row.fuelCons}
                          </td>

                          {/* Action */}
                          <td className="py-2 px-2 bg-emerald-50/40">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenQuoteModal(`Quote for ${row.gensetRating || row.model} (Engine: ${row.engineModel} - Prime ${row.primeKva || row.standbyKva} kVA)`);
                              }}
                              className="px-2.5 py-1 rounded bg-[#055335] hover:bg-[#033d26] text-white text-[10px] font-bold transition shadow cursor-pointer whitespace-nowrap"
                            >
                              Get Quote
                            </button>
                          </td>
                        </tr>
                      );
                    }))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Exact Table Layout with Cyan/Blue Header #009FE3 matching photo */
              <div className="overflow-x-auto rounded-lg border-2 border-[#009FE3]/70 shadow-2xl bg-white text-slate-900">
                <table className="w-full text-center border-collapse text-[11px] sm:text-xs font-sans min-w-[950px]">
                  {/* Header matching exact 2-tier design from photo */}
                  <thead className="bg-[#009FE3] text-white font-black uppercase select-none">
                    <tr className="border-b border-sky-400">
                      <th rowSpan={2} className="py-2.5 px-2 border-r border-sky-300 text-center font-black min-w-[110px]">
                        Model
                      </th>
                      <th colSpan={2} className="py-1 px-2 border-r border-sky-300 text-center font-black">
                        Stand by
                      </th>
                      <th rowSpan={2} className="py-2.5 px-1.5 border-r border-sky-300 text-center font-black min-w-[55px]">
                        Fuel<br />Cons.
                      </th>
                      <th rowSpan={2} className="py-2.5 px-1.5 border-r border-sky-300 text-center font-black min-w-[60px]">
                        Current<br />(A)
                      </th>
                      <th rowSpan={2} className="py-2.5 px-1 border-r border-sky-300 text-center font-black min-w-[45px]">
                        Frq.<br />(Hz)
                      </th>
                      <th rowSpan={2} className="py-2.5 px-1 border-r border-sky-300 text-center font-black min-w-[48px]">
                        RPM
                      </th>
                      <th rowSpan={2} className="py-2.5 px-1 border-r border-sky-300 text-center font-black min-w-[42px]">
                        CYL
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 border-r border-sky-300 text-center font-black min-w-[85px]">
                        Engine<br />Model
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 border-r border-sky-300 text-center font-black min-w-[85px]">
                        Alternator<br />Model
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 border-r border-sky-300 text-center font-black min-w-[130px]">
                        Dimension<br />(LXWXH)<br />MM
                      </th>
                      <th rowSpan={2} className="py-2.5 px-1.5 border-r border-sky-300 text-center font-black min-w-[65px]">
                        Weight<br />(Kg)
                      </th>
                      <th rowSpan={2} className="py-2.5 px-2 text-center font-black bg-[#0087c2] min-w-[95px]">
                        Action
                      </th>
                    </tr>
                    <tr className="border-b border-sky-300 bg-[#008ecb]">
                      <th className="py-1 px-1.5 border-r border-sky-300 text-center font-black min-w-[65px]">
                        (Kva)
                      </th>
                      <th className="py-1 px-1.5 border-r border-sky-300 text-center font-black min-w-[60px]">
                        (Kw)
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body with Rows matching user's photo */}
                  <tbody className="divide-y divide-slate-300 text-slate-900 font-medium">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-slate-500 text-xs">
                          No generator model matching "{searchQuery}".
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row, idx) => {
                        const isSelected = selectedRowId === row.id;
                        const isEven = idx % 2 === 0;

                      // Render lines split if contains slash (e.g. Model GF-15KW / GFS-15KW)
                      const modelLines = row.model.split('/').map(s => s.trim());
                      const dimLines = row.dimensionsMm.split('/').map(s => s.trim());
                      const weightLines = row.weightKg.split('/').map(s => s.trim());
                      const engineLines = row.engineModel.split('/').map(s => s.trim());

                      return (
                        <tr
                          key={row.id || idx}
                          onClick={() => setSelectedRowId(isSelected ? null : row.id)}
                          className={`transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 font-bold'
                              : isEven
                              ? 'bg-white hover:bg-sky-50'
                              : 'bg-slate-50 hover:bg-sky-50'
                          }`}
                        >
                          {/* Model */}
                          <td className="py-2 px-1.5 border-r border-slate-300 font-bold text-slate-950">
                            {modelLines.map((m, mi) => (
                              <div key={mi} className={mi > 0 ? 'text-slate-800' : ''}>{m}</div>
                            ))}
                          </td>

                          {/* Standby Kva */}
                          <td className="py-2 px-1 border-r border-slate-300 font-bold text-blue-700">
                            {row.standbyKva}
                          </td>

                          {/* Standby Kw */}
                          <td className="py-2 px-1 border-r border-slate-300 font-bold text-slate-800">
                            {row.standbyKw}
                          </td>

                          {/* Fuel Cons */}
                          <td className="py-2 px-1 border-r border-slate-300">
                            {row.fuelCons}
                          </td>

                          {/* Current (A) */}
                          <td className="py-2 px-1 border-r border-slate-300">
                            {row.currentA}
                          </td>

                          {/* Frq (Hz) */}
                          <td className="py-2 px-1 border-r border-slate-300">
                            {row.frequencyHz || '50'}
                          </td>

                          {/* RPM */}
                          <td className="py-2 px-1 border-r border-slate-300">
                            {row.rpm || '1500'}
                          </td>

                          {/* CYL */}
                          <td className="py-2 px-1 border-r border-slate-300">
                            {row.cylinders}
                          </td>

                          {/* Engine Model */}
                          <td className="py-2 px-1.5 border-r border-slate-300 font-semibold">
                            {engineLines.map((eng, ei) => (
                              <div key={ei}>{eng}</div>
                            ))}
                          </td>

                          {/* Alternator Model */}
                          <td className="py-2 px-1.5 border-r border-slate-300 font-semibold text-slate-700">
                            {row.alternatorModel}
                          </td>

                          {/* Dimension */}
                          <td className="py-2 px-1.5 border-r border-slate-300 font-mono text-[10px] leading-tight text-slate-700">
                            {dimLines.map((dim, di) => (
                              <div key={di}>{dim}</div>
                            ))}
                          </td>

                          {/* Weight (Kg) */}
                          <td className="py-2 px-1 border-r border-slate-300 font-semibold">
                            {weightLines.map((w, wi) => (
                              <div key={wi}>{w}</div>
                            ))}
                          </td>

                          {/* Action / Quote */}
                          <td className="py-2 px-1.5 bg-sky-50/50">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenQuoteModal(`Quote for ${row.model} (${row.standbyKva} / ${row.standbyKw})`);
                              }}
                              className="px-2.5 py-1 rounded bg-[#009FE3] hover:bg-[#0082ba] text-white text-[10px] font-bold transition shadow cursor-pointer whitespace-nowrap"
                            >
                              {row.priceBdt || 'Get Quote'}
                            </button>
                          </td>
                        </tr>
                      );
                    }))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedRow && (
              <div className="bg-[#0B1A33] border-2 border-emerald-500/80 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block">Selected Generator Model:</span>
                    {selectedRow.priceBdt && (
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {selectedRow.priceBdt}
                      </span>
                    )}
                  </div>
                  <p className="text-white text-sm sm:text-base font-black">
                    {selectedRow.gensetRating || selectedRow.model} {selectedRow.model && selectedRow.model !== selectedRow.gensetRating ? `• ${selectedRow.model}` : ''}
                  </p>
                  <p className="text-xs text-slate-300">
                    {selectedRow.primeKva ? `Prime: ${selectedRow.primeKva} kVA (${selectedRow.primeKw} kW) • Standby: ${selectedRow.standbyKva} kVA (${selectedRow.standbyKw} kW)` : `Standby: ${selectedRow.standbyKva} (${selectedRow.standbyKw})`}
                    {selectedRow.engineModel ? ` • Engine: ${selectedRow.engineModel}` : ''}
                    {selectedRow.fuelCons ? ` • Fuel: ${selectedRow.fuelCons} L/H @ 75%` : ''}
                    {selectedRow.dimensionsCm ? ` • Size: ${selectedRow.dimensionsCm} cm` : ''}
                    {selectedRow.weightKg ? ` • Weight: ${selectedRow.weightKg} Kg` : ''}
                  </p>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(`Direct Quotation for ${selectedRow.gensetRating || selectedRow.model} (${selectedRow.engineModel})`)}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Official Quote</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* DOOSAN GENERATOR ESTIMATED PRICE GUIDE TABLE                             */}
        {/* ক্যাপাসিটি (Capacity in kVA) | ইঞ্জিনের মডেল (Doosan Engine) | আনুমানিক মূল্য (টাকায়) */}
        {/* ========================================================================= */}
        {(activeTableTab === 'both' || activeTableTab === 'prices') && hasPriceTable && !isCummins && (
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#0d2a4a] via-[#091e36] to-[#0d2a4a] p-3 rounded-xl border border-amber-500/50 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
                <div>
                  <h3 className="font-['Outfit'] font-black text-sm sm:text-base text-amber-300 tracking-wide flex items-center gap-2">
                    <span>DOOSAN GENERATOR PRICE GUIDE IN BANGLADESH (মূল্য তালিকা)</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                    ক্যাপাসিটি (Capacity in kVA) • ইঞ্জিনের মডেল (Doosan Engine) • আনুমানিক মূল্য (টাকায়)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-200 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/80 font-bold">
                  {filteredPriceRows.length} টি মডেল ও রেঞ্জ
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border-2 border-amber-500/70 shadow-2xl bg-white text-slate-900">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-sans min-w-[700px]">
                <thead className="bg-[#1e293b] text-white font-black select-none">
                  <tr className="border-b border-amber-500/60 text-xs uppercase tracking-wide">
                    <th className="py-3 px-4 border-r border-slate-700 text-left font-black min-w-[180px] bg-[#0f172a]">
                      ক্যাপাসিটি (Capacity in kVA)
                    </th>
                    <th className="py-3 px-4 border-r border-slate-700 text-center font-black min-w-[160px] bg-[#1e293b]">
                      ইঞ্জিনের মডেল (Doosan Engine)
                    </th>
                    <th className="py-3 px-4 border-r border-slate-700 text-center font-black min-w-[210px] bg-[#0f172a]">
                      আনুমানিক মূল্য (টাকায়)
                    </th>
                    <th className="py-3 px-3 text-center font-black min-w-[110px] bg-[#1e293b]">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 text-slate-900 font-medium">
                  {filteredPriceRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 text-xs">
                        কোন মডেল পাওয়া যায়নি "{searchQuery}"। যেমন: ৬০ kVA, ১২০ kVA, DB58 বা DP158LC সার্চ করুন।
                      </td>
                    </tr>
                  ) : (
                    filteredPriceRows.map((row, idx) => {
                      const isSelected = selectedPriceRowId === row.id;
                      const isEven = idx % 2 === 0;

                      return (
                        <tr
                          key={row.id || idx}
                          onClick={() => setSelectedPriceRowId(isSelected ? null : row.id)}
                          className={`transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 font-bold'
                              : isEven
                              ? 'bg-white hover:bg-amber-50/70'
                              : 'bg-slate-50 hover:bg-amber-50/70'
                          }`}
                        >
                          {/* ক্যাপাসিটি (Capacity in kVA) */}
                          <td className="py-3 px-4 border-r border-slate-300 font-black text-slate-950 text-left whitespace-nowrap">
                            <span className="inline-flex items-center gap-2 font-bold text-slate-900">
                              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                              <span className="text-sm">{row.capacity}</span>
                            </span>
                          </td>

                          {/* ইঞ্জিনের মডেল (Doosan Engine) */}
                          <td className="py-3 px-4 border-r border-slate-300 font-mono text-center whitespace-nowrap">
                            <span className="px-3 py-1 rounded bg-slate-200 border border-slate-300 text-xs font-mono font-black text-slate-900">
                              {row.engineModel}
                            </span>
                          </td>

                          {/* আনুমানিক মূল্য (টাকায়) */}
                          <td className="py-3 px-4 border-r border-slate-300 font-black text-center whitespace-nowrap">
                            <span className="inline-block px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs sm:text-sm">
                              {row.priceRangeBdt}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-3 px-3 text-center bg-amber-50/50 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenQuoteModal(`Quotation for Doosan ${row.capacity} (Engine: ${row.engineModel}) - Estimated Price: ${row.priceRangeBdt}`);
                              }}
                              className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow cursor-pointer"
                            >
                              কোটেশন নিন
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Note below price table */}
            <div className="bg-[#0b172a] border border-amber-500/40 rounded-lg p-3.5 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
              <span className="text-amber-400 font-bold shrink-0 text-base leading-none">⚠️</span>
              <p>
                <strong className="text-white">মূল্য সংক্রান্ত বিশেষ দ্রষ্টব্য:</strong> উপরোক্ত মূল্য তালিকাটি আনুমানিক ও প্রাক্কলিত বাজেট তৈরির জন্য নির্দেশক। গ্রাহকের চাহিদা অনুযায়ী ওপেন সেট (Open Skid) অথবা সাউন্ডপ্রুফ ক্যানোপি (Soundproof Canopy), কন্ট্রোলার মডেল (DSE AMF/Sync), এটিএস প্যানেল ও অন-সাইট ইন্সটলেশন শর্তের ওপর ভিত্তি করে চূড়ান্ত অফার নির্ধারিত হয়। অফিসিয়াল ডিসকাউন্টেড কোটেশনের জন্য <strong>কোটেশন নিন</strong> বাটনে ক্লিক করুন অথবা হটলাইনে যোগাযোগ করুন: <strong className="text-white">{hotlinePhone}</strong>।
              </p>
            </div>

            {/* Selected Price Row Banner */}
            {selectedPriceRow && (
              <div className="bg-[#0B1A33] border-2 border-amber-500 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">নির্বাচিত মডেল ও আনুমানিক বাজেট:</span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {selectedPriceRow.priceRangeBdt}
                    </span>
                  </div>
                  <p className="text-white text-sm sm:text-base font-black">
                    Doosan {selectedPriceRow.capacity} • ইঞ্জিন মডেল: {selectedPriceRow.engineModel}
                  </p>
                  <p className="text-xs text-slate-300">
                    জেনুইন কোরিয়ান ডুসান ইঞ্জিন সমৃদ্ধ হেভি ডিউটি ইন্ডাস্ট্রিয়াল জেনারেটর সেট
                  </p>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(`Official Proposal for Doosan ${selectedPriceRow.capacity} (${selectedPriceRow.engineModel}) - Budget ${selectedPriceRow.priceRangeBdt}`)}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>অফিসিয়াল কোটেশন রিকোয়েস্ট করুন</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CUMMINS DIESEL GENERATOR ESTIMATED PRICE CHART IN BANGLADESH               */}
        {/* Capacity (kVA) | Best Suited For | Estimated Price Range (BDT) | Action    */}
        {/* ========================================================================= */}
        {(activeTableTab === 'both' || activeTableTab === 'prices') && hasCumminsPriceTable && (
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#0d2a4a] via-[#091e36] to-[#0d2a4a] p-3 rounded-xl border border-emerald-500/50 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <div>
                  <h3 className="font-['Outfit'] font-black text-sm sm:text-base text-emerald-300 tracking-wide flex items-center gap-2">
                    <span>CUMMINS DIESEL GENERATOR — ESTIMATED PRICE CHART IN BANGLADESH</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                    Cummins diesel generators come in various capacities for homes, offices, and factories.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-200 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/80 font-bold">
                  {filteredCumminsPriceRows.length} Capacities
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border-2 border-emerald-500/70 shadow-2xl bg-white text-slate-900">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-sans min-w-[700px]">
                <thead className="bg-[#1e293b] text-white font-black select-none">
                  <tr className="border-b border-emerald-500/60 text-xs uppercase tracking-wide">
                    <th className="py-3 px-4 border-r border-slate-700 text-left font-black min-w-[170px] bg-[#0f172a]">
                      Capacity (kVA)
                    </th>
                    <th className="py-3 px-4 border-r border-slate-700 text-left font-black min-w-[260px] bg-[#1e293b]">
                      Best Suited For
                    </th>
                    <th className="py-3 px-4 border-r border-slate-700 text-center font-black min-w-[210px] bg-[#0f172a]">
                      Estimated Price Range (BDT)
                    </th>
                    <th className="py-3 px-3 text-center font-black min-w-[110px] bg-[#1e293b]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 text-slate-900 font-medium">
                  {filteredCumminsPriceRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 text-xs">
                        No capacity found for "{searchQuery}". Try searching 30 kVA, 60 kVA, 100 kVA or 500 kVA.
                      </td>
                    </tr>
                  ) : (
                    filteredCumminsPriceRows.map((row, idx) => {
                      const isSelected = selectedPriceRowId === row.id;
                      const isEven = idx % 2 === 0;

                      return (
                        <tr
                          key={row.id || idx}
                          onClick={() => setSelectedPriceRowId(isSelected ? null : row.id)}
                          className={`transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-100 font-bold'
                              : isEven
                              ? 'bg-white hover:bg-emerald-50/70'
                              : 'bg-slate-50 hover:bg-emerald-50/70'
                          }`}
                        >
                          {/* Capacity (kVA) */}
                          <td className="py-3 px-4 border-r border-slate-300 font-black text-slate-950 text-left whitespace-nowrap">
                            <span className="inline-flex items-center gap-2 font-bold text-slate-900">
                              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
                              <span className="text-sm font-black">{row.capacity}</span>
                            </span>
                          </td>

                          {/* Best Suited For */}
                          <td className="py-3 px-4 border-r border-slate-300 text-left text-slate-800 font-semibold">
                            {row.bestSuitedFor}
                          </td>

                          {/* Estimated Price Range (BDT) */}
                          <td className="py-3 px-4 border-r border-slate-300 font-black text-center whitespace-nowrap">
                            <span className="inline-block px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs sm:text-sm">
                              {row.priceRangeBdt}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-3 px-3 text-center bg-emerald-50/50 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenQuoteModal(`Quotation for Cummins ${row.capacity} (${row.bestSuitedFor}) - Estimated Price: ${row.priceRangeBdt}`);
                              }}
                              className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow cursor-pointer"
                            >
                              কোটেশন নিন
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Note below Cummins price table */}
            <div className="bg-[#0b172a] border border-emerald-500/40 rounded-lg p-3.5 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold shrink-0 text-base leading-none">ℹ️</span>
              <p>
                <strong className="text-white">Note on Price &amp; Customization:</strong> The above price table is indicative and estimated for general budgeting purposes in Bangladesh. Final turnkey pricing depends on canopy configuration (Open skid vs Super Silent Soundproof Canopy), alternator choice (Stamford / Leroy Somer), ATS switchgear, delivery location, and installation requirements. For official discounted quotation, click <strong>কোটেশন নিন</strong> or call our hotline: <strong className="text-white">{hotlinePhone}</strong>.
              </p>
            </div>

            {/* Selected Cummins Price Row Banner */}
            {selectedCumminsPriceRow && (
              <div className="bg-[#0B1A33] border-2 border-emerald-500 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block">Selected Capacity &amp; Estimated Budget:</span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {selectedCumminsPriceRow.priceRangeBdt}
                    </span>
                  </div>
                  <p className="text-white text-sm sm:text-base font-black">
                    Cummins {selectedCumminsPriceRow.capacity} • {selectedCumminsPriceRow.bestSuitedFor}
                  </p>
                  <p className="text-xs text-slate-300">
                    Genuine Cummins heavy-duty industrial diesel generator with soundproof acoustic enclosure
                  </p>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(`Official Proposal for Cummins ${selectedCumminsPriceRow.capacity} (${selectedCumminsPriceRow.bestSuitedFor}) - Budget ${selectedCumminsPriceRow.priceRangeBdt}`)}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Official Quotation</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

          {/* Standard Included Accessories & Engineering Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#0B1A33] border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Standard Factory Scope of Supply
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  Heavy-duty steel base frame with vibration anti-vibration mountings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  DeepSea (DSE 6120 / 7320) digital AMF automatic start/stop control panel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  Dry-type air filter, spin-on fuel filter, and full-flow oil filter
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  Maintenance-free lead acid battery with cables, rack & charger
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  Residential grade industrial exhaust silencer with flexible bellows
                </li>
              </ul>
            </div>

            <div className="bg-[#0B1A33] border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Warranty & Turnkey After-Sales Service
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {product.warrantyInfo || '1 Year / 1000 Operating Hours Comprehensive Warranty with nationwide technical support, original spare parts, and 24/7 rapid breakdown response.'}
              </p>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">24/7 Engineering Hotline:</span>
                  <span className="text-xs font-black text-emerald-400">{hotlinePhone}</span>
                </div>
                <a
                  href={`tel:${hotlinePhone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="bg-[#0c1f3c] border-t border-sky-800/80 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
          >
            ← Close & Return
          </button>

          <div className="flex items-center gap-2">
            <a
              href="/canstar-power-tech.zip"
              download
              className="px-4 py-2 rounded-lg bg-sky-900/60 hover:bg-sky-800 text-sky-200 border border-sky-700/60 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Download Datasheet PDF</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal(`Detailed Quote for ${product.name}`)}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Price Quotation</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for High-Resolution Image Preview */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-400 flex items-center gap-1.5 text-xs font-bold bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700"
            >
              <X className="w-4 h-4" />
              <span>Close Preview (ESC / Click)</span>
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              referrerPolicy="no-referrer"
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl border border-sky-600/40"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
