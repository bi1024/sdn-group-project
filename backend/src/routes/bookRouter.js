import express from "express";
import {
  createBook,
  deleteBook,
  editBook,
  getAllBooks,
  getBooksByUser,
  getCategories,
  getSingleBook,
} from "../controllers/bookController.js";
import upload from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/authJwt.js";

const bookRouter = express.Router();

//categories
bookRouter.get("/categories", getCategories);

//user
bookRouter.get("/user/:userID", getBooksByUser);

//todo: add patch
bookRouter.get("/me", verifyToken, getBooksByUser);
bookRouter.get("/", getAllBooks);
bookRouter.post("/", verifyToken, upload.single("image"), createBook);
bookRouter.put("/:id", verifyToken, upload.single("image"), editBook);
bookRouter.delete("/:id", verifyToken, deleteBook);
bookRouter.get("/:id", getSingleBook);

export default bookRouter;
