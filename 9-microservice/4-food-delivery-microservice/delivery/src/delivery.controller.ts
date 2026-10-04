import deliveryService from "./delivery.service.js";
import catchAsync from "./utils/catch-async.js";

class DeliveryController {
  x = catchAsync(async (req, res, next) => {
    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarılı",
      data: null,
    });
  });
}

export default new DeliveryController();
