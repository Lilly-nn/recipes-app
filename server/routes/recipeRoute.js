import express from "express";
import { createRecipe } from "../controllers/recipe.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/create-recipe", validateUser, createRecipe);

export default router;
