import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import tourRoutes from "./routes/tourRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { NotFound } from "./utils/error.js";
import errorHandler from "./middlewares/errorHandler.js";

// env değişkenlerine erişmemizi sağlayacak fonksiyon
dotenv.config();

// express uygulaması oluştur
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// mongodb veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB veritabanına bağlandı"))
  .catch(() => console.log("🟠 Veritabanına bağlantı başarısız"));

// route'ları projeye tanıt
app.use("/api/tours", tourRoutes);
app.use("/api/auth", authRoutes);

// tanımlanmayan route
app.use((req, res, next) => next(new NotFound()));

// global hata yönetimi
app.use(errorHandler);

// api'ın dinlyeceği portu belirle
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🟣 API ${PORT}. portu dinlemeye başladı`);
});
