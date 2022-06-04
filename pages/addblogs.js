import React from "react";
import styles from "../styles/addblogs.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Adminerror from "../components/error/Adminerror";

const Addblogs = ({ isadmin }) => {
  const router = useRouter();
  const [slug, setslug] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [title, settitle] = useState();
  const [date, setdate] = useState();
  const [subtitle, setsubtitle] = useState();
  const [description, setdescription] = useState();
  const [tag1, settag1] = useState();
  const [tag2, settag2] = useState();
  const [tag3, settag3] = useState();
  const [content, setcontent] = useState();
  const [code, setcode] = useState();
  const [codelanguage, setcodelanguage] = useState();
  const [downloadlink, setdownloadlink] = useState();
 
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const handlesubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const data = {
      slug,
      imageUrl,
      title,
      date,
      subtitle,
      description,
      tag1,
      tag2,
      tag3,
      content,
      code,
      codelanguage,
      token,
      downloadlink,
    };

    let res = await fetch("api/addblogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success) {
      toast.success("Your Blog has Been Added", {
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
    setimageUrl("");
    settitle("");
    setdate("");
    setsubtitle("");
    setdescription("");
    settag1("");
    settag2("");
    settag3("");
    setcontent("");
    setcode("");
    setcodelanguage("");
    setdownloadlink("");
  };

  const handlechange = (e) => {
    if (e.target.name == "slug") {
      setslug(e.target.value);
    } else if (e.target.name == "imageUrl") {
      setimageUrl(e.target.value);
    } else if (e.target.name == "title") {
      settitle(e.target.value);
    } else if (e.target.name == "date") {
      setdate(e.target.value);
    } else if (e.target.name == "subtitle") {
      setsubtitle(e.target.value);
    } else if (e.target.name == "description") {
      setdescription(e.target.value);
    } else if (e.target.name == "tag1") {
      settag1(e.target.value);
    } else if (e.target.name == "tag2") {
      settag2(e.target.value);
    } else if (e.target.name == "tag3") {
      settag3(e.target.value);
    } else if (e.target.name == "content") {
      setcontent(e.target.value);
    } else if (e.target.name == "code") {
      setcode(e.target.value);
    } else if (e.target.name == "codelanguage") {
      setcodelanguage(e.target.value);
    }else if (e.target.name == "downloadlink") {
      setdownloadlink(e.target.value);
    }
  };

  return (
    <div style={{ backgroundColor: "#18151f" }} className="p-3">
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
              <h1 className="text-center">ADD BLOG</h1>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Slug
                </label>

                <input
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="Slug"
                  name="slug"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={slug}
                />

                <div id="emailHelp" className="form-text">
                  Note: Slug must be unique
                </div>
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Image url
                </label>
                <input
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="Imageurl"
                  name="imageUrl"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={imageUrl}
                />
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={title}
                />
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Subtitle
                </label>
                <input
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="subtitle"
                  name="subtitle"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={subtitle}
                />
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Date
                </label>
                <input
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="date"
                  name="date"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={date}
                />

                <div id="emailHelp" className="form-text">
                  Date format : mm/dd/yyyy
                </div>
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Description
                </label>
                <textarea
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="description"
                  name="description"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={description}
                  rows="3"
                />
              </div>
              <div className="mb-3  ">
                <div className="row">
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Tag1
                    </label>
                    <input
                      type="text-area"
                      className="form-control opacity-25 input-lg"
                      id="tag1"
                      name="tag1"
                      aria-describedby="emailHelp"
                      onChange={handlechange}
                      value={tag1}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Tag2
                    </label>
                    <input
                      type="text-area"
                      className="form-control opacity-25 input-lg"
                      id="tag2"
                      name="tag2"
                      aria-describedby="emailHelp"
                      onChange={handlechange}
                      value={tag2}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3  ">
                <div className="row">
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Tag3
                    </label>
                    <input
                      type="text-area"
                      className="form-control opacity-25 input-lg"
                      id="tag3"
                      name="tag3"
                      aria-describedby="emailHelp"
                      onChange={handlechange}
                      value={tag3}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Code Language
                    </label>
                    <input
                      type="text-area"
                      className="form-control opacity-25 input-lg"
                      id="codelanguage"
                      name="codelanguage"
                      aria-describedby="emailHelp"
                      onChange={handlechange}
                      value={codelanguage}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Content
                </label>
                <textarea
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="content"
                  name="content"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  rows="8"
                  value={content}
                />
                <div id="emailHelp" className="form-text ">
                  <li>
                    <a
                      className="text-decoration-none text-white"
                      href="https://wordhtml.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      link to convert docs to html
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-decoration-none text-white"
                      href="https://www.freeformatter.com/json-escape.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      link to format coverted docs to html
                    </a>
                  </li>
                </div>
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Code
                </label>
                <textarea
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="code"
                  name="code"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  rows="8"
                  value={code}
                />
              </div>
              <div className="mb-3  ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Download Link
                </label>
                <input
                  type="text-area"
                  className="form-control opacity-25 input-lg"
                  id="downloadlink"
                  name="downloadlink"
                  aria-describedby="emailHelp"
                  onChange={handlechange}
                  value={downloadlink}
                />
                <div id="emailHelp" className="form-text">
                  must be pdf link
                </div>
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
  );
};

export default Addblogs;
