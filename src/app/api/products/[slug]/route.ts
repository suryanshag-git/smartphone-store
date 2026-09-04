import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('Product')
        .select('*, variants:ProductVariant(*), emiPlans:EMIPlan(*)')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        product: data
      });
    }

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        emiPlans: {
          orderBy: { tenureMonths: 'asc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product
    });
  } catch (error: any) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
