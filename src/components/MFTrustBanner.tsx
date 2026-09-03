'use client';

import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, TrendingUp, Lock } from 'lucide-react';

export const MFTrustBanner: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative my-4">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="cursor-pointer group flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-100 tracking-wide">
                EMI plans backed by mutual funds
              </span>
              <span className="bg-emerald-500/15 text-emerald-400 font-semibold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20">
                0% Liquidation
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Keep earning compounding returns on your SIP portfolio while paying monthly installments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Benefits</span>
          <Info className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Tooltip Overlay */}
      {showTooltip && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 p-4 rounded-xl glass-panel border border-emerald-500/30 shadow-2xl shadow-slate-950/80 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Why Mutual Fund-Backed Financing?</span>
              </h4>
              <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Portfolio Selling:</strong> Your mutual fund units remain pledged in your folio, continuing to generate wealth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>14%+ Expected SIP CAGR:</strong> Instead of spending lump-sum cash, your investments keep compounding during tenure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Digital Lien:</strong> Automated CAMS/KFintech lien marking in under 60 seconds with simple OTP.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
