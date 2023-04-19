const userRouter = require('express').Router();

const { userSignUp, userLogin, logout } = require('../controllers');

userRouter.post('/signUp', userSignUp);
userRouter.post('/logIn', userLogin);
userRouter.get('/logout', logout);
module.exports = userRouter;
