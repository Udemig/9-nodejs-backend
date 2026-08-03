import express from "express";
import { protect } from "../middlewares/protect.js";
import { deleteMe, profile, updateMe } from "../controllers/userController.js";

const router = express.Router();

router.route("/me").get(protect, profile).patch(protect, updateMe).delete(protect, deleteMe);

export default router;
