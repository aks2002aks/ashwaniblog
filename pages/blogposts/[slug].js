import React, { useEffect } from "react";
import styles from "../../styles/Slug.module.css";
import { CopyBlock, tomorrowNight } from "react-code-blocks";
import Blogs from "../../models/BlogsModel";
import mongoose from "mongoose";

const slug = ({ blogs, success }) => {
  return (
    <>
      <div style={{ backgroundColor: "#18151f" }}>
        {success &&
          blogs.map((item) => {
            return (
              <div key={item._id}>
                <div className="container " style={{ paddingTop: "80px" }}>
                  <div className={styles.card}>
                    <div className={styles.card__content}>
                      <div className={`${styles.card__contentleft} px-4`}>
                        <img
                          src={`../${item.codelanguage}.png`}
                          styles="width: 200px;"
                          className={`${styles.image} py-2`}
                        />
                        <div>
                          <h2 className="py-2">{item.title}</h2>
                          <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2 mx-1"></i>
                            {item.date}
                          </time>
                        </div>
                      </div>

                      <div className={styles.card__contentright}>
                        <li style={{ listStyleType: "none" }}>
                          <i className="fas fa-tag mr-2 mx-2"></i>
                          {item.tag1}
                          <i className="fas fa-tag mr-2 mx-2"></i>
                          {item.tag2}
                          <i className="fas fa-tag mr-2 mx-2"></i>
                          {item.tag3}
                        </li>

                        <h3 className="py-3">{item.subtitle}</h3>
                        <h3>{item.description}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center py-4">
                  <img
                    className="img-fluid p-2"
                    width="400"
                    src={item.imageUrl}
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                {item.content && (
                  <div className="p-5 text-white container">
                    <div className="display-4 text-center">
                      <p>Content</p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                )}
                <div
                  className="container p-5"
                  style={{ backgroundColor: "#18151f", color: "white" }}
                >
                  {item.code && (
                    <div>
                      <h3>Code</h3>
                      <CopyBlock
                        text={item.code}
                        language={item.codelanguage}
                        wrapLines
                        theme={tomorrowNight}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="container p-5"
                  style={{ backgroundColor: "#18151f", color: "white" }}
                >
                  {item.downloadlink && (
                    <div>
                      <h5>Downlaod Link: <a
                        href={item.downloadlink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.downloadlink}.pdf
                      </a></h5>
                      
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        {!success && (
          <div style={{ height: "100vh" }}>
            {" "}
            <h1 className="text-center text-white p-5">No Data Found</h1>
          </div>
        )}
      </div>
    </>
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

    let blogs = await Blogs.find({ slug: context.query.slug });
    if (blogs.length > 0) {
      return {
        props: { success: true, blogs: JSON.parse(JSON.stringify(blogs)) }, // will be passed to the page component as props
      };
    } else {
      return {
        props: { success: false, blogs: JSON.parse(JSON.stringify(blogs)) }, // will be passed to the page component as props
      };
    }
  } catch (error) {
    return {
      props: { success: false }, // will be passed to the page component as props
    };
  }
}

export default slug;
