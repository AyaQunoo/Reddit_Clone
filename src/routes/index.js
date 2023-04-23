const router = require('express').Router();

const pagesRoutes = require('./pages');
const userRouter = require('./user');
const postRouter = require('./posts');
const commentsRouter = require('./comments');
const profilesRouter = require('./profiles');
const routerVote = require('./votes');

router.use(pagesRoutes);
router.use('/users', routerVote);
router.use('/users', userRouter);
router.use('/users', postRouter);
router.use('/users', commentsRouter);
router.use('/users', profilesRouter);

module.exports = router;
