import amqp, { type Channel, type ChannelModel } from "amqplib";
import { validateEnv } from "./utils/env.js";
import AppError from "./utils/app-eror.js";
import type { IOrder, IUser } from "./types/index.js";
import { Courier, Delivery } from "./delivery.model.js";

//* RabbitMQ Service
class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName: string = "food_delivery_exchange";
  private isShuttingDown: boolean = false;

  //* Mesaj kuyrukları
  private readonly deliveryQueue = "delivery_queue";
  private readonly courierQueue = "courier_queue";

  //* Kurulum
  async initialize() {
    const { RABBITMQ_URI } = validateEnv();

    try {
      // rabbitmq'ya bağlan
      this.connection = await amqp.connect(RABBITMQ_URI);

      // hata olursa
      this.connection.on("error", (err) => {
        console.error("❌ RabbitMQ bağlantı hatası:", err.message);
      });

      // bağlantı kapanırsa
      this.connection.on("close", (err) => {
        console.warn("⚠️ RabbitMQ bağlantısı kapandı");
      });

      // iletişim kanalı oluştur
      this.channel = await this.connection.createChannel();

      // mesajları kuyruklara yönlendirecek exchange elemanı
      await this.channel.assertExchange(this.exchangeName, "topic", { durable: true });

      // kuyrukları tanımla
      await this.channel.assertQueue(this.courierQueue, { durable: true });
      await this.channel.assertQueue(this.deliveryQueue, { durable: true });

      // bindingleri tanımla
      await this.channel.bindQueue(this.deliveryQueue, this.exchangeName, "order.*");
      await this.channel.bindQueue(this.courierQueue, this.exchangeName, "courier.*");

      // consumerları başlat
      await this.consumeCourierMessages();
      await this.consumeDeliveryMessages();

      console.log("✅ RabbitMQ'ya bağlandı");
    } catch (error) {
      console.log("❌ RabbitMQ başlatılamadı", error);
    }
  }

  //* Kanalı Kapat
  async close() {
    this.isShuttingDown = true;

    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log("RabbitMQ bağlantısı kapatıldı");
    } catch (error) {
      console.log("RabbitMQ shutdown sırasında hata: ", error);
    }
  }

  //* Mesajı Yayınla
  async publishMessage(routingKey: string, rawMessage: unknown) {
    // iletişim kanalı açık mı kontrol et
    if (!this.channel) throw new Error("RabbitMQ kanalı mevcut değil");

    // mesajı buffer formatına çevir
    const message = Buffer.from(JSON.stringify(rawMessage));

    // kanala mesajı gönder
    this.channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
      contentType: "application/json",
      messageId: crypto.randomUUID(),
      timestamp: Date.now(),
    });

    console.log(`📤 [${routingKey}] mesaj yayınlandı`);
  }

  //* Yeni kurye kayıtlarını dinle
  //* Auth service "courier.created" mesjaını yayınlar, biz bu mesajı alınca kuryeyi veritabanına kaydetmeliyiz
  async consumeCourierMessages() {
    if (!this.channel) throw new AppError("Aktif rabbitmq kanalı bulunmuyor");

    await this.channel.consume(this.courierQueue, async (message) => {
      if (!message) return;

      try {
        // mesaj veri formatını buffer --> js çevir
        const userData = JSON.parse(message.content.toString()) as IUser;

        // kuryeyi veritabanına kaydet
        await Courier.findByIdAndUpdate(
          userData.id,
          {
            $setOnInsert: {
              _id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              status: "offline",
            },
          },
          { upsert: true, new: true },
        );
        // mesjaı aldığımızı rabbitmq'ya haber ver
        console.log("Kurye kaydedildi: ", userData.email);
        this.channel?.ack(message);
      } catch (error) {
        // mesajı alamadığımızı rabbitmq'ya haber ver
        console.log("Kurye kaydedilemedi: ", error);
        this.channel?.nack(message, false, false);
      }
    });
  }

  //* Sipariş olaylarını dinle
  //* - order.created (status:pending) -> Delivery kaydı aç + kurye ata
  //* - order.ready                    -> Delivery'i "ready" yap
  //* - order.cancelled                -> Delivery'i "cancelled" yap
  async consumeDeliveryMessages() {
    if (!this.channel) throw new AppError("RabbitMQ kanalı oluşturulamadı");

    await this.channel.consume(this.deliveryQueue, async (message) => {
      if (!message) return;

      try {
        // buffer --> js
        const deliveryMessage = JSON.parse(message.content.toString()) as IOrder;

        // yeni sipariş geldiyse:
        if (deliveryMessage.status === "pending") {
          // teslimat kaydını oluştur
          const delivery = await Delivery.findOneAndUpdate(
            { orderId: deliveryMessage.id },
            { $setOnInsert: { courierId: null, status: "pending" } },
            { upsert: true, returnDocument: "after" },
          );

          // en uzun süredir müsait olarak bekleyen kuryeyi meşgule çek
          const courier = await Courier.findOneAndUpdate(
            { status: "available" },
            { status: "busy" },
            { sort: { updatedAt: 1 }, returnDocument: "after" },
          );

          // siparişi kuryeye ata
          if (courier) {
            await Delivery.findByIdAndUpdate(delivery?.id, {
              status: "assigned",
              courierId: courier.id,
              acceptedAt: new Date(),
            });
            console.log(`Sipariş ${deliveryMessage.id} atandı --> kurye: ${courier.email}`);
          } else {
            console.log(`Müsait kurye yok, sipariş ${deliveryMessage.id} bekliyor`);
          }
        }

        // sipariş iptal edildiyse:
        if (deliveryMessage.status === "cancelled") {
          // siparişe bilgilerini güncelle
          const updatedDelivery = await Delivery.findOneAndUpdate(
            { orderId: deliveryMessage.id },
            { status: "cancelled", courierId: null, acceptedAt: null },
            { returnDocument: "before" },
          );

          // siparişe atanana kurye varsa boşa çek
          if (updatedDelivery?.courierId) {
            await Courier.findByIdAndUpdate(updatedDelivery.courierId, { status: "available" });
          }

          console.log(`Sipariş ${deliveryMessage.id} iptal edildi`);
        }

        // sipariş durumu değiştiyse teslimat kaydını güncelle
        if (deliveryMessage.status !== "pending" && deliveryMessage.status !== "cancelled") {
          await Delivery.findOneAndUpdate(
            { orderId: deliveryMessage.id },
            { status: deliveryMessage.status },
          );
          console.log(`Sipariş ${deliveryMessage.id} güncellendi`);
        }

        this.channel?.ack(message);
      } catch (error) {
        console.log("Mesaj işlenemedi: ", error);
        this.channel?.nack(message);
      }
    });
  }
}

export default new RabbitMQService();
