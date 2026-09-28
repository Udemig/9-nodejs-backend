const { ShoppingRepository, CustomerRepository } = require("../database");
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
    // NOT: Monolith'te cart verisine erişmek için kullanılıyor.
    // Microservice'e geçince bu satır kaldırılır; yerini HTTP call alır.
    this.customerRepository = new CustomerRepository();
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
      const customer = await this.customerRepository.FindCustomerById({ id: customerId });
      if (customer) {
        return FormateData(customer.cart);
      }
      return FormateData([]);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  // -------------------------------------------------------
  // Event Bus Stub — Microservice'e geçince bu metot
  // RabbitMQ/Kafka consumer'ından gelecek event'leri işler.
  // -------------------------------------------------------
  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { userId, order } = data;

    switch (event) {
      case "CREATE_ORDER":
        this.PlaceOrder({ _id: userId, txnNumber: order.txnId });
        break;
      default:
        break;
    }
  }
}

module.exports = ShoppingService;
