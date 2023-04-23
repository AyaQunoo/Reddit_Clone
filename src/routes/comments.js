const commentsRouter = require('express').Router();
const { creatComments, getComments, deleteComment } = require('../controllers');
const auth = require('../middlewares/auth');

commentsRouter.post('/:postId', auth, creatComments);
commentsRouter.get('/:postId', getComments);
commentsRouter.delete('/:commentId', auth, deleteComment);
module.exports = commentsRouter;
