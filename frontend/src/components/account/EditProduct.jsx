import MenuLeftAccount from "./MenuLeftAccount";
import Errors from "../authentication/Errors";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { api, headerConfig, urlImage } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const auth = localStorage.getItem("auth");
  const inputFile = useRef(null);
  const accessToken = localStorage.getItem("token");
  const params = useParams();
  const [_id, set_id] = useState(params.id);
  const navigate = useNavigate();

  const [error, setError] = useState({});

  const [image, setImage] = useState(null); // Lưu file ảnh của product đã được đăng trước đó '

  //todo:implement auth/just delete it
  // useEffect(() => {
  //   if (auth) {
  //     const getID = JSON.parse(auth).id;
  //     setIdUser(getID);
  //   }
  // }, [auth]);

  const [productEdit, setProductEdit] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    categories: "",
    stock: 0,
  });
  console.log({ productEdit });

  //Hàm xử lý lấy dữ liệu product từ API về
  const fetchEditingBook = () => {
    console.log(params.id);
    if (params.id) {
      api
        .get("books/" + params.id)
        .then((res) => {
          const getDataApi = res.data.data;
          console.log({ getDataApi });
          //   set dữ liệu cũ từ local vào sate để render ra các ô input
          if (getDataApi) {
            setProductEdit({
              title: getDataApi.title,
              author: getDataApi.author,
              description: getDataApi.description,
              price: getDataApi.price,
              categories: getDataApi.categories,
              stock: getDataApi.stock,
            });
            set_id(getDataApi._id);
            if (getDataApi.image) {
              setImage(JSON.parse(getDataApi.image)); //set all image product của user đó
            }
          }
        })

        .catch((err) => {
          toast.error(err);
        });
    }
  };

  useEffect(() => {
    fetchEditingBook();
  }, []);

  // Hàm xử lý khi các trường input và select thay đổi
  const handleEditProductChange = (e) => {
    const { name, value } = e.target;

    setProductEdit((prev) => {
      const updateProduct = {
        ...prev,
        [name]: value,
      };

      //Kiểm tra nếu status = 1 thì sẽ đưa sale về ""
      if (name === "status" && value === "1") {
        updateProduct.sale = "";
      }

      return updateProduct;
    });
  };

  //Hàm xử lý khi trường nhập ảnh thay đổi
  const handleFileAvatar = (e) => {
    setImage(e.target.files[0]);
  };

  //Hàm xử lý khi user submit form edit

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let dataError = {};
    let flag = true;

    if (!flag) {
      setError(dataError);
      return;
    } else {
      dataError = null;
      setError({});

      const formData = new FormData();
      formData.append("title", productEdit.title);
      formData.append("author", productEdit.author);
      formData.append("userID", "67c1c256b96ee530771ccd90");

      formData.append("image", image);

      formData.append("detail", productEdit.description);
      formData.append("price", productEdit.price);
      formData.append("categories", productEdit.categories);
      formData.append("stock", productEdit.stock);

      // Log formData ra để kiểm tra coi đã nhận được dữ liệu hay chưa
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Gọi API để POST
      api
        .put(
          "books/" + params.id,
          formData
          //, config
        )
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            const checkOke = res.data.data;
            console.log({ checkOke });
            toast.success("Edit product thành công !");
            setTimeout(() => {
              navigate("/myProduct"); // Chuyển hướng qua my product ngay sau khi edit thành công
            }, 1000);
          }
        })

        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <>
      <MenuLeftAccount />
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Edit product</h2>
          <div className="signup-form">
            <h2>Edit the product</h2>

            <form onSubmit={handleSubmitEdit} enctype="multipart/form-data">
              {/* Name */}
              <div>Book ID</div>
              <input
                type="text"
                name="_id"
                value={_id}
                onChange={handleEditProductChange}
                placeholder="Product ID"
                readOnly
              />
              <div>Title</div>
              <input
                type="text"
                name="title"
                value={productEdit.title}
                onChange={handleEditProductChange}
                placeholder="Title"
              />

              {/* Author */}
              <div>Author</div>
              <input
                type="text"
                name="author"
                value={productEdit.author}
                onChange={handleEditProductChange}
                placeholder="Author"
              />

              {/* Chọn image */}
              <div>Image</div>
              <input
                type="file"
                onChange={handleFileAvatar}
                name="image"
                ref={inputFile}
              />

              {/* Description */}
              <div>Description</div>
              <textarea
                id="comment-detail"
                name="description"
                value={productEdit.description}
                onChange={handleEditProductChange}
                placeholder="Nhập nội dung detai ..."
              ></textarea>

              {/*Price */}
              <div>Price</div>
              <input
                type="number"
                name="price"
                value={productEdit.price}
                onChange={handleEditProductChange}
                placeholder="Price"
              />

              {/* Categories */}
              <div>Categories</div>
              <input
                type="text"
                name="categories"
                value={productEdit.categories}
                onChange={handleEditProductChange}
                placeholder="Categories, splitted by a comma"
              />

              {/*Stock */}
              <div>Stock</div>
              <input
                type="number"
                name="stock"
                value={productEdit.stock}
                onChange={handleEditProductChange}
                placeholder="Stock"
              />

              <Errors errors={error} />

              <button type="submit" class="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProduct;
