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
  const { workoutData } = req.body;

  // TODO: validate request body

  const workout = new Workout(workoutData);
  const savedWorkout = await workout.save();

  res.status(201).json(savedWorkout);
};

module.exports = { getWorkoutLogs, saveWorkout };
