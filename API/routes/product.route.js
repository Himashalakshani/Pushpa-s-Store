import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import express from "express";
import { authenticateUser } from "../controllers/authentication.controller.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.put("/update-product/:productId", updateProduct);

router.delete("/delete-product/:productId", deleteProduct);

export default router;
