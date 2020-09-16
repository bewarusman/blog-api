const express = require("express"); // fast, open-source node.js server
const cors = require("cors"); // enables CORS (cross-origin resource sharing)
const bodyParser = require("body-parser"); // parses json body into javascript object
const morgan = require("morgan"); // log http requests
const app = express();
const { notFound, handleError } = require("./middlewares");

// third-party middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

// using api routes
app.use("/api", require("./routes"));

// handle errors
app.use(notFound); // in-case a url path is not found
app.use(handleError); // in-case an error has occured

module.exports = app;
