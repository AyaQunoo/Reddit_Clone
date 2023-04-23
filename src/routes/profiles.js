const profilesRouter = require('express').Router();
const { userIfo } = require('../controllers');

profilesRouter.get('/profile/:id', userIfo);

module.exports = profilesRouter;
