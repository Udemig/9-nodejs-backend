import { BaseError } from "../utils/error.js";

const errorHandler = (err, req, res, next) => {
  // Bizim fırlattığımız hataların dışarısında bir hata meydana gelirse
  if (!(err instanceof BaseError)) {
    console.log("BİLİNMEYEN HATA:", err);

    err = new BaseError(err.message || "Beklenmeyen bir hata oluştu", 500, "INTERNAL_SERVER_ERROR");
  }

  // gönderilecek cevabı hazırla
  const response = {
    status: "error",
    message: err.message,
    code: err.errorCode,
  };

  // geliştirme modunda hata detaylarını yanıta ekle
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  // client'a cevap gönder
  res.status(err.statusCode || 500).json(response);
};

export default errorHandler;
