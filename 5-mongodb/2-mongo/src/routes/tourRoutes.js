import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
  aliasTopTours,
  getTourStats,
} from "../controllers/tourController.js";
import formatQuery from "../middlewares/formatQuery.js";

const router = express.Router();

router.route("/top-tours").get(aliasTopTours, formatQuery, getAllTours);

router.route("/stats").get(getTourStats);

router.route("/").get(formatQuery, getAllTours).post(createTour);

router.route("/:id").get(getOneTour).patch(updateTour).delete(deleteTour);

export default router;
