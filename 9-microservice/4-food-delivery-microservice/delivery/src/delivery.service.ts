import { Courier, Delivery } from "./delivery.model.js";
import AppError from "./utils/app-eror.js";

//* Delivery Service - Veritabanı İle Haberleşme
class DeliveryService {
  // boştaki teslimatları döndür
  async getAvailableDeliveries() {
    return await Delivery.find({
      status: { $in: ["pending", "ready", "preparing"] },
      courierId: null,
    });
  }

  // kuryeye boştaki teslimata ata
  async acceptDelivery(orderId: string, courierId: string) {
    // kurye müsait mi kontrol et + busy yap
    const courier = await Courier.findOneAndUpdate(
      { _id: courierId, status: "available" },
      { status: "busy" },
      { returnDocument: "after" },
    );

    // kurye müsait değilse hata
    if (!courier) {
      throw new AppError("Kurye müsait değil", 409);
    }

    // teslimatı kuryeye ata
    const delivery = await Delivery.findOneAndUpdate(
      { orderId, courierId: null },
      { courierId, status: "assigned", acceptedAt: new Date() },
      { returnDocument: "after" },
    );

    // teslimat zaten başka kuryeye atandıysa hata:
    if (!delivery) {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });
      throw new AppError("Bu sipariş zaten başka bir kuryeye atanmış", 409);
    }

    return delivery;
  }

  async updateDelivery() {}

  async trackDelivery() {}

  async updateCourier() {}
}

export default new DeliveryService();
