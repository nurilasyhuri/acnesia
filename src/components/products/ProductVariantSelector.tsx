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
  categoryName,
  basePrice = 0,
  basePriceDisplay = 'Konsultasi Penawaran & RAB',
  variants = [],
  stockStatus = 'ready',
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const hasVariants = variants && variants.length > 0;
  const currentVariant = hasVariants ? variants[selectedIdx] : null;

  const currentPrice = currentVariant ? currentVariant.price : basePrice;
  const currentPriceDisplay = currentVariant ? currentVariant.priceDisplay : basePriceDisplay;
  const currentUnit = currentVariant?.unit || 'unit';

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(999, prev + delta)));
  };

  const handleAddToRfq = () => {
    const itemTitle = currentVariant ? `${productTitle} (${currentVariant.name})` : productTitle;
    const itemCapacity = currentVariant?.name || '';
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sentraac:add-rfq', {
          detail: {
            title: itemTitle,
            category: categoryName,
            capacity: itemCapacity,
            price: currentPrice,
            priceDisplay: currentPriceDisplay,
            quantity: quantity,
          },
        })
      );
    }
  };

  return (
    <div class="space-y-5 font-sans">
      {hasVariants && (
        <div class="space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-slate-900">
              Pilihan Kapasitas PK
            </span>
            <span class="text-slate-600 font-medium">
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
                  class={`text-left p-3.5 rounded-lg border text-xs transition-colors select-none flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#c2410c] bg-orange-50/40 ring-1 ring-[#c2410c]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span class="font-semibold text-xs leading-snug text-slate-900">
                    {variant.name}
                  </span>

                  <div class="mt-2 flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <span class={`font-bold text-xs ${isSelected ? 'text-[#c2410c]' : 'text-slate-900'}`}>
                      {variant.priceDisplay}
                    </span>
                    {variant.unit && (
                      <span class="text-[11px] text-slate-500 font-normal">/ {variant.unit}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1 text-xs text-slate-600">
              <span>{currentPrice > 0 ? 'Harga Satuan' : 'Skema Biaya'}</span>
              <span>·</span>
              <span class="font-medium text-slate-800">
                {stockStatus === 'ready' ? 'Ready Stock' : stockStatus === 'po' ? 'Pre-Order Proyek' : 'Konsultasi SPH'}
              </span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-xl sm:text-2xl font-bold text-slate-900">
                {currentPriceDisplay}
              </span>
              {currentPrice > 0 && currentUnit && (
                <span class="text-xs text-slate-500 font-normal">/ {currentUnit}</span>
              )}
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <span class="text-xs font-medium text-slate-700">Jumlah:</span>
            <div class="inline-flex items-center rounded-lg border border-slate-300 bg-white p-0.5">
              <button
                type="button"
                onClick={() => handleQtyChange(-1)}
                disabled={quantity <= 1}
                aria-label="Kurangi jumlah"
                class="w-7 h-7 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm cursor-pointer"
              >
                &minus;
              </button>
              <input
                type="number"
                min="1"
                max="999"
                value={quantity}
                aria-label="Jumlah unit AC"
                onInput={(e) => {
                  const val = parseInt((e.target as HTMLInputElement).value, 10);
                  if (!isNaN(val) && val >= 1) setQuantity(val);
                }}
                class="w-10 text-center bg-transparent text-sm font-bold text-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => handleQtyChange(1)}
                aria-label="Tambah jumlah"
                class="w-7 h-7 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 font-semibold text-sm cursor-pointer"
              >
                &#43;
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToRfq}
          class="w-full inline-flex items-center justify-center py-3 px-5 rounded-lg bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold text-sm transition-colors select-none cursor-pointer"
        >
          Masukkan ke Daftar SPH
        </button>
      </div>
    </div>
  );
}
