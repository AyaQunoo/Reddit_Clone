const connection = require('../config');

const getUserInfo = (username) => {
  const sql = {
    text: 'SELECT posts.title ,posts.id,posts.details,posts.created_at,posts.image_url,users.username,users.email,json_agg(json_build_object(\'comment_id\',comments.user_id,\'comments\',comments.comments,\'username\',users_comment.username,\'created_at\',comments.created_at)) AS comments, SUM(CASE WHEN votes.vote=\'upvote\' THEN 1 WHEN votes.vote=\'downvote\' THEN -1 WHEN  votes.vote=\'none\' THEN 0 ELSE 0 END) AS up_votes FROM posts LEFT JOIN users ON posts.user_id =users.id LEFT JOIN votes ON posts.id =votes.post_id LEFT JOIN comments ON posts.id =comments.post_id LEFT JOIN users AS users_comment ON comments.user_id=users_comment.id WHERE users.username =$1 GROUP BY posts.id,users.username,users.email ORDER BY up_votes DESC ;',
    values: [username],
  };
  return connection.query(sql);
};
module.exports = getUserInfo;
