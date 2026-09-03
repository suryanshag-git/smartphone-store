'use client';

import React from 'react';
import { EMIPlan, ProductVariant, Product } from '@/types';
import { X, ShieldCheck, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
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

  const estimatedMFGrowth = Math.round(P * Math.pow(1 + 0.14, N / 12) - P);

  const handleCheckoutProceed = () => {
    addToCart(product, selectedVariant, selectedPlan);
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Plan Review
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {product.name} ({selectedVariant.storage})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Human Friendly MF Explanation Box */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>How your mutual fund backing works</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            By pledging <strong>₹{(P * 1.05).toLocaleString('en-IN')}</strong> of your existing mutual fund investments, you get instant credit approval without selling any units.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-bold pt-1 border-t border-emerald-200/60">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Expected SIP growth preserved: ~₹{estimatedMFGrowth.toLocaleString('en-IN')} over {N} months!</span>
          </div>
        </div>

        {/* Pricing Summary Table */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Smartphone Device Price ({selectedVariant.storage})</span>
            <span className="font-semibold text-slate-900">₹{P.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span>Selected Tenure</span>
            <span className="font-semibold text-slate-900">{N} Months ({R === 0 ? '0% Interest' : `${R}% p.a.`})</span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span>Monthly Installment</span>
            <span className="font-bold text-emerald-700">₹{monthlyInstallment.toLocaleString('en-IN')}/mo</span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span>Total Interest</span>
            <span className="font-semibold text-slate-900">₹{totalInterest.toLocaleString('en-IN')}</span>
          </div>

          {cashback > 0 && (
            <div className="flex justify-between text-xs text-emerald-700 font-bold pt-2 border-t border-slate-200">
              <span>Instant Cashback</span>
              <span>-₹{cashback.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
            <span>Net Effective Total</span>
            <span className="text-emerald-700 text-base">₹{netEffectivePayable.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Change Plan
          </button>

          <button
            onClick={handleCheckoutProceed}
            className="w-2/3 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
