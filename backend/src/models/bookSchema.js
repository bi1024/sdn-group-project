import mongoose from "mongoose";
import User from "./userSchema.js";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String, // URLs to images
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    categories: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema, "Book");

export default Book;
