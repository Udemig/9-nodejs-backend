"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCarImage } from "@/lib/car-images";
import { formatOrderCurrency, formatOrderDate } from "@/lib/order-utils";
import { OrderViewData } from "@/lib/types";

interface OrdersPageContentProps {
  orders: OrderViewData[];
}

const statusConfig = {
  paid: {
    label: "Ödendi",
    icon: "check_circle",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-600",
    badgeClass: "bg-emerald-600 text-white",
  },
  pending: {
    label: "Beklemede",
    icon: "schedule",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-600",
    badgeClass: "bg-amber-500 text-white",
  },
  cancelled: {
    label: "İptal Edildi",
    icon: "cancel",
    bgClass: "bg-red-500/10",
    textClass: "text-red-600",
    badgeClass: "bg-red-600 text-white",
  },
};

type StatusFilter = "all" | "paid" | "pending" | "cancelled";

export default function OrdersPageContent({ orders }: OrdersPageContentProps) {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    paid: orders.filter((o) => o.status === "paid").length,
    pending: orders.filter((o) => o.status === "pending").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filterButtons: { key: StatusFilter; label: string; icon: string }[] = [
    { key: "all", label: "Tümü", icon: "list" },
    { key: "paid", label: "Ödendi", icon: "check_circle" },
    { key: "pending", label: "Beklemede", icon: "schedule" },
    { key: "cancelled", label: "İptal", icon: "cancel" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              receipt_long
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-headline tracking-tight">
              Siparişlerim
            </h1>
            <p className="text-sm text-on-surface-variant">
              Tüm kiralama geçmişiniz ve aktif rezervasyonlarınız
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            type="button"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              filter === btn.key
                ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{btn.icon}</span>
            <span>{btn.label}</span>
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                filter === btn.key
                  ? "bg-on-primary/20 text-on-primary"
                  : "bg-surface-container-highest text-on-surface-variant"
              }`}
            >
              {counts[btn.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[40px] text-outline">
              {filter === "all" ? "shopping_bag" : "filter_list_off"}
            </span>
          </div>
          <h2 className="text-lg font-bold text-on-surface font-headline mb-2">
            {filter === "all"
              ? "Henüz siparişiniz bulunmuyor"
              : `"${filterButtons.find((b) => b.key === filter)?.label}" durumunda sipariş yok`}
          </h2>
          <p className="text-sm text-on-surface-variant mb-6">
            {filter === "all"
              ? "Araç kiralayarak ilk siparişinizi oluşturabilirsiniz."
              : "Farklı bir filtre deneyin veya tüm siparişleri görüntüleyin."}
          </p>
          {filter === "all" ? (
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">
                directions_car
              </span>
              Araçları Keşfet
            </Link>
          ) : (
            <button
              onClick={() => setFilter("all")}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Tümünü Göster
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.pending;
            const carImageUrl = getCarImage(
              order.car.brand,
              order.car.model,
              order.car.category,
              order.car.year
            );

            return (
              <div
                key={order.orderId}
                className="bg-surface-container-lowest rounded-2xl border border-surface-container-high/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Car Image */}
                  <div className="relative w-full sm:w-52 md:w-64 h-40 sm:h-auto bg-surface-container-low/50 flex items-center justify-center shrink-0">
                    <Image
                      src={carImageUrl}
                      alt={`${order.car.brand} ${order.car.model}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 256px"
                      className="object-contain p-3"
                      unoptimized
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                    {/* Top Row: Car Name + Status */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-on-surface font-headline">
                            {order.car.brand} {order.car.model}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              {order.car.category}
                            </span>
                            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                              {order.car.year}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${config.badgeClass}`}
                        >
                          <span
                            className="material-symbols-outlined text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {config.icon}
                          </span>
                          {config.label}
                        </span>
                      </div>

                      {/* Rental Dates */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">
                            calendar_today
                          </span>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                              Teslim Alma
                            </span>
                            <span className="text-xs font-semibold text-on-surface">
                              {formatOrderDate(order.rental.pickupDate)}
                            </span>
                            <span className="text-[10px] text-outline block">
                              {order.rental.pickupTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-secondary-container mt-0.5">
                            event_repeat
                          </span>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                              Teslim Etme
                            </span>
                            <span className="text-xs font-semibold text-on-surface">
                              {formatOrderDate(order.rental.returnDate)}
                            </span>
                            <span className="text-[10px] text-outline block">
                              {order.rental.returnTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Price + Details */}
                    <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/40">
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            pin_drop
                          </span>
                          {order.rental.pickupLocation || order.car.location}
                        </span>
                        <span className="text-outline">•</span>
                        <span>{order.rental.days} Gün</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-on-surface-variant block">
                          Toplam
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-primary font-headline">
                          {formatOrderCurrency(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Footer */}
      {orders.length > 0 && (
        <div className="mt-8 p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px] text-primary">
              info
            </span>
            <span>
              Toplam <strong className="text-on-surface">{orders.length}</strong>{" "}
              sipariş bulundu.{" "}
              {counts.paid > 0 && (
                <span className="text-emerald-600 font-semibold">
                  {counts.paid} tamamlandı
                </span>
              )}
            </span>
          </div>
          <Link
            href="/vehicles"
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-bold hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap"
          >
            Yeni Araç Kirala
          </Link>
        </div>
      )}
    </div>
  );
}
