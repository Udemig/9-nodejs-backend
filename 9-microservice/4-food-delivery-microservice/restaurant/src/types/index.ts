import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";

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

export interface IRestaurant {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  categories: string[];
  deliveryTime: number;
  deliveryFee: number;
  minOrderPrice: number;
  isOpen: boolean;
  ownerId: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IMenuItem {
  restaurantId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isAvailable: boolean;
  preperationTime: number;
  createAt: Date;
  updatedAt: Date;
}
