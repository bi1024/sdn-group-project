import { useEffect, useState } from "react";
import { api } from "../../api";
import { toast } from "react-toastify";

function OrderPending() {
  const [orders, setOrders] = useState([]);

  // Hàm lấy dữ liệu đơn hàng từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/pending'); // API để lấy đơn hàng đang chờ xử lý
        console.log(response.data.orders);
        setOrders(response.data.orders || []); // Nếu không có orders, gán default là mảng rỗng
      } catch (error) {
        console.error('Failed to fetch orders', error);
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  // Hàm xử lý khi bấm "Accept" để xác nhận đơn hàng
  const handleAcceptOrder = async (orderId) => {
    console.log({orderId})
    try {
      await api.put(`/order/pending/${orderId}`); // API để cập nhật trạng thái đơn hàng
      toast.success("Đơn hàng đã được bạn chấp nhận");
      setOrders(orders.filter(order => order.orderId._id !== orderId)); // Loại bỏ đơn hàng đã được chấp nhận
    } catch (error) {
      console.error('Failed to accept order', error);
      toast.error("Failed to accept the order");
    }
  };

  return (
    <section id="order-pending" className="order-pending">
      <div className="container">
        <h2 className="order-pending-title">Pending Orders</h2>
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <span className="order-id">Order ID: {order._id}</span>
                  <span className="order-status">
                    Status: <strong>{order.status}</strong>
                  </span>
                </div>
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.orderId.items.map((item, index) => {
                      // Kiểm tra nếu bookId của item giống với bookId trong order
                      if (item.bookId === order.bookId._id) {
                        return (
                          <li key={index}>
                            <img src={order.bookId.image} width="50" alt={order.bookId.title} />
                            <span>{order.bookId.title} (x{item.quantity})</span>
                            <span>{order.bookId.price * item.quantity}$</span>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
                <div className="order-total">
                  <strong>Total: </strong>
                  {order.orderId.items.reduce(
                    (total, item) => total + order.bookId.price * item.quantity,
                    0
                  )}
                  $
                </div>
                <div className="order-card-footer">
                  <span>Shipping Address: {order.orderId.address}</span>
                  <span>Phone: {order.orderId.phone}</span>
                </div>
                <div className="order-actions">
                  {order.status === 'Pending' && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleAcceptOrder(order.orderId._id)}
                    >
                      Accept
                    </button>
                  )}
                  <button className="btn btn-warning" disabled>
                    Pending
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No pending orders</p>
        )}
      </div>
    </section>
  );
}

export default OrderPending;
