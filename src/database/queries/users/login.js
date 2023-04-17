const connection = require('../../config');

const login = (userData) => {
  const { email } = userData;
  const sql = {
    text: 'SELECT * FROM users WHERE email=$1;',
    values: [email],
  };
  return connection.query(sql);
};

module.exports = { login };
