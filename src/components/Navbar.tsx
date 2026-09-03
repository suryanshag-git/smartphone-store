'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Search, PhoneCall, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-emerald-900/40 border-b border-emerald-500/20 py-1.5 px-4 text-xs text-center text-emerald-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>Buy Flagship Phones with <strong>0% Portfolio Liquidation</strong> using Mutual Fund Backed EMI Plans</span>
        <span className="hidden md:inline bg-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] text-emerald-300 font-semibold border border-emerald-500/30">Instant Approval</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                1Fi<span className="text-emerald-400">.</span>Store
              </span>
              <span className="text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                MF-EMI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Smartphones on Mutual Fund Credit</p>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search iPhone 17 Pro, Galaxy S24 Ultra, Pixel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </form>

        {/* Quick Nav Items */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            Browse Catalog
          </Link>

          <Link
            href="/orders"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Track Order
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:border-emerald-500/40 hover:text-emerald-400 transition-all group"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
