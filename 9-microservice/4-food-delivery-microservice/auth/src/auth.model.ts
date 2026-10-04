import { Schema, model } from "mongoose";
import type { IUser } from "./types/index.js";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email zorunludur"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Şifre zorunludur"],
    },
    firstName: {
      type: String,
      required: [true, "Ad zorunludur"],
    },
    lastName: {
      type: String,
      required: [true, "Soyad zorunludur"],
    },
    phone: {
      type: String,
      required: [true, "Telefon numarası zorunludur"],
    },
    role: {
      type: String,
      enum: ["customer", "restaurant_owner", "courier", "admin"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

// model
export default model<IUser>("User", userSchema);
