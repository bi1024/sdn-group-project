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

const bookRouter = express.Router();

//categories
bookRouter.get("/categories", getCategories);

//user
bookRouter.get("/user/:userID", getBooksByUser);

//todo: add patch
bookRouter.get("/:id", getSingleBook);
bookRouter.get("/", getAllBooks);
bookRouter.post("/", upload.single("image"), createBook);
bookRouter.put("/:id", upload.single("image"), editBook);
bookRouter.delete("/:id", deleteBook);



export default bookRouter;
