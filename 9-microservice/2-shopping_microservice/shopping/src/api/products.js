const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");

// -------------------------------------------------------
// MICROSERVICE HAZIRLIĞI:
// Bu router yalnızca ProductService'i kullanır.
// CustomerService'e doğrudan bağımlılık kaldırıldı.
// Microservice'e geçince bu dosya olduğu gibi kopyalanır,
// sadece üstteki require path'i güncellenir.
// -------------------------------------------------------

module.exports = (app) => {
  const service = new ProductService();

  app.post("/product/create", async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, suplier, banner } =
        req.body;
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

  app.get("/product/:id", async (req, res, next) => {
    const productId = req.params.id;
    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/product/ids", async (req, res, next) => {
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
  app.put("/product/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const result = await service.AddToWishlist(_id, req.body._id);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/product/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      const result = await service.RemoveFromWishlist(_id, productId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.put("/product/cart", UserAuth, async (req, res, next) => {
    const { _id: productId, qty } = req.body;
    try {
      const result = await service.AddToCart(req.user._id, productId, qty);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/product/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const result = await service.RemoveFromCart(_id, req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.get("/products", async (req, res, next) => {
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
