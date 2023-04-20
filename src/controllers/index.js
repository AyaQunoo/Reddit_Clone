const { userSignUp, userLogin, logout } = require('./user');
const {
  createPostControler, getAllUsersPosts, getPostsById, getUsersPosts, deletePosts,
} = require('./posts');
const { creatComments, getComments, deleteComment } = require('./comments');

module.exports = {
  userSignUp,
  userLogin,
  createPostControler,
  getAllUsersPosts,
  getPostsById,
  getUsersPosts,
  deletePosts,
  creatComments,
  logout,
  getComments,
  deleteComment,
};
