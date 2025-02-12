import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Check if all fields are provided
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // Save new user
    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully, ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Check user role
    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
