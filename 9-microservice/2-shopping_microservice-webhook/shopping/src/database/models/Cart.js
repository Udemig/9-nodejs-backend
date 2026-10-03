const { default: mongoose } = require("mongoose");

const CartSchema = mongoose.Schema({
  customerId: String,
  items: [
    {
      _id: String,
      name: String,
      desc: String,
      price: Number,
      banner: String,
      unit: Number,
      available: Boolean,
    },
  ],
});

module.exports = mongoose.model("cart", CartSchema);
