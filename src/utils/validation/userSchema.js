// eslint-disable-next-line import/no-extraneous-dependencies
const joi = require('joi');

const signUpSchema = joi.object({
  username: joi.string().min(2).max(20).required()
    .alphanum(),
  email: joi.string().email().required(),
  password: joi.string().required().regex(/^[a-zA-Z0-9]{5,30}$/),
  confirmedPassword: joi.ref('password'),
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
module.exports = { loginSchema, signUpSchema };
