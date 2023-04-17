const router = require('express').Router();

const path = require('path');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'login.html'));
});
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'signup.html'));
});
router.get('/createPost', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'createpost.html'));
});
router.get('/userhome', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'user_profile.html'));
});

module.exports = router;
