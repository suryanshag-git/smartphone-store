import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userType = 'guest',
      userEmail,
      userName,
      userPhone,
      shippingAddress,
      totalAmount,
      downPayment = 0,
      emiMonthlyAmount,
      emiTenure,
      emiPlanId,
      productId,
      variantColor,
      variantStorage,
      mfFundName = 'HDFC Top 100 Fund - Growth'
    } = body;

    if (!userEmail || !userName || !userPhone || !productId || !emiPlanId) {
      return NextResponse.json(
        { success: false, error: 'Missing required order details' },
        { status: 400 }
      );
    }

    const orderNumber = `MF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const mfPledgeId = `MFP-${Math.floor(100000 + Math.random() * 900000)}`;
    const mfPledgedUnits = Math.round(totalAmount / 820);

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        userType,
        userEmail,
        userName,
        userPhone,
        shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress),
        totalAmount: Number(totalAmount),
        downPayment: Number(downPayment),
        emiMonthlyAmount: Number(emiMonthlyAmount),
        emiTenure: Number(emiTenure),
        emiPlanId,
        productId,
        variantColor,
        variantStorage,
        status: 'MF_PLEDGED',
        mfPledgeId,
        mfPledgedUnits,
        mfFundName
      },
      include: {
        product: true,
        emiPlan: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Order placement failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        product: true,
        emiPlan: true
      }
    });

    return NextResponse.json({
      success: true,
      orders
    });
  } catch (error: any) {
    console.error('Error listing orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
