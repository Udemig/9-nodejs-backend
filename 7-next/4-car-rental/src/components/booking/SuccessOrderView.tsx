"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCarImage } from "@/lib/car-images";
import { formatOrderCurrency, formatOrderDate } from "@/lib/order-utils";
import { OrderViewData } from "@/lib/types";
import BookingSupportBanner from "@/components/booking/BookingSupportBanner";

interface SuccessOrderViewProps {
  order: OrderViewData;
}

export default function SuccessOrderView({ order }: SuccessOrderViewProps) {
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

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in print:p-0 print:max-w-none">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-24 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in border border-surface-container-high/40">
          <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
            check_circle
          </span>
          <span>Rezervasyon referans numarası kopyalandı!</span>
        </div>
      )}

      {/* Main Success Hero Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-sm border border-surface-container-high/60 relative overflow-hidden mb-8 print:border-none print:shadow-none">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-primary to-emerald-400 print:hidden" />

        {/* Status Badge & Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4 ring-8 ring-emerald-500/5">
            <span
              className="material-symbols-outlined text-[36px] sm:text-[44px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-emerald-600 text-white shadow-md shadow-emerald-600/25 tracking-wide mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
            Ödeme Başarıyla Tamamlandı
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-headline tracking-tight">
            Rezervasyonunuz Onaylandı!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-on-surface-variant max-w-xl">
            Tebrikler, ödemeniz güvenle alındı ve aracınız hazırlandı. Rezervasyon ve teslimat
            belgeniz kayıtlı e-posta adresinize iletilmiştir.
          </p>

          {/* Reference Number Box */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-2xl border border-surface-container-high/60 text-xs sm:text-sm">
            <span className="text-on-surface-variant font-medium">Rezervasyon Kodu:</span>
            <span className="font-mono font-bold text-on-surface tracking-wider">
              {order.orderId}
            </span>
            <button
              onClick={handleCopyOrderId}
              type="button"
              className="p-1 text-on-surface-variant hover:text-primary transition-colors ml-1 print:hidden"
              title="Kodu Kopyala"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
            </button>
          </div>
        </div>

        {/* Vehicle Showcase Card */}
        <div className="bg-surface-container-low/50 rounded-2xl p-5 sm:p-6 border border-surface-container-high/50 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
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

              {/* Technical Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/40 text-center">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-medium">
                    Vites
                  </span>
                  <span className="text-xs font-bold text-on-surface truncate block">
                    {order.car.transmission}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/40 text-center">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-medium">
                    Yakıt / Güç
                  </span>
                  <span className="text-xs font-bold text-on-surface truncate block">
                    {order.car.fuelType}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high/40 text-center">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-medium">
                    Kapasite
                  </span>
                  <span className="text-xs font-bold text-on-surface truncate block">
                    {order.car.capacity} Kişilik
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Image */}
            <div className="relative w-full lg:w-1/2 h-44 sm:h-52 rounded-xl overflow-hidden flex items-center justify-center bg-surface-container-lowest/80 border border-surface-container-high/30">
              <Image
                src={carImageUrl}
                alt={`${order.car.brand} ${order.car.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>

        {/* Reservation Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Pickup Details */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Teslim Alma (Alış)
              </div>
              <p className="text-lg font-bold text-on-surface font-headline">
                {formatOrderDate(order.rental.pickupDate)}
              </p>
              <p className="text-sm font-semibold text-on-surface-variant mt-0.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Saat: {order.rental.pickupTime || "10:00"}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                pin_drop
              </span>
              <span className="text-xs text-on-surface font-medium">
                {order.rental.pickupLocation || order.car.location}
              </span>
            </div>
          </div>

          {/* Dropoff Details */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-secondary-container uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[18px]">event_repeat</span>
                Teslim Etme (İade)
              </div>
              <p className="text-lg font-bold text-on-surface font-headline">
                {formatOrderDate(order.rental.returnDate)}
              </p>
              <p className="text-sm font-semibold text-on-surface-variant mt-0.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Saat: {order.rental.returnTime || "16:00"}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-container shrink-0 mt-0.5">
                flag
              </span>
              <span className="text-xs text-on-surface font-medium">
                {order.rental.dropoffLocation || order.car.location}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Notes (if any) */}
        {order.rental.notes && (
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/40 mb-8 text-xs">
            <span className="font-bold text-on-surface block mb-1">
              Rezervasyon Notu / Uçuş Bilgisi:
            </span>
            <span className="text-on-surface-variant">{order.rental.notes}</span>
          </div>
        )}

        {/* Payment & Invoice Summary */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center justify-between">
            <span>Fatura & Ödeme Özeti</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs capitalize">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Stripe Güvenli Ödeme
            </span>
          </h3>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Günlük Kiralama Ücreti</span>
              <span className="font-medium text-on-surface">
                {formatOrderCurrency(order.car.dailyPrice)} x {order.rental.days} gün
              </span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>Full Kasko & VIP Yol Yardımı</span>
              <span className="font-medium text-emerald-600">Dahil (Ücretsiz)</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>KDV & Zorunlu Vergiler (%20)</span>
              <span className="font-medium text-on-surface">Fiyata Dahil</span>
            </div>

            <div className="pt-3 mt-3 border-t border-surface-container-high/60 flex justify-between items-center">
              <div>
                <span className="text-base font-bold text-on-surface font-headline block">
                  Toplam Tahsil Edilen Tutar
                </span>
                <span className="text-xs text-on-surface-variant">Tüm vergiler ve harçlar dahil</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-primary font-headline">
                {formatOrderCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* FastPass Next Steps Guide */}
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-8">
          <h3 className="text-base font-bold text-on-surface font-headline mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            Teslimat Öncesi Bilgilendirme
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-1">
                1
              </div>
              <h4 className="font-bold text-on-surface">FastPass Temassız Teslimat</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Teslimat saatinizden 2 saat önce SMS ve e-posta ile dijital araç anahtarınız gönderilecektir.
              </p>
            </div>
            <div className="space-y-1">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-1">
                2
              </div>
              <h4 className="font-bold text-on-surface">Ehliyet & Kimlik İbrazı</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Aracı teslim alacak sürücünün geçerli ehliyet ve kimlik belgesini hazır bulundurması gereklidir.
              </p>
            </div>
            <div className="space-y-1">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-1">
                3
              </div>
              <h4 className="font-bold text-on-surface">7/24 VIP Destek</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Uçuş rötarı durumunda veya lokasyon değişikliklerinde ekibimiz 7/24 yanınızdadır.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-container-high/60 print:hidden">
          <button
            onClick={handlePrint}
            type="button"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Makbuzu Yazdır / PDF İndir
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/vehicles"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">directions_car</span>
              Filoya Dön
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      {/* Support Banner */}
      <BookingSupportBanner />
    </div>
  );
}
