import express from "express";
import { register, signIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", register);
router.post("/sign-in", signIn);

export default router;
