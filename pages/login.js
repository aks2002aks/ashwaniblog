import Link from "next/link";
import React from "react";
import styles from "../styles/login.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    let res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success) {
      localStorage.setItem("token", response.token);
      toast.success("Sucessfully Loged In", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
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

    setemail("");
    setpassword("");
  };

  const handlechange = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };

  return (
    <div style={{ backgroundColor: "#18151f", color: "white" }} className="p-5">
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
          height: "80vh",
          background: "linearGradient(#141e30, #243b55)",
        }}
      >
        <div className={`${styles.tsparticles}`}></div>
        <div className={`${styles.loginbox}`}>
          <h2>Login</h2>
          <form onSubmit={handlesubmit}>
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
              <button type="submit" className="btn btn-link shadow-none">
                <a className="text-decoration-none" style={{ color: "white" }}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Login
                </a>
              </button>
            </div>
          </form>
          <p style={{ color: "#03e9f4" }}>
            Don't have a account,{" "}
            <Link href="/signup">
              <a className="text-decoration-none" style={{ color: "white" }}>
                Signup
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
