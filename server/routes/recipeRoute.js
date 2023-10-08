import express from "express";
import {
  createRecipe,
  getAllRecipes,
} from "../controllers/recipe.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/create-recipe/:id", validateUser, createRecipe);
router.get("/get-all", getAllRecipes);

export default router;
