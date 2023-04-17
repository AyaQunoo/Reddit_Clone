const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send({ mesg: 'ERROR' });
      } else {
        next();
      }
    });
  }
};
module.exports = auth;
