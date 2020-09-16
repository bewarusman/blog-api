const { User } = require("../models");

// services used by controller actions to perform business
// (domain) related logic.

module.exports = {
  // finds an array of users
  find: async function (queryParams) {
    const { filter, skip, limit } = buildParams(queryParams);
    return await User.find(filter).skip(skip).limit(limit);
  },

  // find a specific user based on ID
  findOne: async function (id) {
    return await User.findOne({ _id: id });
  },

  // counts the users - important for pagination
  count: async function (queryParams) {
    const { filter, skip, limit } = buildParams(queryParams);
    return await User.countDocuments(filter).skip(skip).limit(limit);
  },

  // saves a user to database
  save: async function (userData) {
    const user = new User({ ...userData });
    await user.save();
    return user;
  },

  // deletes a user
  delete: async function (id) {
    return await User.findOneAndDelete({ _id: id });
  },

  // updates a users
  update: async function (id, userData) {
    return await User.findOneAndUpdate({ _id: id }, userData);
  },
};

// a helper method to parse the query parameters and
// build filters with pagination properties
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
