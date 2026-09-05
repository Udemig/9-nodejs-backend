import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import tourRoutes from "./routes/tourRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { NotFound } from "./utils/error.js";
import errorHandler from "./middlewares/errorHandler.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import reviewRoutes from "./routes/reviewRoutes.js";

// env değişkenlerine erişmemizi sağlayacak fonksiyon
dotenv.config();

// express uygulaması oluştur
const app = express();

// rate limit
const loginRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Kısa süre içerisinde çok fazla deneme yaptınız lütfen daha sonra tekrar deneyiniz",
});
const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Kısa süre içerisinde çok fazla deneme yaptınız lütfen daha sonra tekrar deneyiniz",
});

// middleware
app.use(helmet());
app.use(generalRateLimit);
app.use("/api/auth/", loginRateLimit);
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// mongodb veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB veritabanına bağlandı"))
  .catch(() => console.log("🟠 Veritabanına bağlantı başarısız"));

// route'ları projeye tanıt
app.use("/api/tours", tourRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// tanımlanmayan route
app.use((req, res, next) => next(new NotFound()));

// global hata yönetimi
app.use(errorHandler);

// api'ın dinlyeceği portu belirle
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🟣 API ${PORT}. portu dinlemeye başladı`);
});
