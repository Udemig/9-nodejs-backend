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
    priceDiscount: {
      type: Number,
    },
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
    premium: { type: Boolean },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

//! Virtual Property (Sanal Özellik)
// Örn: Şuan veritabanına turların fiyatlarını ve indirim fiyatını tutuyoruz ama frontend bizden indiirimli fiyatıda istedi. Bu noktada indirimli fiyatı veritabanında tutmak gereksiz bir maaliyet olur. Bunun yerine cevap gönderme sırasında indirimli fiyat alanını hesaplayıp gönderilecek cevaba eklersek hem frontend'in ihtiyacını karşılamış oluruz hem de veritabanında gereksiz veri olmaz
tourSchema.virtual("discountedPrice").get(function () {
  return this.price - this.priceDiscount;
});

// Örn: Frontend bizden yönlendirme için ürünlerin slug verisini istedi. Bu noktada bu alanı zaten tur ismi üzerinden hesaplayabilceğimiz için veritbanına kaydetmeden virtual property olarak göndermek mantıklı olur
// Ege Doğa Gezisi ===> ege-doğa-gezisi
tourSchema.virtual("slug").get(function () {
  return this.name.replaceAll(" ", "-").toLowerCase();
});

//! Middleware
// Bir belgenin kaydedilme, güncelleme, silinme, okunma gibi olaylarından önce veya sonra gerçekleştirlmesi gereken işlemleri belirlemek için kullanılır.
// Örn: Client'tan gelen tur versisinin veriatbanına kaydedikten sonra mail göndermek için kullanılabilir
tourSchema.post("save", function (doc) {
  console.log(doc._id + "li tur sisteme kayıt edildi maili gönderiliyor.....");
});

// Örn: herhangi bir find sorgusunda premium turların dahil edilmesini engellemek amaycıyla kullanılabilir
tourSchema.pre("find", function () {
  this.find({ premium: { $ne: true } });
});

// yukardaki şemayı kullanaraka mongoose model oluştur
const 
Tour = mongoose.model("Tour", tourSchema);
export default Tour;
