import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { principal, tenureMonths, annualInterestRate = 0, cashbackAmount = 0 } = body;

    if (!principal || !tenureMonths) {
      return NextResponse.json(
        { success: false, error: 'Principal amount and tenure months are required' },
        { status: 400 }
      );
    }

    const P = Number(principal);
    const N = Number(tenureMonths);
    const R = Number(annualInterestRate);

    let monthlyInstallment = 0;
    let totalInterest = 0;
    let totalPayableWithoutCashback = 0;

    if (R === 0) {
      // 0% No Cost EMI calculation
      monthlyInstallment = Math.round(P / N);
      totalInterest = 0;
      totalPayableWithoutCashback = P;
    } else {
      // Standard Reducing Rate EMI formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
      const monthlyRate = R / 12 / 100;
      const emiFactor = Math.pow(1 + monthlyRate, N);
      monthlyInstallment = Math.round((P * monthlyRate * emiFactor) / (emiFactor - 1));
      totalPayableWithoutCashback = monthlyInstallment * N;
      totalInterest = totalPayableWithoutCashback - P;
    }

    const netEffectivePayable = Math.max(0, totalPayableWithoutCashback - Number(cashbackAmount));
    const effectiveMonthlyCost = Math.round(netEffectivePayable / N);
    
    // MF Collateral Pledge calculations (100% principal coverage required)
    const requiredMfPledgeValue = Math.round(P * 1.05); // 105% security buffer
    const estimatedSIPCompoundingGain = Math.round(P * Math.pow(1 + 0.14, N / 12) - P); // Assumed 14% CAGR SIP return saved by not liquidating

    return NextResponse.json({
      success: true,
      data: {
        principal: P,
        tenureMonths: N,
        annualInterestRate: R,
        monthlyInstallment,
        totalInterest,
        cashbackAmount: Number(cashbackAmount),
        totalPayableWithoutCashback,
        netEffectivePayable,
        effectiveMonthlyCost,
        mfPledgeDetails: {
          requiredCollateralValue: requiredMfPledgeValue,
          liquidationPercent: 0,
          estimatedSIPCompoundingGain,
          benefitNote: `Keep earning up to ₹${estimatedSIPCompoundingGain.toLocaleString('en-IN')} in mutual fund SIP growth during your ${N}-month tenure!`
        }
      }
    });
  } catch (error: any) {
    console.error('Error calculating EMI:', error);
    return NextResponse.json(
      { success: false, error: 'EMI calculation failed' },
      { status: 500 }
    );
  }
}
