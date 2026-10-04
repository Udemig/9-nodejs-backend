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
