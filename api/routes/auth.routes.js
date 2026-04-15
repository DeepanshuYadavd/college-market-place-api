import { signin, signup, getUser, signout } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import express from "express"
const router = express.Router();

//  http methods
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-user", protect, getUser);
router.post("/signout", signout);

export default router;
