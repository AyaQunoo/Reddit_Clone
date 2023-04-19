const router = require('express').Router();

const pagesRoutes = require('./pages');
const userRouter = require('./user');
const postRouter = require('./posts');

router.use(pagesRoutes);
router.use('/users', userRouter);
router.use('/users', postRouter);
module.exports = router;
