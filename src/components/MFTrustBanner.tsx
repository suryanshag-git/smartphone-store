'use client';

import React, { useState } from 'react';
import { Info, CheckCircle2, TrendingUp } from 'lucide-react';

export const MFTrustBanner: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative my-4">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="cursor-pointer flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center text-[var(--foreground)] shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--foreground)] tracking-wide">
              Your mutual funds stay safely pledged in your folio
            </span>
            <p className="text-[11px] text-[var(--muted)] mt-0.5">
              Zero portfolio selling • Keep 100% of your compounding SIP returns
            </p>
          </div>
        </div>

        <Info className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
      </div>

      {showTooltip && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg space-y-2 text-xs text-[var(--muted)] animate-in fade-in duration-200">
          <p className="font-bold text-[var(--foreground)]">How Slate Mutual Fund Credit Works:</p>
          <ul className="space-y-1.5 list-disc list-inside text-[11px]">
            <li><strong>Zero Exit Loads & Taxes:</strong> You never liquidate or sell your funds.</li>
            <li><strong>Market Returns Continue:</strong> Your SIP portfolio keeps growing while you pay monthly.</li>
            <li><strong>Instant Digital Verification:</strong> Automated folio check via OTP.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
