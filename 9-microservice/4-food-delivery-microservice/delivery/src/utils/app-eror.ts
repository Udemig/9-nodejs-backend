// AppError - Status Code Taşıyon Özel Hata Sınıfı
class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, status: number = 500) {
    super(message);
    this.statusCode = status;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
