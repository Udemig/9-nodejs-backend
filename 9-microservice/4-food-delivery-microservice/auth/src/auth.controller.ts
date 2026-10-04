import { loginSchema, registerSchema, validateDTO, type RegisterInput } from "./auth.dto.js";
import authService from "./auth.service.js";
import catchAsync from "./utils/catch-async.js";

class AuthController {
  register = catchAsync(async (req, res, next) => {
    // client'dan gelen veri doğru mu kontrol et
    const body: RegisterInput = validateDTO(registerSchema, req.body);

    // servis methodunu çalıştır
    const result = await authService.register(body);

    // cookie'leri oluştur
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // client'a yanıt gönder
    res.status(201).json({
      status: "success",
      message: "Kullanıcı oluşturuldu",
      data: result.user,
    });
  });

  login = catchAsync(async (req, res, next) => {
    // client'dan gelen veriyi kontrol et
    const body = validateDTO(loginSchema, req.body);

    // servis methodunu çağıralım
    const result = await authService.login(body);

    // cookie oluştur
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Oturum açıldı",
      data: result.user,
    });
  });

  logout = catchAsync(async (req, res, next) => {
    // çerezleri temizle
    res.clearCookie("token");

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Çıkış yapıldı",
    });
  });

  profile = catchAsync(async (req, res, next) => {
    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Profil bulundu",
      data: req.user,
    });
  });
}

export default new AuthController();
