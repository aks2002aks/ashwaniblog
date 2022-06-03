import React from "react";
import styles from "../styles/addblogs.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Adminerror from "../components/error/Adminerror";

const Deleteblogs = ({ isadmin }) => {
  const router = useRouter();
  const [slug, setslug] = useState();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(response.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setslug("");
  };

  const handlechange = (e) => {
    if (e.target.name == "slug") {
      setslug(e.target.value);
    }
  };
  return (
    <div>
      {" "}
      <div
        style={{ backgroundColor: "#18151f", height: "90vh" }}
        className="p-5"
      >
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
        {isadmin && (
          <div className="container">
            <article
              className={`${styles.postcard} ${styles.dark} d-flex justify-content-center p-4`}
            >
              <form onSubmit={handlesubmit}>
                <h1 className="text-center">Delete Blog</h1>
                <div className="mb-3  ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h3>Enter Slug to delete</h3>
                  </label>
                  <input
                    type="text-area"
                    className="form-control input-lg"
                    id="Slug"
                    name="slug"
                    aria-describedby="emailHelp"
                    onChange={handlechange}
                    value={slug}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-secondary">
                    Submit
                  </button>
                </div>
              </form>
            </article>
          </div>
        )}
        {!isadmin && <Adminerror />}
      </div>
    </div>
  );
};

export default Deleteblogs;
