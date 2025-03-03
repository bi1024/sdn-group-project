import Book from "../models/bookSchema.js";
import { uploadImage } from "./../lib/cloudinary.js";
import {
  addBookDocument,
  deleteBookById,
  findAllBooks,
  findBookById,
  updateById,
} from "../services/bookService.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, userID, description, price, categories, stock } =
      req.body;

    if (req.file) {
      const imageUrl = await uploadImage(req.file.buffer);
      const inputBook = {
        title,
        author,
        userID,
        image: imageUrl,
        description,
        price,
        categories: categories.split(",").map((category) => category.trim()),
        stock,
      };

      const resultBook = await addBookDocument(inputBook);

      return res.status(201).json({ resultBook });
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (err) {
    console.error("Error in createBook - bookController:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editBook = async (req, res) => {
  try {
    const { title, author, userID, description, price, categories, stock } =
      req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer);
    }
    const inputBook = {
      title,
      author,
      userID,
      // image: imageUrl,
      ...(imageUrl ? { image: imageUrl } : {}),
      description,
      price,
      categories: categories.split(",").map((category) => category.trim()),
      stock,
    };

    const resultBook = await updateById(req.params.id, inputBook);

    return res.status(200).json({ resultBook });
  } catch (err) {
    console.error("Error in editBook - bookController:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBook = async (req, res) => {
  try {
    const books = await findAllBooks();
    // res.json(quiz);
    res.status(200).json(books);
  } catch (err) {
    console.error("Error in getAllBook - bookController:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const book = await findBookById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    console.log("Error in getSingleBook, bookController", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await deleteBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
