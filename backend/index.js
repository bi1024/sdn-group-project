import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/lib/db.js";
import authRouter from "./src/routes/authRouter.js";
import { verifyToken } from "./src/middlewares/authJwt.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use('/auth', authRouter);

// Ví dụ về authenticate user (verifyToken) trước khi access tài nguyên server:
app.get(
  '/user', 
  [verifyToken],
  (req, res, next) => {
      res.status(200).json('User Content!');
  }
)

app.get("/", (req, res) => {
  //testing code:), ignore
  console.log("ok - temp testing code");
  res.json({ message: "This is working" });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDB();
});
