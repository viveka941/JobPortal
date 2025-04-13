import mongoose from "mongoose";

const feedback = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userExperience: {
      type: String,
    },

    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const UserFeedBack = mongoose.model("UserFeedBack" , feedback)
