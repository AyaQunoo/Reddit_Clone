/* eslint-disable camelcase */
const connection = require('../config');

const createComment = (data, user_id, post_id) => {
  const { comment } = data;

  const sql = {
    text: 'INSERT INTO comments (user_id,post_id,comments) VALUES($1,$2,$3) RETURNING comments.comments,comments.created_at,(SELECT username FROM users WHERE users.id = comments.user_id) AS username;',
    values: [user_id, post_id, comment],
  };
  return connection.query(sql);
};
const getAllcomments = (id) => {
  const sql = {
    text: 'SELECT comments.comments,users.username,comments.created_at FROM comments JOIN users ON comments.user_id =users.id WHERE post_id=$1;',
    values: [id],
  };
  return connection.query(sql);
};
const deleteComments = (id) => {
  const sql = {
    text: 'DELETE FROM comments WHERE comments.id=$1;',
    values: [id],
  };
  return connection.query(sql);
};
module.exports = { createComment, getAllcomments, deleteComments };
