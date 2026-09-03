'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const primaryVariant = product.variants?.[0] || {
    price: product.basePrice,
    mrp: product.mrp,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
    colorHex: '#8A8682',
    colorSlug: 'default',
    storageSlug: '256gb',
  };

  const lowestPlan = product.emiPlans?.[0] || { tenureMonths: 36, isZeroPercent: false, cashbackAmount: 0 };
  const lowestEmi = Math.round(primaryVariant.price / (lowestPlan.tenureMonths || 36));

  return (
    <div className="pearl-card rounded-2xl overflow-hidden flex flex-col justify-between group relative">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}
        className="p-8 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300 bg-[var(--card)]"
      >
        <div className="w-48 h-48 relative">
          <img
            src={primaryVariant.image}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 border-t border-[var(--border)] flex flex-col justify-between flex-1 space-y-4">
        <div>
          <span className="text-[10px] text-[var(--muted)] font-semibold uppercase tracking-wider block mb-1">
            {product.brand}
          </span>

          <Link href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}>
            <h3 className="font-serif font-bold text-[var(--foreground)] text-lg group-hover:text-amber-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Starting EMI */}
        <div className="pt-2 border-t border-[var(--border)] flex items-baseline justify-between">
          <div>
            <span className="text-xs text-[var(--muted)]">Price </span>
            <span className="text-sm font-bold text-[var(--foreground)]">
              ₹{primaryVariant.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[var(--muted)] block">From</span>
            <span className="text-sm font-bold text-[var(--foreground)]">
              ₹{lowestEmi.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-[var(--muted)]">/mo</span>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:opacity-90"
        >
          <span>View Options</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
