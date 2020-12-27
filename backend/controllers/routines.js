const Routine = require('../models/Routine');

// @desc    Fetch all routines
// @route   GET /api/routines
// @access  Private
const getRoutines = async (req, res) => {
  const routines = await Routine.find({});
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

module.exports = { getRoutines, createRoutine };
