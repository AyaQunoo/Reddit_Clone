/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUp, login } = require('../database/queries/users');

const { signUpSchema, loginSchema } = require('../utils');

const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = signUpSchema.validate({ username, email, password }, { abortEarly: false });
  if (error) {
    res.status(400).json({
      error: true,
      data: {
        errors: error.details,
      },
    });
    return;
  }
  const result = await login({ email });
  // console.log(result);
  if (result.rowCount) {
    res.status(400).json({
      error: true,
      data: {
        errors: 'email is already exists',
      },
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    signUp({ username, password: hashedPassword, email }).then(() => res.status(201).json({
      error: false,
      data: {
        data: 'yooour account created successfully',
      },
    })).catch(console.log);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password }, { abortEarly: false });
  console.log(error);
  const result = await login({ email });
  // console.log(result);
  if (!result.rowCount) {
    res.status(400).json({
      error: true,
      data: {
        errors: 'user does not exist!please create an account',
      },
    });
  } else {
    const ismatched = await bcrypt.compare(password, result.rows[0].password);
    if (ismatched) {
      const token = await jwt.sign({
        username: result.rows[0].username,
      }, process.env.SECRET_KEY);
      res.cookie('token', token).json({ mesg: 'succes' });
    } else {
      res.json({ mesg: 'wrong password' });
    }
  }
};
module.exports = { userSignUp, userLogin };
