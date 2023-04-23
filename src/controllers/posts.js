/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const {
  createPost, getUserPosts, getAllPosts, deletePost, updatePost, getPostById,
} = require('../database/queries/post');
const { CustomError, postSchema, updatePostSchema } = require('../utils');

const createPostControler = (req, res, next) => {
  const { title, details, image_url } = req.body;
  const { id } = req.user;
  postSchema.validateAsync({ title, details, image_url }, { abortEarly: false })
    .then(() => createPost(title, details, image_url, id).then(() => res.status(201).json({
      error: false,
      data: {
        message: 'post created successfully',
      },

    })).catch((err) => {
      next(err);
    }));
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
  const { id } = req.params;
  getPostById(id).then((data) => res.status(200).json(data.rows));
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
const updatePosts = (req, res, next) => {
  const { id } = req.params;
  const { title, details, image_url } = req.body;

  getPostById(id).then((data) => {
    if (data.rowCount === 0) {
      throw new CustomError('post not found', 401);
    }
    return data.rows;
  }).then(() => {
    updatePostSchema.validateAsync({ title, details, image_url }, { abortEarly: false });
  }).then(() => {
    updatePost(title, details, image_url, id).then((data) => {
      console.log(data.rows);
      res.json({
        error: false,
        message: 'post updated successufully',
      });
    });
  })
    .catch((err) => next(err));
};
module.exports = {
  createPostControler, getUsersPosts, getAllUsersPosts, deletePosts, getPostsById, updatePosts,
};
