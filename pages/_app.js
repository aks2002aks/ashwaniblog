import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/navbar/Nav";
import Head from "next/head";
import Script from "next/script";

import Footer from "../components/footer/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
var jwt = require("jsonwebtoken");

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setuser] = useState({ value: null });
  const [isadmin, setisadmin] = useState(false);
  const [key, setkey] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        setisadmin(decode.IsAdmin);
        setuser({ value: token });
        setkey(Math.random());
      } catch (err) {
        logout();
        setisadmin(false);
        setkey(Math.random());
      }
    }
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
    setuser({ value: null });
    setkey(Math.random());
    setisadmin(false);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ashwani Blog</title>
      </Head>
      <LoadingBar
        color="orange"
        progress={progress}
        waitingTime={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar key={key} user={user} logout={logout} isadmin={isadmin} />

      <Component {...pageProps} isadmin={isadmin} />

      <Footer />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
        crossorigin="anonymous"
      ></Script>
      <Script
        src="https://kit.fontawesome.com/b77f9cd16e.js"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}

export default MyApp;
