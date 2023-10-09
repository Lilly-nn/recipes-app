import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
} from "../controllers/recipe.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/create-recipe/:id", validateUser, createRecipe);
router.get("/get-all", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);

export default router;
