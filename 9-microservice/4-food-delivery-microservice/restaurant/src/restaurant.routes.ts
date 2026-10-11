import express from "express";
import restaurantController from "./restaurant.controller.js";
import { authenticate, authorize } from "./restaurant.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  restaurantController.createRestaurant,
);
router.get("/", authenticate, restaurantController.getAllRestaurants);
router.get("/:id", authenticate, restaurantController.getRestaurantById);
router.get("/:id/menu", authenticate, restaurantController.getRestaurantMenu);
router.post(
  "/:id/menu",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  restaurantController.createMenuItem,
);
router.patch(
  "/:id/menu/:itemId",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  restaurantController.updateMenuItem,
);
router.delete(
  "/:id/menu/:itemId",
  authenticate,
  authorize(["admin", "restaurant_owner"]),
  restaurantController.deleteMenuItem,
);

export default router;
