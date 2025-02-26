import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "User ID is required"],
      index: true 
    },
    items: [
      {
        bookId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Book", 
          required: [true, "Book ID is required"] ,
        },
        quantity: { 
          type: Number, 
          required: [true, "Quantity is required"], 
          min: [1, "Quantity must be at least 1"], 
          validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
          },
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

// Middleware: Cập nhật `updatedAt` khi giỏ hàng thay đổi
cartSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Cart = mongoose.model("Cart", cartSchema, "Cart");
export default Cart;
