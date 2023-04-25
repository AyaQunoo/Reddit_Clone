const { createComment, getAllcomments, deleteComments } = require('../database/queries/comments');

const creatComments = (req, res) => {
  const data = req.body;
  const { id } = req.user;
  const { postId } = req.params;
  createComment(data, id, postId).then((data) => {
    res.status(200).json({
      error: false,
      message: 'your comment created succesfully',
      data: data.rows,
    });
  });
};
const getComments = (req, res, next) => {
  const { postId } = req.params;
  getAllcomments(postId).then((data) => res.status(200).json(data.rows)).catch((err) => next(err));
};
const deleteComment = (req, res, next) => {
  const { commentId } = req.params;
  deleteComments(commentId).then(() => res.status(200).json({
    error: false,
    message: 'comment has been deleted successfully!!',
  })).catch((err) => next(err));
};
module.exports = { creatComments, getComments, deleteComment };
