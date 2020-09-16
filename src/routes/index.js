const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

// export all routes in an array so we can add it
// in express middleware
// app.use(require("./routes"));
module.exports = [userRoutes, postRoutes];
