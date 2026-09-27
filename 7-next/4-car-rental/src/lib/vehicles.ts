import connectToDatabase from '@/lib/db';
import Car from '@/models/Car';
import { ICar, PaginationMeta } from '@/lib/types';

export interface VehicleFilterParams {
  search?: string;
  category?: string;
  capacity?: string;
  transmission?: string;
  fuelType?: string;
  maxPrice?: string;
  popular?: string;
  available?: string;
  sort?: string;
  page?: string | number;
  limit?: string | number;
}

export interface VehiclesResult {
  cars: ICar[];
  pagination: PaginationMeta;
}

// Fallback seed vehicles if DB is empty or unreachable
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

/**
 * Server-side vehicles query function.
 * Direct database execution without HTTP self-fetch overhead.
 */
export async function getVehicles(params: VehicleFilterParams = {}): Promise<VehiclesResult> {
  try {
    await connectToDatabase();

    const search = params.search?.trim();
    const category = params.category?.trim();
    const capacity = params.capacity?.trim();
    const transmission = params.transmission?.trim();
    const fuelType = params.fuelType?.trim();
    const maxPrice = params.maxPrice;
    const popular = params.popular;
    const available = params.available;
    const sort = params.sort?.trim() || 'popular';

    const page = Math.max(1, parseInt(String(params.page || '1'), 10));
    const limit = Math.min(50, Math.max(1, parseInt(String(params.limit || '9'), 10)));
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ brand: searchRegex }, { model: searchRegex }, { category: searchRegex }];
    }

    if (category) {
      const categories = category.split(',').map((c) => c.trim()).filter(Boolean);
      if (categories.length > 0) query.category = { $in: categories };
    }

    if (capacity) {
      const capacities = capacity
        .split(',')
        .map((c) => parseInt(c.trim(), 10))
        .filter((c) => !isNaN(c));
      if (capacities.length > 0) {
        if (capacities.includes(7)) {
          const others = capacities.filter((c) => c !== 7);
          const conditions: Array<Record<string, unknown>> = [{ capacity: { $gte: 7 } }];
          if (others.length > 0) {
            conditions.push({ capacity: { $in: others } });
          }
          query.$or = conditions;
        } else {
          query.capacity = { $in: capacities };
        }
      }
    }

    if (transmission) {
      const transmissions = transmission.split(',').map((t) => t.trim()).filter(Boolean);
      if (transmissions.length > 0) query.transmission = { $in: transmissions };
    }

    if (fuelType) {
      const fuelTypes = fuelType.split(',').map((f) => f.trim()).filter(Boolean);
      if (fuelTypes.length > 0) query.fuelType = { $in: fuelTypes };
    }

    if (maxPrice) {
      const numericPrice = parseFloat(maxPrice);
      if (!isNaN(numericPrice) && numericPrice > 0) {
        query.dailyPrice = { $lte: numericPrice };
      }
    }

    if (popular === 'true') {
      query.isPopular = true;
    }

    if (available === 'true') {
      query.isAvailable = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortOptions: Record<string, any> = {};
    switch (sort) {
      case 'price-asc':
        sortOptions.dailyPrice = 1;
        break;
      case 'price-desc':
        sortOptions.dailyPrice = -1;
        break;
      case 'rating':
        sortOptions.rating = -1;
        break;
      case 'horsepower':
        sortOptions.horsepower = -1;
        break;
      case 'year':
        sortOptions.year = -1;
        break;
      case 'popular':
      default:
        sortOptions.isPopular = -1;
        sortOptions.rating = -1;
        break;
    }

    const [totalCars, carDocs] = await Promise.all([
      Car.countDocuments(query),
      Car.find(query).sort(sortOptions).skip(skip).limit(limit).lean(),
    ]);

    const cars = JSON.parse(JSON.stringify(carDocs)) as ICar[];

    if (cars.length === 0 && totalCars === 0 && Object.keys(query).length === 0) {
      return {
        cars: FALLBACK_CARS,
        pagination: {
          totalCars: FALLBACK_CARS.length,
          totalPages: 1,
          currentPage: 1,
          limit,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const totalPages = Math.ceil(totalCars / limit) || 1;

    return {
      cars,
      pagination: {
        totalCars,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('getVehicles query error:', error);
    return {
      cars: FALLBACK_CARS,
      pagination: {
        totalCars: FALLBACK_CARS.length,
        totalPages: 1,
        currentPage: 1,
        limit: 9,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}
