import type { Request, Response, NextFunction } from "express";
import { Forbidden } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { config } from "../config/enviroment.js";
import User from "../models/user.model.js";

// Client'tan gelen JWT tokenu züerinden kullanıcnın kimliğini doğrulayacak middleware
// Eğer token geçerliyse sonraki adıma geçmeye izin ver
// Eğer token geçersizse yetklindirme hatası fırlat
const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // çerezlerle gelen tokena eriş
  const token = req.cookies.token;

  // token yoksa hata fırlat
  if (!token) throw new Forbidden();

  // token varsa geçerli mi kontrol et
  let payload: any;
  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Forbidden();
  }

  // token geçerliyse kullanıcı hesabını veritabında ara
  const user = await User.findById(payload.id);

  // kullanıcı hesabı bulunamadıysa
  if (!user) throw new Forbidden("Bu hesap artık kullanım dışı");

  // kullanıcı bilgileri bu mw'de sonra çalışıcak fonksiyona aktar
  (req.user as any) = user;

  // sonraki adıma devam et
  next();
};

export default protect;
