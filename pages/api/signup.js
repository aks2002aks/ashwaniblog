// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import user from "../../models/Usersmodel";
import connectDB from "../../middleware/mongoose";
const bcrypt = require("bcrypt");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(req.body.password, salt);
      let u = new user({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      await u.save();

      res.status(200).json({ success: true, error: "submitted successfully" });
    } catch (error) {
      response
        .status(500)
        .json({ success: true, error: "Internal Error Occurred" });
    }
  } else {
    res.status(400).json({ error: "not allowed" });
  }
};

export default connectDB(handler);
