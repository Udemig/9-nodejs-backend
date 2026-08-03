import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendMail from "../utils/sendMail.js";

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

    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    passwordChangedAt: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true,
    // client'a veriyi göndermeden hemen önce çalışan fonksiyon
    toJSON: {
      transform: function (doc, ret) {
        // şifre alanını kaldır
        delete ret?.password;
        delete ret?.passwordResetToken;
        delete ret?.passwordResetExpires;
        delete ret?.passwordChangedAt;
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

//? Model'in içerisine tanımlı bir fonksiyon
//* şifre sıfırlama tokenı oluştur
userSchema.methods.createResetToken = function () {
  // 1) 32 byte'lık rastgele bir veri oluştur ve bunu hexadecimal bir string formatına çevir
  // örn: ff63aa79f9b6f1ccc44da93369beb4a1e7b7e93e415d3c8b17e9b31e6bde721d
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2) token'ı hashle ve veritabanına kaydet
  // örn: 3eec376660feae717896a2075ea279f8117feff1629d75696cf96d5c651bec32
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 3) token'ın son geçerlilik tarihini veritabanına kaydet
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // 4) token'ın normal halini return et
  return resetToken;
};

//? Şifre güncellendiğinde çalışan middleware
userSchema.pre("save", async function () {
  //  eğer şifre alanı güncellenmediyse veya hesap yeniyse fonksiyonu durdur
  if (!this.isModified("password") || this.isNew) return;

  // şifre değiştirme tarihini güncelle
  this.passwordChangedAt = Date.now() - 1000;

  // bilgilendirme maili gönder
  await sendMail({
    to: this.email,
    subject: "Tourify Hesabı Şifreniz Güncellendi",
    html: `
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;"> <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f6f8;"> <tr> <td align="center" style="padding:32px 16px;"> <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.06);"> <tr> <td align="center" style="background-color:#1f6feb; padding:28px 24px;"> <h1 style="margin:0; color:#ffffff; font-size:28px; line-height:36px; font-weight:700;"> tourify </h1> </td> </tr> <tr> <td style="padding:36px 32px 24px 32px;"> <h2 style="margin:0 0 18px 0; color:#1f2937; font-size:24px; line-height:32px;"> Şifreniz başarıyla güncellendi </h2> <p style="margin:0 0 16px 0; color:#4b5563; font-size:16px; line-height:26px;"> Merhaba <strong style="color:#1f2937;">${this.name}</strong>, </p> <p style="margin:0 0 22px 0; color:#4b5563; font-size:16px; line-height:26px;"> Tourify hesabınıza ait şifrenin başarıyla güncellendiğini bildirmek isteriz. </p>  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; margin-bottom:24px;"> <tr> <td style="padding:18px 20px;"> <p style="margin:0 0 8px 0; color:#6b7280; font-size:13px; line-height:20px;"> Hesap bilgisi </p> <p style="margin:0; color:#1f2937; font-size:15px; line-height:22px; word-break:break-word;"> ${this.email} </p> </td> </tr> </table> <p style="margin:0 0 16px 0; color:#4b5563; font-size:16px; line-height:26px;"> Bu değişikliği siz yaptıysanız herhangi bir işlem gerçekleştirmeniz gerekmez. </p> <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff7ed; border-left:4px solid #f97316; border-radius:6px; margin-bottom:24px;"> <tr> <td style="padding:16px 18px;"> <p style="margin:0; color:#9a3412; font-size:14px; line-height:22px;"> <strong>Bu değişikliği siz yapmadıysanız</strong>, hesabınızın güvenliği için vakit kaybetmeden Tourify destek ekibiyle iletişime geçin. </p> </td> </tr> </table> <p style="margin:0; color:#4b5563; font-size:16px; line-height:26px;"> Güvenli ve keyifli yolculuklar dileriz.<br> <strong style="color:#1f2937;">Tourify Ekibi</strong> </p> </td> </tr>  <tr> <td align="center" style="padding:22px 32px; background-color:#f8fafc; border-top:1px solid #e5e7eb;"> <p style="margin:0 0 8px 0; color:#9ca3af; font-size:12px; line-height:18px;"> Bu e-posta, Tourify hesabınızdaki güvenlik değişikliği nedeniyle otomatik olarak gönderilmiştir. </p> <p style="margin:0; color:#9ca3af; font-size:12px; line-height:18px;"> © ${new Date().getFullYear()} Tourify. Tüm hakları saklıdır. </p> </td> </tr> </table> </td> </tr> </table> </body>
    `,
  });
});

const User = mongoose.model("User", userSchema);
export default User;
