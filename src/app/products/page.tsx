'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilterSidebar } from '@/components/ProductFilterSidebar';
import { Product } from '@/types';
import { Search, AlertCircle } from 'lucide-react';

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

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
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Flagship Smartphones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pay easy monthly installments without selling your mutual fund investments
          </p>
        </div>

        {/* Search & Sorting */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search smartphones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none shadow-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-700 font-semibold focus:border-emerald-600 focus:outline-none shadow-xs"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
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

        <div className="flex-1 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-slate-200 p-5 space-y-4 shimmer-skeleton h-96 bg-white"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flat-card p-12 rounded-3xl text-center space-y-4 border border-slate-200 bg-white">
              <AlertCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <div>
                <h3 className="font-bold text-slate-900 text-base">No phones match your filters</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting price range, selected brands, or clearing active search terms.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="py-2 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
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
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-center text-slate-400">Loading catalog...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
