import React from "react";
import { Metadata } from "next";
import { getOrderData } from "@/lib/orders";
import SuccessOrderView from "@/components/booking/SuccessOrderView";

export const metadata: Metadata = {
  title: "Rezervasyon Onaylandı | Morent",
  description:
    "Araç kiralama rezervasyonunuz ve ödemeniz başarıyla tamamlandı. FastPass dijital teslimat ve rezervasyon detayları.",
};

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = await searchParams;
  const orderId =
    typeof resolvedParams.orderId === "string" ? resolvedParams.orderId : "6ab8e2099f209ee829381302";

  const order = await getOrderData(orderId, "paid");

  return (
    <main className="w-full min-h-screen bg-background text-on-background py-4">
      {order && <SuccessOrderView order={order} />}
    </main>
  );
}
