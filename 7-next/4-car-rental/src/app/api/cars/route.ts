import { NextRequest, NextResponse } from 'next/server';
import { getVehicles } from '@/lib/vehicles';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const result = await getVehicles(params);

    return NextResponse.json({
      success: true,
      cars: result.cars,
      pagination: result.pagination,
    });
  } catch (error: unknown) {
    console.error('Cars API route error:', error);
    const message =
      error instanceof Error ? error.message : 'Araçlar alınırken bir hata oluştu';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
