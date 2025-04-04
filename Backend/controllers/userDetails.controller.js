import { Details } from "../models/userDetails.models.js";
import mongoose from "mongoose";

export const userDetailsData = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params
    const {
      userName,
      phone,
      email,
      address,
      education,
      masterDegree,
      masterYear,
      graduationDegree,
      graduationYear,
      class12,
      class10,
      technicalSkill,
      certification,
      experience,
      achievement,
    } = req.body;

    // ✅ Validate required fields
    if (
      !userName ||
      !phone ||
      !email ||
      !address ||
      !education ||
      !class12 ||
      !class10 ||
      !technicalSkill.length || // Check if array is not empty
      !certification.length || // Check if array is not empty
      experience === undefined // Ensure experience is provided (0 is valid)
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // ✅ Validate `id`
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID",
        success: false,
      });
    }

    // ✅ Check if user already exists by email
    const existingUserData = await Details.findOne({ email });
    if (existingUserData) {
      return res.status(409).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    // ✅ Save user data
    const userData = new Details({
      _id: id,
      userName,
      phone,
      email,
      address,
      education,
      masterDegree, // Optional field
      masterYear, // Optional field
      graduationDegree, // Optional field
      graduationYear, // Optional field
      class12,
      class10,
      technicalSkill,
      certification,
      experience,
      achievement, // Optional field
    });

    await userData.save();

    return res.status(201).json({
      message: "User details saved successfully",
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error("Error saving user details", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const getUserdata = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID",
        success: false,
      });
    }

    // Fetch user data correctly
    const userdata = await Details.findById(id).lean(); // Ensure .lean() is used

    if (!userdata) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully fetched user data",
      success: true,
      data: userdata,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
