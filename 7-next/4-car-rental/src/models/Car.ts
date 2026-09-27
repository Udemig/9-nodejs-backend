import mongoose, { Schema, Model } from 'mongoose';
import { ICar } from '@/lib/types';

// Omit _id so Mongoose manages the ObjectId internally
export type ICarSchema = Omit<ICar, '_id'>;

const CarSchema = new Schema<ICarSchema>(
  {
    brand: {
      type: String,
      required: [true, 'Araç markası zorunludur'],
      trim: true,
      index: true,
    },
    model: {
      type: String,
      required: [true, 'Araç modeli zorunludur'],
      trim: true,
      index: true,
    },
    year: {
      type: Number,
      required: [true, 'Araç üretim yılı zorunludur'],
    },
    category: {
      type: String,
      required: [true, 'Araç kategorisi zorunludur'],
      enum: ['Sedan', 'SUV', 'Spor', 'Elektrikli', 'Hatchback', 'Van'],
      index: true,
    },
    transmission: {
      type: String,
      required: [true, 'Vites türü zorunludur'],
      enum: ['Otomatik', 'Manuel', 'PDK', 'Tek Vites'],
      index: true,
    },
    fuelType: {
      type: String,
      required: [true, 'Yakıt türü zorunludur'],
      enum: ['Elektrik', 'Benzin', 'Hibrit', 'Dizel'],
      index: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Yolcu kapasitesi zorunludur'],
      min: 1,
      max: 12,
      index: true,
    },
    tankOrBattery: {
      type: String,
      required: [true, 'Depo veya batarya kapasitesi zorunludur'],
    },
    horsepower: {
      type: Number,
      default: 250,
    },
    acceleration: {
      type: String,
      default: '4.5s 0-100',
    },
    topSpeed: {
      type: String,
      default: '250 km/s',
    },
    dailyPrice: {
      type: Number,
      required: [true, 'Günlük kiralama ücreti zorunludur'],
      min: 0,
      index: true,
    },
    discountPrice: {
      type: Number,
      default: undefined,
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Araç açıklaması zorunludur'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 12,
    },
    location: {
      type: String,
      default: 'İstanbul, Beşiktaş',
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search
CarSchema.index({ brand: 'text', model: 'text', description: 'text' });

const Car: Model<ICarSchema> =
  mongoose.models.Car || mongoose.model<ICarSchema>('Car', CarSchema);

export default Car;
