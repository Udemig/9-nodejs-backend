import express from "express";
import { authorizeRoles, protect } from "../middlewares/protect.js";
import {
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getOneUser,
  profile,
  updateMe,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/me").get(protect, profile).patch(protect, updateMe).delete(protect, deleteMe);

router.use(protect, authorizeRoles("admin")); // bu satırdan soranki bütün route'lara sadece admin istek atabilir

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

export default router;
