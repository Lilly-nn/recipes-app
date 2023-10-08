import express from "express";
import {
  getProfile,
  getUserRecipes,
  getLikedRecipes,
} from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.get("/get-profile/:id", validateUser, getProfile);
router.get("/get-created/:id", validateUser, getUserRecipes);
router.get("/get-liked/:id", validateUser, getLikedRecipes);

export default router;
