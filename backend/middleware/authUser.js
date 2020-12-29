const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyAccessToken } = require("../utils/tokenActions");
const createError = require("http-errors");

const authUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await verifyAccessToken(token);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      return next(createError.Unauthorized());
    }
  }

  if (!token) {
    console.log("e choke");
    return next(createError.Unauthorized());
  }
};

module.exports = { authUser };
