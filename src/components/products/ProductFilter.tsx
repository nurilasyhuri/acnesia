import { useState, useMemo } from 'preact/hooks';

export interface ProductItem {
  title: string;
  description: string;
  category: string;
  capacity?: string;
  priceDisplay?: string;
  stockStatus: string;
  thumbnail: string;
  slug: string;
  brand?: string;
}

interface Props {
  initialProducts: ProductItem[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'Semua Produk AC' },
  { id: 'ac-split', label: 'AC Split Wall' },
  { id: 'ac-cassette', label: 'AC Cassette 4-Way' },
  { id: 'ac-floor-standing', label: 'AC Floor Standing' },
  { id: 'ac-commercial', label: 'AC Ducted Central' },
];

export default function ProductFilter({ initialProducts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.capacity && product.capacity.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery, initialProducts]);

  const handleQuickAddRfq = (product: ProductItem) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('acnesia:add-rfq', {
          detail: {
            title: product.title,
            category: product.category.replace('ac-', 'AC ').toUpperCase(),
            capacity: product.capacity || '',
            quantity: 1,
          },
        })
      );
    }
  };

  return (
    <div class="space-y-8 font-sans">
      {/* Filter Tabs & Search Bar */}
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        {/* Segmented Category Filter */}
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                class={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input (Enforce 16px to prevent iOS auto-zoom) */}
        <div class="relative min-w-[260px]">
          <svg
            class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            placeholder="Cari kapasitas (1 PK, 2 PK), tipe..."
            class="w-full pl-9.5 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Product Counter */}
      <div class="flex items-center justify-between text-xs text-slate-500">
        <span>Menampilkan <strong>{filteredProducts.length}</strong> unit pendingin udara</span>
        {selectedCategory !== 'all' && (
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            class="text-red-700 hover:underline font-medium"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.slug}
              class="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div>
                <a href={`/produk/${p.slug}/`} class="block aspect-4/3 bg-slate-50 overflow-hidden relative border-b border-slate-100">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    width="600"
                    height="450"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="absolute top-3 left-3 z-10">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200 shadow-2xs">
                      <span class={`w-1.5 h-1.5 rounded-full ${
                        p.stockStatus === 'ready' ? 'bg-emerald-500' : p.stockStatus === 'po' ? 'bg-amber-500' : 'bg-red-600'
                      }`}></span>
                      <span>{p.stockStatus === 'ready' ? 'Ready Unit' : p.stockStatus === 'po' ? 'Pre-Order' : 'Konsultasi'}</span>
                    </span>
                  </div>
                  {p.capacity && (
                    <div class="absolute top-3 right-3 z-10">
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/85 text-white backdrop-blur-xs">
                        {p.capacity}
                      </span>
                    </div>
                  )}
                </a>

                <div class="p-4 sm:p-5 space-y-2">
                  <div class="flex items-center justify-between gap-2 text-[11px]">
                    <span class="font-bold uppercase tracking-wider text-red-800 text-[10px]">
                      {p.category.replace('ac-', 'AC ').toUpperCase()}
                    </span>
                    {p.brand && (
                      <span class="text-slate-400 font-medium truncate">{p.brand}</span>
                    )}
                  </div>
                  <h3 class="font-bold text-slate-900 text-sm leading-snug group-hover:text-red-800 transition-colors min-h-[2.5rem]">
                    <a href={`/produk/${p.slug}/`}>{p.title}</a>
                  </h3>
                  <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div class="p-4 sm:p-5 pt-3 border-t border-slate-100 mt-1 space-y-2.5">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex flex-col min-w-0">
                    <span class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Skema Biaya</span>
                    <span class="font-bold text-slate-900 text-xs sm:text-sm tracking-tight truncate">
                      {p.priceDisplay || "Konsultasi Penawaran"}
                    </span>
                  </div>
                  <a
                    href={`/produk/${p.slug}/`}
                    class="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all duration-200 shrink-0"
                  >
                    <span>Detail</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickAddRfq(p)}
                  class="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-red-50 hover:bg-red-700 text-red-800 hover:text-white border border-red-200 hover:border-red-700 text-xs font-bold transition-all duration-200 cursor-pointer select-none"
                >
                  <svg class="w-3.5 h-3.5 fill-none stroke-currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Tambah ke Penawaran (RFQ)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div class="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <p class="font-bold text-slate-800 text-sm sm:text-base">Tidak ditemukan unit AC yang cocok</p>
          <p class="text-xs text-slate-500 max-w-md mx-auto">
            Kebutuhan kapasitas khusus atau pengadaan merk lain dapat dikonsultasikan langsung bersama tim sales ACNesia.
          </p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            class="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors"
          >
            Tampilkan Semua Unit AC
          </button>
        </div>
      )}
    </div>
  );
}
