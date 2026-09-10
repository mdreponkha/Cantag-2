import React, { useState } from 'react';
import { Eye, Check, Shield, FileText, ArrowRight } from 'lucide-react';
import { ProductItem, PagesContentState } from '../types';
import { PRODUCTS_DATA } from '../data/themeData';
import teksanGenImg from '../assets/images/canstar_generator_install_1788331473828.jpg';

interface ProductsSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenQuoteModal: (productName?: string) => void;
  products?: ProductItem[];
  content?: PagesContentState['products'];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProduct,
  onOpenQuoteModal,
  products = [],
  content,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'diesel' | 'gas' | 'sync' | 'mobile'>('diesel');

  const allProducts = products && products.length > 0 ? products : PRODUCTS_DATA;

  // Find product dynamically from state if available
  const findCatProd = (cat: string, fallbackIdx: number) => {
    return allProducts.find(p => p.category === cat) || allProducts[fallbackIdx] || allProducts[0];
  };

  const dieselProd = findCatProd('diesel', 0);
  const gasProd = findCatProd('gas', 1);
  const syncProd = allProducts.find(p => p.id === 'synchronization-panels' || p.category === 'sync' || p.name?.toLowerCase().includes('cummins') || p.name?.toLowerCase().includes('sync')) || allProducts[3];
  const mobileProd = allProducts.find(p => p.id === 'mobile-lighting' || p.category === 'mobile' || p.name?.toLowerCase().includes('doosan') || p.name?.toLowerCase().includes('mobile') || p.name?.toLowerCase().includes('lighting') || p.capacityRange?.includes('4x1000W')) || allProducts[2];

  const productsByCategory = {
    diesel: {
      title: dieselProd?.name || 'Diesel Generators',
      subtitle: dieselProd?.description || 'High-performance diesel generators for continuous and standby power applications.',
      image: dieselProd?.imageUrl || 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp',
      capacity: dieselProd?.capacityRange || '10 kVA – 3500 kVA',
      productData: dieselProd,
      features: (dieselProd?.keyFeatures || (dieselProd as any)?.features) && (dieselProd?.keyFeatures || (dieselProd as any)?.features).length > 0 ? (dieselProd?.keyFeatures || (dieselProd as any)?.features) : [
        'Perkins, Cummins, Hyundai & Baudouin engine configurations',
        'Heavy-duty soundproof acoustic weather-resistant canopy',
        'Automatic transfer switch (ATS) and AMF smart controller compatibility',
        'Uptime Institute Tier III & Tier IV data center certified reliability',
      ],
    },
    gas: {
      title: gasProd?.name || 'TEKSAN Natural Gas & Biogas GenSets',
      subtitle: gasProd?.description || 'High-efficiency continuous base-load natural gas and biogas generator systems designed for continuous operation in factories, reducing operating costs while adhering to environmental standards.',
      image: gasProd?.imageUrl || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      capacity: gasProd?.capacityRange || '50 kW – 2000 kW',
      productData: gasProd,
      features: (gasProd?.keyFeatures || (gasProd as any)?.features) && (gasProd?.keyFeatures || (gasProd as any)?.features).length > 0 ? (gasProd?.keyFeatures || (gasProd as any)?.features) : [
        'High electrical efficiency and low exhaust gas emissions',
        'Co-generation (CHP) heat recovery ready',
        'Electronic air-fuel ratio control and lean-burn technology',
        'Continuous 24/7 baseload industrial operation',
      ],
    },
    sync: {
      title: syncProd?.name || 'Cummins Diesel Generator',
      subtitle: syncProd?.description || 'Cummins diesel generators come in various capacities for homes, offices, and factories with estimated price chart in Bangladesh (30 kVA – 1,000 kVA+).',
      image: syncProd?.imageUrl || 'https://cdn.ade-power.com/assets/img/generators/cummins/33kva-38kva-cummins-silent-diesel-generator-cummins-c33d5-c38d5.jpg',
      capacity: syncProd?.capacityRange || '30 kVA – 1,000 kVA+',
      productData: syncProd,
      features: (syncProd?.keyFeatures || (syncProd as any)?.features) && (syncProd?.keyFeatures || (syncProd as any)?.features).length > 0 ? (syncProd?.keyFeatures || (syncProd as any)?.features) : [
        'Genuine Cummins heavy-duty industrial diesel engines (4B3.9 to KTA38)',
        'Heavy-duty soundproof acoustic weather-resistant silent canopy',
        'Automatic transfer switch (ATS) & digital synchronization compatibility',
        'Transparent Bangladesh estimated price guide (৳ 6.20 Lakh to ৳ 1.30 Crore+)',
      ],
    },
    mobile: {
      title: mobileProd?.name || 'Doosan generator',
      subtitle: mobileProd?.description || 'Doosan Heavy-Duty Industrial Diesel Generator systems (60 kVA – 1000 kVA / ৬০ kVA – ১০০০ kVA) powered by genuine Korean Doosan engines (DB58, D1146, DP086, P126, DP158, DP180, DP222), designed for continuous prime and standby operations.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10',
      capacity: mobileProd?.capacityRange || '60 kVA – 1000 kVA (৬০ kVA – ১০০০ kVA)',
      productData: mobileProd,
      features: (mobileProd?.keyFeatures || (mobileProd as any)?.features) && (mobileProd?.keyFeatures || (mobileProd as any)?.features).length > 0 ? (mobileProd?.keyFeatures || (mobileProd as any)?.features) : [
        'Genuine Doosan Infracore heavy-duty diesel engines (DB58 to DP222LC)',
        'Complete Estimated Price List (৬০ kVA – ১০০০ kVA) in Bangladeshi Taka',
        'Digital smart AMF auto start/stop controller with full protections',
        'Heavy-duty weatherproof & acoustic soundproof canopy (68–72 dBA @ 7m)',
      ],
    },
  };

  const current = productsByCategory[selectedCategory] || productsByCategory.diesel;

  return (
    <section id="products" className="py-16 sm:py-24 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['diesel', 'gas', 'sync', 'mobile'] as const).map((catKey) => {
            const labels = {
              diesel: 'Diesel Generators',
              gas: 'Gas Generators',
              sync: 'Synchronization Systems',
              mobile: 'Mobile & Lighting',
            };
            const isActive = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {labels[catKey]}
              </button>
            );
          })}
        </div>

        {/* Spotlight Showcase matching Screenshot 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Big TEKSAN Canopy Image Showcase */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-8 flex items-center justify-center relative overflow-hidden group">
            <div className="w-full flex items-center justify-center overflow-hidden">
              <img
                src={current.image}
                alt={current.title}
                referrerPolicy="no-referrer"
                className="max-h-[380px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = teksanGenImg;
                }}
              />
            </div>
          </div>

          {/* Right Column: Title, Subtitle, and Outline "View Details" Button matching Screenshot 3 */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                TEKSAN • {current.capacity}
              </span>
              <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight mb-3">
                {current.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            {/* Feature Highlights */}
            <ul className="space-y-2.5 pt-2">
              {current.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons matching Screenshot 3 "View Details" with Blue Outline */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onSelectProduct(current.productData)}
                className="px-6 py-2.5 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm group"
              >
                <Eye className="w-4 h-4 text-blue-600 group-hover:text-white transition" />
                <span>View Details</span>
              </button>

              <button
                onClick={() => onOpenQuoteModal(`Product Quote: ${current.title}`)}
                className="px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow"
              >
                Request Quotation
              </button>
            </div>

          </div>

        </div>

        {/* All Products Technical Catalog Grid */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-['Outfit'] font-bold text-2xl text-slate-900 tracking-tight">
              Standard Generator Models & Ratings
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select any model to view comprehensive engineering specifications and load capacities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-36 bg-slate-50 rounded-lg flex items-center justify-center p-3 mb-4 overflow-hidden">
                    <img
                      src={
                        (prod.id === 'mobile-lighting' || prod.name?.toLowerCase().includes('doosan') || prod.name?.toLowerCase().includes('mobile') || prod.capacityRange?.includes('4x1000W'))
                          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6u9PsT9SdUDp5IyQViYT5o4KJqelVOIzV1K_59k5CsbyL7cTjGYtg2s&s=10'
                          : (prod.imageUrl || (prod as any).image || 'https://www.kpowerbd.com/image/1750940252_685d3a5cb1f26.webp')
                      }
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = teksanGenImg;
                      }}
                    />
                  </div>

                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    {prod.capacityRange}
                  </span>
                  <h4 className="font-['Outfit'] font-bold text-base text-slate-900 mt-1 mb-1">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="flex-1 py-1.5 px-3 rounded bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-xs transition cursor-pointer text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onOpenQuoteModal(prod.name)}
                    className="py-1.5 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
