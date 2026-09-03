'use client';

import React from 'react';
import { EMIPlan, ProductVariant } from '@/types';
import { Check, Sparkles, TrendingUp, Tag, ArrowRight } from 'lucide-react';

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Select Mutual Fund EMI Plan</span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Instant Approval
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Collateralized against your existing MF portfolio. Zero liquidations required.
          </p>
        </div>
      </div>

      {/* Vertical Interactive EMI Tenure Cards List */}
      <div className="space-y-3">
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
              className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 relative border ${
                isSelected
                  ? 'active-emi-card'
                  : 'glass-card hover:border-slate-700 border-slate-800/90'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left Side Radio Check & Tenure Info */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors border ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/50'
                        : 'border-slate-700 bg-slate-900/80'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-white">
                        {plan.tenureMonths} Months
                      </span>

                      {/* Interest Rate Pill */}
                      {plan.isZeroPercent ? (
                        <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          0% Interest
                        </span>
                      ) : (
                        <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {plan.annualInterestRate}% p.a.
                        </span>
                      )}

                      {plan.popularTag && (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
                          {plan.popularTag}
                        </span>
                      )}
                    </div>

                    {/* Cashback Spark Tag */}
                    {plan.cashbackTag ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{plan.cashbackTag}</span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Zero pre-closure charges • 100% MF wealth growth preserved
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side Monthly Installment */}
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-400 tracking-tight">
                    ₹{monthlyAmount.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>

                  <div className="text-[10px] text-slate-400">
                    Total: ₹{(monthlyAmount * plan.tenureMonths).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Proceed CTA Button */}
      <button
        onClick={onProceed}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base tracking-wide flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.01] active:scale-[0.99] mt-6"
      >
        <span>Proceed with Selected Plan ({selectedPlan?.tenureMonths} Months)</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
