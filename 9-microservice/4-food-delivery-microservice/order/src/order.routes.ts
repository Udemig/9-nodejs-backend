import express from "express";
import orderController from "./order.controller.js";
import { authenticate } from "./order.middleware.js";

const router = express.Router();

router.post("/x", authenticate, orderController.x);

export default router;
