import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} from "../controllers/tourController.js";
import formatQuery from "../middlewares/formatQuery.js";
import { protect, authorizeRoles } from "../middlewares/protect.js";

const router = express.Router();

router.route("/monthly-plan/:year").get(protect, authorizeRoles("admin"), getMonthlyPlan);

router.route("/top-tours").get(aliasTopTours, formatQuery, getAllTours);

router.route("/stats").get(protect, authorizeRoles("admin"), getTourStats);

router
  .route("/")
  .get(formatQuery, getAllTours)
  .post(protect, authorizeRoles("admin", "lead-guide"), createTour);

router
  .route("/:id")
  .get(getOneTour)
  .patch(protect, authorizeRoles("admin", "lead-guide", "guide"), updateTour)
  .delete(protect, authorizeRoles("admin", "lead-guide"), deleteTour);

router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

export default router;
