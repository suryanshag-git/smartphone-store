'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductVariant } from '@/types';
import { Check, ShieldCheck } from 'lucide-react';

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
      <div className="flat-card p-8 rounded-3xl border border-slate-200 bg-white flex items-center justify-center relative overflow-hidden group min-h-[380px] sm:min-h-[440px]">
        {/* Trust Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs text-emerald-800 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero MF Selling</span>
        </div>

        {/* Product Image */}
        <img
          key={selectedVariant.id}
          src={activeImage || selectedVariant.image}
          alt={`${product.name} - ${selectedVariant.color}`}
          className="w-72 h-72 sm:w-80 sm:h-80 object-contain filter drop-shadow-lg transition-all duration-300 transform group-hover:scale-105"
        />
      </div>

      {/* Variant Selector Box */}
      <div className="flat-card p-5 rounded-2xl border border-slate-200 bg-white space-y-5">
        {/* Color Swatch */}
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold text-slate-700 uppercase tracking-wider">Finish:</span>
            <span className="font-bold text-emerald-700">{selectedVariant.color}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {availableColors.map((colorObj) => {
              const isSelected = selectedVariant.colorSlug === colorObj.slug;
              return (
                <button
                  key={colorObj.slug}
                  onClick={() => handleColorSelect(colorObj.slug)}
                  className={`group relative p-1 rounded-full transition-all ${
                    isSelected ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  title={colorObj.name}
                >
                  <span
                    style={{ backgroundColor: colorObj.hex }}
                    className="w-7 h-7 rounded-full border border-slate-300 block shadow-xs"
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Storage Option Selector */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold text-slate-700 uppercase tracking-wider">Storage Capacity:</span>
            <span className="font-bold text-emerald-700">{selectedVariant.storage}</span>
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
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
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
