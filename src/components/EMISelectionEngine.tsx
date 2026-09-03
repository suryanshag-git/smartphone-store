'use client';

import React from 'react';
import { EMIPlan, ProductVariant } from '@/types';
import { Check, Sparkles, Tag, ArrowRight } from 'lucide-react';

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
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Pick a monthly plan that fits your budget</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Instant Approval
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Backed by your mutual funds. Zero portfolio selling required.
          </p>
        </div>
      </div>

      {/* Vertical Flat EMI Card List */}
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
                  : 'bg-white hover:border-slate-300 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left Side Radio Check & Tenure Info */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors border ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">
                        {plan.tenureMonths} Months
                      </span>

                      {/* Interest Rate Pill */}
                      {plan.isZeroPercent ? (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          0% Interest
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          {plan.annualInterestRate}% p.a.
                        </span>
                      )}

                      {plan.popularTag && (
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md hidden sm:inline-block">
                          {plan.popularTag}
                        </span>
                      )}
                    </div>

                    {/* Cashback Spark Tag */}
                    {plan.cashbackTag ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-1">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{plan.cashbackTag}</span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Zero foreclosure fees • Your mutual fund returns continue uninterrupted
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side Monthly Amount */}
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-700 tracking-tight">
                    ₹{monthlyAmount.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-500">/mo</span>
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
        className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.005] active:scale-[0.995] mt-6"
      >
        <span>Continue with {selectedPlan?.tenureMonths} Month Plan</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
