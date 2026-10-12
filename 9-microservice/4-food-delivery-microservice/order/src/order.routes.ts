import express from "express";
import orderController from "./order.controller.js";
import { authenticate, authorize } from "./order.middleware.js";

const router = express.Router();

router.post("/", authenticate, orderController.createOrder);
router.get("/user/:userId", authenticate, orderController.getUserOrders);
router.get("/:orderId", authenticate, orderController.getOrderById);
router.patch(
  "/:orderId/status",
  authenticate,
  authorize(["admin", "restaurant_owner", "courier"]),
  orderController.updateOrderStatus,
);

export default router;
