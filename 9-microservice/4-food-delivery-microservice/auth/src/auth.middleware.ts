import type { Request, Response, NextFunction } from "express";
import AppError from "./utils/app-eror.js";
import jwt from "jsonwebtoken";
import { validateEnv } from "./utils/env.js";
import type { JWTPayload } from "./types/index.js";
import User from "./auth.model.js";

//* 404 Middleware
export const notFoundMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "error",
    message: "İstek attığınız adres bulunamadı",
  });
};

//* Global Error Handler
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Bir şeyler test gitti...";

  if (statusCode >= 500) {
    console.error("[ERROR]", err);
  } else {
    console.log("[ERROR]", message);
  }

  res.status(statusCode).json({ status: "error", message });
};

//* Authenticate Middleware: JWT Kontrolü
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // token var mı kontrolü
    const accessToken = req.cookies.token;
    if (!accessToken) throw new AppError("Token bulunamadı", 401);

    // token geçerli mi kontrolü
    const { JWT_SECRET } = validateEnv();
    const decoded = jwt.verify(accessToken, JWT_SECRET) as JWTPayload;

    // kullanıcı hala sisteme kayıtlı mı (silinmiş olabilir)
    const user = await User.findById(decoded.userId);
    if (!user) throw new AppError("Geçersiz token veya kullanıcı aktif değil", 401);

    // kullanıcıya controller'da erişebilmek ...
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error instanceof jwt.TokenExpiredError) throw new AppError("Tokenın süresi doldu", 401);
    throw new AppError("Token geçersiz", 401);
  }
};
