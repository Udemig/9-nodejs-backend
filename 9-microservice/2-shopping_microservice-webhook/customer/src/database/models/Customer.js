const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    // refferance
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
    // * Monolithic mimaride aşağıdaki değişkenlerde referans yöntemi kullanılıyordu ama microservice'de products ve order farklı veritabanlarından yönetildiği için bunları referans göstermek mümkün değil bu yüzden embedding yöntemine geçicez
    //* refferance ======> embedding
    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          banner: { type: String },
          price: { type: Number },
        },
        unit: { type: Number, require: true },
      },
    ],
    //* refferance ======> embedding
    wishlist: [
      {
        _id: { type: String, required: true },
        name: { type: String },
        banner: { type: String },
        price: { type: Number },
        desc: { type: String },
        available: { type: Boolean },
      },
    ],
    //* refferance ======> embedding
    orders: [
      {
        _id: { type: String, required: true },
        amount: { type: Number },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

module.exports = mongoose.model("customer", CustomerSchema);
