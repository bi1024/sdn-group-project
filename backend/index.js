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
app.use("/book", bookRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDB();
});
