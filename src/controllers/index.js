const {
  userSignUp, userLogin, logout, userIfo,
} = require('./user');
const {
  createPostControler, getAllUsersPosts, getPostsById, getUsersPosts, deletePosts,updatePosts
} = require('./posts');
const { creatComments, getComments, deleteComment } = require('./comments');
const { serverError } = require('./Errors/serverError');
const { clientError } = require('./Errors/clientError');
const { upVote, downVote, sumVotes } = require('./votes');

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
  serverError,
  clientError,
  userIfo,
  upVote,
  downVote,
  sumVotes,
  updatePosts,
};
