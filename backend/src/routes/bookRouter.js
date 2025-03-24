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
bookRouter.get("/:id", getSingleBook);
bookRouter.get("/", getAllBook);
bookRouter.post("/", verifyToken, upload.single("image"), createBook);
bookRouter.put("/:id", verifyToken, upload.single("image"), editBook);
bookRouter.delete("/:id", verifyToken, deleteBook);



export default bookRouter;
