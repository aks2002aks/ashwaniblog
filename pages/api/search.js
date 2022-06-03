// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Blogs from "../../models/BlogsModel";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  try {
    let blogs = await Blogs.find({$text: {$search: req.body.search}}).sort({"date":-1})
    if(blogs.length>0){
    res.status(200).json({success: true, blogs });
    }else{
        res.status(500).json({success: false, error: "no data found",blogs })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Error Occurred" });
  }
};

export default connectDB(handler);
