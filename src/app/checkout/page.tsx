'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, MapPin, ArrowRight, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [userType, setUserType] = useState<'guest' | 'authenticated'>('guest');
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [street, setStreet] = useState('Flat 402, Cyber Towers, Hitec City');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [pincode, setPincode] = useState('500081');

  const [portfolio, setPortfolio] = useState<any>(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cartItem = cart[0];

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch(`/api/mf-portfolio?phone=${phone}`);
        const data = await res.json();
        if (data.success) {
          setPortfolio(data.portfolio);
        }
      } catch (e) {
        console.error('Failed to load portfolio:', e);
      } finally {
        setLoadingPortfolio(false);
      }
    }
    fetchPortfolio();
  }, [phone]);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4 text-[var(--foreground)]">
        <AlertCircle className="w-10 h-10 text-[var(--muted)] mx-auto" />
        <h2 className="font-serif text-2xl font-bold">Your Cart is Empty</h2>
        <button
          onClick={() => router.push('/products')}
          className="py-2.5 px-6 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const P = cartItem.selectedVariant.price;
  const N = cartItem.selectedPlan.tenureMonths;
  const R = cartItem.selectedPlan.annualInterestRate;
  const monthlyAmount = R === 0
    ? Math.round(P / N)
    : Math.round((P * (1 + (R * N) / 1200)) / N);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacingOrder(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userType,
          userEmail: email,
          userName: name,
          userPhone: phone,
          shippingAddress: { street, city, state, pincode },
          totalAmount: P,
          emiMonthlyAmount: monthlyAmount,
          emiTenure: N,
          emiPlanId: cartItem.selectedPlan.id,
          productId: cartItem.product.id,
          variantColor: cartItem.selectedVariant.color,
          variantStorage: cartItem.selectedVariant.storage,
          mfFundName: portfolio?.holdings?.[0]?.fundName || 'HDFC Top 100 Fund - Growth',
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        clearCart();
        router.push(`/orders/${data.order.orderNumber}`);
      } else {
        setErrorMsg(data.error || 'Failed to place order');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('An unexpected error occurred during checkout');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--foreground)]">
      {/* Title */}
      <div className="border-b border-[var(--border)] pb-4">
        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">
          Checkout
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">
          Complete Your Purchase
        </h1>
      </div>

      {/* Guest vs Sign In Toggle */}
      <div className="flex items-center gap-3 bg-[var(--card)] p-1.5 rounded-2xl border border-[var(--border)] max-w-md">
        <button
          type="button"
          onClick={() => setUserType('guest')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            userType === 'guest'
              ? 'bg-[var(--foreground)] text-[var(--card)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Guest Checkout
        </button>
        <button
          type="button"
          onClick={() => setUserType('authenticated')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            userType === 'authenticated'
              ? 'bg-[var(--foreground)] text-[var(--card)] shadow-xs'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Sign In
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="pearl-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 font-serif font-bold text-base">
              <MapPin className="w-4 h-4 text-[var(--muted)]" />
              <span>Delivery Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[var(--muted)]">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-2.5 text-xs text-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--muted)]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-2.5 text-xs text-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--muted)]">Mobile Number (MF Linked)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-2.5 text-xs text-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[var(--muted)]">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-2.5 text-xs text-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--muted)]">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-2.5 text-xs text-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--muted)]">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-2.5 text-xs text-[var(--foreground)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* MF Credit Verification */}
          <div className="pearl-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif font-bold text-base">
                <ShieldCheck className="w-4 h-4 text-[var(--muted)]" />
                <span>Mutual Fund Credit Verification</span>
              </div>
              <span className="text-[10px] font-bold text-[var(--foreground)] bg-[var(--accent-light)] px-2 py-0.5 rounded">
                Pre-Approved
              </span>
            </div>

            {loadingPortfolio ? (
              <div className="text-xs text-[var(--muted)] py-2">Verifying portfolio credit...</div>
            ) : portfolio ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[var(--muted)] uppercase font-semibold">Total Portfolio</p>
                    <p className="font-serif text-base font-bold">
                      ₹{portfolio.totalPortfolioValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[var(--muted)] uppercase font-semibold">Credit Limit</p>
                    <p className="font-serif text-base font-bold">
                      ₹{portfolio.eligiblePledgeLimit.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Column Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="pearl-card p-6 rounded-3xl space-y-5 sticky top-24">
            <h3 className="font-serif font-bold text-base border-b border-[var(--border)] pb-3">
              Order Summary
            </h3>

            <div className="flex gap-4 items-center">
              <img
                src={cartItem.selectedVariant.image}
                alt={cartItem.product.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="font-serif font-bold text-sm">{cartItem.product.name}</h4>
                <p className="text-[11px] text-[var(--muted)]">
                  {cartItem.selectedVariant.color} • {cartItem.selectedVariant.storage}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[var(--border)] text-xs">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Device Price</span>
                <span className="font-bold text-[var(--foreground)]">₹{P.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[var(--muted)]">
                <span>Plan ({N} Months)</span>
                <span className="font-bold text-[var(--foreground)]">₹{monthlyAmount.toLocaleString('en-IN')}/mo</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={placingOrder}
              className="w-full py-4 rounded-2xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all disabled:opacity-50"
            >
              {placingOrder ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
