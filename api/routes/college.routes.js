import express from "express";
import {
  createCollge,
  getallColleges,
} from "../controllers/college.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  crud routes:

router.post("/admin", protect, isAdmin, createCollge);
router.get("/get-colleges", getallColleges);

export default router;
