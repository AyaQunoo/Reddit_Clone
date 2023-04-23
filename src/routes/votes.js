const routerVote = require('express').Router();
const { upVote, sumVotes, downVote } = require('../controllers');
const auth = require('../middlewares/auth');

routerVote.get('/votes', sumVotes);
routerVote.post('/up/:postId', auth, upVote);
routerVote.post('/down/:postId', auth, downVote);

module.exports = routerVote;
