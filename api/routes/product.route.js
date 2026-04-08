import express from "express";
import { createProduct } from "../controllers/products.controller.js";
import upload from "../middlewares/multer.js";
import { isUser, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("", protect, isUser, upload.single("image"), createProduct);

export default router;
