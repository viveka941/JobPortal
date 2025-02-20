import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "Recuiter"],
    default: "Student",
    required: true,
  },
  profile: {
    bio: {
      type: String,
    },
    skills: [
      {
        stype: String,
      },
    ],
    resume: {
      // uril to resume file from data base
      type: String,
    },
    resumeOriginal: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
},{timestamps : true});

export const User = mongoose.model("User", userSchema)
