const router = require('express').Router();

const pagesRoutes = require('./pages');
const userRouter = require('./user');

router.use(pagesRoutes);
router.use(userRouter);

module.exports = router;
