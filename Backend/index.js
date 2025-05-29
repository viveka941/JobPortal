import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight request for all routes


// API Routes
app.get("/", (req, res) => {
  res.send("API is running...");


});
app.use("/api/users", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  connectDB();

  console.log(`Server running on port ${PORT}`);
});
