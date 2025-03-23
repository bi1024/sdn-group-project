import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    removeMultiFromCart,
  } from "../controllers/cartController.js";
import express from "express";


const cartRouter = express.Router();

cartRouter.get("/", getCart); //Lấy cart theo userId
cartRouter.post("/", addToCart); //Add sách vào Cart
cartRouter.put("/:bookId", updateCart); //Cập nhật số lượng sách trong cart
cartRouter.delete("/:bookId", removeFromCart); //Xoá 1 sách ra khỏi cart
cartRouter.delete("/", removeMultiFromCart); //Xoá tất cả ra khỏi Cart hoặc xoá nhiều sách 1 lúc

export default cartRouter;