import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  likeRecipe,
} from "../controllers/recipe.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/create-recipe/:id", validateUser, createRecipe);
router.post("/delete-recipe", deleteRecipe);
router.post("/like-recipe", likeRecipe);
router.get("/get-all", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);

export default router;
