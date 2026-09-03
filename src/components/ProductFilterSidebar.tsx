'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

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

const BRANDS = [
  { id: 'Apple', name: 'Apple' },
  { id: 'Samsung', name: 'Samsung' },
  { id: 'Google', name: 'Google' },
  { id: 'OnePlus', name: 'OnePlus' },
  { id: 'Xiaomi', name: 'Xiaomi' },
  { id: 'Vivo', name: 'Vivo' },
];

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
    <aside className="w-full lg:w-72 glass-panel p-5 rounded-2xl border border-slate-800 shrink-0 self-start space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-sm tracking-wide">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* 0% Interest Toggle */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">0% Interest Plans Only</span>
        </div>
        <button
          type="button"
          onClick={() => setZeroInterestOnly(!zeroInterestOnly)}
          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
            zeroInterestOnly ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
        </button>
      </div>

      {/* Price Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Max Budget</span>
          <span className="font-bold text-emerald-400 text-sm">
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
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-medium">
          <span>₹40,000</span>
          <span>₹2,00,000+</span>
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-slate-300 block">Brands</span>
        <div className="space-y-2">
          {BRANDS.map((brand) => {
            const isChecked = selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                onClick={() => toggleBrand(brand.id)}
                className="flex items-center justify-between cursor-pointer group py-1"
              >
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                  {brand.name}
                </span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors border ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                      : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Storage Filters */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-slate-300 block">Storage Option</span>
        <div className="grid grid-cols-2 gap-2">
          {STORAGES.map((storage) => {
            const isSelected = selectedStorages.includes(storage);
            return (
              <button
                key={storage}
                onClick={() => toggleStorage(storage)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
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
