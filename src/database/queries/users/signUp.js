const connection = require('../../config');

const signUp = (userData) => {
  const { username, password, email } = userData;
  const sql = {
    text: 'INSERT INTO users(username,email,password)VALUES ($1,$2,$3);',
    values: [username, email, password],
  };
  return connection.query(sql);
};
module.exports = { signUp };
