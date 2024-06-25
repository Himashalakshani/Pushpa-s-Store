import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id; // Assuming id is passed as a parameter
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    let updateFields = { username, email };

    // Check if password is provided
    if (password) {
      updateFields.password = hashedPassword; // No need to hash the password here
    }

    console.log(updateFields);

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
