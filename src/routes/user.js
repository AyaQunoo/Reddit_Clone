const userRouter = require('express').Router();

const {
  userSignUp, userLogin, logout, dataUser,
} = require('../controllers');
const auth = require('../middlewares/auth');

userRouter.post('/signUp', userSignUp);
userRouter.post('/logIn', userLogin);
userRouter.get('/logout', logout);
userRouter.get('/profile', auth, dataUser);
module.exports = userRouter;
