const mongoose = require("mongoose");

// define schema
// By default, Mongoose adds an _id property to your schemas.
const userSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// add a virtual attribute (id) to the returning JSON
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// create an unique index on name.first and name.last
// to make sure there will be no two users witht the same name
userSchema.index({ "name.first": 1, "name.last": 1 }, { unique: true });

// build model based on the schema
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;
