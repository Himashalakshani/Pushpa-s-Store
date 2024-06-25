import express from "express";
import { addOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/add-order", addOrder);

export default router;
