const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    IsAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);


export default mongoose.models.user || mongoose.model("user", UserSchema);
