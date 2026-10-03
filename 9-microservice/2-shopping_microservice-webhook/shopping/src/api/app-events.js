const ShoppingService = require("../services/shopping-service");

// Diğer servislerden gelen haberleri yakalayıp gelen evente göre gerekli işlemi yap

module.exports = (app) => {
  app.use("/app-events", async (req, res) => {
    // customerServisindeki fonksiyonları kullanabilmek için örnek al
    const service = new ShoppingService();

    // isteğin body içerisinde gelen payload verisine eriş
    const { payload } = req.body;

    // diğer servislerden gelen habere göre gerekli fonksiyonu çalıştır
    await service.SubscribeEvents(payload);

    console.log("======= shopping servisine haber geldi =======");

    // haberi gönderen servise aldığımız söyle
    res.status(200).json({ mesage: "Webhook mesajı alındı" });
  });
};
