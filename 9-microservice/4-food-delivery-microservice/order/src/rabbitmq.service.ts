import amqp, { type Channel, type ChannelModel } from "amqplib";
import { validateEnv } from "./utils/env.js";

//* RabbitMQ Service
class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName: string = "food_delivery_exchange";
  private isShuttingDown: boolean = false;

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
}

export default new RabbitMQService();
