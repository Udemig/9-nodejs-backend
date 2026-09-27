import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';
import { ICar } from '@/lib/types';
import VehicleDetailClient from '@/components/cars/VehicleDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fallback seed vehicles for reliable static rendering or before seed is run
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
    features: [
      '800V Ultra Hızlı Şarj Mimarisi',
      'Porsche InnoDrive Sürüş Asistanı',
      'Panoramik Sabit Cam Tavan',
      'Burmester 3D High-End Ses',
      'FastPass NFC Dijital Anahtar',
    ],
    description:
      'Elektriğin saf gücüyle üst düzey grand-touring konforunun kusursuz birleşimi. 800V ultra hızlı mimarisi sayesinde yüksek hızlı DC istasyonlarda yalnızca 22 dakikada %5\'ten %80\'e şarj olur.',
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

async function getCarById(id: string): Promise<ICar | null> {
  // Check fallback samples first
  const fallback = FALLBACK_CARS.find((c) => c._id === id);
  if (fallback) return fallback;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await connectToDatabase();
      const doc = await Car.findById(id).lean();
      if (doc) {
        return JSON.parse(JSON.stringify(doc)) as ICar;
      }
    }
  } catch (err) {
    console.error('Error fetching car in page.tsx:', err);
  }

  // If not found in DB, fallback to default car if id is sample or preview
  if (id.startsWith('sample-') || id === 'preview') {
    return FALLBACK_CARS[0];
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return {
      title: 'Araç Bulunamadı | Morent',
    };
  }

  return {
    title: `${car.brand} ${car.model} (${car.year}) Kiralama | Morent`,
    description: car.description,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-background text-on-background py-4">
      <VehicleDetailClient car={car} />
    </main>
  );
}
