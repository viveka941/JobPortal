import mongoose from "mongoose";

const userDetails = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  education: {
    type: String, // Added missing type
    enum: ["Master", "Graduate"],
    required: true,
  },
  masterDegree: {
    type: String,
  },
  masterYear: {
    type: Number,
  },
  graduationDegree: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
  class12: {
    type: Number,
    required: true,
  },
  class10: {
    type: Number,
    required: true,
  },
  technicalSkill: {
    type: [String],
    required: true,
  },
  certification: [
    {
      name: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  achievement: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Details = mongoose.model("Details", userDetails);
