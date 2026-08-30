import rateLimit from "express-rate-limit";
import { config } from "../config/enviroment.js";

export const globalLimiter = rateLimit({
  windowMs: config.GLOBAL_LIMIT_MS,
  max: config.GLOBAL_LIMIT_MAX,
});

export const authLimiter = rateLimit({
  windowMs: config.AUTH_LIMIT_MS,
  max: config.AUTH_LIMIT_MAX,
});
