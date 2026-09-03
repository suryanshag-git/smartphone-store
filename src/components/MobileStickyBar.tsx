'use client';

import React from 'react';
import { EMIPlan, ProductVariant } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan;
  onProceed: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  selectedVariant,
  selectedPlan,
  onProceed,
}) => {
  if (!selectedVariant || !selectedPlan) return null;

  const P = selectedVariant.price;
  const N = selectedPlan.tenureMonths;
  const R = selectedPlan.annualInterestRate;

  const monthlyInstallment = R === 0
    ? Math.round(P / N)
    : Math.round((P * (1 + (R * N) / 1200)) / N);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 glass-nav border-t border-emerald-500/20 shadow-2xl shadow-slate-950 flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>{N}M MF-EMI</span>
        </div>

        <div className="text-lg font-black text-emerald-400 tracking-tight">
          ₹{monthlyInstallment.toLocaleString('en-IN')}
          <span className="text-xs font-normal text-slate-400">/mo</span>
        </div>
      </div>

      <button
        onClick={onProceed}
        className="py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-transform active:scale-[0.98]"
      >
        <span>Proceed</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
