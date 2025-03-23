import * as orderService from "../services/orderService.js";
  
//Tạo order
export const createOrder = async (req, res) => {
    try{
    const {items, address, phone} = req.body;
    const newOrder = await orderService.createOrder(req.user.id, items, address, phone);
    res.status(201).json({message: 'Order thành công', newOrder});
    }catch(err) {
        res.status(500).json({ error: "Internal Server Error" });
    };
};

//Huỷ order khi trạng thái đang là pending
export const cancelOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;
  
      const result = await orderService.cancelOrder(orderId, userId);
      if (!result) {
        return res.status(404).json({ error: "Không thấy order để xoá" });
      };
      res.status(200).json({ message: "Huỷ order thành công" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    };
  };

//Lấy danh sách đơn hàng(người mua)
export const getUserOrders = async (req, res) => {
    try{
       const orders = await orderService.getUserOrders(req.user.id);
       res.status(200).json({orders: orders});
    }catch(err) {
        res.status(500).json({ error: "Internal Server Error" });
    };
};

//Lấy danh sách đơn hàng đang chờ xử lý(người bán)
export const getSellerOrders = async (req, res) => {
    try{
        const orders = await orderService.getSellerOrders(req.user.id);
        res.status(200).json({orders: orders});
    }catch(err) {
        res.status(500).json({ error: "Internal Server Error" });
    };
};

//Chấp nhận đơn hàng (người bán)
export const acceptOrder = async (req, res) => {
    try{
        await orderService.acceptOrder(req.user.id, req.params.orderId);
        res.status(200).json({ message: "Order accepted" });
    }catch(err) {
        res.status(500).json({ error: "Internal Server Error" });
    };
};