import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/lib/db.js";
import bookRouter from "./src/routes/bookRouter.js";


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

app.use("/book", bookRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDB();
});
