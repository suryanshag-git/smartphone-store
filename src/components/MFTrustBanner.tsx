'use client';

import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, TrendingUp, HeartHandshake } from 'lucide-react';

export const MFTrustBanner: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative my-4">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="cursor-pointer group flex items-center justify-between p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:border-emerald-400 transition-all duration-200"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 tracking-wide">
                Your mutual funds stay safely yours
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-semibold text-[10px] px-2 py-0.5 rounded-md">
                Zero Portfolio Selling
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Keep earning monthly SIP returns on your portfolio while paying easy installments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold shrink-0">
          <span>How it works</span>
          <Info className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      </div>

      {/* Human Friendly Popover */}
      {showTooltip && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 p-5 rounded-2xl bg-white border border-emerald-200 shadow-xl space-y-3 animate-in fade-in duration-200">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Why smart buyers prefer mutual fund EMI</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>No Need to Sell:</strong> Your funds stay in your folio. You avoid exit fees and capital gains tax.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Keep Compounding:</strong> Your mutual funds keep growing. Over 12-36 months, your market returns can easily offset your EMI.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Simple OTP Approval:</strong> Takes less than a minute with your registered mobile number.</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
