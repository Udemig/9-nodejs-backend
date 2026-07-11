import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
} from "../controllers/index.js";

const router = express.Router();

router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getOneRecipe).put(updateRecipe).delete(deleteRecipe);

export default router;
