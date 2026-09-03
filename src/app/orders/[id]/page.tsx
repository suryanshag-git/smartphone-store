import React, { use } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Truck, Calendar, ArrowLeft, Building, Sparkles } from 'lucide-react';
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
        <h2 className="text-2xl font-bold text-white">Order Not Found</h2>
        <p className="text-xs text-slate-400">No order matches the requested tracking ID.</p>
        <Link href="/products" className="py-2 px-4 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl">
          Back to Store
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'MF Lien Created', desc: `Units locked in ${order.mfFundName}`, done: true },
    { title: 'Credit Limit Approved', desc: '0% liquidation verified by CAMS', done: true },
    { title: 'Smartphone Dispatched', desc: 'Express Courier Transit', done: true },
    { title: 'Doorstep Delivery', desc: 'Estimated within 48 Hours', done: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link href="/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Orders</span>
      </Link>

      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 w-fit mb-2">
              <Sparkles className="w-3 h-3" />
              Order Placed Successfully
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Pledge ID: <span className="font-mono text-emerald-400 font-bold">{order.mfPledgeId}</span>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-400">Monthly EMI</p>
            <p className="text-2xl font-black text-emerald-400">
              ₹{order.emiMonthlyAmount.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-400">/mo</span>
            </p>
            <p className="text-[11px] text-slate-500">{order.emiTenure} Months Tenure</p>
          </div>
        </div>

        {/* Mutual Fund Collateral Details */}
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Pledged <strong>{order.mfPledgedUnits} Units</strong> of <strong>{order.mfFundName}</strong>. 0% portfolio liquidation — your SIP compounding returns continue unaffected!
          </span>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="font-bold text-white text-base">Fulfillment Status Timeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-2 relative">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.done ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' : 'bg-slate-800 text-slate-500'
                }`}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold ${step.done ? 'text-white' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pl-9">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Item & Shipping Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm">Ordered Device</h4>
          <div className="text-xs space-y-1">
            <p className="font-bold text-emerald-400">{order.product?.name || 'Flagship Smartphone'}</p>
            <p className="text-slate-400">Color Finish: {order.variantColor}</p>
            <p className="text-slate-400">Storage Option: {order.variantStorage}</p>
            <p className="text-slate-300 font-semibold pt-1">Total Value: ₹{order.totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm">Delivery Address</h4>
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-bold text-white">{order.userName}</p>
            <p>{order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            <p className="text-slate-400 pt-1">Phone: {order.userPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
