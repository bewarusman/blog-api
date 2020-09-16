const { postService } = require("../services");

module.exports = {
  // GET /api/posts
  find: async function (req, res, next) {
    try {
      const posts = await postService.find({ ...req.query });
      res.json(posts);
    } catch (error) {
      error.msg = "failed to create resource";
      next(error);
    }
  },

  // GET /api/posts/:id
  findOne: async function (req, res, next) {
    try {
      const post = await postService.findOne(req.params.id);
      if (post == null) res.status(404).json("not found");
      else res.json(post);
    } catch (error) {
      error.msg = "failed to retrieve resource";
      next(error);
    }
  },

  // GET /api/posts/count
  count: async function (req, res, next) {
    try {
      const count = await postService.count({ ...req.query });
      res.json(count);
    } catch (error) {
      error.msg = "failed to count resource";
      next(error);
    }
  },

  // POST /api/posts
  save: async function (req, res, next) {
    try {
      const post = await postService.save(req.body);
      res.json(post);
    } catch (error) {
      error.msg = "failed to create resource";
      next(error);
    }
  },

  // DELETE /api/posts/:id
  delete: async function (req, res, next) {
    try {
      const post = await postService.delete(req.params.id);
      if (post == null) res.status(404).json("not found");
      else res.json("post deleted");
    } catch (error) {
      error.msg = "failed to delete resource";
      next(error);
    }
  },

  // PUT /api/posts/:id
  update: async function (req, res, next) {
    try {
      const post = await postService.update(req.params.id, req.body);
      if (post == null) res.status(404).json("not found");
      else res.json(post);
    } catch (error) {
      error.msg = "failed to update resource";
      next(error);
    }
  },

  // POST /api/posts/:id/comments
  saveComment: async function (req, res, next) {
    try {
      const post = await postService.saveComment(req.params.id, req.body);
      if (post == null) res.status(404).json("not found");
      else res.json(post);
    } catch (error) {
      error.msg = "failed to create resource";
      next(error);
    }
  },

  deleteComment: async function (req, res, next) {
    try {
      const post = await postService.deleteComment(req.params);
      if (post == null) res.status(404).json("not found");
      else res.json(post);
    } catch (error) {
      error.msg = "failed to delete resource";
      next(error);
    }
  },
};
