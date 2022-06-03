// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import user from "../../models/Usersmodel";
import connectDB from "../../middleware/mongoose";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let u = await user.findOne({ email: req.body.email });

      if (u) {
        let result = await bcrypt.compare(req.body.password, u.password);
        if (result) {
          var token = jwt.sign(
            { name: u.name, email: u.email, IsAdmin: u.IsAdmin },
            process.env.JWT_TOKEN,
            { expiresIn: "2d" }
          );
          res.status(200).json({ success: true, token });
        } else {
          res
            .status(400)
            .json({ success: false, error: "Invalid Credentials" });
        }
      } else {
        res
          .status(400)
          .json({ success: false, error: "No User found , Please Signup" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Internal Error Occurred" });
    }
  } else {
    res.status(400).json({ error: "not allowed" });
  }
};

export default connectDB(handler);
