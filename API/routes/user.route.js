import express from "express";
import {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../controllers/authentication.controller.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.delete("/:id", deleteUser);
router.get("/profile/:id", getUserById);
router.put("/update/:id", updateUser);

export default router;
