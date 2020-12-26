const Workout = require('../models/Workout');

// @desc    Fetch all workout logs
// @route   GET /api/workouts
// @access  Private
const getWorkoutLogs = async (req, res) => {
  const workoutLogs = await Workout.find({});
  res.json(workoutLogs);
};

// @desc    Save a new workout session
// @route   PUT /api/workouts/
const saveWorkout = async (req, res) => {
  console.log(req.body);

  res.status(400).json({
    message: 'Not yet!',
  });
  return;
};

module.exports = { getWorkoutLogs, saveWorkout };
