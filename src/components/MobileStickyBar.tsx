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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 flat-nav border-t border-slate-200 shadow-xl flex items-center justify-between gap-3 bg-white">
      <div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>{N} Month Plan</span>
        </div>

        <div className="text-lg font-black text-slate-900 tracking-tight">
          ₹{monthlyInstallment.toLocaleString('en-IN')}
          <span className="text-xs font-normal text-slate-500">/mo</span>
        </div>
      </div>

      <button
        onClick={onProceed}
        className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-transform active:scale-[0.98]"
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
