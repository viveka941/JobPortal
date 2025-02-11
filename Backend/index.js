import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
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

app.listen(8000, () => {
  console.log("app is listing part number is 8000");
});
