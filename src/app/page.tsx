import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { ProductCard } from '@/components/ProductCard';
import { ShieldCheck, TrendingUp, Sparkles, ArrowRight, Zap, RefreshCw, Smartphone } from 'lucide-react';
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
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/15 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Next-Gen Mutual Fund Backed Financing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Buy Flagship Smartphones on{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              0% Mutual Fund Credit
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Pledge your existing mutual fund investments for instant credit. Keep earning compounding SIP returns while enjoying low-cost monthly EMI plans.
          </p>

          {/* Quick Hero Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>0% Portfolio Liquidation</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>Keep 14%+ Expected SIP CAGR</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Digital Lien Approval</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-950/80 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Flagship Devices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Smartphones Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <Smartphone className="w-4 h-4" />
              <span>Flagship Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Top Smartphones Available on MF EMI
            </h2>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Smartphones ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Smart Fintech Financing
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why Choose Mutual Fund Backed EMI?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Traditional credit cards charge high interest or consume your cash balance. Mutual fund collateral financing lets your money keep growing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                01
              </div>
              <h4 className="font-bold text-white text-base">Zero Portfolio Liquidation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your mutual fund units remain safely in your CAMS/KFintech folio. No exit load, no capital gains tax.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                02
              </div>
              <h4 className="font-bold text-white text-base">Earn While You Pay</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If your mutual funds yield 14%+ annual CAGR, your wealth growth offsets or exceeds your monthly EMI cost.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                03
              </div>
              <h4 className="font-bold text-white text-base">Flexible Tenure Options</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select tenures from 3 to 60 months with special 0% No Cost EMI offers and instant cashback tags.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
