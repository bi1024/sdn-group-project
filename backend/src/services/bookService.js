import Book from "../models/bookSchema.js";

export const addBookDocument = async (bookData) => {
  const newBook = new Book(bookData);
  const resultBook = await newBook.save();
  return resultBook;
};

export const findAllBooks = async () => {
  return await Book.find().populate("userID").exec();
};

export const findBookById = async (id) => {
  return await Book.findById(id).populate("userID").exec();
};

export const findBooksByUserId = async (userID) => {
  return await Book.find({ userID: userID }).populate("userID").exec();
};

export const deleteBookById = async (id) => {
  return await Book.findByIdAndDelete(id);
};

export const updateById = async (id, inputBook) => {
  const resultBook = await Book.findByIdAndUpdate(id, inputBook, {
    new: true,
  });
  return resultBook;
};
