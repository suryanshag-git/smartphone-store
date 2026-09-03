import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { ShieldCheck, Package, ArrowRight, Clock } from 'lucide-react';
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
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
          Mutual Fund EMI Orders
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
          Your Smartphone Purchase Orders
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-slate-800">
          <Package className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="font-bold text-white text-base">No orders placed yet</h3>
          <p className="text-xs text-slate-400">
            Browse smartphones and place an order using 0% mutual fund backed EMI plans.
          </p>
          <Link
            href="/products"
            className="inline-block py-2.5 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-emerald-400 text-sm">
                    {ord.orderNumber}
                  </span>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    MF Lien Active ({ord.mfPledgeId})
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">
                  {ord.product?.name || 'Flagship Smartphone'} ({ord.variantColor}, {ord.variantStorage})
                </h4>
                <p className="text-xs text-slate-400">
                  Monthly Installment: <strong>₹{ord.emiMonthlyAmount.toLocaleString('en-IN')}/mo</strong> for {ord.emiTenure} Months
                </p>
              </div>

              <Link
                href={`/orders/${ord.orderNumber}`}
                className="py-2.5 px-5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center gap-2 transition-all shrink-0"
              >
                <span>Track Order Status</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
