import express from "express";
import {
  createProduct,
  getAllProducts,
  getMyListing,
} from "../controllers/products.controller.js";
import upload from "../middlewares/multer.js";
import { isUser, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  isUser,
  upload.array("image", 5),
  createProduct,
);
router.get("/get-all", getAllProducts);
router.get("/get-myListing", protect, isUser, getMyListing);

export default router;
