import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authenticationRouter from "./routes/authentication.route.js";
import productRoute from "./routes/product.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./controllers/authentication.controller.js";
import cartRoute from "./routes/cart.route.js";
import agentRouter from "./routes/agent.route.js";
import orderRouter from "./routes/order.route.js";
import adminRouter from "./routes/admin.route.js";
import { sendEmailRoute } from "./emailSender.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Not Connected to DB", err);
  });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Route for fetching logged-in user information
app.get("/api/user/profile", authenticateUser, (req, res) => {
  // You can access the logged-in user data from req.user
  const user = req.user;
  res.status(200).json({ user });
});

// Root URL route handler with authentication middleware
app.get("/protected-user", authenticateUser, (req, res) => {
  res.send("This is the root URL and it is protected!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/agent", agentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.post("/api/sendEmail", sendEmailRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
