import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

function BlogList() {
  const [books, setBooks] = useState([]);

  console.log({ blogs: books });

  useEffect(() => {
    api.get("/books").then((res) => {
      setBooks(res.data.data);
    });
  }, []);

  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          <div className="col-sm-9">
            <div className="blog-post-area">
              <div className="row">
                {books.length > 0 &&
                  books.map((book) => {
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 mb-4"
                        key={book._id}
                      >
                        <div className="single-blog-post card h-100">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="card-img-top"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <div className="post-meta text-muted small">
                              <p>
                                <i className="fa fa-user"></i>{" "}
                                {book.userID
                                  ? book.userID.fullname
                                  : "Unknown Author"}
                              </p>
                              <p>
                                <i className="fa fa-clock-o"></i>{" "}
                                {new Date(book.createdAt).toLocaleDateString()}
                              </p>
                              <p>
                                <i className="fa fa-calendar"></i>{" "}
                                {new Date(book.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Link
                              to={"/blogs/" + book._id}
                              className="btn btn-primary"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="pagination-area">
            <ul className="pagination">
              <li>
                <a href="" className="active">
                  1
                </a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogList;
