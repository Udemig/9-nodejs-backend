import type { CourierStatusInput, DeliveryUpdateInput } from "./delivery.dto.js";
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

  async updateDelivery(orderId: string, courierId: string, deliveryData: DeliveryUpdateInput) {
    // teslimat veritabanın kayıtlı mı
    const delivery = await Delivery.findOne({ orderId });

    // teslimat bulunamadıysa
    if (!delivery) throw new AppError("Sipariş bulunamadı", 404);

    // iste katan kurye teslimattaaki kurye ile aynı kişi değilse:
    if (delivery.courierId !== courierId)
      throw new AppError("Bu siparişi güncellemek için yetkiniz yok", 403);

    // kurye siparişi alıp yola çıkıtyısa
    if (deliveryData.status === "on_the_way") {
      return await Delivery.findOneAndUpdate(
        { orderId },
        { status: "on_the_way", location: deliveryData.location },
        { returnDocument: "after" },
      );
    }

    // kurye siparişi tesslim ettiyse
    if (deliveryData.status === "delivered") {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });
      return await Delivery.findOneAndUpdate(
        { orderId },
        { status: "delivered", actualDeliveryTime: new Date() },
        { returnDocument: "after" },
      );
    }

    // kurye sipairşi iptal ettiyse
    if (deliveryData.status === "cancelled") {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });
      return await Delivery.findOneAndUpdate(
        { orderId },
        { status: "cancelled", courierId: null, acceptedAt: null, notes: deliveryData.notes },
        { returnDocument: "after" },
      );
    }
  }

  async trackDelivery(orderId: string) {
    const delivery = await Delivery.findOne({ orderId });

    if (!delivery) {
      throw new AppError("Sipariş bulunamadı", 404);
    }

    return delivery;
  }

  async updateCourier(courierId: string, body: CourierStatusInput) {
    // Kurye kendini OFFLIBE yapmak istiyorsa aktif teslimatı var mı kontrol et
    // Atnamış yada yolda teslimatı varsa izin verme
    if (body.status === "offline") {
      const activeDelivery = await Delivery.findOne({
        courierId,
        status: { $in: ["assigned", "on_the_way"] },
      });

      if (activeDelivery) throw new AppError("Aktif teslimatınız varken offline moda geçemezsiniz");
    }

    // kurye verisini güncelle
    const courier = await Courier.findByIdAndUpdate(
      courierId,
      { status: body.status },
      { returnDocument: "after" },
    );

    // kurya bulunamazsa hata gönder
    if (!courier) throw new AppError("Kurye bulunamadı", 404);

    return courier;
  }
}

export default new DeliveryService();
