// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Blogs from "../../models/BlogsModel";
import connectDB from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const decode = await jwt.verify(req.body.token, process.env.JWT_TOKEN);
      if (decode.IsAdmin) {
        let b = new Blogs({
          slug: req.body.slug,
          imageUrl: req.body.imageUrl,
          title: req.body.title,
          date: req.body.date,
          subtitle: req.body.subtitle,
          description: req.body.description,
          tag1: req.body.tag1,
          tag2: req.body.tag2,
          tag3: req.body.tag3,
          content: req.body.content,
          code: req.body.code,
          codelanguage: req.body.codelanguage,
          downloadlink: req.body.downloadlink,
        });
        await b.save();
        res
          .status(200)
          .json({ success: true, error: "submitted successfully" });
      } else {
        res
          .status(400)
          .json({ success: true, error: "you need to be admin to add blog" });
      }
    } else {
      res.status(400).json({ success: false, error: "not allowed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default connectDB(handler);
