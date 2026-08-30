import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import uploadToCloud from "../utils/uploadToCloud.js";
import { Unauthorized } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { config, isProduction } from "../config/enviroment.js";

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // şifreyi hashle ve saltla
  const hashedPassword: string = bcrypt.hashSync(req.body.password, 12);

  // profil fotoğrafını cloud'a yükle
  let image;
  if (req?.file) {
    image = await uploadToCloud(next, req.file!.path, "9-avatars", 200, 200, "image");
  }

  // kullanıcıyı veritabanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    profilePicture: image?.secure_url || "default",
  });

  // client'a yanıt gönder
  res.json({ message: "Hesabınız oluşturuldu", user: newUser });
});

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // kullanıcıyı ara
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  // kullanıcı bulunamazsa
  if (!user) throw new Unauthorized("Giriş bilgileri hatalı");

  // veritabında hashli saklanan şifre ile body kısmında normal gönderilen şifreyi karşılaştır
  const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

  // şifre yanlışsa ise
  if (!isPasswordCorrect) throw new Unauthorized("Giriş bilgileri hatalı");

  // jwt tokeni oluştur
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES,
  });

  // client'a yanıt gönderr
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .json({ message: "Oturumunuz açıldı", user });
});

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // client'a yanıt gönder
  res.clearCookie("token").json({ message: "Oturumunuz kapandı" });
});

const profile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Profil bilgileriniz alındı", user: req.user });
});

export { register, login, logout, profile };
