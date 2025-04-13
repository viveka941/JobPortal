import { UserFeedBack } from "../models/feedback.js";

export const feedback = async (req, res) => {
  try {
    const { name, userExperience, rating } = req.body;

    // Check for missing fields
    if (!name || !userExperience || !rating) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if user with same name already exists
    const existingUser = await UserFeedBack.findOne({ name });
    if (existingUser) {
      return res.status(409).json({
        message: "User already submitted feedback",
        success: false,
      });
    }

    // Create new feedback
    const newFeedBack = await UserFeedBack.create({
      name,
      userExperience,
      rating,
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
      success: true,
      data: newFeedBack,
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Server error while submitting feedback",
      success: false,
    });
  }
};


export const allFeedback = async (req, res) => {
  try {
    const allData = await UserFeedBack.find({}); // Corrected the typo here

    if (!allData || allData.length === 0) {
      return res.status(401).json({
        message: "User data not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Data found",
      success: true,
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Feedback fetch error: ${error.message}`, // Improved error message
      success: false,
    });
  }
};
