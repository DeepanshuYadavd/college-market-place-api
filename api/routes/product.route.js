import express from "express";
import { createProduct } from "../controllers/products.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("", upload.single("image"), createProduct);

export default router;
