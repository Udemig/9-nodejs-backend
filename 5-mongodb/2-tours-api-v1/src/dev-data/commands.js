import mongoose from "mongoose";
import fs from "fs";
import Tour from "../models/tourModel.js";
import User from "./../models/userModel.js";
import Review from "./../models/reviewModel.js";
import dotenv from "dotenv";
dotenv.config();

// Gelşitirme aşamasında mongodb'deki verileri sıkça değişeceğinden veya silineceğinden dolayı veritabanındaki verileri temizlemeye ve json dosyasında örnek verileri veritabanına aktarmaya yarayan, terminal komutları ile çalışacak 2 fonksiyon yazalım

// veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB veritabanına bağlandı"))
  .catch(() => console.log("🟠 Veritabanına bağlantı başarısız"));

// json dosyasındaki verileri al
const tours = JSON.parse(fs.readFileSync("./src/dev-data/data/tours.json", "utf-8"));
const users = JSON.parse(fs.readFileSync("./src/dev-data/data/users.json", "utf-8"));
const reviews = JSON.parse(fs.readFileSync("./src/dev-data/data/reviews.json", "utf-8"));

// json dosyasından alınan verileri veritabanına kaydedicek fonksiyon
const importData = async () => {
  try {
    await Tour.create(tours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews, { validateBeforeSave: false });
    console.log("🟢 Veriler veritabanına aktarıldı");
  } catch (error) {
    console.log("🟠 Veriler aktarılırken bir hata oluştu");
  }
  process.exit();
};

//  verileri veritabanından silecek fonksiyon
const clearData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("🟢 Veriler veritabanından kaldırıldı");
  } catch (error) {
    console.log("🟠 Veriler kaldırılırken bir hata oluştu");
  }
  process.exit();
};

if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--clear")) {
  clearData();
} else {
  console.log("🟠 Lütfen geçerli bir argüman girin: --import veya --clear");
  process.exit();
}
