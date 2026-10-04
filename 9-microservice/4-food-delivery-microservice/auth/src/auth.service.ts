import type { LoginInput, RegisterInput } from "./auth.dto.js";
import User from "./auth.model.js";
import rabbitmqService from "./rabbitmq.service.js";
import type { IUser } from "./types/index.js";
import AppError from "./utils/app-eror.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEnv } from "./utils/env.js";

//* Auth Service - Veritabanı İle Haberleşme

class AuthService {
  private generateToken(user: IUser): string {
    const { JWT_SECRET } = validateEnv();

    return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "30d" });
  }

  async register(body: RegisterInput) {
    // email kontrolü
    const existingUser = await User.findOne({ email: body.email });

    // email kullanıyorsa hata fırlat
    if (existingUser) throw new AppError("Bu email adresi zaten kullanılıyor", 409);

    // şifre hashleme
    const hashedPass = await bcrypt.hash(body.password, 10);

    // kullanıcıyı oluştur
    const user = await User.create({ ...body, password: hashedPass });

    // eğer kurye hesabı oluşturulduysa delivery kuyruğuna mesaj gönder
    if (user.role === "courier") {
      await rabbitmqService.publishMessage("courier.created", user);
    }

    // token oluştur
    const token = this.generateToken(user);

    // client'a gönderilcek veriyi döndür
    return { user, token };
  }

  async login(body: LoginInput) {
    // email kontrolü
    const user = await User.findOne({ email: body.email });
    if (!user) throw new AppError("Geçersiz email adresi veya şfire", 401);

    // şifre kontrolü
    const isPassValid = await bcrypt.compare(body.password, user.password);
    if (!isPassValid) throw new AppError("Geçersiz email adresi veya şifre", 401);

    // token oluştur
    const token = this.generateToken(user);

    // client'a gönderilcek veriyi döndür
    return { user, token };
  }
}

export default new AuthService();
