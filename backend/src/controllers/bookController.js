import Book from "../models/bookSchema.js";
import { uploadImage } from "./../lib/cloudinary.js";
import { addBookDocument } from "../services/bookService.js";

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
