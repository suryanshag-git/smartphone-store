'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--card)] border-l border-[var(--border)] p-6 flex flex-col justify-between shadow-2xl text-[var(--foreground)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-2 font-serif text-lg font-bold">
              <ShoppingBag className="w-4 h-4" />
              <span>Shopping Cart</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] rounded-full bg-[var(--accent-light)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--muted)]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[var(--foreground)] text-lg">Your cart is empty</h4>
                <p className="text-xs text-[var(--muted)] mt-1 max-w-xs">
                  Explore smartphones and find a monthly plan that fits your budget.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="py-2.5 px-5 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs hover:opacity-90 transition-colors"
              >
                Explore Smartphones
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
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
                    className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex gap-3 relative"
                  >
                    <img
                      src={item.selectedVariant.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain shrink-0"
                    />

                    <div className="flex-1 space-y-1">
                      <h4 className="font-serif font-bold text-xs text-[var(--foreground)] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[var(--muted)]">
                        {item.selectedVariant.color} • {item.selectedVariant.storage}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-[var(--foreground)]">
                          ₹{monthly.toLocaleString('en-IN')}/mo
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">
                          ({N} Months)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.selectedVariant.id)}
                      className="text-[var(--muted)] hover:text-red-500 p-1 transition-colors self-start"
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
            <div className="border-t border-[var(--border)] pt-4 space-y-4">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[var(--foreground)] hover:opacity-90 text-[var(--card)] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
