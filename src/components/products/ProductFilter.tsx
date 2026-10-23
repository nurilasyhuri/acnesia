import { useState, useMemo } from 'preact/hooks';

export interface ProductVariantItem {
  name: string;
  price: number;
  priceDisplay: string;
  sku?: string;
  unit?: string;
}

export interface ProductItem {
  title: string;
  description: string;
  category: string;
  condition?: string;
  capacity?: string;
  price?: number;
  priceDisplay?: string;
  compareAtPriceDisplay?: string;
  stockStatus: string;
  thumbnail: string;
  slug: string;
  brand?: string;
  variants?: ProductVariantItem[];
}

interface Props {
  initialProducts: ProductItem[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'Semua Unit & Paket' },
  { id: 'ac-split', label: 'AC Split' },
  { id: 'ac-cassette', label: 'AC Cassette' },
  { id: 'ac-floor-standing', label: 'AC Standing' },
  { id: 'ac-commercial', label: 'AC Central' },
  { id: 'paket-jasa', label: 'Paket Jasa & Sewa' },
];

const formatCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'ac-split':
      return 'AC Split Wall';
    case 'ac-cassette':
      return 'AC Cassette 4-Way';
    case 'ac-floor-standing':
      return 'AC Floor Standing';
    case 'ac-commercial':
      return 'AC Ceiling & Duct';
    case 'paket-jasa':
      return 'Paket Jasa & Sewa';
    default:
      return cat.replace('ac-', 'AC ');
  }
};

export default function ProductFilter({ initialProducts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = initialProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      if (!matchCategory) return false;
      if (!q) return true;

      const variantText = (product.variants || [])
        .map((v) => v.name.toLowerCase())
        .join(' ');

      return (
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (product.capacity && product.capacity.toLowerCase().includes(q)) ||
        (product.condition && product.condition.toLowerCase().includes(q)) ||
        (product.brand && product.brand.toLowerCase().includes(q)) ||
        variantText.includes(q)
      );
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((b, b2) => (b2.price || 0) - (b.price || 0));
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy, initialProducts]);

  return (
    <div class="space-y-6 font-sans">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-1.5">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                class={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#020617] text-white'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div class="relative min-w-[220px]">
            <svg
              aria-hidden="true"
              class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
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
              placeholder="Cari PK, merk, atau paket..."
              aria-label="Filter produk AC"
              class="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-base sm:text-xs text-slate-900 placeholder-slate-400 focus:border-[#c2410c] transition-colors"
            />
          </div>

          <div class="flex items-center gap-2">
            <label for="store-sort-select" class="text-xs font-semibold text-slate-600 shrink-0">
              Urutkan:
            </label>
            <select
              id="store-sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy((e.target as HTMLSelectElement).value as 'featured' | 'price-asc' | 'price-desc')
              }
              class="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-[#c2410c] cursor-pointer"
            >
              <option value="featured">Urutan Standar</option>
              <option value="price-asc">Harga: Terendah - Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi - Terendah</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const firstVariant = p.variants && p.variants.length > 0 ? p.variants[0] : null;
            const displayPrice = firstVariant
              ? firstVariant.priceDisplay
              : p.priceDisplay || 'Sesuai Penawaran SPH';
            const displayUnit = firstVariant?.unit || 'unit';

            return (
              <a
                key={p.slug}
                href={`/produk/${p.slug}/`}
                class="group flex flex-col justify-between rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors overflow-hidden"
              >
                <div>
                  <div class="aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={p.thumbnail}
                      alt={`Unit ${p.title} - Sentra AC`}
                      width="600"
                      height="450"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="p-4 space-y-1.5">
                    <div class="flex items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span class="font-semibold text-[#c2410c]">{formatCategoryLabel(p.category)}</span>
                      {p.capacity && <span>{p.capacity}</span>}
                    </div>

                    <h3 class="font-bold text-slate-950 text-sm leading-snug group-hover:text-[#c2410c] transition-colors line-clamp-2">
                      {p.title}
                    </h3>

                    <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div class="px-4 pb-4 pt-2 flex items-baseline justify-between gap-2">
                  <span class="text-sm font-bold text-slate-950">
                    {displayPrice}
                  </span>
                  <span class="text-[11px] text-slate-500">/ {displayUnit}</span>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div class="py-12 px-4 text-center rounded-xl bg-white border border-slate-200 space-y-2">
          <div class="text-slate-900 font-bold text-base">Unit atau layanan tidak ditemukan</div>
          <p class="text-xs text-slate-600 max-w-md mx-auto">
            Silakan ubah kata kunci pencarian atau pilih kategori lain di atas.
          </p>
        </div>
      )}
    </div>
  );
}
