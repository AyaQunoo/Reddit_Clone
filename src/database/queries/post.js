/* eslint-disable camelcase */
const connection = require('../config');

const createPost = (data, id) => {
  const {
    title, details, image_url,
  } = data;
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
    text: 'SELECT posts.title ,posts.details,posts.created_at,posts.image_url,users.username FROM posts JOIN users ON posts.user_id =users.id; ',
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
const getPostById = (data) => {
  const { id } = data;
  const sql = {
    text: 'SELECT *FROM posts WHERE id=$1',
    values: [id],
  };
  return connection.query(sql);
};

const updatePost = (data, id) => {
  const { title, details, image_url } = data;
  const sql = {
    text: 'UPDATE posts SET title=$1,details=$2,image_url=$3 WHERE posts.id=$4',
    values: [title, details, image_url, id],
  };
  return connection.query(sql);
};
module.exports = {
  createPost, getUserPosts, getAllPosts, deletePost, updatePost, getPostById,
};
