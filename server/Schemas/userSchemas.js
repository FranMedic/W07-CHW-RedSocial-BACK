const { Joi } = require("express-validation");

const registerRequestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string().optional(),
  }),
};

const loginRequestSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { loginRequestSchema, registerRequestSchema };
