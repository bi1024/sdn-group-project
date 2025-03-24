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

cartRouter.get("/", verifyToken ,getCart); //Lấy cart theo userId done
cartRouter.post("/", verifyToken ,addToCart); //Add sách vào Cart done
cartRouter.put("/update", verifyToken ,updateCart); //update số lượng sách trong cart done
cartRouter.delete("/deleteOne", verifyToken ,removeFromCart); //Xoá 1 sách ra khỏi cart done
cartRouter.delete("/", verifyToken ,removeMultiFromCart); //Xoá tất cả ra khỏi Cart hoặc xoá nhiều sách 1 lúc done

export default cartRouter;