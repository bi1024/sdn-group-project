import Order  from "../models/orderSchema.js";
import SellerOrder from "../models/sellerOrders.js";
import Book from "../models/bookSchema.js";

//Lấy danh sách đơn hàng(người mua)
export const getUserOrders = (userId) => {
    return Order.find({userId}).populate("items.bookId");
};

//Tạo order
export const createOrder = async (userId, items, address, phone) => {
    const newOrder = new Order({userId, items, address, phone, status: 'Pending'});

    //Lưu đơn đặt hàng vào bảng order
    await newOrder.save(); 

    //Lưu đơn đặt hàng vào bảng sellerOrder
    for(const item of items){
        const book = await Book.findById(item.bookId);
        if(!book) continue;

        await SellerOrder.create({
            sellerId: book.userID,
            buyerId: userId,
            bookId: item.bookId,
            orderId: newOrder._id,
            status: "Pending",
        });
    };

    return newOrder;
};

//Huỷ order khi trạng thái đang là pending
export const cancelOrder = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, userId });
  
    if (!order || order.status !== "Pending") {
      return false;
    }
  
    // Xoá sellerOrder tương ứng
    await SellerOrder.deleteMany({ orderId });
  
    // Xoá đơn hàng
    await Order.findByIdAndDelete(orderId);
  
    return true;
  };
  

//Lấy danh sách đơn hàng đang chờ xử lý(người bán)
export const getSellerOrders = (sellerId) => {
    return SellerOrder.find({sellerId, status: 'Pending'})
        .populate('buyerId', 'username email')
        .populate('bookId', 'title price image')
        .populate('orderId', 'address phone createdAt items');
};

//Chấp nhận đơn hàng (người bán)
export const acceptOrder = async (sellerId, orderId) => {
    // Tìm đơn hàng đang ở trạng thái pending
    const sellerOrder = await SellerOrder.findOne({sellerId, orderId, status: 'Pending'});

    if(!sellerOrder){
        alert('Đơn hàng không được tìm thấy');
    };

    sellerOrder.status = 'Completed';
    await sellerOrder.save(); //Lưu vào sellerOrder models
    
    //Cập nhật status cho phía order sau khi accept
    await Order.findByIdAndUpdate(orderId, {status: 'Completed'});
};


