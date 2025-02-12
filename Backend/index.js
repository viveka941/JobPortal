import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js"
const app = express();

///
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:8000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("this is testing");
});
// api's 
  app.use("/api/users", userRouter)

const PORT  = process.env.PORT || 8001
app.listen(PORT, () => {
  connectDB()
  console.log("app is listing part number is 8000");
});
