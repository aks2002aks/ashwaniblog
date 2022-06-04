const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    tag1: { type: String },
    tag2: { type: String },
    tag3: { type: String },
    content: { type: String },
    code: { type: String },
    codelanguage: { type: String },
    downloadlink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.blog || mongoose.model("blog", BlogSchema);
