import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { Package, ArrowRight } from 'lucide-react';
import { Order } from '@/types';

async function getOrders(): Promise<Order[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/orders`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.orders || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--foreground)]">
      <div className="border-b border-[var(--border)] pb-4">
        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">
          Orders
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">
          Your Purchases
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="pearl-card p-12 rounded-3xl text-center space-y-4">
          <Package className="w-10 h-10 text-[var(--muted)] mx-auto" />
          <h3 className="font-serif font-bold text-lg">No orders placed yet</h3>
          <Link
            href="/products"
            className="inline-block py-2.5 px-6 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs"
          >
            Explore Phones
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="pearl-card p-6 rounded-2xl space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="font-mono font-bold text-xs text-[var(--muted)]">
                  {ord.orderNumber}
                </span>
                <h4 className="font-serif font-bold text-lg">
                  {ord.product?.name || 'Flagship Smartphone'} ({ord.variantColor}, {ord.variantStorage})
                </h4>
                <p className="text-xs text-[var(--muted)]">
                  Monthly Installment: <strong>₹{ord.emiMonthlyAmount.toLocaleString('en-IN')}/mo</strong> for {ord.emiTenure} Months
                </p>
              </div>

              <Link
                href={`/orders/${ord.orderNumber}`}
                className="py-2.5 px-5 rounded-xl bg-[var(--accent-light)] text-[var(--foreground)] text-xs font-bold hover:bg-[var(--foreground)] hover:text-[var(--card)] flex items-center justify-center gap-2 transition-all shrink-0"
              >
                <span>Track Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
