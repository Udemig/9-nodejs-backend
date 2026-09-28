const ShoppingService = require("../services/shopping-service");
const UserAuth = require("./middlewares/auth");

// -------------------------------------------------------
// MICROSERVICE HAZIRLIĞI:
// Bu router yalnızca ShoppingService'i kullanır.
// CustomerService cross-import'u kaldırıldı; cart/orders
// verileri ShoppingService üzerinden gelir.
// -------------------------------------------------------

module.exports = (app) => {
  const service = new ShoppingService();

  app.post("/shopping/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/shopping/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await service.GetOrders(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/shopping/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await service.GetCart(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
