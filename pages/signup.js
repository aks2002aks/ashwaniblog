import React from "react";
import Link from "next/link";
import styles from "../styles/login.module.css";
import { useState,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    let res = await fetch("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success) {
      toast.success("Great Your Account has been Created ,Now you can Login", {
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

    setname("");
    setemail("");
    setpassword("");
  };

  const handlechange = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };

  return (
    <div style={{ backgroundColor: "#18151f", color: "white" }}>
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
      <div
        style={{
          height: "100vh",
          background: "linearGradient(#141e30, #243b55)",
        }}
      >
        <div className={`${styles.loginbox} "my-6"`}>
          <h2>Signup</h2>
          <form onSubmit={handlesubmit}>
            <div className="form-group py-2">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                type="text-area"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                placeholder="Enter Name"
                onChange={handlechange}
                value={name}
                name="name"
                required
              />
            </div>
            <div className="form-group py-2">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handlechange}
                value={email}
                name="email"
                autoComplete="username"
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group py-2">
              <label htmlFor="exampleInputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                name="password"
                onChange={handlechange}
                value={password}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="py-2">
              <button type="submit" className="btn btn-link  shadow-none">
                <a className="text-decoration-none" style={{ color: "white" }}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Signup
                </a>
              </button>
            </div>
          </form>

          <p style={{ color: "#03e9f4" }}>
            Already have a account,{" "}
            <Link href="/login">
              <a className="text-decoration-none" style={{ color: "white" }}>
                login.
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
