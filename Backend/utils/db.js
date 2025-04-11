import mongoose from "mongoose";

let isConnected = false; // Add global state to track connection

const connectDB = async () => {
  if (isConnected) {
    // If already connected, skip re-connecting
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "jobPortal", // Add your DB name if needed
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error; // Don’t use process.exit in serverless
  }
};

export default connectDB;
