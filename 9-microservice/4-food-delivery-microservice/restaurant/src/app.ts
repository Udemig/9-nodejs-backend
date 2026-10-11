import dotenv from "dotenv";
import { validateEnv } from "./utils/env.js";
import mongoose from "mongoose";
import rabbitmqService from "./rabbitmq.service.js";
import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import restaurantRoutes from "./restaurant.routes.js";
import { errorMiddleware, notFoundMiddleware } from "./restaurant.middleware.js";

/*
 * Restaurant Service
 --------------
 * Servis ayağa kalkma sırası:
 * 1) .env yükle
 * 2) env şemasını doğrula (eksik/yanlış varsa hemen kapat - fail fast)
 * 3) MongoDB'ye bağlan
 * 4) RabbitMQ'ya bağlan
 * 5) Middleware & Routes
 * 6) Express'i ayağa kaldır (yukarıdaki üçü başarılıysa)
 * 7) Gracefull Shutdown
*/

// 1) .env yükle
dotenv.config();

// 2) env değişkenlerini kontrol et
const env = validateEnv();

// projeyi başlatma fonksiyonu
async function bootstrap() {
  // 3) MongoDB
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB'ye bağlandı");
  } catch (error) {
    console.error("❌ MongoDB'ye bağlanılamadı: ", error);
  }

  // 4) RabbitMQ
  await rabbitmqService.initialize();

  // 5) Middleware & Routes
  const app = express();

  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW,
    max: env.RATE_LIMIT_MAX_REQ,
  });

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(limiter);

  app.use("/", restaurantRoutes);

  app.use(errorMiddleware);
  app.use(notFoundMiddleware);

  // 6) Express
  const server = app.listen(env.PORT, () => {
    console.log(`✅ Restaurant Service ${env.PORT} portunda çalışıyor`);
  });

  // 7) Graceful shutdown
  // Docker container'ı kapatınca SIGTERM sinayli gönderir bu sinyali yakalamadan kapatırsa devam eden istekler yarım kalır
  // Sağlı bir şekilde servisin kapnması için sırasıyla
  // - Yeni istekler almayı durdururuz
  // - MongoDB bağlantısını sonlandırırız
  // - RabbitMQ kanalını kapatırız
  const shutdown = async (signal: string) => {
    console.log(`💤 ${signal} alındı, kapatılıyor...`);

    server.close(async () => {
      await mongoose.disconnect();
      await rabbitmqService.close();
      console.log("Tüm bağlantılar kapatıldı, hoşçakal");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap().catch((error) => {
  console.error("❌ Başlatma hatası: ", error);
  process.exit(1);
});
