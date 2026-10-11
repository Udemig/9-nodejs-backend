import dotenv from "dotenv";
import express from "express";
import proxy from "express-http-proxy";

// değişkenleri yükle
dotenv.config();

// express uygulaması  oluştur
const app = express();

// gerekli yönlendirmeleri ayarla
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL!));
app.use("/api/delivery", proxy(process.env.DELIVERY_SERVICE_URL!));
app.use("/api/order", proxy(process.env.ORDER_SERVICE_URL!));
app.use("/api/restaurants", proxy(process.env.RESTAURANT_SERVICE_URL!));

// gateway portunu ayarla
app.listen(process.env.PORT, () => {
  console.log(`✅ Delivery Service ${process.env.PORT} portunda çalışıyor`);
});
