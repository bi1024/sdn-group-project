import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Checkout() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  console.log({selectedItems})

  const navigate = useNavigate();

  //
  const total = selectedItems.reduce((acc, item) => {
    const price = parseFloat(item.bookId.price);  // Kiểm tra giá trị price
    const quantity = parseInt(item.quantity, 10); // Kiểm tra giá trị quantity
    if (isNaN(price) || isNaN(quantity)) {
      console.error('Invalid', item);
      return acc;  // Nếu không hợp lệ, không cộng thêm giá trị này vào tổng
    }
    return acc + (price * quantity);
  }, 0);
  

  useEffect(() => {
    // Lấy items từ localStorage và lưu vào state
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setSelectedItems(items);
    }
  }, []);

  // Hàm xử lý khi bấm "Place Order"
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        address,
        phone,
        items: selectedItems
      };
  
      // Gọi API tạo đơn hàng
      const response = await api.post('/order', orderData, {
        withCredentials: true
      });
      console.log('Order response:', response.data);
      toast.success('order thành công');
      localStorage.removeItem('items');
      navigate("/productHome")
      
    } catch (err) {
      console.error('Error placing order:', err);
     
    }
  };
  

  return (
    <section id="checkout" className="checkout-section">
      <div className="container">
        <div className="checkout-container">
          {/* Form for Address and Phone */}
          <div className="checkout-form">
            <h2>Checkout</h2>
            <form>
              <div className="form-group">
                <label htmlFor="address">Shipping Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Displaying entered Address and Phone */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <strong>Shipping Address:</strong> {address || 'Not provided'}
            </div>
            <div className="summary-item">
              <strong>Phone Number:</strong> {phone || 'Not provided'}
            </div>
          </div>

          {/* Table for Order Details */}
          <div className="order-details">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description">Description</td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                </tr>
              </thead>

              <tbody>
                {selectedItems.map((item) => {
                  const { bookId, quantity } = item;
                  const { title, price, image, author } = bookId;
                  return (
                    <tr key={bookId._id}>
                      <td className="cart_product">
                        <a href="#">
                          <img src={image} alt={title} />
                        </a>
                      </td>
                      <td className="cart_description">
                        <h4>
                          <a href="#">{title}</a>
                        </h4>
                        <p>{author}</p>
                      </td>
                      <td className="cart_price">
                        <p>{price}$</p>
                      </td>
                      <td className="cart_quantity">
                        <input
                          type="number"
                          value={quantity}
                          readOnly
                          className="cart_quantity_input"
                        />
                      </td>
                      <td className="cart_total">
                        <p>{price * quantity}$</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="oke">
                <div className="totall">Total</div>
                <h3>{total}</h3>
              </div>

          </div>

          {/* Place Order Button */}
          <div className="place-order">
            <button type="button" className="btn btn-primary" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
