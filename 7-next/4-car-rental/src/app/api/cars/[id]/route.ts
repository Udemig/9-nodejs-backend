import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Vehicle ID parameter is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let car = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      car = await Car.findById(id).lean();
    }

    if (!car) {
      return NextResponse.json(
        { success: false, error: 'Vehicle not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      car,
    });
  } catch (error: unknown) {
    console.error('Car detail API error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to retrieve vehicle details';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
