import { Schema, model } from "mongoose";
import type { IAddress, IOrder, IOrderItem } from "./types/index.js";

// sipariş edilen ürün tipi
const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  },
);

// teslimat adresi tipi
const addressSchema = new Schema<IAddress>(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    postalCode: { type: String, required: true },
    isDefault: { type: Boolean, required: true },
  },
  { _id: false, versionKey: false },
);

// sipariş şeması
const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    deliveryAddress: { type: addressSchema, required: true },
    items: { type: [orderItemSchema], required: true },
    deliveryFee: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit_card", "cash", "mobile_payment"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "on_the_way", "delivered", "cancelled"],
      default: "pending",
    },
    specialInstructions: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc: any, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: { virtuals: true },
  },
);

// virtual property
// veritabanında saklanaması gereksiz ama client'a gönderilecek özellikler
orderSchema.virtual("totalPrice").get(function () {
  return (
    this.items.reduce((total, item) => total + item.price * item.quantity, 0) + this.deliveryFee
  );
});

export default model<IOrder>("Order", orderSchema);
