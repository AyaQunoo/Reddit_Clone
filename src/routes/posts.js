const postRouter = require('express').Router();
const {
  createPostControler, getUsersPosts, getAllUsersPosts, deletePosts, getPostsById,
} = require('../controllers');
const auth = require('../middlewares/auth');

postRouter.get('/allPosts', getAllUsersPosts);
postRouter.use(auth);
postRouter.delete('/post/:id', deletePosts);
postRouter.get('/posts', getUsersPosts);
postRouter.post('/post', createPostControler);
// postRouter.put('/post/:id', updatePost);
postRouter.get('/post/:id', getPostsById);
module.exports = postRouter;
