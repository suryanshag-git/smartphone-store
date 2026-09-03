'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductVariant } from '@/types';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductGalleryProps {
  product: Product;
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  selectedVariant,
  onVariantChange,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeImage, setActiveImage] = useState(selectedVariant.image);

  // Group variants by color & storage
  const availableColors = Array.from(
    new Set(product.variants.map((v) => JSON.stringify({ name: v.color, hex: v.colorHex, slug: v.colorSlug })))
  ).map((str) => JSON.parse(str));

  const availableStorages = Array.from(
    new Set(product.variants.map((v) => v.storage))
  );

  const handleColorSelect = (colorSlug: string) => {
    const matched = product.variants.find(
      (v) => v.colorSlug === colorSlug && v.storageSlug === selectedVariant.storageSlug
    ) || product.variants.find((v) => v.colorSlug === colorSlug);

    if (matched) {
      onVariantChange(matched);
      setActiveImage(matched.image);
      updateUrlParams(matched.colorSlug, matched.storageSlug);
    }
  };

  const handleStorageSelect = (storage: string) => {
    const matched = product.variants.find(
      (v) => v.storage === storage && v.colorSlug === selectedVariant.colorSlug
    ) || product.variants.find((v) => v.storage === storage);

    if (matched) {
      onVariantChange(matched);
      setActiveImage(matched.image);
      updateUrlParams(matched.colorSlug, matched.storageSlug);
    }
  };

  const updateUrlParams = (colorSlug: string, storageSlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('color', colorSlug);
    params.set('storage', storageSlug);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Primary Image Display Box */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex items-center justify-center relative overflow-hidden group min-h-[380px] sm:min-h-[460px]">
        {/* Background Ambient Glow */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl rounded-full transition-colors duration-500 pointer-events-none"
          style={{ backgroundColor: selectedVariant.colorHex || '#10b981' }}
        />

        {/* Mutual Fund Lien Trust Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-slate-950/80 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-300 font-semibold backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>MF Lien Protected</span>
        </div>

        {/* Product Image */}
        <img
          key={selectedVariant.id}
          src={activeImage || selectedVariant.image}
          alt={`${product.name} - ${selectedVariant.color}`}
          className="w-72 h-72 sm:w-80 sm:h-80 object-contain filter drop-shadow-2xl transition-all duration-300 transform group-hover:scale-105"
        />
      </div>

      {/* Variant Selectors Block */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-5">
        {/* Color Finish Selector */}
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold text-slate-300 uppercase tracking-wider">Finish / Color:</span>
            <span className="font-semibold text-emerald-400">{selectedVariant.color}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {availableColors.map((colorObj) => {
              const isSelected = selectedVariant.colorSlug === colorObj.slug;
              return (
                <button
                  key={colorObj.slug}
                  onClick={() => handleColorSelect(colorObj.slug)}
                  className={`group relative p-1 rounded-full transition-all ${
                    isSelected ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 scale-110' : 'hover:scale-105'
                  }`}
                  title={colorObj.name}
                >
                  <span
                    style={{ backgroundColor: colorObj.hex }}
                    className="w-7 h-7 rounded-full border border-slate-700 block shadow-inner"
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Storage Option Selector */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold text-slate-300 uppercase tracking-wider">Storage Capacity:</span>
            <span className="font-semibold text-emerald-400">{selectedVariant.storage}</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {availableStorages.map((storage) => {
              const isSelected = selectedVariant.storage === storage;
              return (
                <button
                  key={storage}
                  onClick={() => handleStorageSelect(storage)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
