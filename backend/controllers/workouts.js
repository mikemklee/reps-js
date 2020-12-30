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

// @desc    Update an existing workout session
// @route   POST /api/workouts/:workoutId
const editWorkout = async (req, res) => {
  const workoutId = req.params.id;
  const { workoutData } = req.body;

  // TODO: validate request body

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    res.status(404).json({
      message: `Workout with id "${workoutId}" does not exist`,
    });
    return;
  }

  workout.name = workoutData.name;
  workout.exercises = workoutData.exercises;
  workout.duration = workoutData.duration;

  const editedWorkout = await workout.save();

  res.status(200).json(editedWorkout);
};

// @desc    Delete an existing workout session
// @route   DELETE /api/workouts/:workoutId
const deleteWorkout = async (req, res) => {
  const workoutId = req.params.id;

  // TODO: validate request body

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    res.status(404).json({
      message: `Workout with id "${workoutId}" does not exist`,
    });
    return;
  }

  await workout.remove();

  res.status(200).json({});
};

module.exports = {
  getWorkoutLogs,
  saveWorkout,
  editWorkout,
  deleteWorkout,
};
