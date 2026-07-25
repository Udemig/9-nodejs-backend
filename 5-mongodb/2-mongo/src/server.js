import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import tourRoutes from "./routes/tourRoutes.js";

// env değişkenlerine erişmemizi sağlayacak fonksiyon
dotenv.config();

// express uygulaması oluştur
const app = express();

// middleware
app.use(express.json());

// mongodb veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB veritabanına bağlandı"))
  .catch(() => console.log("🟠 Veritabanına bağlantı başarısız"));

// route'ları projeye tanıt
app.use("/api/tours", tourRoutes);

// api'ın dinlyeceği portu belirle
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🟣 API ${PORT}. portu dinlemeye başladı`);
});
