const commentsRouter = require('express').Router();
const { creatComments, getComments, deleteComment } = require('../controllers');
const auth = require('../middlewares/auth');

commentsRouter.post('/:postId', auth, creatComments);
commentsRouter.get('/:postId', auth, getComments);
commentsRouter.delete('/:commentId', deleteComment);
module.exports = commentsRouter;
