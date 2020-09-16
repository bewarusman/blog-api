const { User } = require("../models");

module.exports = {
  find: async function (queryParams) {
    const { filter, skip, limit } = buildParams(queryParams);
    return await User.find(filter).skip(skip).limit(limit);
  },

  findOne: async function (id) {
    return await User.findOne({ _id: id });
  },

  count: async function (queryParams) {
    const { filter, skip, limit } = buildParams(queryParams);
    return await User.countDocuments(filter).skip(skip).limit(limit);
  },

  save: async function (userData) {
    const user = new User({ ...userData });
    await user.save();
    return user;
  },

  delete: async function (id) {
    return await User.findOneAndDelete({ _id: id });
  },

  update: async function (id, userData) {
    return await User.findOneAndUpdate({ _id: id }, userData);
  },
};

function buildParams(queryParams) {
  const { _page, _limit, firstName, lastName } = queryParams;
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
  if (firstName) filter["name.first"] = firstName;
  if (lastName) filter["name.last"] = lastName;
  return { filter, skip, limit };
}

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
