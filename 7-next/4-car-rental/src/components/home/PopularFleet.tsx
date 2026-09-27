import React from 'react';
import Link from 'next/link';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';
import { ICar } from '@/lib/types';
import CarCard from '@/components/cars/CarCard';

// Fallback high-tier vehicles in case seed is not yet run or DB is temporarily offline
const FALLBACK_CARS: ICar[] = [
  {
    _id: 'sample-porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan 4S',
    year: 2025,
    category: 'Elektrikli',
    transmission: 'Tek Vites',
    fuelType: 'Elektrik',
    capacity: 4,
    tankOrBattery: '93.4 kWh',
    horsepower: 522,
    acceleration: '3.8s 0-100',
    topSpeed: '250 km/s',
    dailyPrice: 14500,
    discountPrice: 12900,
    rating: 4.96,
    reviewCount: 84,
    location: 'İstanbul Havalimanı (IST) VIP Terminal',
    isAvailable: true,
    isPopular: true,
    features: ['800V Hızlı Şarj', 'Porsche InnoDrive', 'Panoramik Cam Tavan'],
    description: 'Saf elektrikli performans ve Porsche sürüş dinamikleri bir arada.',
  },
  {
    _id: 'sample-bmw-m4',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    category: 'Spor',
    transmission: 'Otomatik',
    fuelType: 'Benzin',
    capacity: 4,
    tankOrBattery: '59 L',
    horsepower: 503,
    acceleration: '3.4s 0-100',
    topSpeed: '290 km/s',
    dailyPrice: 13500,
    discountPrice: 12000,
    rating: 4.92,
    reviewCount: 62,
    location: 'İstanbul, Maslak Finans Merkezi',
    isAvailable: true,
    isPopular: true,
    features: ['M xDrive', 'Karbon Tavan', 'Harman Kardon Ses'],
    description: 'M TwinPower Turbo 6 silindirli motor ile pist performansını caddeye taşıyın.',
  },
  {
    _id: 'sample-range-rover-velar',
    brand: 'Land Rover',
    model: 'Range Rover Velar',
    year: 2024,
    category: 'SUV',
    transmission: 'Otomatik',
    fuelType: 'Hibrit',
    capacity: 5,
    tankOrBattery: '82 L',
    horsepower: 395,
    acceleration: '5.2s 0-100',
    topSpeed: '240 km/s',
    dailyPrice: 13500,
    discountPrice: 12000,
    rating: 4.88,
    reviewCount: 95,
    location: 'Muğla, Bodrum Marina / Yalıkavak',
    isAvailable: true,
    isPopular: true,
    features: ['Akıllı AWD', 'Meridian Ses Sistemi', 'Havalı Süspansiyon'],
    description: 'Minimalist tasarım felsefesi ve üstün arazi konforu.',
  },
  {
    _id: 'sample-tesla-model-s',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    category: 'Elektrikli',
    transmission: 'Tek Vites',
    fuelType: 'Elektrik',
    capacity: 5,
    tankOrBattery: '100 kWh',
    horsepower: 1020,
    acceleration: '2.1s 0-100',
    topSpeed: '322 km/s',
    dailyPrice: 15500,
    discountPrice: 13900,
    rating: 4.98,
    reviewCount: 110,
    location: 'İstanbul, Beşiktaş / Bebek Ofisi',
    isAvailable: true,
    isPopular: true,
    features: ['Tri-Motor AWD', 'Full Self-Driving', 'Yoke Direksiyon'],
    description: '1.020 beygir güç ve rakipsiz ivmelenme ile geleceğin sürüş deneyimi.',
  },
];

async function getPopularCars(): Promise<ICar[]> {
  try {
    await connectToDatabase();
    const docs = await Car.find({ isPopular: true }).limit(4).lean();
    if (docs && docs.length > 0) {
      return JSON.parse(JSON.stringify(docs)) as ICar[];
    }
  } catch (err) {
    console.error('Error fetching popular cars in PopularFleet Server Component:', err);
  }
  return FALLBACK_CARS;
}

/**
 * PopularFleet - React Server Component
 * Fetches popular fleet directly from MongoDB during server rendering.
 * Eliminates client-side fetch waterfalls, state management, and loading flashes.
 */
export default async function PopularFleet() {
  const cars = await getPopularCars();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="fleet">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-container"></span>
            <span className="text-xs font-bold tracking-widest text-primary-container uppercase">
              Özenle Seçilmiş Koleksiyon
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-background font-headline tracking-tight">
            Bugün Kiralanabilir Popüler Araçlar
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl">
            Anında teslime hazır, sıfır ayarında ve kusursuz bakım görmüş prestijli modeller.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs sm:text-sm font-bold transition-all shadow-sm group"
          >
            <span>Tüm Filoyu İncele (140+ Araç)</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}

export function PopularFleetSkeleton() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="fleet">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-4 bg-surface-container-high rounded w-36"></div>
          <div className="h-8 bg-surface-container-high rounded w-72"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-2xl p-5 border border-surface-container-high/60 animate-pulse space-y-4"
          >
            <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
            <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
            <div className="h-40 bg-surface-container-low rounded-xl"></div>
            <div className="grid grid-cols-4 gap-1.5">
              <div className="h-10 bg-surface-container-low rounded-lg"></div>
              <div className="h-10 bg-surface-container-low rounded-lg"></div>
              <div className="h-10 bg-surface-container-low rounded-lg"></div>
              <div className="h-10 bg-surface-container-low rounded-lg"></div>
            </div>
            <div className="h-10 bg-surface-container-high rounded-xl mt-2"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

