import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import { NotFound, Unauthorized, Forbidden } from "../utils/error.js";
dotenv.config();

// ------ Authorization Middleware ----------
// * CLient'ın gönderdiği token'ın geçerliliğini doğrular
// * Token geçersiz ise route'a erişimine izin vermeyip hata fırlat
// * Token geçerliyse route'a erişmesine izin ver

export const protect = async (req, res, next) => {
  // 1) çerez ile gelen tokenı al
  const token = req.cookies.jwt;

  // 2) token gelmediyse hata fırlat

  if (!token) throw new Unauthorized();

  // 3) token'ın geçerliliğini doğrula (zaman aşımına uğradımı? | imza doğru mu?)
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Unauthorized("Token geçersiz");
  }

  // 4) token ile gelen kullanıcı hesabı duruyor mu
  let activeUser;
  try {
    activeUser = await User.findById(decoded.id);
  } catch (error) {
    throw new Unauthorized("Kullanıcı hesabı bulunamadı");
  }

  // 4.1) hesap silindiyse  hata fırlat
  if (!activeUser) throw new Unauthorized("Kullanıcı hesabı bulunamadı");

  // 4.2) hesap dondurulduysa hata fırlat
  if (!activeUser.active) throw new Unauthorized("Kullanıcı hesabı bulunamadı");

  // 5) protect'den sonra çalışacak fonksiyonlarda kullanıcı verisine erişebilmek için req nesnesine user'ı ekle
  req.user = activeUser;

  // sonraki adıma geç
  next();
};

// ------ Rol Control Middleware ------------
// * İstek atan kullanıcnın rolü fonksiyonun parametre olarak aldığı rollerden biriyse:
// * erişime izin ver
// * değilse erişimi engelle
export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    // kullanıcnın rolü izin verilen roller arasında var mı?
    const hasPermission = allowedRoles.includes(req.user.role);

    // kullanıcının rolü yeterli değilse hata fırlat
    if (!hasPermission) throw new Forbidden();

    // rolü yeterliyse devam et
    next();
  };
