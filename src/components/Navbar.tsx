'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 pearl-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo - Slate */}
        <Link href="/" className="flex items-baseline gap-1 group">
          <span className="font-serif text-2xl font-black tracking-tight text-[var(--foreground)]">
            Slate<span className="text-amber-600">.</span>
          </span>
        </Link>

        {/* Minimal Navigation & Controls */}
        <div className="flex items-center gap-5">
          <Link
            href="/products"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Explore
          </Link>

          <Link
            href="/orders"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Orders
          </Link>

          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-light)] transition-colors"
            title={`Switch to ${theme === 'pearl' ? 'Dark' : 'Pearl'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'pearl' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full text-[var(--foreground)] hover:bg-[var(--accent-light)] transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--foreground)] text-[var(--card)] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
