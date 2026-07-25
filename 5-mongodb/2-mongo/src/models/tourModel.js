/*
 ! Mongoose'da neden Model'e ihitiyaç duyarız?
 * Bir kolleksiyona yeni bir veri eklerken, eklenicek olan verinin bir kısıtlamaya tabi tutulmasını isteriz. Örneğin users kolleksiyonundaki her bir belgenin name, sunrma, age değerlerinin zorunlu olmasını isteyebilriiz.
 * Kyadedilecek olan her bir veri öncelikle modeldeki kısıtlamalara uyuyor mu kontrol edilir eğerki uymuyorsa hata fırlatılır, uygunsa veritabanına kaydedilir. (validasyon)
 * Bu sayede kolleksiyonda tutulan belgelerin daha tutarlı olması sağlanır
*/

import mongoose from "mongoose";
import validator from "validator";

// schema: veritabanına kaydedilecek tur verisinin şartlarını tanımlamamızı sağlar
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: [(val) => validator.isAlphanumeric(val, "tr-TR", { ignore: " " })],
    },
    price: { type: Number, required: true, min: [0, "Fiyat pozitif olmalı"] },
    maxGroupSize: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Değer tam sayı olmalı",
      },
    },
    difficulty: { type: String, required: true, enum: ["kolay", "orta", "zor", "çok zor"] },
    ratingsAverage: { type: Number, min: 1, max: 5, default: 4.0 },
    ratingsQuantity: { type: Number, min: 0, default: 0 },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    imageCover: { type: String, required: true },
    images: { type: [String], required: true },
    startDates: { type: [Date], required: true },
  },
  { timestamps: true, versionKey: false },
);

// yukardaki şemayı kullanaraka mongoose model oluştur
const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
