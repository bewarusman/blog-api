const mongoose = require("mongoose");
const { User, Post, Comment } = require("./models");

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// on open connection, query against mongodb
db.once("open", async function () {
  try {
    // create instance based on model
    const john = new User({ name: { first: "John", last: "Doe" } });
    // save instance
    await john.save();

    // another user
    const jane = new User({ name: { first: "Jane", last: "Doe" } });
    await jane.save();

    // a post by user (john)
    const devPostByJohn = new Post({
      title: "Building Express.js Server",
      body:
        "Express is Fast, unopinionated, minimalist web framework for Node.js",
      user: john,
    });
    await devPostByJohn.save();

    // add the post to user.posts so it can be referenced
    john.posts.push(devPostByJohn);
    await john.save();

    // a comment by user (jane)
    const janeComment = new Comment({
      title: "nice post!",
      user: jane,
    });
    devPostByJohn.comments.push(janeComment);
    await devPostByJohn.save();

    // another comment by user (john)
    const johnComment = new Comment({
      title: "thanks",
      user: john,
    });
    devPostByJohn.comments.push(johnComment);
    await devPostByJohn.save();

    // find users
    const users = await User.find().populate("posts");
    console.log(users);

    // find posts
    const posts = await Post.find().populate("user");
    console.log(posts);

    db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
});
