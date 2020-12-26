const express = require('express');

const { getUsers, authUser, registerUser } = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').put(registerUser);
router.route('/').get(protect, getUsers);
router.route('/login').post(authUser);

module.exports = router;
