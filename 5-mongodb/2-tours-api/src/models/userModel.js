import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim alanı zorunludur"],
      minLength: [2, "İsim 2 karakterden kısa olamaz"],
      maxLength: [30, "İsim 30 karakterden uzun olamaz"],
      validate: [
        (val) => validator.isAlpha(val, "tr-TR", { ignore: " " }),
        "İsim sadece harflerden oluşabilir",
      ],
    },
    email: {
      type: String,
      required: [true, "Email alanı zorunludur"],
      unique: [true, "Bu eposta adresi zaten kullanımda"],
      validate: [validator.isEmail, "Lütfen geçerli bir mail adresi giriniz"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "guide", "lead-guide"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    photo: {
      type: String,
      default: "defaultpic",
    },
    password: {
      type: String,
      required: [true, "Şifre alanı zorunludur"],
      minLength: [8, "Şifre en az 8 karakter olmalıdır"],
      validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    // client'a veriyi göndermeden hemen önce çalışan fonksiyon
    toJSON: {
      transform: function (doc, ret) {
        // şifre alanını kaldır
        delete ret?.password;
      },
    },
  },
);

//? Veritabanına belge kaydedilmeden önce:
//* password alanına hashleme ve saltlama yap
userSchema.pre("save", async function () {
  // kaydedilen kullanıcının parolası değişmediyse fonksiyonu durdur
  if (!this.isModified("password")) return;

  // şifreyi hashle ve saltla
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
