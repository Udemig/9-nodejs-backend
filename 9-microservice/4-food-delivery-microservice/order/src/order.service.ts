import type { OrderInput } from "./order.dto.js";
import type { OrderStatus } from "./types/index.js";
import Order from "./order.model.js";
import rabbitmqService from "./rabbitmq.service.js";
import AppError from "./utils/app-eror.js";

//* Delivery Service - Veritabanı İle Haberleşme
class OrderService {
  async createOrder(body: OrderInput, userId: string) {
    // veritabanına siparişi kaydet
    const newOrder = await Order.create({ ...body, userId });

    // sipariş oluşturulduğunda delivery servisine haber gönder
    // routing key "order.created" -> "order.*" pattern'i mesajı delivery kuyruğuna iletilir
    rabbitmqService.publishMessage("order.created", newOrder);

    // yeni siparişi döndür
    return newOrder;
  }

  async getUserOrders(userId: string) {
    // veritabanından kullanıcı siparişlerini al
    const orders = await Order.find({ userId });

    // siparişi yoksa hata ver
    if (!orders || orders.length === 0) throw new AppError("Sipariş bulunamadı", 404);

    // siparişleri döndür
    return orders;
  }

  async getOrderById(id: string) {
    // siparişi ara
    const order = await Order.findById(id);

    // bulunamazsa hata fırlat
    if (!order) throw new AppError("Sipariş bulunamadı", 404);

    // siparişi döndür
    return order;
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    // veritabanında siparişi güncelle
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    // sipariş bulunamazsa hata
    if (!order) throw new AppError("Sipariş bulunamadı", 404);

    // sipariş güncellemesini delivery servise haber ver
    await rabbitmqService.publishMessage("order.updated", order);

    // siparişi döndür
    return order;
  }
}

export default new OrderService();
