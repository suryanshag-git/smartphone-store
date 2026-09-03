import React, { use } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, ArrowLeft } from 'lucide-react';
import { Order } from '@/types';

async function getOrderDetails(id: string): Promise<Order | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/orders/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.order || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const order = await getOrderDetails(resolvedParams.id);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4 text-[var(--foreground)]">
        <h2 className="font-serif text-2xl font-bold">Order Not Found</h2>
        <Link href="/products" className="py-2 px-4 bg-[var(--foreground)] text-[var(--card)] font-bold text-xs rounded-xl">
          Back to Store
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'Mutual Fund Backing Verified', desc: `Units pledged in ${order.mfFundName}`, done: true },
    { title: 'Credit Approved', desc: 'Zero portfolio selling confirmed', done: true },
    { title: 'Phone Dispatched', desc: 'Express Courier Transit', done: true },
    { title: 'Doorstep Delivery', desc: 'Expected within 48 Hours', done: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--foreground)]">
      <Link href="/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Orders</span>
      </Link>

      <div className="pearl-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
              Order Confirmed
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
              Order #{order.orderNumber}
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-[var(--muted)]">Monthly EMI</p>
            <p className="font-serif text-2xl font-bold">
              ₹{order.emiMonthlyAmount.toLocaleString('en-IN')}<span className="text-xs font-normal text-[var(--muted)]">/mo</span>
            </p>
            <p className="text-[11px] text-[var(--muted)]">{order.emiTenure} Months Tenure</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <ShieldCheck className="w-5 h-5 text-[var(--foreground)] shrink-0" />
          <span>
            Pledged <strong>{order.mfPledgedUnits} Units</strong> of <strong>{order.mfFundName}</strong>. Zero portfolio selling — your SIP returns continue uninterrupted.
          </span>
        </div>
      </div>

      {/* Fulfillment Status */}
      <div className="pearl-card p-6 rounded-3xl space-y-6">
        <h3 className="font-serif font-bold text-base">Fulfillment Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.done ? 'bg-[var(--foreground)] text-[var(--card)]' : 'bg-[var(--accent-light)] text-[var(--muted)]'
                }`}>
                  {step.done ? <CheckCircle className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold ${step.done ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                  {step.title}
                </span>
              </div>
              <p className="text-[11px] text-[var(--muted)] pl-8">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
