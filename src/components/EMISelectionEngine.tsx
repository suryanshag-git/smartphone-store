'use client';

import React from 'react';
import { EMIPlan, ProductVariant } from '@/types';
import { Check, ArrowRight } from 'lucide-react';

interface EMISelectionEngineProps {
  emiPlans: EMIPlan[];
  selectedVariant: ProductVariant;
  selectedPlan: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
  onProceed: () => void;
}

export const EMISelectionEngine: React.FC<EMISelectionEngineProps> = ({
  emiPlans,
  selectedVariant,
  selectedPlan,
  onSelectPlan,
  onProceed,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif font-bold text-lg text-[var(--foreground)] tracking-tight">
          Select Monthly Plan
        </h3>
        <p className="text-xs text-[var(--muted)] mt-0.5">
          Backed by your mutual funds. Zero portfolio selling.
        </p>
      </div>

      {/* Vertical Flat EMI Card List */}
      <div className="space-y-2.5">
        {emiPlans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          const monthlyAmount = plan.annualInterestRate === 0
            ? Math.round(selectedVariant.price / plan.tenureMonths)
            : Math.round(
                (selectedVariant.price * (1 + (plan.annualInterestRate * plan.tenureMonths) / 1200)) /
                  plan.tenureMonths
              );

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border ${
                isSelected
                  ? 'active-emi-card'
                  : 'bg-[var(--card)] hover:border-[var(--muted)] border-[var(--border)]'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors border ${
                      isSelected
                        ? 'bg-[var(--foreground)] border-[var(--foreground)] text-[var(--card)]'
                        : 'border-[var(--border)] bg-[var(--card)]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[var(--foreground)]">
                        {plan.tenureMonths} Months
                      </span>

                      {plan.isZeroPercent ? (
                        <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          0% Interest
                        </span>
                      ) : (
                        <span className="bg-[var(--accent-light)] text-[var(--muted)] text-[10px] font-medium px-2 py-0.5 rounded-md">
                          {plan.annualInterestRate}% p.a.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-[var(--foreground)]">
                    ₹{monthlyAmount.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-[var(--muted)]">/mo</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onProceed}
        className="w-full py-4 px-6 rounded-2xl bg-[var(--foreground)] hover:opacity-90 text-[var(--card)] font-bold text-sm flex items-center justify-center gap-2 transition-all mt-6 shadow-sm"
      >
        <span>Continue with {selectedPlan?.tenureMonths} Month Plan</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
