import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
