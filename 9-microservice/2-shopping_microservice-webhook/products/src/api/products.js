const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");
const { PublishCustomerEvent, PublishShoppingEvent } = require("../utils/index");

// -------------------------------------------------------
// MICROSERVICE HAZIRLIĞI:
// Bu router yalnızca ProductService'i kullanır.
// Microservice'e geçince bu dosya olduğu gibi kopyalanır,
// sadece üstteki require path'i güncellenir.
// -------------------------------------------------------

module.exports = (app) => {
  const service = new ProductService();

  app.post("/create", async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, suplier, banner } = req.body;
      const { data } = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    const type = req.params.type;
    try {
      const { data } = await service.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;
    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  // Wishlist & Cart işlemleri ProductService üzerinden yürütülür.
  // ProductService içinde SubscribeEvents veya doğrudan CustomerRepository
  // çağrılır; böylece cross-service bağımlılık servis katmanında kalır.
  app.put("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      // istek listesine eklenicek ürünü al
      const product = await service.GetProductById(req.body._id);

      // customer servisine haber ver
      await PublishCustomerEvent({ event: "ADD_TO_WISHLIST", data: { userId: _id, product } });

      return res.status(200).json({ message: "İstek listesine eklendi" });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      // istek listesinden kaldırılacak ürünü al
      const product = await service.GetProductById(productId);

      // customer servisine haber ver
      await PublishCustomerEvent({ event: "REMOVE_FROM_WISHLIST", data: { userId: _id, product } });

      return res.status(200).json({ message: "İstek listesinden kaldırıldı" });
    } catch (err) {
      next(err);
    }
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id: productId, qty } = req.body;
    try {
      // sepete eklenicek ürünü al
      const product = await service.GetProductById(productId);

      //* customer servisine haber ver
      await PublishCustomerEvent({
        event: "ADD_TO_CART",
        data: { userId: req.user._id, product, qty },
      });

      //* shopping servisine haber ver
      await PublishShoppingEvent({
        event: "ADD_TO_CART",
        data: { userId: req.user._id, product, qty },
      });

      return res.status(200).json({ message: "Sepete eklendi" });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      // sepetten kaldırılacak ürünü al
      const product = await service.GetProductById(req.params.id);

      //* customer servisine haber ver
      await PublishCustomerEvent({
        event: "REMOVE_FROM_CART",
        data: { userId: _id, product, qty: 0 },
      });

      //* shopping servisine haber ver
      await PublishShoppingEvent({
        event: "REMOVE_FROM_CART",
        data: { userId: _id, product, qty: 0 },
      });

      return res.status(200).json({ message: "Sepetten kaldırıldı" });
    } catch (err) {
      next(err);
    }
  });

  // ----------------------------

  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
