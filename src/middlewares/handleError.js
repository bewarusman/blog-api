module.exports = (error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    message: error.message || "failed: not known error",
    msg: error.msg,
    stack: error.stack,
  });
};
