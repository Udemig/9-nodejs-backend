import type { IUser } from "./index.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
