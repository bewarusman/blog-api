const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
