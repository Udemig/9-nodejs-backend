const dotEnv = require("dotenv");

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,

  // Microservice'e geçince her servis için ayrı PORT ve DB_URL olacak.
  // Örnek:
  //   CUSTOMER_SERVICE_PORT: process.env.CUSTOMER_SERVICE_PORT,
  //   PRODUCT_SERVICE_PORT:  process.env.PRODUCT_SERVICE_PORT,
  //   SHOPPING_SERVICE_PORT: process.env.SHOPPING_SERVICE_PORT,
  //   MSG_QUEUE_URL:         process.env.MSG_QUEUE_URL,
};
