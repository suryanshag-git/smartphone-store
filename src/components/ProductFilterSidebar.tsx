'use client';

import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';

interface FilterSidebarProps {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedStorages: string[];
  setSelectedStorages: (storages: string[]) => void;
  zeroInterestOnly: boolean;
  setZeroInterestOnly: (val: boolean) => void;
  resetFilters: () => void;
}

const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Vivo'];
const STORAGES = ['128GB', '256GB', '512GB', '1TB'];

export const ProductFilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  selectedStorages,
  setSelectedStorages,
  zeroInterestOnly,
  setZeroInterestOnly,
  resetFilters,
}) => {
  const toggleBrand = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const toggleStorage = (storage: string) => {
    if (selectedStorages.includes(storage)) {
      setSelectedStorages(selectedStorages.filter((s) => s !== storage));
    } else {
      setSelectedStorages([...selectedStorages, storage]);
    }
  };

  return (
    <aside className="w-full lg:w-64 pearl-card p-5 rounded-2xl shrink-0 self-start space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <span className="font-serif font-bold text-sm text-[var(--foreground)]">Filter</span>
        <button
          onClick={resetFilters}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* 0% Interest Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--foreground)]">0% Interest Only</span>
        <button
          type="button"
          onClick={() => setZeroInterestOnly(!zeroInterestOnly)}
          className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
            zeroInterestOnly ? 'bg-[var(--foreground)] justify-end' : 'bg-[var(--border)] justify-start'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-[var(--card)] shadow-xs" />
        </button>
      </div>

      {/* Price Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--muted)]">Max Budget</span>
          <span className="font-bold text-[var(--foreground)]">
            ₹{priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={40000}
          max={200000}
          step={5000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--foreground)]"
        />
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider block">Brand</span>
        <div className="space-y-1.5">
          {BRANDS.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center justify-between cursor-pointer group py-0.5"
              >
                <span className="text-xs text-[var(--foreground)] font-medium">
                  {brand}
                </span>
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors border ${
                    isChecked
                      ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--card)]'
                      : 'border-[var(--border)] bg-[var(--card)]'
                  }`}
                >
                  {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Storage Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider block">Storage</span>
        <div className="grid grid-cols-2 gap-1.5">
          {STORAGES.map((storage) => {
            const isSelected = selectedStorages.includes(storage);
            return (
              <button
                key={storage}
                onClick={() => toggleStorage(storage)}
                className={`py-1 px-2.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[var(--foreground)] text-[var(--card)] font-bold border-[var(--foreground)]'
                    : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
