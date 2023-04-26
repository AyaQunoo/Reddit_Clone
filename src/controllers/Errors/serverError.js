/* eslint-disable no-unused-vars */
const { ValidationError } = require('joi');

const { JsonWebTokenError } = require('jsonwebtoken');
const { CustomError } = require('../../utils');

const serverError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: true,
      data: {
        details: err.details,
      },
    });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(400).json({
      error: true,
      data: {
        message: 'unauthorized!',
      },
    });
  }
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      error: true,
      data: {
        message: err.message,
      },
    });
  }
  res.status(500).json({
    err: true,
    data: {
      message: 'INTERNAL SERVER ERROR!!!',
    },
  });
  console.log(err);
};
module.exports = { serverError };
