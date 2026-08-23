import { isDevelopment } from "../config/enviroment.js";
import { BaseError } from "../utils/error.js";
import type { NextFunction, Response, Request } from "express";
import type { ErrorResponse } from "../types/index.js";

const errorHandler = (err: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
  // bilinmeyen hata meydana geldiğinde
  if (!(err instanceof BaseError)) {
    console.log("❌ Bilinmeyen Hata", err);

    err = new BaseError(
      err?.message || "Beklenmeyen bir hata oluştu",
      500,
      "INTERNAL_SERVER_ERROR",
    );
  }

  // gönderilicek yanıtı hazırla
  const response: ErrorResponse = {
    status: "error",
    message: err.message,
    code: (err as BaseError).errorCode,
  };

  // geliştirme modundaysak hataya stack bilgisine ekle
  if (isDevelopment) {
    response.stack = err.stack as string;
  }

  // client'a yanıt gönder
  res.status((err as BaseError).statusCode).json(response);
};

export default errorHandler;
