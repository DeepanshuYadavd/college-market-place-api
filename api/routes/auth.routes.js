import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

//  http methods
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
