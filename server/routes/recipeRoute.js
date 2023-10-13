import express from "express";
import {
  addComment,
  createRecipe,
  deleteComment,
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
router.post("/add-comment", addComment);
router.post("/delete-comment", deleteComment);
router.get("/get-all", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);

export default router;
