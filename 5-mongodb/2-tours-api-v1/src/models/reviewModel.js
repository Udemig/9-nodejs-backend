import mongoose, { version } from "mongoose";

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

export default mongoose.model("Review", reviewSchema);
