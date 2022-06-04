import Head from "next/head";
import BlogCard from "../components/blogcard/BlogCard";
import Blogs from "../models/BlogsModel";
import mongoose from "mongoose";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";

const Home = ({ blogs, success, isadmin, username }) => {
  const [token, settoken] = useState();

  const router = useRouter();
  const [search, setsearch] = useState();
  const handlechange = (e) => {
    if (e.target.name == "search") {
      setsearch(e.target.value);
    }
  };
  const captilize = (str1) => {
    const str = str1;
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    router.push(`Search/${search}`);
    setsearch("");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      settoken(token);
    } else {
      settoken("");
    }
  }, [router.query]);
  return (
    <div style={{ backgroundColor: "#18151f" }} className="p-3">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container py-2">
        <div className="text-white text-center fw-bold py-2">
          {username && token && (
            <Typewriter
              options={{
                strings: [`Welcome , ${captilize(username)}`],
                autoStart: true,
                loop: true,
              }}
            />
          )}
        </div>
        <div className="text-center fw-bold py-1" style={{ color: "orange" }}>
          {username && token && (
            <div>
              <u>Fun Facts</u>
              <Typewriter
                options={{
                  strings: [
                    "When I wrote this code, only God and I understood what I did. Now only God knows.",
                    "Copy-and-Paste was programmed by programmers for programmers actually.",
                    "Programming is like sex: One mistake and you have to support it for the rest of your life.",
                    "Algorithm: Word used by programmers when they don’t want to explain what they did.",
                    "99 little bugs in the code. 99 little bugs in the code. Take one down, patch it around. 127 little bugs in the code …",
                    "Q: How different are C and C++? A: 1. Because C — C++ = 1",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              ></Typewriter>
            </div>
          )}
        </div>
        <form onSubmit={handlesubmit} className="d-flex py-5" role="search">
          <input
            className="form-control me-2 dark"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            value={search}
            onChange={handlechange}
          />
          <button
            className="btn btn-outline-success font-weight-bold"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <BlogCard blogs={blogs} success={success} isadmin={isadmin} />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DBNAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    let blogs = await Blogs.find().sort({ createdAt: -1 });

    return {
      props: { success: true, blogs: JSON.parse(JSON.stringify(blogs)) },
    };
  } catch (error) {
    return {
      props: { success: false },
    };
  }
}

export default Home;
