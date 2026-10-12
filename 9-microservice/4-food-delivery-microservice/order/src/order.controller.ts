import { orderSchema, statusSchema, validateDTO } from "./order.dto.js";
import orderService from "./order.service.js";
import type { OrderStatus } from "./types/index.js";
import catchAsync from "./utils/catch-async.js";

class OrderController {
  createOrder = catchAsync(async (req, res, next) => {
    // body verinin validasyonunu yap
    const body = validateDTO(orderSchema, req.body);
    const userId = req.user!.userId;

    // servis fonksiyonunu çağır
    const result = await orderService.createOrder(body, userId);

    // client'a yanıt gönder
    res.status(201).json({
      status: "success",
      message: "İşlem başarılı",
      data: result,
    });
  });

  getUserOrders = catchAsync(async (req, res, next) => {
    // parametreye eriş
    const userId = req.params.userId as string;

    // servis fonksiyonunu çağır
    const result = await orderService.getUserOrders(userId);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Kullanıcı siparişleri",
      data: result,
    });
  });

  getOrderById = catchAsync(async (req, res, next) => {
    // parametre olarak gelen id'ye eriş
    const orderId = req.params.orderId as string;

    // servis fonksiyonunu çağır
    const result = await orderService.getOrderById(orderId);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Sipariş bulundu",
      data: result,
    });
  });

  updateOrderStatus = catchAsync(async (req, res, next) => {
    // client'dan gelen verilere eriş
    const orderId = req.params.orderId as string;
    const status = req.body.status as OrderStatus;

    // status değeri geçerli mi kontrol et
    const newStatus = validateDTO(statusSchema, status);

    // servis fonksiyonunu çağır
    const result = await orderService.updateOrderStatus(orderId, newStatus);

    // client'a yanıt gönder
    res.status(200).json({
      status: "success",
      message: "Sipariş güncellendi",
      data: result,
    });
  });
}

export default new OrderController();
