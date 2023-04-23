const postRouter = require('express').Router();
const {
  createPostControler, getUsersPosts, getAllUsersPosts, deletePosts, getPostsById, updatePosts,
} = require('../controllers');
const auth = require('../middlewares/auth');

postRouter.get('/allPosts', getAllUsersPosts);
postRouter.use(auth);
postRouter.delete('/post/:id', deletePosts);
postRouter.get('/posts', getUsersPosts);
postRouter.post('/post', createPostControler);
postRouter.put('/post/:id', updatePosts);
postRouter.get('/post/:id', getPostsById);
module.exports = postRouter;
