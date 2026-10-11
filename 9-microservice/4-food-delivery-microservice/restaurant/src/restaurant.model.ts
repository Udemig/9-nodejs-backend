import { Schema, model } from "mongoose";
import type { IRestaurant, IMenuItem } from "./types/index.js";

const restaurantSchema = new Schema<IRestaurant>(
  {
    ownerId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    categories: { type: [String], required: true },
    deliveryTime: { type: Number, required: true },
    minOrderPrice: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    isOpen: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

const menuItemSchema = new Schema<IMenuItem>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    isVegetarian: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    preperationTime: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// model
export const Restaurant = model<IRestaurant>("Restaurant", restaurantSchema);
export const MenuItem = model<IMenuItem>("MenuItem", menuItemSchema);
