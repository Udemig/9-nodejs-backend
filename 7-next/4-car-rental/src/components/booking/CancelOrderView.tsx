"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCarImage } from "@/lib/car-images";
import { formatOrderCurrency, formatOrderDate } from "@/lib/order-utils";
import { OrderViewData } from "@/lib/types";
import BookingSupportBanner from "@/components/booking/BookingSupportBanner";

interface CancelOrderViewProps {
  order: OrderViewData;
}

export default function CancelOrderView({ order }: CancelOrderViewProps) {
  const [copied, setCopied] = useState(false);

  const carImageUrl = getCarImage(
    order.car.brand,
    order.car.model,
    order.car.category,
    order.car.year
  );

  const handleCopyOrderId = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-24 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in border border-surface-container-high/40">
          <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
            check_circle
          </span>
          <span>Rezervasyon referans numarası kopyalandı!</span>
        </div>
      )}

      {/* Main Cancel Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-sm border border-surface-container-high/60 relative overflow-hidden mb-8">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary-container via-error to-secondary-container" />

        {/* Status Badge & Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-error-container/30 flex items-center justify-center text-error mb-4 ring-8 ring-error-container/10">
            <span
              className="material-symbols-outlined text-[36px] sm:text-[44px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cancel
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-rose-600 text-white shadow-md shadow-rose-600/25 tracking-wide mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
            Ödeme İşlemi İptal Edildi
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-headline tracking-tight">
            Ödeme Tamamlanamadı
          </h1>
          <p className="mt-2 text-sm sm:text-base text-on-surface-variant max-w-xl">
            Rezervasyon işleminiz sonlandırıldı veya ödeme adımı zaman aşımına uğradı.
          </p>

          {/* Reassurance Highlight Box */}
          <div className="mt-4 p-3.5 sm:px-6 sm:py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-semibold max-w-lg">
            <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0">
              verified_user
            </span>
            <span>
              <strong>Önemli Bilgi:</strong> Kredi kartınızdan veya banka hesabınızdan hiçbir ücret
              tahsil edilmemiştir.
            </span>
          </div>

          {/* Reference Number Box */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-2xl border border-surface-container-high/60 text-xs sm:text-sm">
            <span className="text-on-surface-variant font-medium">İptal Edilen İşlem Kodu:</span>
            <span className="font-mono font-bold text-on-surface tracking-wider">
              {order.orderId}
            </span>
            <button
              onClick={handleCopyOrderId}
              type="button"
              className="p-1 text-on-surface-variant hover:text-primary transition-colors ml-1"
              title="Kodu Kopyala"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
            </button>
          </div>
        </div>

        {/* Attempted Vehicle Card */}
        <div className="bg-surface-container-low/50 rounded-2xl p-5 sm:p-6 border border-surface-container-high/50 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                  {order.car.category}
                </span>
                <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                  {order.car.year} Model
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-headline">
                {order.car.brand} {order.car.model}
              </h2>
              <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  location_on
                </span>
                {order.car.location || "İstanbul Havalimanı (IST) VIP Terminal"}
              </p>

              {/* Price & Duration Info */}
              <div className="mt-4 pt-4 border-t border-surface-container-high/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-on-surface-variant block">Planlanan Süre</span>
                  <span className="text-sm font-bold text-on-surface">
                    {order.rental.days} Günlük Kiralama
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-on-surface-variant block">Tahsil Edilmeyen Tutar</span>
                  <span className="text-base sm:text-lg font-bold text-on-surface font-headline line-through opacity-70">
                    {formatOrderCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Image */}
            <div className="relative w-full lg:w-1/2 h-44 sm:h-52 rounded-xl overflow-hidden flex items-center justify-center bg-surface-container-lowest/80 border border-surface-container-high/30 grayscale-[30%]">
              <Image
                src={carImageUrl}
                alt={`${order.car.brand} ${order.car.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Reservation Plan Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/40">
            <span className="text-xs text-on-surface-variant font-semibold block uppercase">
              Planlanan Alış
            </span>
            <p className="text-sm font-bold text-on-surface mt-1">
              {formatOrderDate(order.rental.pickupDate)} • {order.rental.pickupTime || "10:00"}
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5 truncate">
              {order.rental.pickupLocation || order.car.location}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/40">
            <span className="text-xs text-on-surface-variant font-semibold block uppercase">
              Planlanan İade
            </span>
            <p className="text-sm font-bold text-on-surface mt-1">
              {formatOrderDate(order.rental.returnDate)} • {order.rental.returnTime || "16:00"}
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5 truncate">
              {order.rental.dropoffLocation || order.car.location}
            </p>
          </div>
        </div>

        {/* Helpful Diagnostics Box */}
        <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-surface-container-high/50 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container">help_outline</span>
            Ödeme Neden Tamamlanmamış Olabilir?
          </h3>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">
                arrow_right
              </span>
              <span>
                <strong>Kullanıcı İptali:</strong> Güvenli ödeme sayfasında işlemi iptal edip geri
                dönmeyi seçmiş olabilirsiniz.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">
                arrow_right
              </span>
              <span>
                <strong>3D Secure Doğrulama:</strong> Bankanız tarafından SMS ile iletilen onay
                şifresi zaman aşımına uğramış veya eksik girilmiş olabilir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">
                arrow_right
              </span>
              <span>
                <strong>Kart Limitleri & Yetkiler:</strong> Kartınızın internet alışverişi limiti
                yetersiz kalmış veya e-ticaret kullanımına kapalı olabilir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">
                arrow_right
              </span>
              <span>
                <strong>Oturum Süresi:</strong> Güvenlik nedeniyle ödeme oturumları 30 dakika ile
                sınırlandırılmıştır.
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-container-high/60">
          <Link
            href="/vehicles"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">directions_car</span>
            Filodaki Diğer Araçlar
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Ana Sayfa
            </Link>
            <Link
              href={order.car._id ? `/vehicles/${order.car._id}` : "/vehicles"}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Rezervasyonu Tekrar Dene
            </Link>
          </div>
        </div>
      </div>

      {/* Support Banner */}
      <BookingSupportBanner
        title="Ödeme Sırasında Sorun mu Yaşadınız?"
        description="VIP Müşteri Temsilcimiz rezervasyonunuzu telefon üzerinden tamamlamanız için hazır."
      />
    </div>
  );
}
