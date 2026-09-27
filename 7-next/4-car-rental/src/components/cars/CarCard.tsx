import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ICar } from '@/lib/types';
import { getCarImage } from '@/lib/car-images';

interface CarCardProps {
  car: ICar;
}

/**
 * CarCard - React Server Component (Zero Client JS)
 * Displays vehicle specifications, dynamic 3D render from Imagin.studio (angle 01),
 * pricing, and navigation.
 */
export default function CarCard({ car }: CarCardProps) {
  const imageUrl = getCarImage(car.brand, car.model, car.category, car.year);

  const fuelIcon =
    car.fuelType === 'Elektrik'
      ? 'bolt'
      : car.fuelType === 'Hibrit'
      ? 'eco'
      : 'local_gas_station';

  return (
    <article className="group bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between relative border border-surface-container-high/60">
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              {car.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors font-headline leading-tight mt-0.5">
              <Link href={`/vehicles/${car._id}`}>
                {car.brand} {car.model}
              </Link>
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span
                className="material-symbols-outlined text-secondary-container text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-bold text-on-surface font-mono">{car.rating.toFixed(2)}</span>
              <span className="text-outline text-[11px]">({car.reviewCount} inceleme)</span>
            </div>
          </div>

          {/* Model Year Badge */}
          <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-[11px] font-bold">
            {car.year}
          </span>
        </div>

        {/* Vehicle Showcase Image with Next.js Image */}
        <Link
          href={`/vehicles/${car._id}`}
          className="relative h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-surface-container-low/60 group-hover:opacity-95 transition-opacity"
        >
          <div className="relative w-full h-full p-2 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-[11px] font-bold text-tertiary-container shadow-sm">
            {car.horsepower} HP
          </span>
          {car.discountPrice && (
            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary text-[10px] font-bold uppercase shadow-sm">
              Fırsat
            </span>
          )}
        </Link>

        {/* 4-Spec Metric Badges */}
        <div className="grid grid-cols-4 gap-1.5 py-1">
          <div className="flex flex-col items-center justify-center p-2 bg-surface-container-low rounded-xl text-center">
            <span className="material-symbols-outlined text-[16px] text-outline">{fuelIcon}</span>
            <span className="text-[11px] font-semibold text-on-surface mt-0.5 truncate max-w-full">
              {car.fuelType}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-surface-container-low rounded-xl text-center">
            <span className="material-symbols-outlined text-[16px] text-outline">settings</span>
            <span className="text-[11px] font-semibold text-on-surface mt-0.5 truncate max-w-full">
              {car.transmission}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-surface-container-low rounded-xl text-center">
            <span className="material-symbols-outlined text-[16px] text-outline">
              airline_seat_recline_normal
            </span>
            <span className="text-[11px] font-semibold text-on-surface mt-0.5">
              {car.capacity} Koltuk
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-surface-container-low rounded-xl text-center">
            <span className="material-symbols-outlined text-[16px] text-outline">speed</span>
            <span className="text-[11px] font-semibold text-on-surface mt-0.5 truncate max-w-full">
              {car.acceleration}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Tier & Action */}
      <div className="pt-4 mt-2 border-t border-surface-container-high/40 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold text-primary font-headline">
              ₺{car.dailyPrice.toLocaleString('tr-TR')}
            </span>
            <span className="text-xs text-outline font-medium">/ gün</span>
            {car.discountPrice && (
              <span className="text-xs text-outline line-through ml-1 font-mono">
                ₺{(car.discountPrice > car.dailyPrice ? car.discountPrice : Math.round(car.dailyPrice * 1.15)).toLocaleString('tr-TR')}
              </span>
            )}
          </div>
          <p className="text-[10px] text-outline font-medium truncate">
            {car.location}
          </p>
        </div>

        <Link
          href={`/vehicles/${car._id}`}
          className="w-9 h-9 shrink-0 rounded-xl bg-primary hover:bg-primary-container text-on-primary transition-all shadow-sm flex items-center justify-center"
          aria-label={`${car.brand} ${car.model} detaylarını incele`}
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}
