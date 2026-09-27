import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db";
import { auth } from "@/lib/auth";
import Order from "@/models/Order";
import Car from "@/models/Car";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Oturum açmanız gerekmektedir" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Ensure Car model is registered for populate
    if (!mongoose.models.Car) void Car;

    const orders = await Order.find({ user: session.user.id })
      .populate("car")
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order) => {
      const carDoc = (order.car as unknown as Record<string, unknown>) || {};

      return {
        orderId: order._id.toString(),
        status: order.status || "pending",
        createdAt: order.createdAt
          ? new Date(order.createdAt).toISOString()
          : new Date().toISOString(),
        totalAmount: order.totalAmount || 0,
        currency: order.currency || "TRY",
        car: {
          _id: carDoc._id ? carDoc._id.toString() : "",
          brand: (carDoc.brand as string) || "",
          model: (carDoc.model as string) || "",
          year: (carDoc.year as number) || 2024,
          category: (carDoc.category as string) || "",
          transmission: (carDoc.transmission as string) || "",
          fuelType: (carDoc.fuelType as string) || "",
          capacity: (carDoc.capacity as number) || 4,
          dailyPrice: (carDoc.dailyPrice as number) || 0,
          location: (carDoc.location as string) || "",
        },
        rental: {
          pickupDate: order.rental?.pickupDate
            ? new Date(order.rental.pickupDate).toISOString()
            : "",
          returnDate: order.rental?.returnDate
            ? new Date(order.rental.returnDate).toISOString()
            : "",
          pickupTime: order.rental?.pickupTime || "",
          returnTime: order.rental?.returnTime || "",
          pickupLocation: order.rental?.pickupLocation || "",
          dropoffLocation: order.rental?.dropoffLocation || "",
          days: order.rental?.days || 0,
          notes: order.rental?.notes || "",
        },
      };
    });

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error: unknown) {
    console.error("Orders API error:", error);
    const message =
      error instanceof Error ? error.message : "Siparişler alınırken hata oluştu";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
