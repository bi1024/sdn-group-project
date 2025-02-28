import express from "express";
import { createBook } from "../controllers/bookController.js";
import multer from "multer";

//todo: Move logic away from router
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const bookRouter = express.Router();

bookRouter.post(
  "/",
  upload.single("image"),
  createBook
);

export default bookRouter;
