import React, { use } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Order Not Found</h2>
        <p className="text-xs text-slate-500">No order matches the requested tracking number.</p>
        <Link href="/products" className="py-2 px-4 bg-slate-900 text-white font-bold text-xs rounded-xl">
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link href="/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Orders</span>
      </Link>

      {/* Header */}
      <div className="flat-card p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-emerald-50/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200/60 pb-4">
          <div>
            <span className="bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1 w-fit mb-2">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Order Confirmed
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Pledge Ref: <span className="font-mono text-emerald-800 font-bold">{order.mfPledgeId}</span>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-500">Monthly EMI</p>
            <p className="text-2xl font-black text-emerald-700">
              ₹{order.emiMonthlyAmount.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span>
            </p>
            <p className="text-[11px] text-slate-500">{order.emiTenure} Months Tenure</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Pledged <strong>{order.mfPledgedUnits} Units</strong> of <strong>{order.mfFundName}</strong>. Zero portfolio selling — your SIP market returns continue without pause!
          </span>
        </div>
      </div>

      {/* Fulfillment Status Timeline */}
      <div className="flat-card p-6 rounded-3xl border border-slate-200 bg-white space-y-6">
        <h3 className="font-bold text-slate-900 text-base">Fulfillment Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-2 relative">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.done ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pl-9">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Item & Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flat-card p-6 rounded-3xl border border-slate-200 bg-white space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Device Ordered</h4>
          <div className="text-xs space-y-1 text-slate-600">
            <p className="font-bold text-emerald-700 text-sm">{order.product?.name || 'Flagship Smartphone'}</p>
            <p>Finish: {order.variantColor}</p>
            <p>Storage: {order.variantStorage}</p>
            <p className="text-slate-900 font-bold pt-1">Total Value: ₹{order.totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="flat-card p-6 rounded-3xl border border-slate-200 bg-white space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Delivery Address</h4>
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900">{order.userName}</p>
            <p>{order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            <p className="text-slate-500 pt-1">Mobile: {order.userPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
