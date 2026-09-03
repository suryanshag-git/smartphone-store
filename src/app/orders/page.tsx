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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
          My Orders
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Your Smartphone Orders
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="flat-card p-12 rounded-3xl text-center space-y-4 border border-slate-200 bg-white">
          <Package className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">No orders placed yet</h3>
          <p className="text-xs text-slate-500">
            Browse smartphones and order with zero mutual fund portfolio selling.
          </p>
          <Link
            href="/products"
            className="inline-block py-2.5 px-6 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
          >
            Explore Phones
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="flat-card p-6 rounded-2xl border border-slate-200 bg-white space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-800 text-sm">
                    {ord.orderNumber}
                  </span>
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    MF Lien Active
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {ord.product?.name || 'Flagship Smartphone'} ({ord.variantColor}, {ord.variantStorage})
                </h4>
                <p className="text-xs text-slate-600">
                  Monthly Installment: <strong>₹{ord.emiMonthlyAmount.toLocaleString('en-IN')}/mo</strong> for {ord.emiTenure} Months
                </p>
              </div>

              <Link
                href={`/orders/${ord.orderNumber}`}
                className="py-2.5 px-5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:border-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-2 transition-all shrink-0"
              >
                <span>Track Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
