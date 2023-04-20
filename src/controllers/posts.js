/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const {
  createPost, getUserPosts, getAllPosts, deletePost, updatePost, getPostById,
} = require('../database/queries/post');

const createPostControler = (req, res, next) => {
  const userPost = req.body;
  const { id } = req.user;
  createPost(userPost, id).then(() => res.status(201).json({
    error: false,
    data: {
      message: 'post created successfully',
    },

  })).catch((err) => {
    next(err);
  });
};
const getUsersPosts = (req, res) => {
  const { id } = req.user;
  getUserPosts(id).then((data) => res.status(200).json(data.rows)).catch((err) => {
    console.log(err);
  });
};
const getAllUsersPosts = (req, res) => {
  getAllPosts().then((data) => res.status(200).json(data.rows));
};
const getPostsById = (req, res) => {
  const data = req.params;
  getPostById(data).status(200).json(data.rows);
};
const deletePosts = (req, res, next) => {
  const { id } = req.params;
  deletePost(id).then(() => res.status(200).json({
    error: false,
    data: {
      message: 'post deleted successfully',
    },
  })).catch((err) => {
    next(err);
  });
};
// const updatePosts = (req, res) => {
//   const { id } = req.params;
//   getPostsById(id).then((data) => data.rows[0]);
// };
module.exports = {
  createPostControler, getUsersPosts, getAllUsersPosts, deletePosts, getPostsById,
};
