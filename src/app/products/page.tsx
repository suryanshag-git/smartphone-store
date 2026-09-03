'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilterSidebar } from '@/components/ProductFilterSidebar';
import { Product } from '@/types';
import { SlidersHorizontal, Search, RefreshCw, AlertCircle } from 'lucide-react';

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Filters state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([40000, 200000]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [zeroInterestOnly, setZeroInterestOnly] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','));
      if (priceRange[1]) params.set('maxPrice', priceRange[1].toString());
      if (zeroInterestOnly) params.set('zeroInterest', 'true');
      params.set('sort', sortOption);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        let filtered = data.products || [];

        if (selectedStorages.length > 0) {
          filtered = filtered.filter((p: Product) =>
            p.variants.some((v) => selectedStorages.includes(v.storage))
          );
        }

        setProducts(filtered);
      }
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, priceRange, selectedStorages, zeroInterestOnly, sortOption, searchQuery]);

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([40000, 200000]);
    setSelectedStorages([]);
    setZeroInterestOnly(false);
    setSearchQuery('');
    setSortOption('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Flagship Smartphones on EMI
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Collateralized mutual fund financing plans • Zero portfolio liquidation
          </p>
        </div>

        {/* Sorting & Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300 font-semibold focus:border-emerald-500/50 focus:outline-none"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Product Grid) */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Filter Sidebar */}
        <ProductFilterSidebar
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedStorages={selectedStorages}
          setSelectedStorages={setSelectedStorages}
          zeroInterestOnly={zeroInterestOnly}
          setZeroInterestOnly={setZeroInterestOnly}
          resetFilters={resetFilters}
        />

        {/* Right Products Listing Grid */}
        <div className="flex-1 space-y-6">
          {loading ? (
            /* Shimmer Skeleton Placeholder */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-slate-800 p-5 space-y-4 shimmer-skeleton h-96"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-slate-800">
              <AlertCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <div>
                <h3 className="font-bold text-white text-base">No smartphones match your filters</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting price range, selected brands, or clearing active search terms.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="py-2 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto p-8 text-center text-slate-400">Loading catalog...</div>
    }>
      <ProductCatalogContent />
    </Suspense>
  );
}
