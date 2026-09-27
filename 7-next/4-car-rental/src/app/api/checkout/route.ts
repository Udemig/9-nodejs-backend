import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import { CheckoutBody, ICar } from "@/lib/types";
import Car from "@/models/Car";
import Order from "@/models/Order";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// stripe kurulum
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true });

// product catalag'a ürün ekleme fonksiyonu
const createStripeProduct = async (car: ICar) => {
  return await stripe.products.create({
    name: car.brand + " " + car.model,
    description: car.description,
    default_price_data: {
      currency: "TRY",
      unit_amount: car.dailyPrice * 100,
    },
    metadata: {
      carId: car._id.toString(),
    },
  });
};

// product catalog'daki ürünü alma fonksiyonu
const getStripeProduct = async (car: ICar) => {
  const result = await stripe.products.search({
    query: `metadata["carId"]:"${car._id.toString()}"`,
  });

  return result.data[0] || null;
};

export async function POST(req: NextRequest) {
  // veritabanına bağlan
  await connectToDatabase();

  // kullanıcnın oturum verisini al
  const session = await auth();

  // kullanıcı oturumu kapalıysa hata dön
  if (!session?.user) return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });

  // rezarvasyon bilgilerini al
  const body: CheckoutBody = await req.json();

  // kiralanıcak araç verisini al
  const car: ICar | null = await Car.findById(body.carId);

  // araç bulunamadıysa hata dön
  if (!car) return NextResponse.json({ message: "NOT_FOUND" }, { status: 404 });

  // kiralıncak araç stripe product catalog'da var mı?
  let stripeProduct = await getStripeProduct(car);

  // eğer araç stripe cotalogda yoksa oluştur
  if (!stripeProduct) {
    stripeProduct = await createStripeProduct(car);
  }

  // oluşturulacak ödeme oturumu için gerekli ürün bilgileri
  const productInfo = {
    price: stripeProduct.default_price as string,
    quantity: body.rentalDays,
  };

  // Kullanıcı ID'sini doğrula; eğer oturumda eski UUID kaldıysa MongoDB'den gerçek ObjectId'yi al
  let userId = session.user.id;
  if ((!userId || !mongoose.Types.ObjectId.isValid(userId)) && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email.toLowerCase().trim() });
    if (dbUser) {
      userId = dbUser._id.toString();
    }
  }

  // sipariş verisini veritabanına kaydet
  const order = await Order.create({
    car: car._id,
    user: userId,
    totalAmount: body.totalCost || body.totalAmount,
    currency: "TRY",
    type: "rental",
    status: "pending",
    rental: {
      pickupDate: body.pickupDate,
      returnDate: body.returnDate || body.pickupDate,
      pickupTime: body.pickupTime,
      returnTime: body.returnTime,
      pickupLocation: body.pickupLocation,
      dropoffLocation: body.returnLocation || body.dropoffLocation,
      notes: body.flightNotes,
      days: body.rentalDays,
    },
  });

  // stripe ödeme oturumu oluştur
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: [productInfo],
    mode: "payment",
    metadata: {
      userId: userId?.toString() as string,
      orderId: order._id.toString(),
    },
    success_url: `${process.env.AUTH_URL}/success?orderId=${order._id}`,
    cancel_url: `${process.env.AUTH_URL}/cancel?orderId=${order._id}`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
  });

  return NextResponse.json({
    message: "Ödeme oturumu oluşturuldu",
    url: checkoutSession.url,
  });
}
