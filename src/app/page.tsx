import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { ProductCard } from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
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
      <section className="pt-16 pb-12 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
            ZERO BREAK ON RETURNS • INSTANT APPROVAL
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-black tracking-tight text-[var(--foreground)] leading-tight">
            Why break your investments for a new phone?{' '}
            <span className="italic font-normal">Keep your investments growing.</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted)] max-w-xl mx-auto font-normal leading-relaxed">
            Get 0% interest EMI backed by your mutual funds. Your investments stay 100% untouched and earning market returns.
          </p>

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 py-3.5 px-7 rounded-2xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs tracking-wide shadow-sm hover:opacity-90 transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Smartphones Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              Curated Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight mt-0.5">
              Available Flagships
            </h2>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-[var(--foreground)] hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>View all ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
