const express = require("express");
const createError = require("http-errors");
const User = require("../models/User");
const {
  validateUserSchema,
  validateLoginSchema,
} = require("../utils/validateUserInput");
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/tokenActions");

const registerUser = async (req, res, next) => {
  try {
    const result = await validateUserSchema.validateAsync({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    const { firstname, lastname, email, password } = result;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw createError.Conflict(`${email} has already been registered`);
    }

    const user = await User.create({ firstname, lastname, email, password });

    res.json({
      status: "Success",
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        accessToken: await signAccessToken(user._id),
        refreshToken: await signRefreshToken(user._id),
      },
    });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await validateLoginSchema.validateAsync({
      email: req.body.email,
      password: req.body.password,
    });

    const { email, password } = result;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError.NotFound(`User not registered`);
    }

    const validPass = await user.matchPassword(password);

    if (!validPass) {
      throw createError.Unauthorized("Invalid Username/Password");
    }

    res.json({
      status: "Success",
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        accessToken: await signAccessToken(user._id),
        refreshToken: await signRefreshToken(user._id),
      },
    });
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest("Invalid Username/Password"));
    }
    next(error);
  }
};

const generateNewTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const user = await verifyRefreshToken(refreshToken);

    const newAccessToken = await signAccessToken(user.id);
    const newRefreshToken = await signRefreshToken(user.id);

    res.json({
      status: "Success",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const protectedRoute = async (req, res, next) => {
  try {
    res.send("protected");
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, generateNewTokens, protectedRoute };
