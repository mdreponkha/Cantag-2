import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ClientItem, PagesContentState } from '../types';

interface ClientEntry {
  sl: number;
  name: string;
  address: string;
  sector?: string;
}

export const CAN_STAR_CLIENTS_LIST: ClientEntry[] = [
  { sl: 1, name: 'Bashundhara Golf Course', address: 'Bashundhara R/A, Dhaka-1229', sector: 'Sports & Leisure' },
  { sl: 2, name: 'United Group', address: 'Madani Ave, Dhaka 1212', sector: 'Conglomerate' },
  { sl: 3, name: 'Hameem Group', address: 'Ha-Meem Group 387 (South), Tejgaon Industrial Area Dhaka-1208, Bangladesh', sector: 'Textile & Garments' },
  { sl: 4, name: 'Rupayan Group', address: 'Rupayan Centre, 72 Mohakhali C/A, Dhaka-1212', sector: 'Real Estate' },
  { sl: 5, name: 'FB Foot Ware Ltd.', address: 'Wolusara, Kaliakor, Gazipur', sector: 'Footwear & Leather' },
  { sl: 6, name: 'Madina Group', address: 'Green Road, Dhaka', sector: 'Industrial Group' },
  { sl: 7, name: 'TED Bernhardtz Textiles Ltd.', address: 'Tongi, Gazipur', sector: 'Textile & RMG' },
  { sl: 8, name: 'Rupsha Tyre & Chemical Ltd.', address: '233, Khaspara, Sonargaon, Narayangonj', sector: 'Chemical & Manufacturing' },
  { sl: 9, name: 'Libas Textile Ltd.', address: 'Nichintopur, Mouchak, Gazipur', sector: 'Textile & RMG' },
  { sl: 10, name: 'S2L Fashion Ltd.', address: 'Gazipur', sector: 'Apparel & Garments' },
  { sl: 11, name: 'Eastport Ltd.', address: 'Cumilla EPZ', sector: 'Export Processing Zone' },
  { sl: 12, name: 'CBC Tiles Ltd.', address: 'Poribagh, Dhaka', sector: 'Ceramics & Tiles' },
  { sl: 13, name: 'AWR', address: 'Gulshan, Dhaka', sector: 'Corporate Real Estate' },
  { sl: 14, name: 'Panwin Design', address: 'Bagherbazar', sector: 'Design & Manufacturing' },
  { sl: 15, name: 'Index Agro Ind. Feed Mills Ltd.', address: 'Kathali, Valuka, Mymensingh', sector: 'Agro Industries' },
  { sl: 16, name: 'F. K Textile', address: 'Baghata, Silmandi, Narsingdi', sector: 'Textile & Weaving' },
  { sl: 17, name: 'Rawtech Limited', address: 'Bashundhara, Dhaka', sector: 'Industrial Supplies' },
  { sl: 18, name: 'Birds Group', address: '113 Baipal, Ashulia, Savar', sector: 'Garments & Apparel' },
  { sl: 19, name: 'Glory Ceramics Ltd.', address: 'Saidpur, Nilphamary', sector: 'Ceramics & Porcelain' },
  { sl: 20, name: 'Excellent Ceramics Ltd.', address: 'Valuka, Mymensingh', sector: 'Ceramics & Sanitary' },
  { sl: 21, name: 'Hatim Group', address: 'Ariabo, Rupshi, Narayangonj', sector: 'Industrial Group' },
  { sl: 22, name: 'Momen Real Estate', address: "Bari Momen's Heights, Plot -157 Rd 12, Banani, Dhaka-1213", sector: 'Real Estate' },
  { sl: 23, name: 'Eastern Housing Ltd.', address: 'Kemal Ataturk Avenue, Banani, Dhaka-1213', sector: 'Real Estate' },
  { sl: 24, name: 'Aakash Development', address: 'House 36 Rd No 13, Banani, Dhaka-1213', sector: 'Real Estate & Construction' },
  { sl: 25, name: 'Mir Real Estate', address: 'House # B-147, Road # 22, Mohakhali DOHS, Dhaka 1206', sector: 'Real Estate' },
  { sl: 26, name: 'Nassa Holdings Ltd.', address: 'Awal center, 34 Kemal Ataturk Ave, Banani, Dhaka-1213', sector: 'Conglomerate' },
  { sl: 27, name: 'Sunmar Properties', address: '38/A, 1212 Rd 35, Gulshan, Dhaka-1212', sector: 'Real Estate' },
  { sl: 28, name: 'Kunjo Chaya Developers', address: 'RS Kunjo, 20 Gareeb-E-Nawaz Avenue, Sector # 13, Uttara, Dhaka - 1230', sector: 'Real Estate' },
  { sl: 29, name: 'UCB', address: 'Bulus Centre, Plot - CWS- (A)-1, Road No - 34, Gulshan Ave, Dhaka-1212', sector: 'Banking & Financial' },
  { sl: 30, name: 'Brac Bank', address: 'Anik Tower, 220/B Bir Uttam Mir Shawkat Sarak, Mohakhali, Dhaka-1208', sector: 'Banking & Financial' },
  { sl: 31, name: 'One Bank', address: 'HRC Bhaban, 46, Kawran Bazar C/A, Dhaka-1215', sector: 'Banking & Financial' },
  { sl: 32, name: 'Al Arafah Islami Bank', address: 'Al-Arafah Tower, 63, Purana Paltan, Dhaka-1000', sector: 'Banking & Financial' },
  { sl: 33, name: 'Modhumoti Bank', address: 'Khandker Tower, (Level-7 & 8), 94, Gulshan Avenue, Gulshan-1, Dhaka-1212', sector: 'Banking & Financial' },
  { sl: 34, name: 'NRB Global Bank', address: 'Saiham Tower, Gulshan Model Town, Dhaka-1212', sector: 'Banking & Financial' },
];

interface ClientsSectionProps {
  clients?: ClientItem[];
  content?: PagesContentState['clients'];
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({
  clients: customClients,
  content,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<number | null>(23); // Default highlighted row 23 as shown in screenshot

  // Determine source list
  const activeClientsList: ClientEntry[] = (customClients && customClients.length > 0)
    ? customClients.map((c, i) => ({
        sl: i + 1,
        name: c.name,
        address: c.location || (c as any).address || 'Dhaka, Bangladesh',
        sector: c.industry || 'Corporate',
      }))
    : CAN_STAR_CLIENTS_LIST;

  const filteredClients = activeClientsList.filter((client) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      client.name.toLowerCase().includes(q) ||
      client.address.toLowerCase().includes(q) ||
      client.sl.toString().includes(q) ||
      (client.sector && client.sector.toLowerCase().includes(q))
    );
  });

  return (
    <section id="clients" className="py-12 sm:py-16 bg-white text-slate-800 min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Optional Header Banner Image if provided in CMS */}
        {content?.bannerImageUrl && (
          <div className="w-full h-44 sm:h-60 rounded-2xl overflow-hidden mb-8 shadow-md border border-slate-200 bg-slate-900">
            <img
              src={content.bannerImageUrl}
              alt="Clients Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Page Heading matching Screenshot */}
        <div className="text-center mb-10">
          <h1 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {content?.title || 'Featured Clients'}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5 font-normal">
            {content?.subtitle || 'Trusted by leading organizations worldwide'}
          </p>
        </div>

        {/* Action / Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by client name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 placeholder-slate-400 transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
            <span className="font-semibold text-slate-700">Total Listed:</span>
            <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
              {filteredClients.length} Organizations
            </span>
          </div>
        </div>

        {/* Clean Structured Client Table Matching Screenshot */}
        <div className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="py-3 px-4 font-bold text-xs sm:text-sm text-slate-900 w-20 sm:w-24 border-r border-slate-200">
                    Serial No
                  </th>
                  <th className="py-3 px-4 font-bold text-xs sm:text-sm text-slate-900 w-1/3 sm:w-5/12 border-r border-slate-200">
                    Client Name
                  </th>
                  <th className="py-3 px-4 font-bold text-xs sm:text-sm text-slate-900">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => {
                    const isSelected = selectedRow === client.sl;
                    return (
                      <tr
                        key={client.sl}
                        onClick={() => setSelectedRow(client.sl)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-100/90 font-medium'
                            : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <td className="py-2.5 sm:py-3 px-4 text-slate-700 text-center sm:text-left border-r border-slate-200 font-mono">
                          {client.sl}
                        </td>
                        <td className="py-2.5 sm:py-3 px-4 text-slate-900 font-semibold border-r border-slate-200">
                          {client.name}
                        </td>
                        <td className="py-2.5 sm:py-3 px-4 text-slate-600">
                          {client.address || '—'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500 text-sm">
                      No matching clients found for "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>
            CAN STAR POWER TECH has supplied and commissioned high-capacity TEKSAN generator sets for premier financial institutions, corporate groups, and manufacturing facilities across Bangladesh.
          </p>
        </div>

      </div>
    </section>
  );
};

