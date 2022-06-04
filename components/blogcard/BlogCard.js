import React, { useState } from "react";
import styles from "../../styles/BlogCard.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlogCard({ blogs, success, isadmin }) {
  const [blog, setblog] = useState(blogs);

  const handledelete = async (slug) => {
    if (confirm("Do You Want To Delete, Once Done Cannot Get Back")) {
      const token = localStorage.getItem("token");
      const data = {
        slug,
        token,
      };

      let res = await fetch("api/deleteblogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();

      if (response.success) {
        toast.success("Your Blog has Been deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const newblog = blog.filter((blg) => {
          return blg.slug !== slug;
        });
        setblog(newblog);
      } else {
        toast.error(response.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Declined , Blog Not Deleted", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <main className="container min-vh-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {success &&
        blog.map((item, index) => {
          return (
            <div key={item._id}>
              <article
                className={`${styles.postcard} ${styles.dark} ${
                  index % 4 == 0
                    ? styles.blue
                    : index % 4 == 1
                    ? styles.red
                    : index % 4 == 2
                    ? styles.green
                    : index % 4 == 3
                    ? styles.yellow
                    : styles.blue
                } ${index % 2 == 0 ? "flex-row-reverse" : ``}`}
              >
                <Link href={`/blogposts/${item.slug}`}>
                  <a className={styles.postcard__img_link}>
                    <img
                      className={styles.postcard__img}
                      src={item.imageUrl}
                      alt="Image Title"
                    />
                  </a>
                </Link>
                <div className={`${styles.postcard__text} ${styles.tdark}`}>
                  {isadmin && (
                    <div>
                      <Link href={`/update/${item.slug}`}>
                        <i
                          className="fa-regular fa-pen-to-square fa-lg p-2"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </Link>

                      <i
                        className="fa-solid fa-trash fa-lg p-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handledelete(item.slug)}
                      ></i>
                    </div>
                  )}
                  <Link href={`/blogposts/${item.slug}`}>
                    <h1 className={`${styles.postcard__title} ${styles.blue} `}>
                      <a href="#">{item.title}</a>
                    </h1>
                  </Link>
                  <div
                    className={`${styles.postcard__subtitle} ${styles.small}`}
                  >
                    <time dateTime="2020-05-25 12:00:00">
                      <i className="fas fa-calendar-alt mr-2 mx-2"></i>
                      {item.date}
                    </time>
                  </div>

                  <div className={styles.postcard__bar}></div>
                  {item.subtitle}
                  <div className={styles.postcard__previewtxt}>
                    Description :<div>{item.description}</div>
                  </div>
                  <ul className={styles.postcard__tagbox}>
                    <li className={styles.tag__item}>
                      <i className="fas fa-tag mr-2 mx-2"></i>
                      {item.tag1}
                    </li>
                    <li className={styles.tag__item}>
                      <i className="fas fa-tag mr-2 mx-2"></i>
                      {item.tag2}
                    </li>
                    <li className={styles.tag__item}>
                      <i className="fas fa-tag mr-2 mx-2"></i>
                      {item.tag3}
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          );
        })}
      {!success && (
        <div style={{ height: "100vh" }}>
          {" "}
          <h1 className="text-center text-white p-5">No Data Found</h1>
        </div>
      )}
    </main>
  );
}

export default BlogCard;
