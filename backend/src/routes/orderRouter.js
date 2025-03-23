import express from "express";
import * as orderController from "../controllers/orderController.js";

const orderRouter = express.Router();

//Người mua
orderRouter.post("/", orderController.createOrder);
orderRouter.get("/",  orderController.getUserOrders);
orderRouter.delete("/:orderId", orderController.cancelOrder);

//seller Order
orderRouter.get("/handle", orderController.getSellerOrders);
orderRouter.put("/handle/:orderId", orderController.acceptOrder);

export default orderRouter;