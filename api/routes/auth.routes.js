import {
  getAllusers,
  signin,
  signup,
  getUser,
  signout,
} from "../controllers/auth.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

//  http methods
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-user", protect, getUser);
router.post("/signout", signout);

//  admin:
router.get("/admin/get-users", protect, isAdmin, getAllusers);

export default router;
