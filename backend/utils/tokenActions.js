const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../utils/initRedis");

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const signAccessToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.JWT_SECRET_ACCESS,
      { expiresIn: "5m" },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }

        resolve(token);
      }
    );
  });
};

const signRefreshToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.JWT_SECRET_REFRESH,
      { expiresIn: "1y" },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }

        setAsync(id.toString(), token, "EX", 365 * 24 * 60 * 60)
          .then((reply) => {
            console.log({ reply });
            resolve(token);
          })
          .catch((err) => {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          });
      }
    );
  });
};

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, payload) => {
      if (err) {
        console.log(err.message);
        reject(createError.Unauthorized());
      }

      resolve(payload);
    });
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_REFRESH, (err, payload) => {
      if (err) {
        console.log(err.message);
        reject(createError.Unauthorized());
      }

      getAsync(payload.id)
        .then((result) => {
          if (token !== result) {
            return reject(createError.Unauthorized());
          }

          return resolve(payload);
        })
        .catch((err) => {
          console.log(err.message);
          return reject(createError.InternalServerError());
        });
    });
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
