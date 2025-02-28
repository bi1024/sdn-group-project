import Book from "../models/bookSchema.js";

export const addBookDocument = async (bookData) => {
  const newBook = new Book(bookData);
  const resultBook = await newBook.save();
  return resultBook;
};
