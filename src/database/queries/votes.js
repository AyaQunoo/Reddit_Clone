/* eslint-disable camelcase */
const connection = require('../config');

const checkVote = (id, post_id) => {
  const sql = {
    text: 'SELECT * FROM votes WHERE user_id=$1 AND post_id=$2;',
    values: [id, post_id],
  };
  return connection.query(sql);
};
const updateVote = (vote, id, post_id) => {
  const sql = {
    text: 'UPDATE votes SET vote=$1 WHERE user_id=$2 AND post_id=$3',
    values: [vote, id, post_id],
  };
  return connection.query(sql);
};
const addVote = (id, post_id, vote) => {
  const sql = {
    text: 'INSERT INTO votes (user_id,post_id,vote)VALUES($1,$2,$3);',
    values: [id, post_id, vote],
  };
  return connection.query(sql);
};
const allVotes = (post_id) => {
  const sql = {
    text: 'SELECT SUM(CASE WHEN vote = \'upvote\' THEN 1 WHEN vote = \'downvote\' THEN -1 WHEN vote = \'none\' THEN 0 END) AS all_votes FROM votes WHERE post_id = $1;',
    values: [post_id],
  };
  return connection.query(sql);
};
module.exports = {
  allVotes, addVote, updateVote, checkVote,
};
