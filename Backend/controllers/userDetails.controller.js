import { User } from "../models/user.model.js";
import { Details } from "../models/userDetails.models.js";
import mongoose from "mongoose";

// ✅ Save User Details (with duplicate email handling)
export const userDetailsData = async (req, res) => {
  try {
    const { id } = req.params; // User ID
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
      !technicalSkill.length || // Ensure it's not empty
      !certification.length || // Ensure it's not empty
      experience === undefined // Ensure experience is provided (0 is valid)
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const AddData = new Details({
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
     user : id, // Associate with the user ID
    });
    await AddData.save();
    return res.status(200).json({
      message: "User details saved successfully",
      success: true,
      data: AddData,
    });
  } catch (error) {
    console.error("Error saving user details:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ✅ Get User Details by ID
export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params; // User ID

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        success: false,
      });
    }

    const userDetails = await Details.findOne({ user: id });
    if (!userDetails) {
      return res.status(404).json({
        message: "User details not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User details retrieved successfully",
      success: true,
      data: userDetails,
    });
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// ✅ Update User Details
export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params; // User ID
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

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        success: false,
      });
    }

    // Validate required fields
    if (
      !userName ||
      !phone ||
      !email ||
      !address ||
      !education ||
      !class12 ||
      !class10 ||
      !technicalSkill.length || // Ensure it's not empty
      !certification.length || // Ensure it's not empty
      experience === undefined // Ensure experience is provided (0 is valid)
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const updatedUserDetails = await Details.findOneAndUpdate(
      { user: id },
      {
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
      },  
      { new: true } // Return the updated document

    );
    if (!updatedUserDetails) {
      return res.status(404).json({
        message: "User details not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User details updated successfully",
      success: true,
      data: updatedUserDetails,
    });

  }
  catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
