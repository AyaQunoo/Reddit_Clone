const router = require('express').Router();

const path = require('path');
const auth = require('../middlewares/auth');

router.get('/profile/:username', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'profile.html'));
});
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'login.html'));
});
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'signup.html'));
});
router.get('/createPost', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'createpost.html'));
});
router.get('/userhome', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'user_profile.html'));
});

module.exports = router;
