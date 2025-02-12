import { application } from "express";
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  compnay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Compnay",
    required: true,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Application",
    default : null
  },
});

export const Job = mongoose.model("Job",jobSchema)
