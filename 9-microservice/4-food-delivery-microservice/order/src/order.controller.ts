import orderService from "./order.service.js";
import catchAsync from "./utils/catch-async.js";

class OrderController {
  x = catchAsync(async (req, res, next) => {
    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarılı",
      data: null,
    });
  });
}

export default new OrderController();
