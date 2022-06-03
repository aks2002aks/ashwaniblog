import React from "react";
import Link from "next/link";
import Image from "next/image";

function Nav({ user, isadmin, logout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img
              src="https://icon-library.com/images/coding-icon/coding-icon-16.jpg"
              alt=""
              width="70"
              height="50"
            />
          </a>

          <Link className="" href="/">
            <p
              className="fw-bold text-center"
              style={{
                color: "orange",
                fontSize: "20px",
                cursor: "pointer",
                paddingTop: "12px",
              }}
            >
              &lt;Coder's Blog&#47;&gt;
            </p>
          </Link>

          <div>
            <li className="nav-item dropdown">
              <a
                className=" dropdown-toggle "
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ paddingRight: "5px" }}
              >
                <Image src="/userlogo.png" width={50} height={50}></Image>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ backgroundColor: "rgb(33,37,41)", minWidth: "100px" }}
              >
                {!user.value && (
                  <li className="nav-item  text-center p-2">
                    <Link className="" href="/login">
                      <a style={{ color: "orange", textDecoration: "none" }}>
                        Login
                      </a>
                    </Link>
                  </li>
                )}
                {!user.value && (
                  <li className="nav-item  text-center p-2">
                    <Link className="" href="/signup">
                      <a style={{ color: "orange", textDecoration: "none" }}>
                        Signup
                      </a>
                    </Link>
                  </li>
                )}

                {user.value && isadmin && (
                  <li className="nav-item  text-center p-2">
                    <Link className="" href="/addblogs">
                      <a style={{ color: "orange", textDecoration: "none" }}>
                        Add Blog
                      </a>
                    </Link>
                  </li>
                )}
                {user.value && isadmin && (
                  <li className="nav-item  text-center p-2">
                    <Link className="" href="/deleteblogs">
                      <a style={{ color: "orange", textDecoration: "none" }}>
                        Delete Blog
                      </a>
                    </Link>
                  </li>
                )}
                {user.value && (
                  <li className="nav-item  text-center p-2">
                    <a
                      style={{
                        color: "orange",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
