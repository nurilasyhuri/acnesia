import { useState } from 'preact/hooks';

export interface ProductVariant {
  name: string;
  price: number;
  priceDisplay: string;
  sku?: string;
  unit?: string;
}

interface Props {
  productTitle: string;
  productSlug: string;
  categoryName: string;
  brand?: string;
  basePrice?: number;
  basePriceDisplay?: string;
  variants?: ProductVariant[];
  stockStatus: string;
  whatsappNumber?: string;
}

export default function ProductVariantSelector({
  productTitle,
  productSlug,
  categoryName,
  brand,
  basePrice = 0,
  basePriceDisplay = 'Konsultasi Penawaran & RAB',
  variants = [],
  stockStatus = 'ready',
  whatsappNumber = '6285183002070',
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const hasVariants = variants && variants.length > 0;
  const currentVariant = hasVariants ? variants[selectedIdx] : null;

  const currentPrice = currentVariant ? currentVariant.price : basePrice;
  const currentPriceDisplay = currentVariant ? currentVariant.priceDisplay : basePriceDisplay;
  const currentUnit = currentVariant?.unit || 'unit';

  const totalPrice = currentPrice > 0 ? currentPrice * quantity : 0;
  const totalPriceDisplay =
    totalPrice > 0 ? `Rp ${totalPrice.toLocaleString('id-ID')}` : currentPriceDisplay;

  // Build pre-formatted professional WhatsApp RFQ link
  const buildWhatsAppUrl = () => {
    const brandLine = brand ? ` (${brand})` : '';
    const variantLine = currentVariant ? `\n📐 Varian / Kapasitas: ${currentVariant.name}` : '';
    const priceDetail =
      currentPrice > 0
        ? `\n💰 Estimasi Total: ${totalPriceDisplay} (${currentPriceDisplay} x ${quantity} ${currentUnit})`
        : `\n💰 Skema Biaya: ${currentPriceDisplay}`;

    const text = `Halo ACNesia, saya ingin mengajukan penawaran pengadaan AC untuk kebutuhan kami:

📦 Unit AC: ${productTitle}${brandLine} [${categoryName}]${variantLine}
🔢 Jumlah Kebutuhan: ${quantity} ${currentUnit}${priceDetail}
🔗 Link Produk: https://acnesia.com/produk/${productSlug}/

Data Kontak & Perusahaan:
- Nama PIC: 
- Perusahaan / Instansi: 
- Lokasi Pemasangan: 
- Catatan Tambahan (misal: butuh jasa pasang pipa / survey lokasi): 

Mohon informasi ketersediaan unit dan pengiriman proposal penawaran resmi (Quotation/RAB). Terima kasih!`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const waUrl = buildWhatsAppUrl();

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(999, prev + delta)));
  };

  return (
    <div class="space-y-6 font-sans">
      {/* Variant Selector */}
      {hasVariants && (
        <div class="space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-slate-900 tracking-normal">
              Pilihan Varian / Kapasitas PK:
            </span>
            <span class="text-red-800 font-semibold bg-red-50 px-2.5 py-0.5 rounded-full text-[11px] border border-red-200">
              {currentVariant?.name}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variants.map((variant, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  type="button"
                  key={variant.sku || variant.name}
                  onClick={() => setSelectedIdx(idx)}
                  class={`text-left p-3.5 rounded-xl border text-xs transition-all duration-200 select-none flex flex-col justify-between relative cursor-pointer ${
                    isSelected
                      ? 'border-red-700 bg-red-50/50 ring-1 ring-red-700'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div class="flex items-start justify-between gap-2">
                    <span class={`font-semibold text-xs leading-snug ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                      {variant.name}
                    </span>
                    <span
                      class={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                        isSelected ? 'bg-red-700 text-white' : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected ? (
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </span>
                  </div>

                  <div class="mt-3 flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <span class={`font-bold text-xs ${isSelected ? 'text-red-800' : 'text-slate-900'}`}>
                      {variant.priceDisplay}
                    </span>
                    {variant.unit && (
                      <span class="text-[11px] text-slate-400 font-normal">/ {variant.unit}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pricing, Quantity & WhatsApp Order Module */}
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-medium text-slate-500">
                {currentPrice > 0 ? 'Harga Satuan' : 'Skema Biaya'}
              </span>
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs">
                <span
                  class={`w-1.5 h-1.5 rounded-full ${
                    stockStatus === 'ready' ? 'bg-emerald-500' : stockStatus === 'po' ? 'bg-amber-500' : 'bg-red-600'
                  }`}
                ></span>
                {stockStatus === 'ready' ? 'Ready Unit' : stockStatus === 'po' ? 'Pre-Order Proyek' : 'Konsultasi Penawaran'}
              </span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentPriceDisplay}
              </span>
              {currentPrice > 0 && currentUnit && (
                <span class="text-xs text-slate-500 font-normal">/ {currentUnit}</span>
              )}
            </div>
          </div>

          {/* Stepper Quantity */}
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold text-slate-600">Jumlah Unit:</span>
            <div class="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => handleQtyChange(-1)}
                disabled={quantity <= 1}
                aria-label="Kurangi jumlah"
                class="w-7 h-7 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs transition-all select-none cursor-pointer"
              >
                &minus;
              </button>
              <input
                type="number"
                min="1"
                max="999"
                value={quantity}
                onInput={(e) => {
                  const val = parseInt((e.target as HTMLInputElement).value, 10);
                  if (!isNaN(val) && val >= 1) setQuantity(val);
                }}
                class="w-10 text-center bg-transparent text-base sm:text-sm font-bold text-slate-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => handleQtyChange(1)}
                aria-label="Tambah jumlah"
                class="w-7 h-7 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-all select-none cursor-pointer"
              >
                &#43;
              </button>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div class="space-y-3 pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-semibold text-sm tracking-normal shadow-xs hover:shadow transition-all select-none"
          >
            <svg class="w-4 h-4 text-white shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
            </svg>
            <span>Minta Penawaran Resmi via WhatsApp</span>
          </a>

          {/* Trust Strip */}
          <div class="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 pt-1">
            <div class="flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-red-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Unit 100% Original</span>
            </div>
            <div class="flex items-center justify-center gap-1.5 border-x border-slate-200">
              <svg class="w-3.5 h-3.5 text-red-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Faktur Pajak B2B</span>
            </div>
            <div class="flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-red-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Survey & Pasang Rapi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Dock */}
      <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 shadow-lg safe-area-pb">
        <div class="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div class="min-w-0 flex-1">
            <span class="text-[11px] text-slate-500 block truncate">
              {currentVariant ? currentVariant.name : productTitle} ({quantity} {currentUnit})
            </span>
            <span class="text-xs sm:text-sm font-bold text-slate-900 block truncate">
              {totalPriceDisplay}
            </span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-red-700 hover:bg-red-800 text-white font-semibold text-xs tracking-normal transition-all shadow-xs shrink-0 select-none"
          >
            <span>Minta Penawaran WA</span>
          </a>
        </div>
      </div>
    </div>
  );
}
