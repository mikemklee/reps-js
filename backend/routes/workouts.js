const express = require('express');

const {
  getWorkoutLogs,
  saveWorkout,
  editWorkout,
  deleteWorkout,
} = require('../controllers/workouts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getWorkoutLogs);
router.route('/').put(protect, saveWorkout);
router.route('/:id').post(protect, editWorkout);
router.route('/:id').delete(protect, deleteWorkout);

module.exports = router;
