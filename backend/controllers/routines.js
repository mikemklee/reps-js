const Routine = require('../models/Routine');

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
  const { routineData } = req.body;

  // TODO: validate request body

  const routine = new Routine(routineData);
  const savedRoutine = await routine.save();

  res.status(201).json(savedRoutine);
};

module.exports = { getRoutinePresets, createRoutine };
