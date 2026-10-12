import { Schema, model } from "mongoose";
import type { ICourier, IDelivery, ILocation } from "./types/index.js";

const courierSchema = new Schema<ICourier>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ["available", "busy", "offline"], default: "offline" },
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

const locationSchema = new Schema<ILocation>(
  {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  { _id: false },
);

const deliverySchema = new Schema<IDelivery>(
  {
    orderId: { type: String, required: true },
    courierId: { type: String, default: null },
    location: { type: locationSchema, default: null },
    actualDeliveryTime: { type: Date, default: null },
    acceptedAt: { type: Date, default: null },
    notes: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "assigned",
        "on_the_way",
        "delivered",
        "cancelled",
      ],
    },
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
export const Courier = model<ICourier>("Courier", courierSchema);
export const Delivery = model<IDelivery>("Delivery", deliverySchema);
