import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import OrdersPageContent from "@/components/booking/OrdersPageContent";
import { OrderViewData } from "@/lib/types";

export const metadata = {
  title: "Siparişlerim | Morent",
  description: "Kiralama geçmişinizi ve aktif rezervasyonlarınızı görüntüleyin.",
};

async function getUserOrders(): Promise<OrderViewData[]> {
  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";
    const host = headersList.get("host") || "localhost:3000";
    const protocol =
      headersList.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
    const baseUrl = process.env.AUTH_URL || `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/orders`, {
      cache: "no-store",
      headers: { cookie },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.orders || [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const orders = await getUserOrders();

  return <OrdersPageContent orders={orders} />;
}
