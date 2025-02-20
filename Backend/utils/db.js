import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connnect...");
  } catch (err) {
    console.error("error connecting to MongoDB ", err.message);
    process.exit(1);
  }
};

export default connectDB;
