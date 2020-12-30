const Routine = require('../models/Routine');

// @desc    Fetch all user routines
// @route   GET /api/routines
// @access  Private
const getUserRoutines = async (req, res) => {
  const userRoutines = await Routine.find()
    .where('_id')
    .in(req.user.routineIds);
  res.json(userRoutines);
};

// @desc    Fetch all routine presets
// @route   GET /api/routines/presets
// @access  Private
const getRoutinePresets = async (req, res) => {
  const routines = await Routine.find({ isPreset: true });
  res.json(routines);
};

// @desc    Create a new routine
// @route   PUT /api/routines
const createRoutine = async (req, res) => {
  const { user, body } = req;
  const { routineData } = body;

  // TODO: validate request body

  // save new routine in DB
  let savedRoutine;
  try {
    const routine = new Routine(routineData);
    savedRoutine = await routine.save();
  } catch (err) {
    res.status(400).json({
      message: 'could not save routine in DB',
    });
  }

  // store routine id on user
  try {
    user.routineIds = [...user.routineIds, savedRoutine._id];
    await user.save();
  } catch (err) {
    res.status(400).json({
      message: 'could not update user',
    });
  }

  res.status(201).json(savedRoutine);
};

// @desc    Update an existing user routine
// @route   POST /api/routines/:id
const editUserRoutine = async (req, res) => {
  const routineId = req.params.id;
  const { routineData } = req.body;

  // check if user owns this routine
  const userRoutineIds = req.user.routineIds;
  if (!userRoutineIds.includes(routineId)) {
    res.status(403).json({
      message: `Routine with id "${routineId}" does not belong to user`,
    });
  }

  // TODO: validate request body

  const routine = await Routine.findById(routineId);

  if (!routine) {
    res.status(404).json({
      message: `Routine with id "${routineId}" does not exist`,
    });
    return;
  }

  routine.name = routineData.name;
  routine.exercises = routineData.exercises;

  const editedRoutine = await routine.save();

  res.status(200).json(editedRoutine);
};

// @desc    Delete an existing user routine
// @route   DELETE /api/routines/:id
const deleteUserRoutine = async (req, res) => {
  const routineId = req.params.id;

  // check if user owns this routine
  const userRoutineIds = req.user.routineIds;
  if (!userRoutineIds.includes(routineId)) {
    res.status(403).json({
      message: `Routine with id "${routineId}" does not belong to user`,
    });
  }

  const routine = await Routine.findById(routineId);

  if (!routine) {
    res.status(404).json({
      message: `Routine with id "${routineId}" does not exist`,
    });
    return;
  }

  await routine.remove();

  res.status(200).json({});
};

module.exports = {
  getUserRoutines,
  getRoutinePresets,
  createRoutine,
  editUserRoutine,
  deleteUserRoutine,
};
