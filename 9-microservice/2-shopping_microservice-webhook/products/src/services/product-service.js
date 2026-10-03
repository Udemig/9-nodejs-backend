const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, STATUS_CODES } = require("../utils/app-errors");

// -------------------------------------------------------
// MICROSERVICE HAZIRLIĞI:
// Bu servis şu an hem ProductRepository hem CustomerRepository'yi
// kullanıyor (wishlist, cart için). Monolith'te bu normaldir.
//
// Microservice'e geçince:
//   - ProductService kendi DB'sini kullanır (sadece ProductRepository)
//   - Wishlist/Cart işlemleri için CustomerService'e HTTP veya
//     message broker (RabbitMQ/Kafka) üzerinden event gönderilir.
//   - SubscribeEvents metodu bu event'leri alacak şekilde genişletilir.
// -------------------------------------------------------

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return FormateData(productResult);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetProducts() {
    try {
      const products = await this.repository.Products();

      let categories = {};
      products.map(({ type }) => {
        categories[type] = type;
      });

      return FormateData({
        products,
        categories: Object.keys(categories),
      });
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetProductDescription(productId) {
    try {
      const product = await this.repository.FindById(productId);
      return FormateData(product);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetProductsByCategory(category) {
    try {
      const products = await this.repository.FindByCategory(category);
      return FormateData(products);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetSelectedProducts(selectedIds) {
    try {
      const products = await this.repository.FindSelectedProducts(selectedIds);
      return FormateData(products);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetProductById(productId) {
    try {
      return await this.repository.FindById(productId);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  // -------------------------------------------------------
  // Wishlist & Cart: Monolith'te doğrudan CustomerRepository çağrılır.
  // Microservice'e geçince bu metotlar event publish'e dönüşür.
  // -------------------------------------------------------

  // async AddToWishlist(customerId, productId) {
  //   try {
  //     const product = await this.repository.FindById(productId);
  //     const wishlist = await this.customerRepository.AddWishlistItem(customerId, product);
  //     return FormateData(wishlist);
  //   } catch (err) {
  //     throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
  //   }
  // }

  // async RemoveFromWishlist(customerId, productId) {
  //   try {
  //     // Toggle: Aynı metot ekleme/çıkarmayı hallediyor (repository logic)
  //     const product = await this.repository.FindById(productId);
  //     const wishlist = await this.customerRepository.AddWishlistItem(customerId, product);
  //     return FormateData(wishlist);
  //   } catch (err) {
  //     throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
  //   }
  // }

  // async AddToCart(customerId, productId, qty) {
  //   try {
  //     const product = await this.repository.FindById(productId);
  //     const cart = await this.customerRepository.AddCartItem(customerId, product, qty, false);
  //     return FormateData(cart);
  //   } catch (err) {
  //     throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
  //   }
  // }

  // async RemoveFromCart(customerId, productId) {
  //   try {
  //     const product = await this.repository.FindById(productId);
  //     const cart = await this.customerRepository.AddCartItem(customerId, product, 0, true);
  //     return FormateData(cart);
  //   } catch (err) {
  //     throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
  //   }
  // }

  // -------------------------------------------------------
  // Event Bus Stub — Microservice'e geçince bu metot
  // RabbitMQ/Kafka consumer'ından gelecek event'leri işler.
  // -------------------------------------------------------
  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { userId, productId, qty } = data;

    switch (event) {
      case "ADD_TO_WISHLIST":
        this.AddToWishlist(userId, productId);
        break;
      case "REMOVE_FROM_WISHLIST":
        this.RemoveFromWishlist(userId, productId);
        break;
      case "ADD_TO_CART":
        this.AddToCart(userId, productId, qty);
        break;
      case "REMOVE_FROM_CART":
        this.RemoveFromCart(userId, productId);
        break;
      default:
        break;
    }
  }
}

module.exports = ProductService;
