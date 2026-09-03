'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
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

  const zeroPercentPlan = product.emiPlans?.find((p) => p.isZeroPercent);
  const cashbackTag = product.emiPlans?.find((p) => p.cashbackAmount > 0)?.cashbackTag;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group relative border border-slate-800">
      {/* Top Badges */}
      <div className="p-4 flex items-center justify-between gap-2 z-10">
        <span className="bg-slate-900/80 border border-slate-700/80 text-slate-300 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full backdrop-blur-md">
          {product.brand}
        </span>

        {zeroPercentPlan ? (
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            0% Interest EMI
          </span>
        ) : (
          product.badge && (
            <span className="bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )
        )}
      </div>

      {/* Product Image Showcase */}
      <Link href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`} className="px-6 py-4 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
        <div className="w-48 h-48 relative">
          <img
            src={primaryVariant.image}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-2xl"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5 bg-slate-950/40 border-t border-slate-800/80 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">MF Collateral Backed</span>
          </div>

          <Link href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}>
            <h3 className="font-bold text-slate-100 text-base group-hover:text-emerald-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color Swatch Dots */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mr-1">Finishes:</span>
            {product.variants.slice(0, 4).map((v) => (
              <span
                key={v.id}
                style={{ backgroundColor: v.colorHex }}
                className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                title={v.color}
              />
            ))}
          </div>
        )}

        {/* Price & EMI Breakdown */}
        <div className="pt-2 border-t border-slate-800/60 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Price: </span>
              <span className="text-sm font-extrabold text-white">
                ₹{primaryVariant.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 line-through ml-1.5 font-medium">
                ₹{primaryVariant.mrp.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* EMI Highlight Pill */}
          <div className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">MF EMI Starts At</p>
              <p className="text-sm font-black text-emerald-400">
                ₹{lowestEmi.toLocaleString('en-IN')}
                <span className="text-[11px] text-slate-400 font-normal">/mo</span>
              </p>
            </div>

            {cashbackTag && (
              <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 max-w-[130px] truncate">
                {cashbackTag}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
        >
          <span>Select EMI Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
