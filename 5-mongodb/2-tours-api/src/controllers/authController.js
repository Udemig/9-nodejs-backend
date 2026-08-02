import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BadRequest, Unauthorized } from "../utils/error.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ message: "Hesabınız oluşturuldu", user: newUser });
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const login = async (req, res) => {
  try {
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
    });

    res.json({ message: "Giriş Yapıldı", user });
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt").json({ message: "Çıkış yapıldı" });
  } catch (error) {
    throw new BadRequest();
  }
};
