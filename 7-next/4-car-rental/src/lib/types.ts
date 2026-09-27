export type CarCategory = "Sedan" | "SUV" | "Spor" | "Elektrikli" | "Hatchback" | "Van";
export type TransmissionType = "Otomatik" | "Manuel" | "PDK" | "Tek Vites";
export type FuelType = "Elektrik" | "Benzin" | "Hibrit" | "Dizel";

export interface ICar {
  _id: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: TransmissionType;
  fuelType: FuelType;
  capacity: number;
  tankOrBattery: string;
  horsepower: number;
  acceleration: string;
  topSpeed: string;
  dailyPrice: number;
  discountPrice?: number;
  features: string[];
  description: string;
  isAvailable: boolean;
  isPopular: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  image?: string;
  role: "user" | "admin";
  provider: "credentials" | "google";
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface PaginationMeta {
  totalCars: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CarsApiResponse {
  success: boolean;
  cars: ICar[];
  pagination: PaginationMeta;
  error?: string;
}

export interface SingleCarApiResponse {
  success: boolean;
  car: ICar;
  error?: string;
}

export interface CheckoutBody {
  carId: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  returnDate: string;
  returnTime: string;
  returnLocation: string;
  dropoffLocation: string;
  flightNotes: string;
  rentalDays: number;
  dailyPrice: number;
  totalCost: number;
  totalAmount: number;
}

export interface OrderViewCar {
  _id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  capacity: number;
  horsepower?: number;
  dailyPrice: number;
  location: string;
}

export interface OrderViewData {
  orderId: string;
  status: "paid" | "pending" | "cancelled";
  createdAt: string;
  totalAmount: number;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  car: OrderViewCar;
  rental: {
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    days: number;
    notes?: string;
  };
  isSample?: boolean;
}

export interface OrderApiResponse {
  success: boolean;
  order?: OrderViewData;
  error?: string;
}
