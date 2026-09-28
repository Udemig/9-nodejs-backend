// Microservis mimarisinde servisler arasında iletişim gereken durumlar olabilir
// Bu durumda farklı servislerden gelen api isteklerinin body kısmına bağlı olarak gerekli işlemleri yapabiliriz

const CustomerService = require("../services/customer-service");

module.exports = (app) => {
  app.use("/app-events", async (req, res) => {
    // customerService'deki fonnksiyonları kullannbilmek için örnek al
    const service = new CustomerService();

    // isteğin body içerisinde gelen payload verisine eriş
    const { payload } = req.body;

    // diğer servisden gelen haber göre gerekli fonknsiyonları çalıştır
    await service.SubscribeEvents(payload);

    console.log("==== customer servis haberi işledi ====");

    // haberi gönderen servise haberi aldığımı söyle
    res.status(200).json({ message: "Webhook mesajı alındı" });
  });
};
