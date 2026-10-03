const dotEnv = require("dotenv");

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,

  // RabbitMQ Değişkenleri
  RABBITMQ_URI: process.env.RABBITMQ_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  QUEUE_NAME: process.env.QUEUE_NAME,
  SHOPPING_ROUTING_KEY: process.env.SHOPPING_ROUTING_KEY,
  CUSTOMER_ROUTING_KEY: process.env.CUSTOMER_ROUTING_KEY,
  PRODUCTS_ROUTING_KEY: process.env.PRODUCTS_ROUTING_KEY,
};
