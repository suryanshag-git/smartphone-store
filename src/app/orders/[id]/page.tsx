'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/left';
import LinkComponent from 'next/link';
import { ShieldCheck, CheckCircle, ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { Order } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [realtimeActive, setRealtimeActive] = useState(false);

  // Fetch initial order details
  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      }
    } catch (e) {
      console.error('Failed to load order:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    // Supabase Real-Time WebSocket Channel Subscription
    if (isSupabaseConfigured()) {
      setRealtimeActive(true);
      const channel = supabase
        .channel(`order-channel-${orderId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'Order',
            filter: `orderNumber=eq.${orderId}`,
          },
          (payload) => {
            console.log('Realtime Order Update Received via Supabase:', payload);
            if (payload.new) {
              setOrder((prev) => (prev ? { ...prev, ...payload.new } : (payload.new as Order)));
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-[var(--muted)]">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4 text-[var(--foreground)]">
        <h2 className="font-serif text-2xl font-bold">Order Not Found</h2>
        <p className="text-xs text-[var(--muted)]">No order matches tracking number #{orderId}.</p>
        <LinkComponent href="/products" className="inline-block py-2 px-4 bg-[var(--foreground)] text-[var(--card)] font-bold text-xs rounded-xl">
          Back to Store
        </LinkComponent>
      </div>
    );
  }

  const steps = [
    { title: 'Mutual Fund Backing Verified', desc: `Units pledged in ${order.mfFundName}`, done: true },
    { title: 'Credit Approved', desc: 'Zero portfolio selling confirmed', done: true },
    { title: 'Phone Dispatched', desc: 'Express Courier Transit', done: order.status === 'DISPATCHED' || order.status === 'DELIVERED' },
    { title: 'Doorstep Delivery', desc: 'Estimated within 48 Hours', done: order.status === 'DELIVERED' },
  ];

  const shippingAddr = typeof order.shippingAddress === 'string' ? JSON.parse(order.shippingAddress) : order.shippingAddress;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--foreground)]">
      <LinkComponent href="/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Orders</span>
      </LinkComponent>

      {/* Header Banner */}
      <div className="pearl-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Order Placed
              </span>

              {realtimeActive && (
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                  <RefreshCw className="w-2.5 h-2.5" />
                  Supabase Realtime Live
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Pledge Ref: <span className="font-mono text-[var(--foreground)] font-bold">{order.mfPledgeId}</span>
            </p>
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
            Pledged <strong>{order.mfPledgedUnits} Units</strong> of <strong>{order.mfFundName}</strong>. Zero portfolio selling — your market returns continue uninterrupted.
          </span>
        </div>
      </div>

      {/* Fulfillment Status Timeline */}
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

      {/* Item & Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="pearl-card p-6 rounded-3xl space-y-3">
          <h4 className="font-serif font-bold text-base">Device Ordered</h4>
          <div className="text-xs space-y-1 text-[var(--muted)]">
            <p className="font-bold text-[var(--foreground)] text-sm">{order.product?.name || 'Flagship Smartphone'}</p>
            <p>Finish: {order.variantColor}</p>
            <p>Storage: {order.variantStorage}</p>
            <p className="text-[var(--foreground)] font-bold pt-1">Total Price: ₹{order.totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="pearl-card p-6 rounded-3xl space-y-3">
          <h4 className="font-serif font-bold text-base">Delivery Address</h4>
          <div className="text-xs text-[var(--muted)] space-y-1">
            <p className="font-bold text-[var(--foreground)]">{order.userName}</p>
            <p>{shippingAddr?.street}</p>
            <p>{shippingAddr?.city}, {shippingAddr?.state} - {shippingAddr?.pincode}</p>
            <p className="text-[var(--muted)] pt-1">Mobile: {order.userPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
