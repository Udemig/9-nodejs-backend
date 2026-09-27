import React from "react";
import { Metadata } from "next";
import { getOrderData } from "@/lib/orders";
import CancelOrderView from "@/components/booking/CancelOrderView";

export const metadata: Metadata = {
  title: "Ödeme Tamamlanamadı | Morent",
  description:
    "Araç kiralama ödemeniz tamamlanamadı veya iptal edildi. Kartınızdan herhangi bir ücret tahsil edilmemiştir.",
};

interface CancelPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const resolvedParams = await searchParams;
  const orderId =
    typeof resolvedParams.orderId === "string" ? resolvedParams.orderId : "6ab8e31e9f209ee829381303";

  const order = await getOrderData(orderId, "cancelled");

  return (
    <main className="w-full min-h-screen bg-background text-on-background py-4">
      {order && <CancelOrderView order={order} />}
    </main>
  );
}
