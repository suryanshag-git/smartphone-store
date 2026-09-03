'use client';

import React from 'react';
import { EMIPlan, ProductVariant, Product } from '@/types';
import { X, ShieldCheck, TrendingUp, CheckCircle, ArrowRight, Wallet, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl shadow-slate-950 relative overflow-hidden">
        {/* Top Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Financing Plan Review
            </span>
            <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
              {product.name} ({selectedVariant.storage})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mutual Fund Collateral Pledge Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mutual Fund Credit Lock Active</span>
          </div>
          <p className="text-xs text-slate-300">
            Pledging <strong>₹{(P * 1.05).toLocaleString('en-IN')}</strong> worth of your MF folio preserves 100% of your holdings while funding this purchase.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1 border-t border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Estimated SIP Growth Saved: +₹{estimatedMFGrowth.toLocaleString('en-IN')} during tenure!</span>
          </div>
        </div>

        {/* Financial Calculation Breakdown Table */}
        <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between text-xs text-slate-300">
            <span>Smartphone Device Price ({selectedVariant.storage})</span>
            <span className="font-semibold text-white">₹{P.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-300">
            <span>Selected Tenure</span>
            <span className="font-semibold text-white">{N} Months ({R === 0 ? '0% Interest' : `${R}% p.a.`})</span>
          </div>

          <div className="flex justify-between text-xs text-slate-300">
            <span>Monthly Installment</span>
            <span className="font-bold text-emerald-400">₹{monthlyInstallment.toLocaleString('en-IN')}/mo</span>
          </div>

          <div className="flex justify-between text-xs text-slate-300">
            <span>Total Interest Payable</span>
            <span className="font-semibold text-white">₹{totalInterest.toLocaleString('en-IN')}</span>
          </div>

          {cashback > 0 && (
            <div className="flex justify-between text-xs text-emerald-400 font-semibold pt-2 border-t border-slate-800">
              <span>Instant MF Cashback Discount</span>
              <span>-₹{cashback.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
            <span>Net Effective Payable</span>
            <span className="text-emerald-400 text-base">₹{netEffectivePayable.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Modify Selection
          </button>

          <button
            onClick={handleCheckoutProceed}
            className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-transform active:scale-[0.98]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
