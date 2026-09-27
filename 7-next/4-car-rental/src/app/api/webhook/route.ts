import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Webhook: Stripe'ın ödeme sayfasında gerçekleşen olayları bizim API'mıza istek atıp haber verdiği endpoinnt

export const POST = async (req: Request) => {
  await connectToDatabase();
  // gerçekleşen ödeme olayıyla alakalı stripe'ın bize gönderdiği veri
  const body = await req.json();

  // stripe'ın gönderdiği event'e eriş
  const session = body.data.object as Stripe.Checkout.Session;

  // sipariş id'sine eriş
  const orderId = session.metadata?.orderId;

  // event tipine göre order durumunu güncelle
  switch (body.type) {
    // ödeme başarılı olduysa
    case "checkout.session.completed":
      await Order.findByIdAndUpdate(orderId, { status: "paid" });
      break;
    // ödeme başarısız olduysa
    case "checkout.session.expired":
      await Order.findByIdAndUpdate(orderId, { status: "cancelled" });
      break;
  }

  return NextResponse.json("success");
};
