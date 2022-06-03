import React from "react";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#18151f" }}>
      <footer className="text-center text-white  p-4">
        <hr />
        
        <span className="mx-3">All Rights Owned By Ashwani Kumar Singh</span>
        <div className="py-3">
          <a
            href="https://instagram.com/ashwani_a.k.s?utm_medium=copy_link"
            target="_blank"  rel="noreferrer"
            style={{ color: "orange", textDecoration: "none" }}
            className="p-3"
          >
            <i className="fa-brands fa-instagram fa-2xl m-1 py-2"></i>
          </a>
          <a
            href="https://twitter.com/ASH_KING_GAMING?t=U3NbmDM2xhJpEK7FiQS0hg&s=08"
            target="_blank"  rel="noreferrer"
            style={{ color: "orange", textDecoration: "none" }}
            className="p-3"
          >
            <i className="fa-brands fa-twitter fa-2xl m-1 py-2"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ashwani-kumar-singh"
            target="_blank"  rel="noreferrer"
            style={{ color: "orange", textDecoration: "none" }}
            className="p-3"
          >
            <i className="fa-brands fa-linkedin-in fa-2xl m-1 py-2"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
