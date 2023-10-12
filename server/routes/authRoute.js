import express from "express";
import {
  register,
  signIn,
  signOut,
  activate,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", register);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);
router.get("/activate/:link", activate);

export default router;
