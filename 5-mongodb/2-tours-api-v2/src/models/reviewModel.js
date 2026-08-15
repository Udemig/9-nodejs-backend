import mongoose, { version } from "mongoose";
import Tour from "./tourModel.js";

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Yorum içeriği boş olamaz"],
    },
    rating: {
      type: Number,
      min: [1, "Puan en az 1 olabilir"],
      max: [5, "Puan en fazla 5 olabilir"],
      required: [true, "Puan alanı boş olamaz"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Yorum yapan kullanıcı bilgisi boş olamaz"],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Yorum yapılan tur bilgisi boş olamaz"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// yapılan dorgulardan önce kullanıcı bilgilerini dolduracak mw
reviewSchema.pre(/^find/, function () {
  this.populate("user", "name photo");
});

// bir tur için turunu rating ortalaması hesaplayan fonksiyon
reviewSchema.statics.calcRating = async function (tourId) {
  const result = await this.aggregate([
    // 1) tura ait olan yorumları al
    {
      $match: {
        tour: tourId,
      },
    },
    // 2) toplam yorum sayısı ve rating ortalamasını hesapla
    {
      $group: {
        _id: "$tour",
        ratingCount: {
          $sum: 1,
        },
        avgRating: {
          $avg: "$rating",
        },
      },
    },
  ]);

  if (result.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: result[0].avgRating.toFixed(2),
      ratingsQuantity: result[0].ratingCount,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

// her yeni yorum atıldığında / silindiğinde / güncellendiğinde rating hesağlama fonksiyonnuu çalıştır ve tur belgesini güncelle
reviewSchema.post("save", function () {
  Review.calcRating(this.tour);
});
reviewSchema.post(/^findOneAnd/, function (doc) {
  Review.calcRating(doc.tour._id);
});

// index
reviewSchema.index({ tour: 1 });

// aynı kullanıcı aynı tura sadece 1 yorum atabilsin indexi
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
