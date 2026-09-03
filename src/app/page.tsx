import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { ProductCard } from '@/components/ProductCard';
import { ShieldCheck, TrendingUp, Sparkles, ArrowRight, Smartphone, CheckCircle2 } from 'lucide-react';
import { Product } from '@/types';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?sort=featured`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Smart financing for mutual fund investors</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-none">
            Get your next phone.{' '}
            <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
              Keep your investments growing.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Don't sell your mutual funds or break your SIPs. Pay easy monthly installments while your portfolio stays 100% untouched and earning market returns.
          </p>

          {/* Quick Human Value Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Portfolio Selling</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Keep Compounding Returns</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>0% Interest Options</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 py-4 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wide shadow-md shadow-emerald-700/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Flagship Phones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Smartphones Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
              <Smartphone className="w-4 h-4" />
              <span>Popular Smartphones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Choose your phone & monthly plan
            </h2>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
          >
            <span>View all phones ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3 Simple Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flat-card p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Simple 3-Step Process
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How buying on mutual fund credit works
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              No long paperwork, no credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">Select Your Phone & Plan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick your preferred model, storage capacity, and tenure (3 to 60 months).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">Instant Mobile OTP Link</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your mobile number linked to CAMS/KFintech to automatically verify your mutual fund holdings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">Keep Earning Returns</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your mutual funds stay pledged in your folio while you pay your monthly EMI. 100% of your wealth continues to grow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
