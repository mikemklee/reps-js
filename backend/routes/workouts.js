const express = require('express');

const { getWorkoutLogs, saveWorkout } = require('../controllers/workouts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').put(saveWorkout);
router.route('/').get(protect, getWorkoutLogs);

module.exports = router;
