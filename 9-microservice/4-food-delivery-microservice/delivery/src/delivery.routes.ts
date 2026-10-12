import express from "express";
import deliveryController from "./delivery.controller.js";
import { authenticate, authorize } from "./delivery.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["admin", "courier"]),
  deliveryController.getAvailableDeliveries,
);

router.post(
  "/:orderId/accept",
  authenticate,
  authorize(["admin", "courier"]),
  deliveryController.acceptDelivery,
);

router.patch(
  "/:orderId/status",
  authenticate,
  authorize(["admin", "courier"]),
  deliveryController.updateDelivery,
);

router.get("/:orderId/track", authenticate, deliveryController.trackDelivery);

router.get(
  "/courier",
  authenticate,
  authorize(["admin", "courier"]),
  deliveryController.updateCourier,
);

export default router;
