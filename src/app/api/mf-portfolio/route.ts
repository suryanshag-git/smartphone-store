import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone') || '9876543210';

    let portfolio = await prisma.mutualFundPortfolio.findFirst({
      where: { userPhone: phone }
    });

    if (!portfolio) {
      // Fallback demo portfolio
      portfolio = await prisma.mutualFundPortfolio.findFirst();
    }

    if (!portfolio) {
      return NextResponse.json(
        { success: false, error: 'Portfolio data unavailable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      portfolio: {
        ...portfolio,
        holdings: JSON.parse(portfolio.holdings)
      }
    });
  } catch (error: any) {
    console.error('Error fetching MF portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MF portfolio' },
      { status: 500 }
    );
  }
}
