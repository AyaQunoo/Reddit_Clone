const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send({ mesg: 'ERROR' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    throw new CustomError('unauthorized', 401);
  }
};
module.exports = auth;
