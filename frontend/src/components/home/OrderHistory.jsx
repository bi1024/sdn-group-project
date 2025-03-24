import { useEffect, useState } from "react";
import { api } from "../../api";
import { toast } from "react-toastify";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  // Hàm lấy dữ liệu đơn hàng từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order'); // API để lấy đơn hàng
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <section id="order-history" className="order-history">
      <div className="container">
        <h2 className="order-history-title">Order History</h2>
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
                  {/* <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        <span>{item.bookId.title} (x{item.quantity})</span>
                        <span>{item.bookId.price * item.quantity}$</span>
                      </li>
                    ))}
                  </ul> */}
                </div>
                <div className="order-total">
                  <strong>Total: </strong>
                  {/* {order.items.reduce(
                    (total, item) => total + item.bookId.price * item.quantity,
                    0
                  )} */}
                  $
                </div>
                <div className="order-card-footer">
                  <span>Shipping Address: {order.address}</span>
                  <span>Phone: {order.phone}</span>
                </div>
                <div className="order-actions">
                  {order.status === 'Pending' ? (
                    <button className="btn btn-warning" disabled>
                      Pending
                    </button>
                  ) : (
                    <button className="btn btn-success" disabled>
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </section>
  );
}

export default OrderHistory;
