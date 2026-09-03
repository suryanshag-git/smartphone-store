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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-emerald-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">Please select a smartphone product to proceed with checkout.</p>
        <button
          onClick={() => router.push('/products')}
          className="py-2.5 px-6 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
        >
          Explore Smartphones
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
          Checkout
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Complete Your Order
        </h1>
      </div>

      {/* Guest vs Sign In Toggle */}
      <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-md">
        <button
          type="button"
          onClick={() => setUserType('guest')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            userType === 'guest'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Guest Checkout (MVP Demo)
        </button>
        <button
          type="button"
          onClick={() => setUserType('authenticated')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            userType === 'authenticated'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          1Fi Account Sign In
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="flat-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Delivery Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-600">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Mobile Number (MF Linked)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-600">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* MF Portfolio Credit Section */}
          <div className="flat-card p-6 rounded-3xl border border-emerald-200 bg-emerald-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Mutual Fund Credit Limit</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                100% Pre-Approved
              </span>
            </div>

            {loadingPortfolio ? (
              <div className="text-xs text-slate-500 py-4">Verifying CAMS/KFintech folio credit limits...</div>
            ) : portfolio ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Portfolio Value</p>
                    <p className="text-base font-black text-slate-900">
                      ₹{portfolio.totalPortfolioValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Eligible Credit Limit</p>
                    <p className="text-base font-black text-emerald-700">
                      ₹{portfolio.eligiblePledgeLimit.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Pledged Mutual Fund Folios:
                  </p>
                  {portfolio.holdings?.map((h: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{h.fundName}</p>
                        <p className="text-[10px] text-slate-500">Folio #{h.folionumber} • {h.units} Units</p>
                      </div>
                      <span className="text-emerald-700 font-bold text-xs">{h.annualizedReturn} Return</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flat-card p-6 rounded-3xl border border-slate-200 bg-white space-y-5 sticky top-24">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            <div className="flex gap-4 items-center">
              <img
                src={cartItem.selectedVariant.image}
                alt={cartItem.product.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="font-bold text-xs text-slate-900">{cartItem.product.name}</h4>
                <p className="text-[11px] text-slate-500">
                  {cartItem.selectedVariant.color} • {cartItem.selectedVariant.storage}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Smartphone Price</span>
                <span className="font-bold text-slate-900">₹{P.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Selected Plan ({N} Months)</span>
                <span className="font-bold text-emerald-700">₹{monthlyAmount.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Upfront Down Payment</span>
                <span className="font-bold text-emerald-700">₹0 (Zero Down Payment)</span>
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
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.005] active:scale-[0.995] disabled:opacity-50"
            >
              {placingOrder ? (
                <span>Placing Your Order...</span>
              ) : (
                <>
                  <span>Place Order with MF Backing</span>
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
