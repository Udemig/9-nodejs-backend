import type { Request, Response, NextFunction } from "express";

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type UserRole = "customer" | "restaurant_owner" | "courier" | "admin";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IAddress {
  title: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface IOrder {
  userId: string;
  restaurantId: string;
  items: IOrderItem[];
  deliveryFee: number;
  totalPrice?: number;
  deliveryAddress: IAddress;
  paymentMethod: "credit_card" | "cash" | "mobile_payment";
  status: OrderStatus;
  specialInstructions: string | undefined;
}
