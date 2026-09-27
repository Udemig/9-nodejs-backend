"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ICar } from "@/lib/types";
import { getCarGallery } from "@/lib/car-images";
import { useSession } from "next-auth/react";

interface VehicleDetailClientProps {
  car: ICar;
}

export default function VehicleDetailClient({ car }: VehicleDetailClientProps) {
  // Gallery angles from Imagin.studio API
  const gallery = useMemo(() => {
    return getCarGallery(car.brand, car.model, car.category, car.year);
  }, [car.brand, car.model, car.category, car.year]);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reservation Form State
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const fourDaysLater = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  }, []);

  const [pickupDate, setPickupDate] = useState(tomorrow);
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState(fourDaysLater);
  const [returnTime, setReturnTime] = useState("16:00");
  const [flightNotes, setFlightNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  // Navigation handlers for gallery
  const prevSlide = () => {
    setActiveAngleIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveAngleIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Calculation of rental days
  const rentalDays = useMemo(() => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [pickupDate, returnDate]);

  // Cost breakdown
  const totalCost = car.dailyPrice * rentalDays;

  // Share link handler
  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
  };

  // Reservation submission handler
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const checkoutPayload = {
        carId: car._id,
        pickupDate,
        pickupTime,
        pickupLocation: car.location,
        returnDate,
        returnTime,
        returnLocation: car.location,
        dropoffLocation: car.location,
        flightNotes,
        rentalDays,
        dailyPrice: car.dailyPrice,
        totalCost,
        totalAmount: totalCost,
      };

      const res = await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutPayload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || `İşlem başarısız oldu (Hata Kodu: ${res.status})`);
      }

      // If backend returns a payment redirect URL (e.g., Stripe Checkout)
      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setReservationConfirmed(true);
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      const message =
        err instanceof Error ? err.message : "Rezervasyon işlemi sırasında bir hata oluştu.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentImage = gallery[activeAngleIndex] || gallery[0];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Toast Notification */}
      {shareSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in border border-surface-container-high/40">
          <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
            check_circle
          </span>
          <span>Araç bağlantısı panoya kopyalandı!</span>
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer transition-colors"
            onClick={() => setIsFullscreen(false)}
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage.url}
              alt={`${car.brand} ${car.model} - ${currentImage.title}`}
              className="max-w-full max-h-[80vh] object-contain drop-shadow-2xl"
            />
          </div>
          <p className="text-white/80 text-sm mt-4 font-headline">
            {currentImage.title} ({activeAngleIndex + 1} / {gallery.length})
          </p>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-outline mb-4">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Ana Sayfa</span>
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href="/vehicles" className="hover:text-primary transition-colors">
          Araçlar
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="hover:text-primary transition-colors">{car.brand}</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface font-semibold truncate">{car.model}</span>
      </nav>

      {/* Vehicle Headline & Action Ribbons */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-2">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold tracking-wide uppercase text-[11px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
              {car.year} Model Yılı
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-tertiary">key</span>
              Anında Dijital Anahtar
            </span>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary">verified</span>
              Ücretsiz İptal (24s)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight font-headline">
            {car.brand} {car.model}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">
              {car.category} • {car.fuelType} • {car.transmission}
            </span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[18px] text-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-bold text-on-surface font-mono">{car.rating.toFixed(2)}</span>
              <span className="text-outline text-xs">({car.reviewCount} doğrulanmış sürüş)</span>
            </div>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <div className="flex items-center gap-1 text-tertiary font-medium">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{car.location}</span>
            </div>
          </div>
        </div>

        {/* Favorite & Share Buttons */}
        <div className="flex items-center gap-2 self-start lg:self-end">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-container-high transition-all cursor-pointer ${
              isFavorite
                ? "bg-error-container text-error border-error/30"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            <span className="text-xs font-bold">{isFavorite ? "Kaydedildi" : "Kaydet"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors border border-surface-container-high cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span className="text-xs font-bold">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Multi-angle Showcase, Specs, Amenities, Overview */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Primary Multi-Angle Interactive Gallery */}
          <div className="space-y-3">
            <div className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden bg-surface-container-low shadow-sm border border-surface-container-high/60 group flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.url}
                alt={`${car.brand} ${car.model} - ${currentImage.title}`}
                className="w-full h-full object-contain transition-all duration-500 ease-out filter drop-shadow-xl"
              />

              {/* Top Overlays */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow">
                  <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">
                    {car.fuelType === "Elektrik" ? "electric_bolt" : "verified"}
                  </span>
                  <span>
                    {car.fuelType === "Elektrik" ? "800V Ultra Mimari" : "Yüksek Performans"}
                  </span>
                </span>
                <span className="bg-primary-container/90 backdrop-blur-md text-on-primary px-3 py-1 rounded-full text-xs font-medium shadow">
                  Doğrulanmış Filo Aracı
                </span>
              </div>

              {/* Bottom Image Counter Pill */}
              <div className="absolute bottom-4 left-4 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 shadow">
                <span className="material-symbols-outlined text-[16px]">photo_library</span>
                <span className="font-mono font-bold">
                  {activeAngleIndex + 1} / {gallery.length}
                </span>
                <span className="text-inverse-on-surface/40">|</span>
                <span className="font-semibold">{currentImage.title}</span>
              </div>

              {/* Prev / Next Nav Buttons */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface shadow-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer"
                aria-label="Önceki açı"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_left</span>
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface shadow-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer"
                aria-label="Sonraki açı"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </button>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-on-surface shadow flex items-center justify-center transition-all cursor-pointer"
                title="Tam boyutta görüntüle"
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {gallery.map((item, index) => {
                const isActive = index === activeAngleIndex;
                return (
                  <button
                    key={item.angle}
                    type="button"
                    onClick={() => setActiveAngleIndex(index)}
                    className={`rounded-xl overflow-hidden h-16 sm:h-20 bg-surface-container-low transition-all cursor-pointer p-1 border flex items-center justify-center ${
                      isActive
                        ? "ring-2 ring-primary border-primary bg-primary/5"
                        : "opacity-70 hover:opacity-100 border-surface-container-high"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.title} className="w-full h-full object-contain" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Mechanical & Performance Metrics (8 Bespoke Cards) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-on-surface font-headline">
                Mekanik & Performans Özellikleri
              </h2>
              <span className="text-xs text-outline font-medium">Fabrika Onaylı Veriler</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* 01: 0-100 km/s */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/50 text-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">speed</span>
                </div>
                <p className="text-xs text-outline font-medium">0 - 100 km/s</p>
                <p className="text-base font-extrabold text-on-surface font-mono mt-0.5">
                  {car.acceleration}
                </p>
                <span className="text-[11px] text-tertiary font-medium">Launch Control ile</span>
              </div>

              {/* 02: Beygir Gücü */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed/50 text-secondary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">offline_bolt</span>
                </div>
                <p className="text-xs text-outline font-medium">Motor Gücü</p>
                <p className="text-base font-extrabold text-on-surface font-mono mt-0.5">
                  {car.horsepower}{" "}
                  <span className="text-xs font-normal text-on-surface-variant">HP</span>
                </p>
                <span className="text-[11px] text-outline font-medium">Maksimum Güç Üretimi</span>
              </div>

              {/* 03: Menzil veya Depo */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed/50 text-tertiary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">
                    {car.fuelType === "Elektrik" ? "battery_charging_full" : "local_gas_station"}
                  </span>
                </div>
                <p className="text-xs text-outline font-medium">
                  {car.fuelType === "Elektrik" ? "Batarya Kapasitesi" : "Yakıt Deposu"}
                </p>
                <p className="text-base font-extrabold text-on-surface font-mono mt-0.5">
                  {car.tankOrBattery}
                </p>
                <span className="text-[11px] text-tertiary font-medium">WLTP Onaylı</span>
              </div>

              {/* 04: Maksimum Hız */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">electric_meter</span>
                </div>
                <p className="text-xs text-outline font-medium">Maksimum Hız</p>
                <p className="text-base font-extrabold text-on-surface font-mono mt-0.5">
                  {car.topSpeed}
                </p>
                <span className="text-[11px] text-outline font-medium">Elektronik Limitli</span>
              </div>

              {/* 05: Çekiş Sistemi */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">all_inclusive</span>
                </div>
                <p className="text-xs text-outline font-medium">Çekiş Sistemi</p>
                <p className="text-sm font-bold text-on-surface mt-0.5">
                  {car.category === "SUV" || car.brand === "Porsche" || car.brand === "Tesla"
                    ? "Akıllı AWD 4x4"
                    : "Arkadan İtiş (RWD)"}
                </p>
                <span className="text-[11px] text-outline font-medium">Aktif Tork Dağılımı</span>
              </div>

              {/* 06: Vites Türü */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">tune</span>
                </div>
                <p className="text-xs text-outline font-medium">Şanzıman</p>
                <p className="text-sm font-bold text-on-surface mt-0.5">{car.transmission}</p>
                <span className="text-[11px] text-outline font-medium">
                  Direksiyondan Vites Kulakçığı
                </span>
              </div>

              {/* 07: Kapasite */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">
                    airline_seat_recline_normal
                  </span>
                </div>
                <p className="text-xs text-outline font-medium">Koltuk Kapasitesi</p>
                <p className="text-sm font-bold text-on-surface mt-0.5">{car.capacity} Yolcu</p>
                <span className="text-[11px] text-outline font-medium">Ergonomik Deri Koltuk</span>
              </div>

              {/* 08: Bagaj Hacmi */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-high/60">
                <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[22px]">luggage</span>
                </div>
                <p className="text-xs text-outline font-medium">Bagaj Hacmi</p>
                <p className="text-sm font-bold text-on-surface mt-0.5">
                  {car.category === "SUV" ? "650 L" : "490 L"}
                </p>
                <span className="text-[11px] text-outline font-medium">Geniş Valiz Alanı</span>
              </div>
            </div>
          </div>

          {/* 3. Charging & Energy Visual Featurette */}
          <div className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-surface-container-high/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">ev_station</span>
                  <span>Ultra Hızlı Şarj Altyapısına Uyumlu</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface font-headline">
                  {car.fuelType === "Elektrik"
                    ? "%5'ten %80'e 22.5 Dakikada Hızlı Şarj"
                    : "Yüksek Verimli Hibrit & Çevre Dostu Güç Ünitesi"}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {car.fuelType === "Elektrik"
                    ? "800-volt elektrik mimarisiyle güçlendirildi. Tüm yolculuğunuz boyunca anlaşmalı Trugo ve ZES yüksek hızlı otoyol istasyonlarına sınırsız ve sorunsuz erişim imkanı."
                    : "Euro 6d normlarına tam uyumlu yüksek verimli motor. Şehir içi ve uzun yol sürüşlerinde minimum tüketimle maksimum sürüş dinamizmi sağlar."}
                </p>
              </div>

              {/* Radial Telemetry Graphic */}
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col items-center shrink-0 w-full sm:w-52 text-center border border-surface-container-high/60">
                <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-surface-container-high fill-none"
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-primary fill-none"
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeDasharray="264"
                      strokeDashoffset="53"
                      strokeLinecap="round"
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-extrabold text-primary font-mono leading-none">
                      80<span className="text-sm">%</span>
                    </span>
                    <span className="text-[10px] text-outline uppercase tracking-wider font-bold">
                      Hızlı Şarj
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-on-surface">Maks. 270 kW Giriş</span>
                <span className="text-[11px] text-tertiary font-medium">Otomatik Tak-Çalıştır</span>
              </div>
            </div>
          </div>

          {/* 4. Vehicle Editorial Overview */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface font-headline">
              Sürüş & Konfor Deneyimi
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              <p>{car.description}</p>
              <p>
                İç mekanda sürücü odaklı ergonomik konsol, yüksek çözünürlüklü dijital gösterge
                paneli, 14 yönlü elektrikli ayarlanabilir spor hafızalı koltuklar ve kabin
                akustiğine özel olarak kalibre edilmiş premium ses sistemi yer alır.
              </p>
            </div>
          </div>

          {/* 5. Included Premium Amenities Grid */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface font-headline">
              Standart Premium Donanımlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  devices
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    Kablosuz Apple CarPlay & Android Auto
                  </p>
                  <p className="text-[11px] text-outline">
                    Kablosuz akıllı telefon entegrasyonu ve hızlı kablosuz şarj pedi
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  roofing
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">Panoramik Sabit Cam Tavan</p>
                  <p className="text-[11px] text-outline">
                    Gelişmiş UV ve termal yansıtıcı güneş korumalı akustik cam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  mode_fan
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">İklim Kontrollü Koltuklar</p>
                  <p className="text-[11px] text-outline">
                    Ön koltuklarda 3 kademeli aktif ısıtma ve ferahlatıcı havalandırma
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  videocam
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    360° Çevre Görüş Park Kamerası
                  </p>
                  <p className="text-[11px] text-outline">
                    Dinamik kaldırım çizgileri ve ultrasonik park asistanı
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  radar
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">Gelişmiş Sürüş Asistan Paketi</p>
                  <p className="text-[11px] text-outline">
                    Dur-kalk özellikli adaptif hız sabitleme ve şerit takip sistemi
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  toll
                </span>
                <div>
                  <p className="text-xs font-bold text-on-surface">Entegre HGS Otomatik Geçiş</p>
                  <p className="text-[11px] text-outline">
                    Köprü ve otoyollarda duraklamadan temassız otomatik geçiş cihazı
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Rental Policies & Conditions */}
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-4 border border-surface-container-high/60">
            <h2 className="text-base sm:text-lg font-bold text-on-surface font-headline">
              Kiralama Koşulları & Güvenlik Politikası
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-outline font-bold uppercase tracking-wider text-[10px]">
                  Yaş Sınırı
                </span>
                <p className="font-bold text-on-surface">25+ Yaş & 2 Yıl Ehliyet</p>
                <p className="text-on-surface-variant leading-relaxed">
                  Geçerli sürücü belgesi ve en az 2 yıllık aktif sürüş geçmişi aranır.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-outline font-bold uppercase tracking-wider text-[10px]">
                  Kilometre Sınırı
                </span>
                <p className="font-bold text-on-surface">300 km / Gün Dahil</p>
                <p className="text-on-surface-variant leading-relaxed">
                  Cömert kullanım hakkı. İlave kilometreler ekonomik birim fiyattan yansıtılır.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-outline font-bold uppercase tracking-wider text-[10px]">
                  Kapsamlı Kasko
                </span>
                <p className="font-bold text-on-surface">Tam Kaza & Hırsızlık Güvencesi</p>
                <p className="text-on-surface-variant leading-relaxed">
                  Standart CDW kasko ve 7/24 Türkiye geneli acil yol yardımı fiyata dahildir.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Interactive Reservation Form & Cost Breakdown */}
        <div className="lg:col-span-4 w-full">
          <div className="sticky top-28 space-y-4">
            {/* Reservation Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-5 sm:p-6 space-y-4 border border-surface-container-high/60">
              {/* Header Price & Discount */}
              <div className="flex items-start justify-between pb-3 border-b border-surface-container-high/60">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">
                      ₺{car.dailyPrice.toLocaleString('tr-TR')}
                    </span>
                    <span className="text-xs text-outline font-medium">/ gün</span>
                    {car.discountPrice && (
                      <span className="text-xs text-outline line-through font-mono">
                        ₺{(car.discountPrice > car.dailyPrice ? car.discountPrice : Math.round(car.dailyPrice * 1.15)).toLocaleString('tr-TR')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-tertiary text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]">price_check</span>
                    <span>Morent En İyi Fiyat Garantisi</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-secondary-container text-on-secondary rounded-lg text-xs font-bold uppercase tracking-wide">
                  %15 İNDİRİM
                </span>
              </div>

              {/* Date & Time Selectors */}
              <form onSubmit={handleReservationSubmit} className="space-y-3">
                {/* Pick-Up Capsule */}
                <div className="bg-surface-container-low rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-primary">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                      <span>ALIŞ TARİHİ & SAATİ</span>
                    </div>
                    <span className="text-outline font-normal text-[11px]">Temassız Teslim</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-outline font-medium block mb-1">
                        Tarih
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full text-xs font-mono p-1.5 bg-surface-container-lowest rounded-lg border border-surface-container-high/60 text-on-surface focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-outline font-medium block mb-1">
                        Saat
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full text-xs font-mono p-1.5 bg-surface-container-lowest rounded-lg border border-surface-container-high/60 text-on-surface focus:outline-none cursor-pointer"
                      >
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-outline font-medium block mb-0.5">
                      Teslimat Lokasyonu
                    </label>
                    <div className="bg-surface-container-lowest rounded-lg p-2 flex items-center gap-2 border border-surface-container-high/60">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        pin_drop
                      </span>
                      <span className="text-xs font-semibold text-on-surface truncate">
                        {car.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Drop-Off Capsule */}
                <div className="bg-surface-container-low rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-tertiary">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-2 w-2 rounded-full bg-tertiary"></span>
                      <span>İADE TARİHİ & SAATİ</span>
                    </div>
                    <span className="text-outline font-normal text-[11px]">45 Dk Esneme</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-outline font-medium block mb-1">
                        Tarih
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full text-xs font-mono p-1.5 bg-surface-container-lowest rounded-lg border border-surface-container-high/60 text-on-surface focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-outline font-medium block mb-1">
                        Saat
                      </label>
                      <select
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full text-xs font-mono p-1.5 bg-surface-container-lowest rounded-lg border border-surface-container-high/60 text-on-surface focus:outline-none cursor-pointer"
                      >
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="16:00">16:00</option>
                        <option value="18:00">18:00</option>
                        <option value="20:00">20:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-outline font-medium block mb-0.5">
                      İade Noktası
                    </label>
                    <div className="bg-surface-container-lowest rounded-lg p-2 flex items-center gap-2 border border-surface-container-high/60">
                      <span className="material-symbols-outlined text-[16px] text-outline">
                        swap_horiz
                      </span>
                      <span className="text-xs text-on-surface truncate">
                        Alış lokasyonu ile aynı ({car.location.split(",")[0]})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Flight Number or Notes */}
                <div>
                  <label className="text-[11px] text-outline block mb-1 font-medium">
                    Uçuş Numarası veya Teslimat Notları
                  </label>
                  <textarea
                    value={flightNotes}
                    onChange={(e) => setFlightNotes(e.target.value)}
                    rows={2}
                    placeholder="Örn: THY TK 2142 seferi ile iniş yapacağım..."
                    className="w-full text-xs p-2 rounded-xl bg-surface-container-low border border-surface-container-high/60 focus:bg-surface-container-lowest focus:outline-none"
                  ></textarea>
                </div>

                {/* Live Cost Breakdown */}
                <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-on-surface pb-1 border-b border-surface-container-high/60">
                    <span>Kiralama Süresi</span>
                    <span className="font-mono">{rentalDays} Gün</span>
                  </div>

                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span>
                      Araç Bedeli (₺{car.dailyPrice.toLocaleString('tr-TR')} × {rentalDays} gün)
                    </span>
                    <span className="font-mono">₺{totalCost.toLocaleString('tr-TR')}</span>
                  </div>

                  <div className="pt-2 mt-1 flex items-baseline justify-between bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high/60">
                    <div>
                      <span className="text-sm font-bold text-on-surface font-headline block">
                        Toplam Tutar
                      </span>
                      <p className="text-[10px] text-outline">Tüm vergiler ve kasko dahildir</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-primary font-mono leading-none">
                        ₺{totalCost.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2 border border-error/20 animate-fade-in">
                    <span className="material-symbols-outlined text-[16px] text-error">error</span>
                    <span className="flex-1 font-medium">{errorMessage}</span>
                  </div>
                )}

                {/* Instant Reserve CTA */}
                <div className="space-y-2 pt-1">
                  {isAuthenticated ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Rezervasyon İşleniyor...</span>
                        </span>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">lock</span>
                          <span>
                            {car.brand} {car.model} Rezerve Et
                          </span>
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="w-full h-12 rounded-xl bg-outline/20 text-on-surface-variant text-sm font-bold tracking-wide flex items-center justify-center gap-2 border border-outline-variant/40 transition-colors hover:bg-outline/30"
                    >
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      <span>Rezervasyon için Giriş Yapın</span>
                    </Link>
                  )}

                  <p className="text-center text-[11px] text-outline flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">
                      lock_clock
                    </span>
                    <span>Ön provizyon çekilmez. Araç başında ödeme.</span>
                  </p>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] text-on-surface-variant pt-2 border-t border-surface-container-high/60">
                <div className="bg-surface-container-low p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-tertiary block mx-auto mb-0.5">
                    verified_user
                  </span>
                  <span>Model Garantisi</span>
                </div>
                <div className="bg-surface-container-low p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-primary block mx-auto mb-0.5">
                    smartphone
                  </span>
                  <span>Mobil Kilit</span>
                </div>
                <div className="bg-surface-container-low p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-secondary-container block mx-auto mb-0.5">
                    health_and_safety
                  </span>
                  <span>Ozon Dezenfeksiyon</span>
                </div>
              </div>
            </div>

            {/* VIP Fleet Manager / Host Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm shadow">
                    AY
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface-container-lowest"></span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Ahmet Yılmaz</p>
                  <p className="text-[11px] text-outline">VIP Filo Koordinatörü</p>
                  <div className="flex items-center gap-1 text-[11px] text-outline mt-0.5">
                    <span
                      className="material-symbols-outlined text-[13px] text-secondary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold text-on-surface font-mono">4.99</span>
                    <span>• 340+ teslimat</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Ahmet Yılmaz ile VIP WhatsApp / Canlı Destek hattına yönlendiriliyorsunuz...",
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                <span>Asistan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {reservationConfirmed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-surface-container-high/60 space-y-4 text-center animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-on-surface font-headline">
                Rezervasyonunuz Onaylandı!
              </h3>
              <p className="text-xs text-on-surface-variant">
                {car.brand} {car.model} aracınız belirlenen tarihte teslim için hazırlanacaktır.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-outline">Araç:</span>
                <span className="font-bold text-on-surface">
                  {car.brand} {car.model} ({car.year})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Alış:</span>
                <span className="font-semibold text-on-surface">
                  {pickupDate} • {pickupTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">İade:</span>
                <span className="font-semibold text-on-surface">
                  {returnDate} • {returnTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Lokasyon:</span>
                <span className="font-semibold text-on-surface truncate">{car.location}</span>
              </div>
              <div className="flex justify-between border-t border-surface-container-high/60 pt-2 font-bold text-sm">
                <span>Tahmini Tutar:</span>
                <span className="text-primary font-mono">₺{totalCost.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <p className="text-[11px] text-outline">
              Rezervasyon detayları ve dijital mobil anahtar bağlantısı SMS & E-posta adresinize
              gönderilmiştir.
            </p>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setReservationConfirmed(false)}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-container transition-all cursor-pointer"
              >
                Tamam, Harika!
              </button>
              <Link
                href="/vehicles"
                className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface font-bold text-xs hover:bg-surface-container-high transition-all text-center"
              >
                Diğer Araçlar
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
