import express from "express";

import {
  addAgent,
  getAgent,
  deleteAgent,
  getAgentByID,
  handleUpdate,
} from "../controllers/agent.controller.js";

const router = express.Router();

// Route to add a new agent
router.post("/add", addAgent);
router.get("/get", getAgent);
router.delete("/delete/:id", deleteAgent);
router.get("/get/:id", getAgentByID);
router.put("/update/:id", handleUpdate);

export default router;
