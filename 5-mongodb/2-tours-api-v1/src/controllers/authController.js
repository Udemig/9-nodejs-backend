import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequest, Unauthorized } from "../utils/error.js";
import catchAsync from "../utils/catchAsync.js";
import dotenv from "dotenv";
import crypto from "crypto";
import sendMail from "../utils/sendMail.js";
dotenv.config();

export const register = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.validated.body.name,
    email: req.validated.body.email,
    password: req.validated.body.password,
  });

  res.status(201).json({ message: "Hesabınız oluşturuldu", user: newUser });
});

export const login = catchAsync(async (req, res) => {
  // 1) body kısmındaki verilere eriş
  const { email, password } = req.body;

  // 2) email ve şifre geldi mi kontrol et
  if (!email || !password) throw new BadRequest("Lütfen email ve şifre giriniz");

  // 3) email'i kullanan kullanıcı var mı
  const user = await User.findOne({ email });

  // 3.1) kullanıcı yoksa hata gönder
  if (!user) throw new Unauthorized("Email veya şifre hatalı");

  // 4) client'dan gelen şifre ile veritabanındaki hashlenmiş şifre eşleşiyor mu
  const isValid = await bcrypt.compare(password, user.password);

  // 4.1) şifre yanlışsa hata gönder
  if (!isValid) throw new Unauthorized("Email veya şifre hatalı");

  // 5) jwt tokenı oluştur
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true, // sadece http protokolüne sahip domainlerde seyahat eder
    secure: false, // sadece https
    sameSite: "strict",
  });

  res.json({ message: "Giriş Yapıldı", user });
});

export const logout = catchAsync(async (req, res) => {
  res.clearCookie("jwt").json({ message: "Çıkış yapıldı" });
});

// Şifremi Unuttum

// a) Eposta adresine şifre sıfırlama bağlantısı gönder
export const forgotPassword = catchAsync(async (req, res) => {
  // 1) eposta adresine göre kullanıcı hesabına eriş
  const user = await User.findOne({ email: req.body.email });

  // kullanıcı varsa token oluştur ve mail gönder
  if (user) {
    // 2) şifre sıfırlama tokeni oluştur ve veritabanına hashlanemiş halini kaydet
    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) şifre sıfırlamak için kullanıcağı token'ı içeren url'i hazırla
    const url = `${req.protocol}://${req.headers.host}/api/auth/reset-password/${resetToken}`;

    // 4) url'i e-posta adresine mail at
    await sendMail({
      to: user.email,
      subject: "Şifre Sıfırlama Bağlantısı (10 dakika)",
      text: resetToken,
      html: `
     <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;"> <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"> <tr> <td align="center" style="padding:32px 16px;"> <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.06);"> <tr> <td align="center" style="background-color:#1f6feb; padding:28px 24px;"> <h1 style="margin:0; color:#ffffff; font-size:28px; line-height:36px;"> tourify </h1> </td> </tr> <tr> <td style="padding:36px 32px;"> <h2 style="margin:0 0 18px; color:#1f2937; font-size:24px; line-height:32px;"> Şifrenizi sıfırlayın </h2> <p style="margin:0 0 16px; color:#4b5563; font-size:16px; line-height:26px;"> Merhaba <strong style="color:#1f2937;">${user.name}</strong>, </p> <p style="margin:0 0 16px; color:#4b5563; font-size:16px; line-height:26px;"> <strong>${user.email}</strong> adresine bağlı Tourify hesabınız için bir şifre sıfırlama talebi aldık. </p> <p style="margin:0 0 24px; color:#4b5563; font-size:16px; line-height:26px;"> Yeni şifrenizi belirlemek için aşağıdaki bağlantıyı kullanabilirsiniz. </p> <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 24px;"> <tr> <td align="center" style="border-radius:8px; background-color:#1f6feb;"> <a href="${url}" target="_blank" style="display:inline-block; padding:14px 28px; color:#ffffff; font-size:16px; font-weight:bold; text-decoration:none;"> Yeni Şifre Belirle </a> </td> </tr> </table> <p style="margin:0 0 16px; color:#4b5563; font-size:14px; line-height:22px;"> Bağlantıyı açtıktan sonra yeni şifrenizi girerek, yeni şifrenizi içeren bir <strong>PATCH</strong> isteğini ilgili bağlantıya göndermeniz gerekmektedir. </p> <p style="margin:0 0 8px; color:#6b7280; font-size:13px; line-height:20px;"> Buton çalışmıyorsa aşağıdaki bağlantıyı tarayıcınıza kopyalayabilirsiniz: </p> <p style="margin:0 0 24px; font-size:13px; line-height:20px; word-break:break-all;"> <a href="${url}" target="_blank" style="color:#1f6feb; text-decoration:underline;"> ${url} </a> </p> <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff7ed; border-left:4px solid #f97316; border-radius:6px;"> <tr> <td style="padding:16px 18px;"> <p style="margin:0; color:#9a3412; font-size:14px; line-height:22px;"> Bu şifre sıfırlama talebini siz oluşturmadıysanız bu e-postayı dikkate almayabilirsiniz. Şifreniz değiştirilmeden hesabınız mevcut haliyle korunacaktır. </p> </td> </tr> </table> <p style="margin:24px 0 0; color:#4b5563; font-size:16px; line-height:26px;"> Saygılarımızla,<br> <strong style="color:#1f2937;">Tourify Ekibi</strong> </p> </td> </tr> </table> </td> </tr> </table> </body>
      `,
    });
  }

  // Her durumda aynı yanıtı gönder
  res.status(200).json({ message: "Eposta adresine şifre sıfırlama bağlantısı gönderildi", user });
});

// b) Yeni belirlenin şifreyi kaydet
export const resetPassword = catchAsync(async (req, res) => {
  // 1) parametre oalrak gelen tokena eriş
  const token = req.params.token;

  // 2) elimizde normal, veritabanında ise hashlenmiş token bulunduğu için bunları karşılaştırabilmek için normal token'ı hashle
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 3) hashlenmiş token'la ilişkili veritabanında kayıtlı kullancıyı bul
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 3.1) token geçersiz veya süresi dolmuşsa hata gönder
  if (!user) throw new Unauthorized("Token geçersiz veya süresi dolmuş");

  // 4) kullanıcı bulunduysa ve token geçerliyse kullanıcnın bilgilerini güncelle
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 5) client'a yanıt gönder
  res.status(200).json({ message: "Şifre güncellendi" });
});

// Şifremi Güncelle
export const updatePassword = catchAsync(async (req, res) => {
  // 1) kullanıcı bilgilerini al
  const user = req.user;

  // 2) gelen mevcut şifre doğru mu kontrol
  const isCorrect = await bcrypt.compare(req.body.currentPassword, user.password);

  // 2.1) şifre yanlışsa hata gönder
  if (!isCorrect) throw new BadRequest("Mevcut şifreniz hatalı");

  // 3) şifre doğruysa yeni şifreyi kaydet
  user.password = req.body.newPassword;
  user.save();

  res.status(200).json({ message: "Şifreniz güncellendi" });
});
