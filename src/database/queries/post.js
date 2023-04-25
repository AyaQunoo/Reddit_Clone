/* eslint-disable camelcase */
const connection = require('../config');

const createPost = (title, details, image_url, id) => {
  console.log(image_url, 'kskks');
  const sql = {
    text: 'INSERT INTO posts(user_id,title,details,image_url) VALUES($1,$2,$3,$4)',
    values: [id, title, details, image_url],
  };
  return connection.query(sql);
};
const getUserPosts = (id) => {
  const sql = {
    text: 'SELECT * FROM posts WHERE user_id=$1',
    values: [id],
  };
  return connection.query(sql);
};
const getAllPosts = () => {
  const sql = {
    text: 'SELECT posts.title ,posts.id,posts.details,posts.created_at,posts.image_url,users.username,json_agg(json_build_object(\'comment_id\',comments.user_id,\'comment\',comments.comments,\'commenter\',users_comment.username,\'creted_at\',comments.created_at)) AS comments,SUM(CASE WHEN votes.vote=\'upvote\' THEN 1 WHEN votes.vote=\'downvote\' THEN -1 WHEN  votes.vote=\'none\' THEN 0 ELSE 0 END) AS up_votes FROM posts LEFT JOIN users ON posts.user_id =users.id LEFT JOIN votes ON posts.id =votes.post_id LEFT JOIN comments ON posts.id =comments.post_id LEFT JOIN users AS users_comment ON comments.user_id=users_comment.id GROUP BY posts.id,users.username ORDER BY up_votes DESC;',
  };
  return connection.query(sql);
};
const deletePost = (id) => {
  const sql = {
    text: 'DELETE FROM posts WHERE posts.id=$1 RETURNING id',
    values: [id],
  };
  return connection.query(sql);
};
const getPostById = (id) => {
  const sql = {
    text: 'SELECT *FROM posts WHERE id=$1',
    values: [id],
  };
  return connection.query(sql);
};

const updatePost = (title, details, image_url, id) => {
  const sql = {
    text: 'UPDATE posts SET title=$1,details=$2,image_url=$3 WHERE posts.id=$4 RETURNING *',
    values: [title, details, image_url, id],
  };
  return connection.query(sql);
};
module.exports = {
  createPost, getUserPosts, getAllPosts, deletePost, updatePost, getPostById,
};
