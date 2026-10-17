import type { Request, Response, NextFunction } from "express";
import type { ServerStreamFileResponseOptions } from "node:http2";

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type UserRole = "customer" | "restaurant_owner" | "courier" | "admin";

export interface IUser {
  id: string;
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

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "assigned"
  | "ready"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface IAddress {
  title: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: string;
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

export interface ICourier {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: "available" | "busy" | "offline";
}

export interface ILocation {
  lat: number;
  lon: number;
}

export interface IDelivery {
  orderId: string;
  courierId?: string;
  status: OrderStatus;
  location?: ILocation;
  notes?: string;
  acceptedAt?: Date;
  actualDeliveryTime?: Date;
}
