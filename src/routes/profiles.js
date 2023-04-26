const profilesRouter = require('express').Router();
const { userIfo } = require('../controllers');

profilesRouter.get('/profile/:username', userIfo);

module.exports = profilesRouter;
