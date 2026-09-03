import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q') || '';
    const brands = searchParams.get('brand')?.split(',').filter(Boolean) || [];
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
    const zeroInterest = searchParams.get('zeroInterest') === 'true';
    const sort = searchParams.get('sort') || 'featured';

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } }
      ];
    }

    if (brands.length > 0) {
      whereClause.brand = { in: brands };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.basePrice = {};
      if (minPrice !== undefined) whereClause.basePrice.gte = minPrice;
      if (maxPrice !== undefined) whereClause.basePrice.lte = maxPrice;
    }

    if (zeroInterest) {
      whereClause.emiPlans = {
        some: {
          isZeroPercent: true
        }
      };
    }

    let orderBy: any = { featured: 'desc' };
    if (sort === 'price_asc') {
      orderBy = { basePrice: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { basePrice: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        variants: true,
        emiPlans: {
          orderBy: { tenureMonths: 'asc' }
        }
      },
      orderBy
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
