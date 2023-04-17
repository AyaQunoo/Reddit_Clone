// eslint-disable-next-line import/no-extraneous-dependencies
const joi = require('joi');

const signUpSchema = joi.object({
  username: joi.string().min(3).max(20).required()
    .alphanum(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
module.exports = { loginSchema, signUpSchema };
