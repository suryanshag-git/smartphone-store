'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { EMISelectionEngine } from '@/components/EMISelectionEngine';
import { MFTrustBanner } from '@/components/MFTrustBanner';
import { EMIBreakdownModal } from '@/components/EMIBreakdownModal';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { Product, ProductVariant, EMIPlan } from '@/types';
import { AlertCircle } from 'lucide-react';

function ProductDetailContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const colorQuery = searchParams.get('color');
  const storageQuery = searchParams.get('storage');

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success && data.product) {
          const prod: Product = data.product;
          setProduct(prod);

          let initialVariant = prod.variants?.[0];
          if (colorQuery || storageQuery) {
            const found = prod.variants.find((v) => {
              const matchesColor = !colorQuery || v.colorSlug === colorQuery;
              const matchesStorage = !storageQuery || v.storageSlug === storageQuery;
              return matchesColor && matchesStorage;
            });
            if (found) initialVariant = found;
          }
          setSelectedVariant(initialVariant || prod.variants?.[0]);

          const defaultPlan = prod.emiPlans?.find((p) => p.isZeroPercent && p.tenureMonths === 6) || prod.emiPlans?.[0];
          setSelectedPlan(defaultPlan || null);
        }
      } catch (e) {
        console.error('Failed to load product details:', e);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-[var(--border)] rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-[420px] bg-[var(--border)] rounded-3xl" />
          <div className="lg:col-span-7 space-y-6">
            <div className="h-10 w-3/4 bg-[var(--border)] rounded-lg" />
            <div className="h-6 w-1/3 bg-[var(--border)] rounded-lg" />
            <div className="h-24 bg-[var(--border)] rounded-2xl" />
            <div className="h-48 bg-[var(--border)] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-[var(--muted)] mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 lg:pb-12 text-[var(--foreground)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Showcase */}
        <div className="lg:col-span-5">
          <ProductGallery
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={(v) => setSelectedVariant(v)}
          />
        </div>

        {/* Right Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              {product.brand}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="pearl-card p-5 rounded-2xl space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-black">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[var(--muted)] line-through">
                MRP ₹{selectedVariant.mrp.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)]">
              Inclusive of taxes • Free express shipping
            </p>
          </div>

          {/* MF Trust Banner */}
          <MFTrustBanner />

          {/* EMI Selection Engine */}
          {product.emiPlans && selectedPlan && (
            <div className="pt-2">
              <EMISelectionEngine
                emiPlans={product.emiPlans}
                selectedVariant={selectedVariant}
                selectedPlan={selectedPlan}
                onSelectPlan={(plan) => setSelectedPlan(plan)}
                onProceed={() => setIsModalOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedPlan && (
        <EMIBreakdownModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
          selectedVariant={selectedVariant}
          selectedPlan={selectedPlan}
        />
      )}

      {/* Mobile Sticky Bar */}
      {selectedPlan && (
        <MobileStickyBar
          selectedVariant={selectedVariant}
          selectedPlan={selectedPlan}
          onProceed={() => setIsModalOpen(true)}
        />
      )}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return (
    <Suspense fallback={<div className="p-8 text-center text-[var(--muted)]">Loading device options...</div>}>
      <ProductDetailContent slug={resolvedParams.slug} />
    </Suspense>
  );
}
