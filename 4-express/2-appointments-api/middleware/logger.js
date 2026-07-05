const logger = (req, res, next) => {
  // isteğin detaylarını console'a yazdır
  console.log("🚨 İstek Geldi 🚨");
  console.log("Method: " + req.method + " URL: " + req.url);

  // sonraki adıma geç
  next();
};

module.exports = logger;
