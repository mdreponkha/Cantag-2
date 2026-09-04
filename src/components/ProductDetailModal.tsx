import React, { useState } from 'react';
import { X, ArrowLeft, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Download, Send, Zap } from 'lucide-react';
import { ProductItem, GeneratorSpecRow } from '../types';
import { RICARDO_SPEC_ROWS } from '../data/generatorSpecsData';
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

  if (!product) return null;

  // Technical rows from product data or fallback to the 13 photo rows
  const specRows: GeneratorSpecRow[] = (product.specTableRows && product.specTableRows.length > 0)
    ? product.specTableRows
    : RICARDO_SPEC_ROWS;

  const catalogTitle = product.catalogSheetTitle || `${product.name} Technical Datasheet`;
  const catalogSubtitle = product.catalogSubtitle || 'ORIGIN: TURKEY / UK / CHINA • STANDBY & PRIME POWER • 50 HZ 1500 RPM 3-PHASE 400V/230V';
  const pageNumber = product.catalogPageNumber || 'Page-4';

  const openImage = product.openGenImageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80';
  const canopyImage = product.canopyGenImageUrl || product.imageUrl || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80';

  const selectedRow = specRows.find(r => r.id === selectedRowId);

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
              onClick={() => onOpenQuoteModal(`Quote for ${product.name}`)}
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

          {/* Product Photos Section: Dual Visuals (Open Skid & Soundproof Canopy) */}
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
              <div className="w-full h-48 sm:h-56 bg-slate-950/60 rounded-lg flex items-center justify-center p-2 overflow-hidden border border-slate-800">
                <img
                  src={openImage}
                  alt="Open Skid Generator"
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = teksanGenImg;
                  }}
                />
              </div>
            </div>

            {/* 2. Soundproof Weatherproof Canopy Type */}
            <div className="bg-[#0B1A33] border border-sky-900/80 rounded-xl p-3 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  2. Soundproof Weatherproof Canopy Type
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Acoustic Attenuated
                </span>
              </div>
              <div className="w-full h-48 sm:h-56 bg-slate-950/60 rounded-lg flex items-center justify-center p-2 overflow-hidden border border-slate-800">
                <img
                  src={canopyImage}
                  alt="Soundproof Canopy Generator"
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = teksanGenImg;
                  }}
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE EXACT TECHNICAL RATINGS TABLE MATCHING USER'S UPLOADED PHOTO (IMAGE) */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#009FE3] animate-pulse"></span>
                <h3 className="font-['Outfit'] font-black text-sm sm:text-base text-white tracking-wide">
                  TECHNICAL SPECIFICATION & LOAD RATINGS TABLE
                </h3>
              </div>
              <span className="text-[11px] text-sky-300 font-medium bg-sky-950/60 px-2.5 py-1 rounded border border-sky-800/80">
                Tip: Click on any model row to request an instant quotation
              </span>
            </div>

            {/* Exact Table Layout with Cyan/Blue Header #009FE3 matching photo */}
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
                  {specRows.map((row, idx) => {
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
                  })}
                </tbody>
              </table>
            </div>

            {selectedRow && (
              <div className="bg-amber-950/50 border border-amber-500/80 p-3 rounded-lg flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
                <div>
                  <span className="text-amber-400 font-bold text-xs uppercase block">Selected Generator Model:</span>
                  <p className="text-white text-sm font-black">
                    {selectedRow.model} — Standby: {selectedRow.standbyKva} ({selectedRow.standbyKw}) | Engine: {selectedRow.engineModel}
                  </p>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(`Direct Quotation for ${selectedRow.model} (${selectedRow.standbyKva})`)}
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Instant Price for This Model</span>
                </button>
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
    </div>
  );
};
