'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGallery } from '@/components/ProductGallery';
import { EMISelectionEngine } from '@/components/EMISelectionEngine';
import { MFTrustBanner } from '@/components/MFTrustBanner';
import { EMIBreakdownModal } from '@/components/EMIBreakdownModal';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { Product, ProductVariant, EMIPlan } from '@/types';
import { Star, ShieldCheck, Sparkles, AlertCircle, Cpu, Camera, Battery, Smartphone } from 'lucide-react';

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

          // Resolve variant based on URL search parameters
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

          // Set default EMI plan (pre-select 6 months or zero-percent plan)
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
        <div className="h-8 w-64 bg-slate-800 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-[500px] bg-slate-900 rounded-3xl" />
          <div className="lg:col-span-7 space-y-6">
            <div className="h-10 w-3/4 bg-slate-800 rounded-lg" />
            <div className="h-6 w-1/3 bg-slate-800 rounded-lg" />
            <div className="h-32 bg-slate-900 rounded-2xl" />
            <div className="h-64 bg-slate-900 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-emerald-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Smartphone Product Not Found</h2>
        <p className="text-xs text-slate-400">The product slug you requested does not exist in our dataset.</p>
      </div>
    );
  }

  const parsedSpecs = product.specs ? JSON.parse(product.specs) : {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 lg:pb-12">
      {/* Desktop 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Sticky Desktop Showcase) */}
        <div className="lg:col-span-5">
          <ProductGallery
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={(v) => setSelectedVariant(v)}
          />
        </div>

        {/* Right Column (Scrollable Product Info & EMI Selection Engine) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Brand & Badge Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold uppercase px-3 py-1 rounded-full">
                {product.brand}
              </span>
              {product.badge && (
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-md font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span>({product.reviewCount} Verified Buyers)</span>
              <span className="text-emerald-400 font-semibold">• In Stock ({selectedVariant.stockCount} units available)</span>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-white">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-slate-500 line-through font-medium">
                MRP: ₹{selectedVariant.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Inclusive of all taxes • Free express doorstep delivery & setup
            </p>
          </div>

          {/* Mutual Fund Trust Banner */}
          <MFTrustBanner />

          {/* Key Hardware Specs Chips */}
          {parsedSpecs && Object.keys(parsedSpecs).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {parsedSpecs.display && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Display</p>
                  <p className="text-xs text-slate-200 font-medium line-clamp-1">{parsedSpecs.display}</p>
                </div>
              )}
              {parsedSpecs.chipset && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <Cpu className="w-4 h-4 text-teal-400" />
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Processor</p>
                  <p className="text-xs text-slate-200 font-medium line-clamp-1">{parsedSpecs.chipset}</p>
                </div>
              )}
              {parsedSpecs.camera && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Camera</p>
                  <p className="text-xs text-slate-200 font-medium line-clamp-1">{parsedSpecs.camera}</p>
                </div>
              )}
            </div>
          )}

          {/* EMI Selection Engine (Tenure Cards 3, 6, 12, 24, 36, 48, 60 months) */}
          {product.emiPlans && selectedPlan && (
            <div className="pt-4 border-t border-slate-800">
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

      {/* Review Modal / Drawer */}
      {selectedPlan && (
        <EMIBreakdownModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
          selectedVariant={selectedVariant}
          selectedPlan={selectedPlan}
        />
      )}

      {/* Mobile Sticky Bottom Bar */}
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
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading device options...</div>}>
      <ProductDetailContent slug={resolvedParams.slug} />
    </Suspense>
  );
}
