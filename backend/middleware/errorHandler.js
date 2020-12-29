const createError = require("http-errors");

const notFound = async (req, res, next) => {
  next(createError.NotFound());
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: "Fail",
    message: err.message,
  });
  // res.send({
  //   error: {
  //     status: err.status || 500,
  //     message: err.message,
  //   },
  // });
};

module.exports = { notFound, errorHandler };
