// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Blogs from "../../models/BlogsModel";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  try {
    let blogs = await Blogs.find({ slug: req.body.slug });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Error Occurred" });
  }
};

export default connectDB(handler);
