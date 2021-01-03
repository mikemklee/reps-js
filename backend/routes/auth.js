const express = require('express');

const {
  getUserData,
  updateUserPreferences,
  loginFail,
  logout,
  googleLogin,
  googleLoginRedirect,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/login/success').get(protect, getUserData);
router.route('/login/failed').get(loginFail);
router.route('/logout').get(logout);
router.route('/google').get(googleLogin);
router.route('/google/redirect').get(googleLoginRedirect);
router.route('/:id/preferences').post(protect, updateUserPreferences);

module.exports = router;
