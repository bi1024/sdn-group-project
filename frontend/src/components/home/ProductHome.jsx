import { useEffect, useState } from "react";
import { api, headerConfig} from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductHome() {
  const [books, setBooks] = useState([]);
  console.log({ books });

  const handleFetchBooks = async () => {
    try {
      const res = await api.get("books");
      setBooks(res.data.data);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    handleFetchBooks();
  }, []);

  //Hàm xử lý add to cart
  const handleAddToCart = async (bookId, quantity = 1) => {
    try {
      await api.post("/cart", { bookId, quantity }, { withCredentials: true });
      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm vào giỏ hàng!");
    };
  };

  return (
    <div class="col-sm-9 padding-right">
      <div class="features_items">
        <h2 class="title text-center">All Books</h2>
      </div>

      <div class="category-tab">
        <div class="tab-content">
          <div class="tab-pane fade active in" id="tshirt">
            {books.map((book) => {
              console.log({ book });
              return (
                <div key={book._id} class="col-sm-3">
                  <div class="product-image-wrapper">
                    <div class="single-products">
                      <div class="productinfo text-center">
                        <img src={book.image} />
                        <h2>{book.price}$</h2>
                        <p>{book.title}</p>
                        <p style={{ color: "red" }}>{book.author}</p>
                        <button className="btn btn-default add-to-cart" onClick={() => handleAddToCart(book._id)}>
                          <i className="fa fa-shopping-cart"></i> Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductHome;
