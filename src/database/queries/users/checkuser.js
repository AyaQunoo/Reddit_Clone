const connection = require('../../config');

const checkUser = (userData) => {
  const { username } = userData;
  const sql = {
    text: 'SELECT * FROM users WHERE username=$1;',
    values: [username],
  };
  return connection.query(sql);
};

module.exports = { checkUser };
