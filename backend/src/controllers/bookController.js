import Book from "../models/bookSchema.js";
import { uploadImage } from "./../lib/cloudinary.js";
import {
  addBookDocument,
  deleteBookById,
  findAllBooks,
  findBookById,
  findBooksByUserId,
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

      return res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: {
          title: resultBook.title,
          author: resultBook.author,
          userID: resultBook.userID,
          image: resultBook.image,
          description: resultBook.description,
          price: resultBook.price,
          categories: resultBook.categories,
          stock: resultBook.stock,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        error: "No file uploaded. Please provide a file and try again.",
      });
    }
  } catch (err) {
    console.error("Error in createBook - bookController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong, please try again later.",
    });
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

    return res.status(200).json({
      success: true,
      message: "Book edited successfully",
      data: {
        title: resultBook.title,
        author: resultBook.author,
        userID: resultBook.userID,
        image: resultBook.image,
        description: resultBook.description,
        price: resultBook.price,
        categories: resultBook.categories,
        stock: resultBook.stock,
      },
    });
  } catch (err) {
    console.error("Error in editBook - bookController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong, please try again later.",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await findAllBooks();
    // res.json(quiz);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    console.error("Error in getAllBooks - bookController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong, please try again later.",
    });
  }
};

export const getBooksByUser = async (req, res) => {
  try {
    const books = await findBooksByUserId(req.params.userID);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    console.error("Error in getUserBooks - bookController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong, please try again later.",
    });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const book = await findBookById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: {
        title: book.title,
        author: book.author,
        userID: book.userID,
        image: book.image,
        description: book.description,
        price: book.price,
        categories: book.categories,
        stock: book.stock,
      },
    });
  } catch (err) {
    console.log("Error in getSingleBook, bookController", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong, please try again later.",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await deleteBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "The requested book does not exist or has already been deleted.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: {
        title: book.title,
        author: book.author,
        userID: book.userID,
        image: book.image,
        description: book.description,
        price: book.price,
        categories: book.categories,
        stock: book.stock,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong, please try again later.",
    });
  }
};
