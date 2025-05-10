import { useEffect, useState } from "react";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Rate from "../blog/Rate.jsx";

function BlogDetail() {
  const params = useParams();

  const navigate = useNavigate(); //hook điều hướng

  const [bookDetail, setBookDetail] = useState(null);

  const [idComment, setIdComment] = useState(0); // khai báo idComment cho phần comment là 0 ( bình luận cha)

  const accessToken = localStorage.getItem("token");
  const getAuthUser = localStorage.getItem("auth"); // Lấy auth của user trên local
  let idUser, nameUser, imageUser; //khai báo thông tin của user
  if (getAuthUser) {
    idUser = JSON.parse(getAuthUser).id;
    nameUser = JSON.parse(getAuthUser).name;
    imageUser = JSON.parse(getAuthUser).avatar;
  }

  // Sử dụng filter để lọc những bình luận cha
  // const parentComent = comments ? comments.filter((filterComment) =>  filterComment.id_comment === 0 ) : []; // nếu có comments thì mới dùng filter
  // console.log({ parentComent });

  // Hàm lấy blog detail và danh sách comment từ API
  const handleFetchDetailBlog = (hasBlogDetail = true) => {
    api
      .get("/books/" + params.id)
      .then((res) => {
        if (hasBlogDetail) {
          setBookDetail(res.data.data);
        }
        if (res.data) {
          // kiểm tra có comment thì mới được set
        } else {
        }
      })

      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    handleFetchDetailBlog();
  }, [params.id]);

  return (
    <>
      <div className="col-sm-9">
        {bookDetail && (
          <>
            <div className="blog-post-area">
              <h2 className="title text-center">Book Details</h2>

              <div className="single-blog-post">
                <h3>{bookDetail.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li>
                      <i className="fa fa-user"></i>{" "}
                      {bookDetail.userID
                        ? bookDetail.userID.fullname
                        : "Unknown Author"}
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i>{" "}
                      {new Date(bookDetail.createdAt).toLocaleDateString()}
                    </li>
                    <li>
                      <i className="fa fa-calendar"></i>{" "}
                      {new Date(bookDetail.updatedAt).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
                <a href="#">
                  <img
                    src={bookDetail.image}
                    alt="Book Cover"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                </a>
                <p>{bookDetail.description}</p>

                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li>
                      <a href="#">Previous</a>
                    </li>
                    <li>
                      <a href="#">Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rating-area">
              <Rate
                user_id={idUser}
                book_id={params.id}
                isLogged={getAuthUser}
                accessToken={accessToken}
              />
              <ul className="tag">
                <li>Categories:</li>
                {bookDetail.categories.map((category, index) => (
                  <li key={index}>
                    <a className="color" href="#">
                      {category}{" "}
                      {index < bookDetail.categories.length - 1 && (
                        <span>/</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="socials-share">
              <a href="#">
                <img src="/images/blog/socials.png" alt="Social Share" />
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default BlogDetail;
