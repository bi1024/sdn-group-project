import express from "express";
import * as orderController from "../controllers/orderController.js";
import {verifyToken} from "../middlewares/authJwt.js"

const orderRouter = express.Router();

//Người mua
orderRouter.post("/", verifyToken, orderController.createOrder); //Tạo order
orderRouter.get("/", verifyToken, orderController.getUserOrders); //Lấy danh sách đơn hàng(người mua)
orderRouter.delete("/:orderId", verifyToken, orderController.cancelOrder); //Huỷ order khi trạng thái đang là pending

//seller Order
orderRouter.get("/handle", verifyToken, orderController.getSellerOrders); //Lấy danh sách đơn hàng đang chờ xử lý(người bán)
orderRouter.put("/handle/:orderId", verifyToken, orderController.acceptOrder); //Chấp nhận đơn hàng (người bán)

export default orderRouter;