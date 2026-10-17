import { courierStatusSchema, deliveryUpdateSchema, validateDTO } from "./delivery.dto.js";
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
    // body verisini doğrula
    const body = validateDTO(deliveryUpdateSchema, req.body);
    const courierId = req.user!.userId;
    const orderId = req.params.orderId as string;

    // servis fonksiyonunu çağır
    const result = await deliveryService.updateDelivery(orderId, courierId, body);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Sipariş durumu güncellendi",
      data: result,
    });
  });

  trackDelivery = catchAsync(async (req, res, next) => {
    // id parametresini al
    const orderId = req.params.orderId as string;

    // servis fonksiyonunu çağır
    const result = await deliveryService.trackDelivery(orderId);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Sipariş detayları",
      data: result,
    });
  });

  updateCourier = catchAsync(async (req, res, next) => {
    // istek atan kuryenin id
    const courierId = req.user?.userId as string;

    // isteğin body'si
    const body = validateDTO(courierStatusSchema, req.body);

    // servis fonksiyonunu çağır
    const result = await deliveryService.updateCourier(courierId, body);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Kurye durumu güncellendi",
      data: result,
    });
  });
}

export default new DeliveryController();
