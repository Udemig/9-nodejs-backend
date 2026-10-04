import express from "express";
import authController from "./delivery.controller.js";
import { authenticate } from "./delivery.middleware.js";

const router = express.Router();

router.post("/x", authenticate, authController.x);

export default router;
