import Book from "../models/bookSchema.js";

export const addBookDocument = async (bookData) => {
  const newBook = new Book(bookData);
  const resultBook = await newBook.save();
  return resultBook;
};

export const findAllBooks = async () => {
  //todo:populate user
  const books = await Book.find().populate("userID").exec();

  return books;
};

export const findBookById = async (id) => {
  const book = await Book.findById(id).populate("userID").exec();
  return book;
};

export const deleteBookById = async (id) => {
  const book = await Book.findByIdAndDelete(id);
  return book;
};

export const updateById = async (id, inputBook) => {
  const resultBook = await Book.findByIdAndUpdate(id, inputBook, {
    new: true,
  });
  return resultBook;
};
