import mongoose from "mongoose";
const compnaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    ,require: true
  },
},{timestamps: true});

export const Compnay = mongoose.model("Compnay",compnaySchema)