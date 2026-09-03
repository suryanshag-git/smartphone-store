'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="flat-card rounded-2xl overflow-hidden flex flex-col justify-between group relative border border-slate-200/80 bg-white">
      {/* Top Badges */}
      <div className="p-4 flex items-center justify-between gap-2 z-10">
        <span className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
          {product.brand}
        </span>

        {zeroPercentPlan ? (
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            0% Interest Available
          </span>
        ) : (
          product.badge && (
            <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md">
              {product.badge}
            </span>
          )
        )}
      </div>

      {/* Product Image */}
      <Link
        href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}
        className="px-6 py-4 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300"
      >
        <div className="w-44 h-44 relative">
          <img
            src={primaryVariant.image}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-md"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span>({product.reviewCount} reviews)</span>
          </div>

          <Link href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color Swatches */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mr-1">Finishes:</span>
            {product.variants.slice(0, 4).map((v) => (
              <span
                key={v.id}
                style={{ backgroundColor: v.colorHex }}
                className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                title={v.color}
              />
            ))}
          </div>
        )}

        {/* Price & EMI Pill */}
        <div className="pt-2 border-t border-slate-200/60 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">Price: </span>
              <span className="text-sm font-extrabold text-slate-900">
                ₹{primaryVariant.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                ₹{primaryVariant.mrp.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* EMI Pill */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Starts from</p>
              <p className="text-sm font-extrabold text-emerald-700">
                ₹{lowestEmi.toLocaleString('en-IN')}
                <span className="text-[11px] text-slate-500 font-normal">/mo</span>
              </p>
            </div>

            {cashbackTag && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 max-w-[130px] truncate">
                {cashbackTag}
              </span>
            )}
          </div>
        </div>

        {/* Action CTA */}
        <Link
          href={`/products/${product.slug}?color=${primaryVariant.colorSlug}&storage=${primaryVariant.storageSlug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <span>View Plans</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
