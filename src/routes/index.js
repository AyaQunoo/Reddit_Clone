const router = require('express').Router();

const pagesRoutes = require('./pages');
const userRouter = require('./user');
const postRouter = require('./posts');
const commentsRouter = require('./comments');

router.use(pagesRoutes);
router.use('/users', userRouter);
router.use('/users', postRouter);
router.use('/users', commentsRouter);
module.exports = router;
