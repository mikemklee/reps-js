const express = require('express');

const {
  getWorkoutLogs,
  saveWorkout,
  editWorkout,
} = require('../controllers/workouts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getWorkoutLogs);
router.route('/').put(protect, saveWorkout);
router.route('/:id').post(protect, editWorkout);

module.exports = router;
