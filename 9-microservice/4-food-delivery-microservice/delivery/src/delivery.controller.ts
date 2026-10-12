import deliveryService from "./delivery.service.js";
import catchAsync from "./utils/catch-async.js";

class DeliveryController {
  getAvailableDeliveries = catchAsync(async (req, res, next) => {
    // servis methodunu kullan
    const result = await deliveryService.getAvailableDeliveries();

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Boştaki siparişler",
      data: result,
    });
  });

  acceptDelivery = catchAsync(async (req, res, next) => {
    // client'dan gelen verileri al
    const orderId = req.params.orderId as string;
    const courierId = req.user?.userId as string;

    // servis fonksiyonunu çağır
    const result = await deliveryService.acceptDelivery(orderId, courierId);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Siparişi kureyeye atandı",
      data: result,
    });
  });

  updateDelivery = catchAsync(async (req, res, next) => {
    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Sipariş duyrumunu güncellendi",
      data: null,
    });
  });

  trackDelivery = catchAsync(async (req, res, next) => {
    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Sipariş detayları",
      data: null,
    });
  });

  updateCourier = catchAsync(async (req, res, next) => {
    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Kurye durumu güncellendi",
      data: null,
    });
  });
}

export default new DeliveryController();
