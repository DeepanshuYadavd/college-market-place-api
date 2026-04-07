import { Product } from "../model/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
