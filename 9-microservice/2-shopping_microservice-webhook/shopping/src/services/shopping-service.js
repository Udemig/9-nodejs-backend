const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, STATUS_CODES } = require("../utils/app-errors");

// -------------------------------------------------------
// MICROSERVICE HAZIRLIĞI:
// GetOrders → ShoppingRepository'den gelir (kendi DB'si).
// GetCart → Monolith'te CustomerRepository'den gelir.
//   Microservice'e geçince CustomerService'e HTTP call ile değişir.
// PlaceOrder → Order kaydedilince CustomerService'e
//   "CREATE_ORDER" eventi gönderilir (cart temizleme için).
// -------------------------------------------------------

class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs
    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  // -------------------------------------------------------
  // GetCart: Monolith'te CustomerRepository üzerinden çekilir.
  // Microservice'e geçince Customer servisine HTTP GET yapılır.
  // -------------------------------------------------------
  async GetCart(customerId) {
    try {
      const cart = await this.repository.GetCart(customerId);

      return FormateData(cart);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  // Sepete ekleme çıkarma güncelleme
  async ManageCart(customerId, product, qty, isRemove) {
    try {
      const cart = await this.repository.UpdateCart(customerId, product, qty, isRemove);
      return FormateData(cart);
    } catch (error) {
      throw new APIError(err.message, STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  // -------------------------------------------------------
  // Event Bus Stub — Microservice'e geçince bu metot
  // RabbitMQ/Kafka consumer'ından gelecek event'leri işler.
  // -------------------------------------------------------
  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { userId, product, order, qty } = data;

    switch (event) {
      case "CREATE_ORDER":
        this.PlaceOrder({ _id: userId, txnNumber: order.txnId });
        break;
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }
}

module.exports = ShoppingService;
