import type { UserType } from "./index.ts";

// express içerisindeki request interface'ine user tipini ekle
declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}
