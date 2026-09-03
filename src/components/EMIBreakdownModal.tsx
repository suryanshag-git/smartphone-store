'use client';

import React from 'react';
import { EMIPlan, ProductVariant, Product } from '@/types';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface EMIBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan;
}

export const EMIBreakdownModal: React.FC<EMIBreakdownModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedPlan,
}) => {
  const { addToCart } = useCart();
  const router = useRouter();

  if (!isOpen || !selectedPlan || !selectedVariant) return null;

  const P = selectedVariant.price;
  const N = selectedPlan.tenureMonths;
  const R = selectedPlan.annualInterestRate;

  const monthlyInstallment = R === 0
    ? Math.round(P / N)
    : Math.round((P * (1 + (R * N) / 1200)) / N);

  const totalPayableRaw = monthlyInstallment * N;
  const totalInterest = Math.max(0, totalPayableRaw - P);
  const cashback = selectedPlan.cashbackAmount || 0;
  const netEffectivePayable = Math.max(0, totalPayableRaw - cashback);

  const handleCheckoutProceed = () => {
    addToCart(product, selectedVariant, selectedPlan);
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[var(--card)] rounded-3xl border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-[var(--foreground)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Plan Summary</span>
            <h2 className="font-serif text-xl font-bold tracking-tight mt-0.5">
              {product.name} ({selectedVariant.storage})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] rounded-full bg-[var(--accent-light)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Summary */}
        <div className="space-y-3 bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)]">
          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>Smartphone Device Price</span>
            <span className="font-bold text-[var(--foreground)]">₹{P.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>Selected Tenure</span>
            <span className="font-bold text-[var(--foreground)]">{N} Months ({R === 0 ? '0% Interest' : `${R}% p.a.`})</span>
          </div>

          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>Monthly Installment</span>
            <span className="font-bold text-[var(--foreground)]">₹{monthlyInstallment.toLocaleString('en-IN')}/mo</span>
          </div>

          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>Total Interest</span>
            <span className="font-bold text-[var(--foreground)]">₹{totalInterest.toLocaleString('en-IN')}</span>
          </div>

          {cashback > 0 && (
            <div className="flex justify-between text-xs font-bold text-amber-600 pt-2 border-t border-[var(--border)]">
              <span>Instant Cashback</span>
              <span>-₹{cashback.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between text-sm font-black pt-2 border-t border-[var(--border)]">
            <span>Net Total</span>
            <span className="text-base text-[var(--foreground)]">₹{netEffectivePayable.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-xl bg-[var(--accent-light)] text-[var(--muted)] font-bold text-xs hover:text-[var(--foreground)] transition-colors"
          >
            Change
          </button>

          <button
            onClick={handleCheckoutProceed}
            className="w-2/3 py-3.5 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
