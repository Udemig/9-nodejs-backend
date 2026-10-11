import express from "express";
import deliveryController from "./delivery.controller.js";
import { authenticate } from "./delivery.middleware.js";

const router = express.Router();

router.post("/x", authenticate, deliveryController.x);

export default router;
