const mongoose = require("mongoose");
const { Comment } = require("./Comment");

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = {
  User: require("./User"),
  Post: require("./Post"),
  Comment,
};
