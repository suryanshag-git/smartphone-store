'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductVariant } from '@/types';
import { Check } from 'lucide-react';

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
      {/* Primary Image Showcase */}
      <div className="pearl-card p-8 rounded-3xl flex items-center justify-center relative overflow-hidden group min-h-[360px] sm:min-h-[420px]">
        <img
          key={selectedVariant.id}
          src={activeImage || selectedVariant.image}
          alt={`${product.name} - ${selectedVariant.color}`}
          className="w-72 h-72 sm:w-80 sm:h-80 object-contain filter drop-shadow-md transition-all duration-300 transform group-hover:scale-105"
        />
      </div>

      {/* Variant Selector Box */}
      <div className="pearl-card p-5 rounded-2xl space-y-5">
        {/* Color Swatch */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2.5">
            <span className="font-bold text-[var(--muted)] uppercase tracking-wider">Finish</span>
            <span className="font-bold text-[var(--foreground)]">{selectedVariant.color}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {availableColors.map((colorObj) => {
              const isSelected = selectedVariant.colorSlug === colorObj.slug;
              return (
                <button
                  key={colorObj.slug}
                  onClick={() => handleColorSelect(colorObj.slug)}
                  className={`group relative p-1 rounded-full transition-all ${
                    isSelected ? 'ring-2 ring-[var(--foreground)] ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  title={colorObj.name}
                >
                  <span
                    style={{ backgroundColor: colorObj.hex }}
                    className="w-6 h-6 rounded-full border border-slate-300 block shadow-xs"
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Storage Option Selector */}
        <div className="pt-4 border-t border-[var(--border)]">
          <div className="flex items-center justify-between text-xs mb-2.5">
            <span className="font-bold text-[var(--muted)] uppercase tracking-wider">Storage</span>
            <span className="font-bold text-[var(--foreground)]">{selectedVariant.storage}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {availableStorages.map((storage) => {
              const isSelected = selectedVariant.storage === storage;
              return (
                <button
                  key={storage}
                  onClick={() => handleStorageSelect(storage)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-[var(--foreground)] text-[var(--card)] border-[var(--foreground)] shadow-xs'
                      : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]'
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
