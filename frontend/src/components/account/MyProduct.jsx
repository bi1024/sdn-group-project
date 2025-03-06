import { useEffect, useState } from "react";
import MenuLeftAccount from "./MenuLeftAccount";
import { api, headerConfig, urlImage } from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function MyProduct() {
  const accessToken = localStorage.getItem("token");
  const auth = localStorage.getItem("auth");

  const [idUser, setIdUser] = useState("67c1c256b96ee530771ccd90"); // Chứa ID của USER hiện tại
  useEffect(() => {
    if (auth) {
      const getID = JSON.parse(auth).id;
      setIdUser(getID);
    }
  }, [auth]);

  const [books, setBooks] = useState([]); // Chứa all product của USER đó
  console.log(books);

  // Hàm xử lý gọi API lấy data my-product ra
  const handleFetchMyProduct = async () => {
    // Truyền token vào header

    //Gọi API để lấy dữ liệu
    try {
      const response = await api.get("books/user/67c1c256b96ee530771ccd90");
      setBooks(response.data.data || []);
    } catch (err) {
      console.log({ err });
      toast.error("Có lỗi khi lấy data từ sever, hãy xem trong console !");
    }
  };

  useEffect(() => {
    handleFetchMyProduct();
  }, []);

  //Hàm xử lý delete product
  const handleDeleteProduct = (idProduct) => {
    api
      .delete("books/" + idProduct, headerConfig(accessToken))
      .then((res) => {
        const responseDataDelete = res.data.data;
        setBooks(books.filter((book) => book._id !== idProduct));
        toast.success(`Xoá thành công product có ID là ${idProduct}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <MenuLeftAccount />

      <div className="col-sm-9">
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="id">ID</td>
                <td className="image">image</td>
                <td className="description">name</td>
                <td className="price">price</td>
                <td className="total">action</td>
              </tr>
            </thead>

            <tbody>
              {books.map((product) => {
                console.log({ product });
                return (
                  <>
                    <tr>
                      <td className="cart_id">{product.id}</td>
                      <td className="cart_product">
                        <img src={product.image} alt="" />
                      </td>
                      <td className="cart_description">
                        <h4>
                          <a href="#">{product.title}</a>
                        </h4>
                      </td>
                      <td className="cart_price">
                        <p>{product.price}$</p>
                      </td>
                      <td className="cart_total">
                        <i
                          class="fa-solid fa-trash"
                          onClick={() => {
                            handleDeleteProduct(product._id);
                          }}
                          style={{
                            display: "inline-block",
                            marginRight: 20,
                            cursor: "pointer",
                          }}
                        ></i>

                        <Link to={"/editProduct/" + product._id}>
                          <i
                            style={{ color: "black" }}
                            class="fa-solid fa-pencil"
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyProduct;
