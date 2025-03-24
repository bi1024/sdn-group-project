import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    removeMultiFromCart,
  } from "../controllers/cartController.js";
import express from "express";
import {verifyToken} from "../middlewares/authJwt.js"


const cartRouter = express.Router();

cartRouter.get("/", verifyToken ,getCart); //Lấy cart theo userId
cartRouter.post("/", verifyToken ,addToCart); //Add sách vào Cart
cartRouter.put("/:bookId", verifyToken ,updateCart); //Cập nhật số lượng sách trong cart
cartRouter.delete("/:bookId", verifyToken ,removeFromCart); //Xoá 1 sách ra khỏi cart
cartRouter.delete("/", verifyToken ,removeMultiFromCart); //Xoá tất cả ra khỏi Cart hoặc xoá nhiều sách 1 lúc

export default cartRouter;