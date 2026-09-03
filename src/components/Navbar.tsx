'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
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
    <header className="sticky top-0 z-50 flat-nav">
      {/* Top Banner - Human conversational message */}
      <div className="bg-emerald-50 border-b border-emerald-100 py-1.5 px-4 text-xs text-center text-emerald-900 font-medium flex items-center justify-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Get your dream phone without selling your mutual funds. Your investments keep growing.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              1Fi<span className="text-emerald-600">.</span>store
            </span>
            <p className="text-[10px] text-slate-500 font-medium">Smart EMI for Investors</p>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Search iPhone, Galaxy, Pixel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/80 border border-slate-200 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </form>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            Explore Phones
          </Link>

          <Link
            href="/orders"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            My Orders
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
