import Head from "next/head";
import BlogCard from "../components/blogcard/BlogCard";
import Blogs from "../models/BlogsModel";
import mongoose from "mongoose";
import { useState } from "react";
import { useRouter } from "next/router";

const Home = ({ blogs, success ,isadmin}) => {
  const router = useRouter();
  const [search, setsearch] = useState();
  const handlechange = (e) => {
    if (e.target.name == "search") {
      setsearch(e.target.value);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    router.push(`Search/${search}`);
    setsearch("");
  };

  return (
    <div style={{ backgroundColor: "#18151f" }} className="p-3">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container py-5">
        <form onSubmit={handlesubmit} className="d-flex" role="search">
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
      <BlogCard blogs={blogs} success={success} isadmin={isadmin}/>
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
