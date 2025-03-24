import { useEffect, useState } from "react";
import { api, urlImage } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null); // Đặt cart là null ban đầu
  const [selectedItems, setSelectedItems] = useState([]); // Dùng để lưu các sản phẩm đã chọn theoID
  const [selectedItem, setSelectedItem] = useState([]); // Dùng để lưu các sản phẩm đã chọn theo cả 1 items
  const navigate = useNavigate();

  // Hàm lấy cart theo id
  const handleFetchCart = async () => {
    try {
      const res = await api.get("/cart", { withCredentials: true });
      setCart(res.data.cart);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    handleFetchCart();
  }, []);

  // Hàm thay đổi quantity của item trong cart
  const handleUpdateQuantity = async (bookId, quantity) => {
    try {
      await api.put("/cart/update", { bookId, quantity }, { withCredentials: true });
      handleFetchCart();
    } catch (err) {
      console.log(err);
      toast.error("Không update quantity được");
    }
  };

  // Hàm xóa một sản phẩm trong giỏ hàng
  const handleRemoveFromCart = async (bookId) => {
    try {
      await api.delete("/cart/deleteOne", { data: { bookId }, withCredentials: true });
      handleFetchCart(); // Tải lại giỏ hàng sau khi xóa thành công
      toast.success("Sách đã được xóa");
    } catch (err) {
      console.log(err);
      toast.error("Không xóa sách được");
    }
  };

  // Hàm xóa nhiều sản phẩm trong giỏ hàng
  const handleRemoveMultipleFromCart = async () => {
    try {
      await api.delete("/cart", { data: { bookIds: selectedItems }, withCredentials: true });
      setSelectedItems([]); // Xóa các mục đã chọn
      handleFetchCart(); // Tải lại giỏ hàng sau khi xóa thành công
      toast.success("Các sách đã được xóa");
    } catch (err) {
      console.log(err);
      toast.error("Không xóa nhiều sách được");
    }
  };

  // Tính tổng tiền giỏ hàng
  const calculateTotalPrice = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + item.bookId.price * item.quantity;
    }, 0);
  };

  // Hàm thay đổi trạng thái của checkbox
  const handleCheckboxChange = (productId, item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) // Bỏ chọn nếu đã chọn
        : [...prevSelected, productId] // Chọn nếu chưa chọn
    );

    setSelectedItem((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((it) => it!== item) // Bỏ chọn nếu đã chọn
          : [...prevSelected, item] // Chọn nếu chưa chọn
      );
  };

  // Hàm xử lý checkout
  const handleCheckout = () => {
    // Gửi `selectedItems` (sản phẩm được chọn) đến API để tạo order
    console.log("Selected items for checkout:", selectedItem);
    if(selectedItem.length > 0){
        localStorage.setItem("items", JSON.stringify(selectedItem));
        navigate("/checkout");

    }
  };

  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>

          {cart && cart.items.length > 0 ? (
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description">Description</td>
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td>Select</td>
                    <td>Delete</td>
                  </tr>
                </thead>

                <tbody>
                  {cart.items.map((item) => {
                    const { bookId, quantity } = item;
                    const { _id, title, price, image, author } = bookId;
                    return (
                      <tr key={_id}>
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
                          <div className="cart_quantity_button">
                            <a
                              className="cart_quantity_up"
                              href="#"
                              onClick={() => handleUpdateQuantity(_id, quantity + 1)}
                            >
                              +
                            </a>
                            <input
                              className="cart_quantity_input"
                              type="text"
                              name="quantity"
                              value={quantity}
                              autoComplete="off"
                              size="2"
                              onChange={(e) => handleUpdateQuantity(_id, +e.target.value)}
                            />
                            <a
                              className="cart_quantity_down"
                              href="#"
                              onClick={() => handleUpdateQuantity(_id, quantity - 1)}
                            >
                              -
                            </a>
                          </div>
                        </td>
                        <td className="cart_total">
                          <p className="cart_total_price">{price * quantity}$</p>
                        </td>
                        <td className="cart_select">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(_id, item)}
                            checked={selectedItems.includes(_id)}
                          />
                        </td>
                        <td className="cart_delete">
                          <a
                            className="cart_quantity_delete"
                            href="#"
                            onClick={() => handleRemoveFromCart(_id)}
                          >
                            <i className="fa fa-times"></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="oke">
                <div className="totall">Total</div>
                <h3>{calculateTotalPrice()}$</h3>
              </div>
              <div>
                
              </div>
              <button onClick={handleCheckout} className="btn btn-primary">Proceed to Checkout</button>

              {/* Xóa nhiều sản phẩm */}
              {selectedItems.length > 0 && (
                <button onClick={handleRemoveMultipleFromCart} className="btn btn-danger">
                  Remove 
                </button>
              )}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
