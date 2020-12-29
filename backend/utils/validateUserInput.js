const Joi = require("joi");

const validateUserSchema = Joi.object().keys({
  firstname: Joi.string().min(1).required(),
  lastname: Joi.string().min(1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required(),
  password: Joi.string().min(6).required(),
});

const validateLoginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required(),
  password: Joi.string().min(6).required(),
});

module.exports = { validateUserSchema, validateLoginSchema };
