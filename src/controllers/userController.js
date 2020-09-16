const { userService } = require("../services");

// user controller to handle the routes

module.exports = {
  // GET /api/users
  find: async function (req, res, next) {
    try {
      const users = await userService.find({ ...req.query });
      res.json(users);
    } catch (error) {
      error.message = "failed to create resource";
      next(error);
    }
  },

  // GET /api/users/:id
  findOne: async function (req, res, next) {
    try {
      const user = await userService.findOne(req.params.id);
      if (user == null) res.status(404).json("not found");
      else res.json(user);
    } catch (error) {
      error.message = "failed to retrieve resource";
      next(error);
    }
  },

  // GET /api/users/count
  count: async function (req, res, next) {
    try {
      const count = await userService.count({ ...req.query });
      res.json(count);
    } catch (error) {
      error.msg = "failed to count resource";
      next(error);
    }
  },

  // POST /api/users
  save: async function (req, res, next) {
    try {
      const user = await userService.save(req.body);
      res.json(user);
    } catch (error) {
      error.msg = "failed to create resource";
      next(error);
    }
  },

  // DELETE /api/users/:id
  delete: async function (req, res, next) {
    try {
      const user = await userService.delete(req.params.id);
      if (user == null) res.status(404).json("not found");
      else res.json("user deleted");
    } catch (error) {
      error.msg = "failed to delete resource";
      next(error);
    }
  },

  // PUT /api/users/:id
  update: async function (req, res, next) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (user == null) res.status(404).json("not found");
      else res.json(user);
    } catch (error) {
      error.message = "failed to update resource";
      next(error);
    }
  },
};
