import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/lib/db.js";
import bookRouter from "./src/routes/bookRouter.js";
import cartRouter from "./src/routes/cartRouter.js";
import orderRouter from "./src/routes/orderRouter.js";
import authRouter from "./src/routes/authRouter.js";
import profile from "./src/routes/profileRoutes.js";
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

//Routes
app.use("/books", bookRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use('/auth', authRouter);
app.use('/profile', profile);

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
