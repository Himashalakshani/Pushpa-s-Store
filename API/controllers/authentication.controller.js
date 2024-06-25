import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, nic, name, phoneNumber, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    nic,
    name,
    phoneNumber,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email
    ) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      next(error);
    }
  }
};

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If username and password are correct, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie in the response
    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      maxAge: 3600000, // 1 hour expiration (in milliseconds)
    });

    // Return the token in the response
    res
      .status(200)
      .json({ message: "Sign in successful!", token: token, userId: user._id });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("http://localhost:5173/user-login"); // Redirect to login if token is missing
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect("http://localhost:5173/user-login"); // Redirect to login if token is invalid
    }
    req.user = decoded; // Attach user data to the request object
    next(); // Move to the next middleware or route handler
  });
};
