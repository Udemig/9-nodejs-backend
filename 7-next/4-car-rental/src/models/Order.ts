import mongoose, { Schema } from "mongoose";

export interface IOrder {
  _id: string;
  car: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  totalAmount: number;
  currency: string;
  status: "pending" | "paid" | "cancelled";
  type: string;
  rental: {
    pickupDate: Date;
    returnDate: Date;
    pickupTime: string;
    returnTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    days: number;
    notes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    rental: {
      pickupDate: {
        type: Date,
        required: true,
      },
      returnDate: {
        type: Date,
        required: true,
      },
      pickupTime: {
        type: String,
        required: true,
      },
      returnTime: {
        type: String,
        required: true,
      },
      pickupLocation: {
        type: String,
        required: true,
      },
      dropoffLocation: {
        type: String,
        required: true,
      },
      days: {
        type: Number,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  },
  { timestamps: true, versionKey: false },
);

// Clear cached model in development so schema updates apply immediately
if (process.env.NODE_ENV === "development" && mongoose.models.Order) {
  delete mongoose.models.Order;
}

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
