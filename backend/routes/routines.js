const express = require('express');

const { getRoutines, createRoutine } = require('../controllers/routines');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').put(protect, createRoutine);
router.route('/').get(protect, getRoutines);

module.exports = router;
