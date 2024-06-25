import bcrypt from "bcrypt";
import Admin from "../models/Admin.model.js";

export const SignUp = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      password: hashedPassword, // Save the hashed password
    });
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) {
      throw new Error("Invalid credentials");
    }
    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    // If credentials are valid, return admin's ID along with success message
    res
      .status(200)
      .json({ message: "Admin signed in successfully", adminId: admin._id });
  } catch (error) {
    next(error);
  }
};
