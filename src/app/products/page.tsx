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
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Smartphone Collection
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Financed by your mutual fund portfolio • Zero portfolio selling
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-56">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl py-1.5 pl-8 pr-3 text-xs text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[var(--muted)] absolute left-2.5 top-2" />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl py-1.5 px-3 text-xs text-[var(--foreground)] font-semibold focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
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
                  className="rounded-2xl border border-[var(--border)] p-5 space-y-4 shimmer-skeleton h-80"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="pearl-card p-12 rounded-3xl text-center space-y-4">
              <AlertCircle className="w-8 h-8 text-[var(--muted)] mx-auto" />
              <div>
                <h3 className="font-serif font-bold text-[var(--foreground)] text-lg">No smartphones match</h3>
                <p className="text-xs text-[var(--muted)] mt-1">Try adjusting your filters.</p>
              </div>
              <button
                onClick={resetFilters}
                className="py-2 px-4 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs"
              >
                Reset Filters
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
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-center text-[var(--muted)]">Loading catalog...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
