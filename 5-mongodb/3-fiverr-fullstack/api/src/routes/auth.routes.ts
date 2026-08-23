import express from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authLimiter, globalLimiter } from "../utils/rateLimit.js";
import upload from "../utils/multer.js";
import protect from "../middlewares/protect.js";

// router oluşturma
const router = express.Router();

// endpointleri belirle
router.route("/register").post(authLimiter, upload.single("profilePicture"), register);
router.route("/login").post(authLimiter, login);
router.route("/logout").post(authLimiter, logout);
router.route("/profile").get(globalLimiter, protect, profile);

export default router;
