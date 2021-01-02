const Workout = require('../models/Workout');

// @desc    Fetch all user workout logs
// @route   GET /api/workouts
// @access  Private
const getWorkoutLogs = async (req, res) => {
  const userWorkouts = await Workout.find()
    .where('_id')
    .in(req.user.workoutIds);
  res.json(userWorkouts);
};

// @desc    Save a new workout session
// @route   PUT /api/workouts/
const saveWorkout = async (req, res) => {
  const { user, body } = req;
  const { workoutData } = body;

  // TODO: validate request body

  // save new workout in DB
  let savedWorkout;
  try {
    const workout = new Workout(workoutData);
    savedWorkout = await workout.save();
  } catch (err) {
    res.status(400).json({
      message: 'could not save workout in DB',
    });
    return;
  }

  // store workout id on user
  try {
    user.workoutIds = [...user.workoutIds, savedWorkout._id];
    await user.save();
  } catch (err) {
    res.status(400).json({
      message: 'could not update user',
    });
    return;
  }

  res.status(201).json(savedWorkout);
};

// @desc    Update an existing workout session
// @route   POST /api/workouts/:workoutId
const editWorkout = async (req, res) => {
  const workoutId = req.params.id;
  const { workoutData } = req.body;

  // check if user owns this workout
  const userWorkoutIds = req.user.workoutIds;
  if (!userWorkoutIds.includes(workoutId)) {
    res.status(403).json({
      message: `Workout with id "${workoutId}" does not belong to user`,
    });
    return;
  }

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
// @route   DELETE /api/workouts/:id
const deleteWorkout = async (req, res) => {
  const workoutId = req.params.id;

  // check if user owns this workout
  const userWorkoutIds = req.user.workoutIds;
  if (!userWorkoutIds.includes(workoutId)) {
    res.status(403).json({
      message: `Workout with id "${workoutId}" does not belong to user`,
    });
    return;
  }

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
