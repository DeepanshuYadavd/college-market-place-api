import express from "express";
import { createCollge } from "../controllers/college.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  crud routes:

router.post("/admin", protect, isAdmin, createCollge);

export default router;
