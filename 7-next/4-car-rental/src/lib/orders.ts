import { headers } from "next/headers";
import { OrderApiResponse, OrderViewCar, OrderViewData } from "@/lib/types";

export type { OrderApiResponse, OrderViewCar, OrderViewData };

/**
 * Server-Side Order Data Fetcher
 * Makes a server-to-server HTTP request to the internal /api/orders/[id] endpoint.
 * Dynamically resolves protocol and host via request headers.
 */
export async function getOrderData(
  orderId: string,
  status?: "paid" | "cancelled"
): Promise<OrderViewData | null> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol =
      headersList.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
    const baseUrl = process.env.AUTH_URL || `${protocol}://${host}`;

    const queryParam = status ? `?status=${status}` : "";
    const res = await fetch(`${baseUrl}/api/orders/${orderId}${queryParam}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Orders API returned status ${res.status} for ID: ${orderId}`);
      return null;
    }

    const data: OrderApiResponse = await res.json();
    return data.order || null;
  } catch (error) {
    console.error("Error calling orders API from getOrderData:", error);
    return null;
  }
}

/**
 * Generates a realistic fallback order when an ID is not in DB or during mock testing
 */
export function createFallbackOrder(
  id: string,
  isCancelled: boolean,
  fallbackCar?: Partial<OrderViewCar> | null
): OrderViewData {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fourDaysLater = new Date();
  fourDaysLater.setDate(fourDaysLater.getDate() + 4);

  const dailyPrice = fallbackCar?.dailyPrice || (isCancelled ? 13500 : 14500);
  const rentalDays = 3;

  return {
    orderId: id,
    status: isCancelled ? "cancelled" : "paid",
    createdAt: new Date().toISOString(),
    totalAmount: dailyPrice * rentalDays,
    currency: "TRY",
    car: {
      _id: fallbackCar?._id || (isCancelled ? "sample-bmw-m4" : "sample-porsche-taycan"),
      brand: fallbackCar?.brand || (isCancelled ? "BMW" : "Porsche"),
      model: fallbackCar?.model || (isCancelled ? "M4 Competition" : "Taycan 4S"),
      year: fallbackCar?.year || (isCancelled ? 2024 : 2025),
      category: fallbackCar?.category || (isCancelled ? "Spor" : "Elektrikli"),
      transmission: fallbackCar?.transmission || (isCancelled ? "Otomatik" : "Tek Vites"),
      fuelType: fallbackCar?.fuelType || (isCancelled ? "Benzin" : "Elektrik"),
      capacity: fallbackCar?.capacity || 4,
      horsepower: fallbackCar?.horsepower || (isCancelled ? 503 : 522),
      dailyPrice,
      location: fallbackCar?.location || "İstanbul Havalimanı (IST) VIP Terminal",
    },
    rental: {
      pickupDate: tomorrow.toISOString(),
      returnDate: fourDaysLater.toISOString(),
      pickupTime: "10:00",
      returnTime: "16:00",
      pickupLocation: fallbackCar?.location || "İstanbul Havalimanı (IST) VIP Terminal",
      dropoffLocation: fallbackCar?.location || "İstanbul Havalimanı (IST) VIP Terminal",
      days: rentalDays,
      notes: isCancelled ? "" : "Uçuş No: TK1984 - FastPass temassız teslimat tercihi",
    },
    isSample: true,
  };
}
