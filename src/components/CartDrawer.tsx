'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>Your MF Credit Cart</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Browse flagship smartphones and unlock 0% interest EMI backed by your mutual funds.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="py-2.5 px-5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Browse Smartphones
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.map((item) => {
                const P = item.selectedVariant.price;
                const N = item.selectedPlan.tenureMonths;
                const R = item.selectedPlan.annualInterestRate;
                const monthly = R === 0
                  ? Math.round(P / N)
                  : Math.round((P * (1 + (R * N) / 1200)) / N);

                return (
                  <div
                    key={item.selectedVariant.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex gap-3 relative group"
                  >
                    <img
                      src={item.selectedVariant.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain shrink-0"
                    />

                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-xs text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {item.selectedVariant.color} • {item.selectedVariant.storage}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-emerald-400">
                          ₹{monthly.toLocaleString('en-IN')}/mo
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({N} Months)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.selectedVariant.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors self-start"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-4">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero MF portfolio liquidation • Instant digital approval</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-transform active:scale-[0.98]"
              >
                <span>Checkout Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
