const { CartModel, OrderModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId });
      return orders;
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Orders");
    }
  }

  async CreateNewOrder(customerId, txnId) {
    try {
      const cart = await CartModel.findById({ customerId });

      if (cart) {
        let amount = 0;

        let cartItems = cart.items;

        if (cartItems.length > 0) {
          //process Order
          cartItems.map((item) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          cart.items = [];

          const orderResult = await order.save();

          await cart.save();

          return orderResult;
        }
      }

      return {};
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Category");
    }
  }

  async GetCart(customerId) {
    try {
      return await CartModel.findOne({ customerId });
    } catch (error) {
      throw new APIError("API Error", 500, "Sepet bulunamadı");
    }
  }

  async UpdateCart(customerId, product, qty, isRemove) {
    try {
      const cart = await CartModel.findOne({ customerId });

      if (cart) {
        // sepeti varsa:
        let cartItems = cart.items;
        let isExist = false;

        if (cartItems.length > 0) {
          cartItems = cartItems
            .map((item) => {
              if (item._id.toString() === product._id.toString()) {
                if (isRemove) {
                  return null;
                } else {
                  isExist = true;
                  return { ...item, unit: qty };
                }
              }
            })
            .filter(Boolean);
        }

        // eğer ürün sepette yoksa ve silinmeyecekse: sepete ekle
        if (!isExist && !isRemove) {
          cartItems.push({ ...product, unit: qty });
        }

        // veritabanına güncellemeyi kaydet
        cart.items = cartItems;
        return await cart.save();
      } else {
        // sepeti yoksa: yeni sepet oluştur
        return await CartModel.create({
          customerId,
          items: [{ ...product, unit: qty }],
        });
      }
    } catch (error) {
      throw new APIError("API Error", 500, "İşlem başarısız");
    }
  }
}

module.exports = ShoppingRepository;
