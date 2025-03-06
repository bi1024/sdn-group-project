import { useEffect, useRef, useState } from "react";
import MenuLeftAccount from "./MenuLeftAccount";
import { api } from "../../api";
import Errors from "../authentication/Errors";
import { toast } from "react-toastify";
function AddProduct() {
  const [addProduct, setAddProduct] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    categories: "",
    stock: 0,
  });
  const inputFile = useRef(null);

  const [error, setError] = useState({});
  const [image, setImage] = useState(null); // lưu các file ảnh được add vào product

  const accessToken = localStorage.getItem("token"); // Lấy token

  //Hàm xử lý file avatar
  const handleFileAvatar = (e) => {
    // const files = Array.from(e.target.files); // Hàm Array.from() được sử dụng để tạo một mảng từ một đối tượng giống mảng

    setImage(e.target.files[0]);
    // if (files.length > 0) {
    //   setImage((prev) => [...prev, ...files]);
    // }
  };

  //Hàm xử lý khi các trường trong form input có sự thay đổi
  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //clearinput function
  const clearInput = () => {
    setAddProduct({
      title: "",
      author: "",
      description: "",
      price: 0,
      categories: "",
      stock: 0,
    });
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  // Hàm xử lý khi người dùng bấm submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    let dataError = {};
    let flag = true;

    // Chỉ được up lên 3 file
    // if (image.length > 3) {
    //   dataError.lengthFile = "Chỉ được up tối đa 3 file!";
    //   flag = false;
    // }

    //Check định dạng hình ảnh
    // image.map((avatarChildren) => {
    //   if (avatarChildren) {
    //     const { type, size } = avatarChildren;

    //     if (!type.includes("image")) {
    //       dataError.avatarType = "Vui lòng chọn đúng định dạng hình ảnh!";
    //       flag = false;
    //     } else if (size > 1024 * 1024) {
    //       dataError.avatarSize = "Vui lòng chọn hình ảnh nhỏ hơn 1MB!";
    //       flag = false;
    //     }
    //   }
    // });

    if (!flag) {
      setError(dataError);
      return;
    } else {
      dataError = null;
      setError({});

      //todo Reenable if has accesstoken
      // if (!accessToken) {
      //   toast.error("Token không tồn tại !");
      //   return;
      // }

      //todo Reenable if has accesstoken
      // Truyền token vào header
      // let config = {
      //   headers: {
      //     Authorization: "Bearer " + accessToken,
      //     "Content-Type": "multipart/form-data",
      //     Accept: "application/json",
      //   },
      // };

      const formData = new FormData();
      formData.append("title", addProduct.title);
      formData.append("author", addProduct.author);
      formData.append("userID", "67c1c256b96ee530771ccd90");

      formData.append("image", image);

      formData.append("detail", addProduct.description);
      formData.append("price", addProduct.price);
      formData.append("categories", addProduct.categories);
      formData.append("stock", addProduct.stock);

      // image.map((valueFile) => {
      //   formData.append("file[]", valueFile);
      // });

      // Log formData ra để kiểm tra coi đã nhận được dữ liệu hay chưa
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Gọi API để POST
      api
        .post(
          "books",
          formData
          //, config
        )
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            const checkOke = res.data.data;
            console.log({ checkOke });
            toast.success("Tạo product thành công !");
            clearInput();
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
          <h2 className="title text-center">Add product</h2>
          <div className="signup-form">
            <h2>Create new product</h2>
            <form onSubmit={handleSubmitForm} enctype="multipart/form-data">
              {/* Name */}
              <div>Title</div>
              <input
                type="text"
                name="title"
                value={addProduct.title}
                onChange={handleAddProductChange}
                placeholder="Title"
              />

              {/* Author */}
              <div>Author</div>
              <input
                type="text"
                name="author"
                value={addProduct.author}
                onChange={handleAddProductChange}
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
                value={addProduct.description}
                onChange={handleAddProductChange}
                placeholder="Nhập nội dung detai ..."
              ></textarea>

              {/*Price */}
              <div>Price</div>
              <input
                type="number"
                name="price"
                value={addProduct.price}
                onChange={handleAddProductChange}
                placeholder="Price"
              />

              {/* Categories */}
              <div>Categories</div>
              <input
                type="text"
                name="categories"
                value={addProduct.categories}
                onChange={handleAddProductChange}
                placeholder="Categories, splitted by a comma"
              />

              {/*Stock */}
              <div>Stock</div>
              <input
                type="number"
                name="stock"
                value={addProduct.stock}
                onChange={handleAddProductChange}
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
export default AddProduct;
