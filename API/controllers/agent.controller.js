import express from "express";
import Agent from "../models/agent.model.js";

// Controller method to add a new agent
export const addAgent = async (req, res) => {
  try {
    console.log(req.body);
    // Extracting data from request body
    const { name, phoneNumber, age, userName, nic, email, imgURL } = req.body;

    const newAgent = new Agent({
      name,
      phoneNumber,
      age,
      userName,
      nic,
      email,
      imgURL,
    });

    // Saving the new agent to the database
    await newAgent.save();

    res
      .status(201)
      .json({ message: "Agent added successfully", data: newAgent });
  } catch (error) {
    console.error("Error adding agent:", error);
    res
      .status(500)
      .json({ message: "Failed to add agent", error: error.message });
  }
};

// Create a router
const router = express.Router();
// Route to get all users
export const getAgent = async (req, res) => {
  try {
    // Fetch all users from the database
    const Agents = await Agent.find();

    // Convert imgURL Buffer to string
    // const agentsWithImageUrlAsString = Agents.map((agent) => ({
    //   ...agent.toObject(),
    //   imgURL: agent.imgURL.toString("base64"), // Assuming it's stored as base64 Buffer
    // }));

    const agentsWithImageUrlAsString = Agents.map((agent) => {
      const base64Image = agent.imgURL.toString("base64");
      return {
        ...agent.toJSON(),
      };
    });

    res.json(agentsWithImageUrlAsString); // Send the users as JSON response
  } catch (error) {
    console.error("Error fetching Agents:", error);
    res.status(500).json({ message: "Internal server error" }); // Send an error response
  }
};

export const deleteAgent = async (req, res) => {
  const agentId = req.params.id;
  console.log("Deleting agent with ID:", agentId);
  try {
    // Find the agent by ID and delete it
    const deletedAgent = await Agent.findByIdAndDelete(agentId);
    if (!deletedAgent) {
      // If the agent with the provided ID is not found
      return res.status(404).json({ message: "Agent not found" });
    }

    // If deletion is successful, send a success response
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    // If an error occurs during deletion, send an error response
    console.error("Error deleting agent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAgentByID = async (req, res) => {
  const agentId = req.params.id;
  console.log("Fetching agent with ID:", agentId);
  try {
    // Find the agent by ID
    const agent = await Agent.findById(agentId);
    if (!agent) {
      // If the agent with the provided ID is not found
      return res.status(404).json({ message: "Agent not found" });
    }

    // If the agent is found, send it as a JSON response
    res.json(agent);
  } catch (error) {
    // If an error occurs during the operation, send an error response
    console.error("Error fetching agent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdate = async (req, res) => {
  const agentId = req.params.id;
  console.log("Updating agent with ID:", agentId);
  try {
    // Find the agent by ID and update it
    const updatedAgent = await Agent.findByIdAndUpdate(agentId, req.body, {
      new: true,
    });
    if (!updatedAgent) {
      // If the agent with the provided ID is not found
      return res.status(404).json({ message: "Agent not found" });
    }

    // If the agent is updated successfully, send it as a JSON response
    res.json(updatedAgent);
  } catch (error) {
    // If an error occurs during the operation, send an error response
    console.error("Error updating agent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the router
export default router;
