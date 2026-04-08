import { Product } from "../model/product.schema.js";

export const createProduct = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.body);
    console.log(req.file);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
