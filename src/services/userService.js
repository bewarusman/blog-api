const { User } = require("../models");

module.exports = {
  find: async function (requestParams) {
    const { filter, skip, limit } = buildParams(requestParams);
    if (skip && limit) return await User.find(filter).skip(skip).limit(limit);
    return await User.find(filter);
  },

  findOne: async function (id) {
    return await User.findOne({ _id: id });
  },

  count: async function (requestParams) {
    const { filter, skip, limit } = buildParams(requestParams);
    if (skip && limit)
      return await User.countDocuments(filter).skip(skip).limit(limit);
    return await User.countDocuments(filter);
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

function buildParams(requestParams) {
  const { _page, _limit, firstName, lastName } = requestParams;
  const skip = parseInt(_page);
  const limit = parseInt(_limit);
  const filter = {};
  if (firstName) filter["name.first"] = firstName;
  if (lastName) filter["name.last"] = lastName;
  return { filter, skip, limit };
}
