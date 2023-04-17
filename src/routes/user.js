const userRouter = require('express').Router();

const { userSignUp, userLogin } = require('../controllers');

const auth = require('../middlewares/auth');

userRouter.post('/signUp', auth, userSignUp);
userRouter.post('/logIn', auth, userLogin);
module.exports = userRouter;
