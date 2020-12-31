const express = require('express');
const passport = require('passport');

const router = express.Router();

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

// when login is successful, retrieve user info
router.route('/login/success').get((req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'failed to authenticate user',
    });
  }
});

// when login failed, send failed msg
router.route('/login/failed').get((req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

// When logout, redirect to client
router.route('/logout').get((req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// redirect to home page after successfully login via google
router.route('/google/redirect').get(
  passport.authenticate('google', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed',
  })
);

// const { getUsers, authUser, registerUser } = require('../controllers/auth');
// const { protect } = require('../middleware/auth');

// router.route('/').put(registerUser);
// router.route('/').get(protect, getUsers);
// router.route('/login').post(authUser);

module.exports = router;
