/* eslint-disable no-shadow */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');

const { signUp, login, checkUser } = require('../database/queries/users');
const getUserInfo = require('../database/queries/profiles');

const {
  signUpSchema, loginSchema, signToken, CustomError,
} = require('../utils');

const userSignUp = (req, res, next) => {
  const {
    username, email, password, confirmedPassword,
  } = req.body;

  signUpSchema.validateAsync({
    username, email, password, confirmedPassword,
  }, { abortEarly: false }).then(() => checkUser({ username })).then((result) => {
    if (result.rowCount) {
      throw new CustomError('username is already Exists', 400);
    } else {
      return bcrypt.hash(password, 10);
    }
  }).then(() => login({ email }))
    .then((result) => {
      if (result.rowCount) {
        throw new CustomError('email is already exists', 400);
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => ({ username, email, password: hash }))
    .then((data) => signUp(data))
    .then((data) => data.rows[0])
    .then((data) => {
      req.user = data;
      return signToken(data, { expiresIn: '1d' });
    })
    .then((token) => {
      res.cookie('token', token).json({
        error: false,
        data: {
          message: 'succes',
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  loginSchema.validateAsync({ email, password }, { abortEarly: false }).then(() => login({ email })).then((result) => {
    if (!result.rowCount) {
      throw new CustomError('user does not exist!please create an account', 400);
    } else {
      return result.rows[0];
    }
  }).then((data) => {
    req.user = data;
    return bcrypt.compare(password, data.password);
  })
    .then((ismatched) => {
      if (!ismatched) {
        throw new CustomError('wrong password', 400);
      }
    })
    .then(() => {
      const { id, username, email } = req.user;
      return signToken({ id, username, email }, { expiresIn: '1d' });
    })
    .then((token) => {
      res.cookie('token', token).json({
        error: false,
        data: {
          message: 'succes',
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};
const logout = (req, res, next) => {
  res.clearCookie('token').redirect('/').catch((err) => next(err));
};
const userIfo = (req, res) => {
  const { id } = req.params;
  getUserInfo(id).then((data) => res.status(200).json(data.rows)).catch((err) => {
    console.log(err);
  });
};
module.exports = {
  userSignUp, userLogin, logout, userIfo,
};
