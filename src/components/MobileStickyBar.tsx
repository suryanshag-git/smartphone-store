'use client';

import React from 'react';
import { EMIPlan, ProductVariant } from '@/types';
import { ArrowRight } from 'lucide-react';

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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-[var(--card)] border-t border-[var(--border)] shadow-xl flex items-center justify-between gap-3 text-[var(--foreground)]">
      <div>
        <span className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider block">
          {N} Month Plan
        </span>
        <div className="text-lg font-extrabold tracking-tight">
          ₹{monthlyInstallment.toLocaleString('en-IN')}
          <span className="text-xs font-normal text-[var(--muted)]">/mo</span>
        </div>
      </div>

      <button
        onClick={onProceed}
        className="py-2.5 px-5 rounded-xl bg-[var(--foreground)] text-[var(--card)] font-bold text-xs flex items-center gap-2 shadow-md transition-transform active:scale-[0.98]"
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
