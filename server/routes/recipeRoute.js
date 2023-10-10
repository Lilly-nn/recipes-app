import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
} from "../controllers/recipe.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/create-recipe/:id", validateUser, createRecipe);
router.post("/delete-recipe", deleteRecipe);
router.get("/get-all", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);

export default router;
