const { Post } = require("../models");

module.exports = {
  find: async function (queryParams) {
    const { filter, skip, limit } = buildParams(queryParams);
    return await Post.find(filter)
      .populate("comments.user")
      .skip(skip)
      .limit(limit);
  },

  findOne: (id) => Post.findOne({ _id: id }),

  count: async (queryParams) => {
    const { filter, skip, limit } = buildParams(queryParams);
    return await Post.countDocuments(filter).skip(skip).limit(limit);
  },

  save: async function (postData) {
    const post = new Post({ ...postData }).populate("comments.user");
    await post.save();
    return post;
  },

  delete: (id) => Post.findOneAndDelete({ _id: id }),

  update: (id, postData) =>
    Post.findOneAndUpdate({ _id: id }, postData).populate("comments.user"),

  saveComment: async (id, commentData) => {
    const post = await Post.findOne({ _id: id }).populate("comments.user");
    post.comments.push(commentData);
    await post.save();
    return post;
  },

  deleteComment: async ({ postId, commentId }) => {
    const post = await Post.findOne({ _id: postId }).populate("comments.user");
    post.comments.pull(commentId); // equivilant to: post.comments.id(commentId).remove();
    await post.save();
    return post;
  },
};

function buildParams(queryParams) {
  const { _page, _limit, title } = queryParams;
  const page = parseInt(_page);
  const limit = parseInt(_limit);
  if (limit < 0) {
    limit = 0;
  }
  if (page < 0) {
    page = 0;
  }
  const skip = page * limit;
  const filter = {};
  if (title) filter["title"] = title;
  return { filter, skip, limit };
}
