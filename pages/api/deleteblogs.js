// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Blogs from "../../models/BlogsModel";
import connectDB from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const decode = await jwt.verify(req.body.token, process.env.JWT_TOKEN);
      if (decode.IsAdmin) {
        let b = await Blogs.find({ slug: req.body.slug });
        if (b.length > 0) {
          for (let i = 0; i < b.length; i++) {
            await Blogs.deleteOne({ slug: req.body.slug });
          }
          res.status(200).json({ success: "deleted successfully" });
        } else {
          res.status(200).json({ danger: "Not found" });
        }
      } else {
        res.status(400).json({
          success: true,
          error: "you need to be admin to deleted blog",
        });
      }
    } else {
      res.status(400).json({ error: "not allowed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export default connectDB(handler);
